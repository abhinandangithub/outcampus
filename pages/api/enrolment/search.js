import db from "../../../utils/database"
import { verifyToken } from "../../../utils/token"
import sendEmail from '../send_email';

export default async function searchHandler(req, res) {

  const {
    body,
    method,
    headers: { authorization },
    query: { email },
  } = req
  try {
    //const [, token] = authorization.split(" ")
    //const decodedToken = await verifyToken(token)
    if (1) {

      switch (method) {
        case "GET":

          db.enrolment
            .findMany({
              where: {
                user: {
                  email: email,
                },
                status: "SUCCESS",
              },
              select: {
                student_id: true,
                course_id: true,
                amountPaid: true,
                id: true,
              }
            })
            .then((enrolments) => {
              res.status(200).json(
                enrolments.map((x) => ({
                  ...x,
                }))
              )
            })
            .catch((error) => {
              console.error(error)
              res.status(400).json(error)
            })

          break

        case "PUT":
            console.log('abhi ', body);
          let getCourse = await db.course
            .findOne({
              where: { id: Number(body.course_id) },
              include: { enrolment: true, class_session: true },
            })
            .catch(console.error)

          let getUser;
          if (body.id > 0) {
            getUser = await db.user
              .findOne({ where: { id: Number(body.student_id) } })
              .catch(console.error)
          } else {
            getUser = await db.user
              .findOne({ where: { email: body.student_id } })
              .catch(console.error);
              console.log('abhi getUser ', getUser);
          }

          // Check if course exists and is approved and not completed
          if (!getCourse) {
           return res
              .status(404)
              .json({ error: true, message: "Cannot enroll for this course" })
          }

          // Check if user exists
          if (!getUser) {
            return res.status(404).json({ error: true, message: "User doesn't exist" })
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
            let order_id = `${getCourse.outcampus_course_id}.${
              getUser.outcampus_id
              }.${Date.now()}`


            if (body.id > 1) {
              await db.enrolment.update({
                where: {
                  id: Number(body.id),
                },
                data: {
                  course: {
                    connect: {
                      id: Number(body.course_id),
                    }
                  },
                  user: {
                    connect: {
                      id: Number(body.student_id),
                    }
                  },

                  //student_id: body.student_id,
                  rating: 4,
                  status: 'SUCCESS',
                  amountPaid: Number(body.amountPaid)
                },
              })
              res.status(200).json({ error: false, message: "updated successfully" })

            } else {
              db.enrolment
                .create({
                  data: {
                    course: {
                      connect: {
                        id: Number(body.course_id),
                      },
                    },
                    user: {
                      connect: {
                        id: Number(getUser.id),
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
                  res.status(200).json({ error: false, message: "created successfully" })
                })
                .catch((error) => {
                  console.error(error.code)
                  if (error.code === "P2002") {
                    res.status(409).json(error)
                  } else {
                    res.status(400).json(error)
                  }
                })
            }

            sendEmail(
              {
                  to: 'abhinandan@outcampus.in',
                  from: 'notifications@outcampus.in',
                  subject: 'Confirmation mail/ Welcome to Outcampus',
                  text: `Dear ${getUser.last_name} \nCongratulations!\n
                  ${getUser.first_name} enrollment for Young Leader Program (Critical Thinking & Communication) is confirmed! ${getUser.first_name} 
                  course will begin from ${new Date(getCourse.class_session[0].start_time).toLocaleTimeString()} (IST).
                  We are sure you have questions about the curriculum, so please find attached the curriculum.\n
                  Your exclusive class link will be shared with you. Please join with your Laptop/PC which has a stable Internet connection . \n
                  at least 5 minutes before the commencement of the class to ensure a smooth session! \n
                  ${getUser.first_name} will be evaluated by our top-rated/ gold medalist teachers and will be provided with a detailed,
                  Personalized Performance Report Card from a team of alumni of IIT, IIM, British Council on successful trial completion.\n
                  Thank you,\nTeam Outcampus\nFor support, call us at 1234567890`,
                  attachments: [{ path: 'pages/api/assets/Young-Leaders-Program.pdf' }]
              });

            return true
          } catch (error) {
            throw error
          }
          break;

        default:
          res.setHeader("Allow", ["GET", "POST"])
          res.status(405).end(`Method ${method} Not Allowed`)
      }
    } else {
      res.status(403).end("Access denied1")
    }
  } catch (error) {
    console.error(error.message)
    res.status(404).json({ error: true, message: error.message })
    return
    res.status(403).end("Access denied2")
  }
}
