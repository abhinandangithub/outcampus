import db from "../../../utils/database"
import authorize from "utils/authorize"
import PG from "utils/pg"

export default authorize(enrolmentHandler)

// @TODO: Refactor to smaller/modular methods
async function enrolmentHandler(req, res, { sub, role }) {
  const {
    body: { course_id },
    method,
  } = req
  switch (method) {
    case "GET":
      db.enrolment
        .findMany({
          where: {
            user: {
              id: Number(sub),
            },
            status: "SUCCESS",
          },
          select: {
            course: {
              include: {
                user: true,
                subject: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                class_session: true,
                enrolment: true,
              },
            },
            user: {
              select: {
                first_name: true,
                last_name: true,
                id: true,
                outcampus_id: true,
              },
            },
            transaction: true,
          },
        })
        .then((enrolments) => {
          res.status(200).json(
            enrolments.map((x) => ({
              ...x,
              ...{ course: { ...x.course, ...{ canJoin: true } } },
            }))
          )
        })
        .catch((error) => {
          console.error(error)
          res.status(400).json(error)
        })
      break

    case "PUT":

      let getCourse = await db.course
        .findOne({
          where: { id: Number(course_id) },
          include: { enrolment: true },
        })
        .catch(console.error)

      let getUser = await db.user
        .findOne({ where: { id: Number(student_id) } })
        .catch(console.error)

      // Check if course exists and is approved and not completed
      if (!getCourse) {
        res
          .status(404)
          .json({ error: true, message: "Cannot enroll for this course" })
        return
      }

      // Check if user exists
      if (!getUser) {
        res.status(404).json({ error: true, message: "User doesn't exist" })
        return
      }

      // Check if there are slots open
      if (
        getCourse.enrolment.filter((x) => x.status === "SUCCESS").length >=
        getCourse.size_max
      ) {
        res.status(404).json({
          error: true,
          message: "Sorry, the slots for this course full!",
        })
        return
      }

      try {
      await db.enrolment.update({
        where: {
          id,
        },
        data: {
          course_id: course_id,
          student_id: student_id,
          rating: 4,
          status: 'SUCCESS',
          amountPaid: amount
        },
      })
      return true
    } catch (error) {
      throw error
    }

    case "POST":
      let course = await db.course
        .findOne({
          where: { id: Number(course_id) },
          include: { enrolment: true },
        })
        .catch(console.error)

      let user = await db.user
        .findOne({ where: { id: Number(sub) } })
        .catch(console.error)

      // Check if course exists and is approved and not completed
      if (!course) {
        res
          .status(404)
          .json({ error: true, message: "Cannot enroll for this course" })
        return
      }

      // Check if user exists
      if (!user) {
        res.status(404).json({ error: true, message: "User doesn't exist" })
        return
      }

      // Create a unique order Id
      let order_id = `${course.outcampus_course_id}.${
        user.outcampus_id
      }.${Date.now()}`

      // Check if there are slots open
      if (
        course.enrolment.filter((x) => x.status === "SUCCESS").length >=
        course.size_max
      ) {
        res.status(404).json({
          error: true,
          message: "Sorry, the slots for this course full!",
        })
        return
      }

      // Check is enrolment attempt has already been made
      let existingEnrolment = await db.enrolment.findOne({
        where: {
          course_user_course_id_student_id_key: {
            course_id: Number(course_id),
            student_id: Number(sub),
          },
        },
        include: {
          transaction: true,
        },
      })

      console.debug("DEBUG:Existing enrolment", existingEnrolment)

      if (existingEnrolment) {
        if (existingEnrolment.status === "SUCCESS") {
          console.log(
            "DEBUG: This shouldn't have happened and should've been handled at the UI layer"
          )
          res.status(409).json({
            message:
              "You've already enrolled for this course. Please check your dashboard for more details",
          })
          return
        }
        if (existingEnrolment.status === "PENDING") {
          if (
            existingEnrolment.transaction &&
            existingEnrolment.transaction.length > 0
          ) {
            // If payment_link is created, redirect to that.
            // Else create a new payment link and redirect
            let existingTransaction = existingEnrolment.transaction.find(
              (x) => x.status === "PAYMENT_LINK_CREATED"
            )
            if (existingTransaction && existingTransaction.pg_link) {
              res
                .status(200)
                .json({ pg_link: existingEnrolment.transaction[0].pg_link })
              return
            } else {
              return createOrder({
                name: `${user.first_name} ${user.last_name}`,
                phone: `91${user.phone}`,
                email: user.email,
                amount: course.price,
                note: `${user.first_name} enroling for ${course.title}`,
                order_id: order_id,
                enrolment: existingEnrolment,
                hasGST: course.hasGST,
              }).then(({ status, paymentLink: pg_link, reason }) => {
                console.log("ENROLMENT: Got back payment link", {
                  status,
                  pg_link,
                })
                if (status !== "OK") throw new Error(reason)
                return savePaymentLink({
                  order_id,
                  pg_link,
                }).then(({ pg_link }) => {
                  res.status(200).json({ pg_link })
                })
              })
            }
          } else {
            // create a new transaction/generate payment link and redirect
            // @FIXME: An error with 200 OK? Why was this done?
            res
              .status(200)
              .json({ message: "transaction doesn't exists", error: true })
            return
          }
        }
      }

      // If email or phone isn't updated, show a message
      if (!user.email || (course.price !== 0 && !user.phone)) {
        console.error(
          "Phone number or Email are not present",
          user.phone,
          user.email
        )
        let errorMessage = !user.email
          ? "Email is required"
          : "Phone number is required"
        res.status(400).json({
          error: true,
          message: `${errorMessage}. Please update your profile`,
        })
        return
      }

      // Handle 0 priced courses
      if (course.price === 0) {
        db.enrolment
          .create({
            data: {
              course: {
                connect: {
                  id: Number(course_id),
                },
              },
              user: {
                connect: {
                  id: Number(sub),
                },
              },
              transaction: {
                create: {
                  order_id: order_id,
                  status: "SUCCESS",
                  pg_response: {
                    txMsg: "Transaction Successful",
                    txTime: new Date().toISOString(),
                    orderId: order_id,
                    txStatus: "SUCCESS",
                    orderAmount: "0",
                    paymentMode: "FREE",
                    referenceId: `FREE course`,
                  },
                },
              },
              status: "SUCCESS",
            },
          })
          .then((enrolment) => {
            console.log(enrolment)
            res.status(200).json({ pg_link: `/enrolment/${order_id}` })
          })
          .catch((error) => {
            console.error(error.code)
            if (error.code === "P2002") {
              res.status(409).json(error)
            } else {
              res.status(400).json(error)
            }
          })
        return
      }
      // @FIXME: This needs to be cleaned up
      createEnrolment({
        course_id: Number(course_id),
        user_id: Number(sub),
        order_id: order_id,
      })
        .then((enrolment) => {
          console.log("ENROLMENT: Saved ", enrolment)
          return createOrder({
            name: `${user.first_name} ${user.last_name}`,
            phone: `91${user.phone}`,
            email: user.email,
            amount: course.price,
            note: `${user.first_name} enroling for ${course.title}`,
            order_id: order_id,
            enrolment,
            hasGST: course.hasGST,
          })
        })
        .then(({ status, paymentLink: pg_link, reason }) => {
          console.log("ENROLMENT: Got back payment link", { status, pg_link })
          if (status !== "OK") throw new Error(reason)
          return savePaymentLink({
            order_id,
            pg_link,
          })
        })
        .then(({ pg_link }) => {
          res.status(200).json({ pg_link })
          // This handler's job is done. Rest of the flow is handled by the `returnURL`
        })
        .catch((error) => {
          console.error(error)
          res.status(400).json(error)
        })

      break

    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

// returns an enrolment record
function createEnrolment({ user_id, course_id, order_id }) {
  console.log("ENROLMENT: Creating enrolment with values", {
    user_id,
    course_id,
    order_id,
  })
  return db.enrolment.create({
    data: {
      course: {
        connect: {
          id: course_id,
        },
      },
      user: {
        connect: {
          id: user_id,
        },
      },
      transaction: {
        create: {
          order_id: order_id,
        },
      },
    },
  })
}

// returns the payment link
function createOrder({
  order_id,
  name,
  phone,
  email,
  amount,
  note,
  enrolment,
  hasGST,
}) {
  console.log({ hasGST })
  const pg_request = {
    orderId: order_id, // required by Cashfree API
    orderAmount: Number(hasGST ? 1.18 * amount : amount).toFixed(2), // required by Cashfree API
    orderCurrency: "INR",
    orderNote: note,
    customerName: name, // required by Cashfree API
    customerPhone: phone, // required by Cashfree API
    customerEmail: email, // required by Cashfree API
    returnUrl: process.env.PG_RETURN_URL, // required by Cashfree API
  }
  console.log("ENROLMENT: Creating order with", pg_request)

  // store pg_request in DB
  return db.transaction
    .upsert({
      where: { order_id },
      update: {
        pg_request,
      },
      create: {
        order_id,
        pg_request,
        enrolment: {
          connect: {
            id: enrolment.id,
          },
        },
      },
    })
    .then(() => {
      return PG.Orders.CreateOrders(pg_request)
    })
}

function savePaymentLink({ order_id, pg_link }) {
  console.log("ENROLMENT: Saving payment link to DB", pg_link)
  return db.transaction.update({
    where: {
      order_id,
    },
    data: {
      pg_link,
      status: "PAYMENT_LINK_CREATED",
    },
  })
}
