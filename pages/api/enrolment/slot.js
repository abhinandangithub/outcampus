import db from "../../../utils/database"
import authorize from "utils/authorize"

export default authorize(enrolmentHandler)
import sendEmail from '../send_email';


// @TODO: Refactor to smaller/modular methods
async function enrolmentHandler(req, res, { sub, role }) {
    const {
        body: { course_id },
        method,
    } = req

    switch (method) {
        case "GET":
            break

        case "POST":
            console.log('abhi book slot ', sub, req.body);

            let course = await db.course
                .findOne({
                    where: { id: Number(course_id) },
                    include: { enrolment: true, class_session: true },
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
                        amountPaid: Number(req.body.amountPaid)
                    },
                })
                .then((enrolment) => {
                    console.log('abhi user', course.class_session);
                    if (!!user) {
                        sendEmail(
                            {
                                to: user.email,
                                from: 'notifications@outcampus.in',
                                subject: 'Confirmation mail/ Welcome to Outcampus',
                                text: `Dear ${user.last_name} \nCongratulations!\n
                                ${user.first_name} enrollment for Young Leader Program (Critical Thinking & Communication) is confirmed! ${user.first_name} 
                                course will begin from ${new Date(course.class_session[0].start_time).toLocaleTimeString()} (IST).
                                We are sure you have questions about the curriculum, so please find attached the curriculum.\n
                                Your exclusive class link will be shared with you. Please join with your Laptop/PC which has a stable Internet connection . \n
                                at least 5 minutes before the commencement of the class to ensure a smooth session! \n
                                ${user.first_name} will be evaluated by our top-rated/ gold medalist teachers and will be provided with a detailed,
                                Personalized Performance Report Card from a team of alumni of IIT, IIM, British Council on successful trial completion.\n
                                Thank you,\nTeam Outcampus\nFor support, call us at 1234567890`,
                                attachments: [{ path: 'pages/api/assets/five-hour.pdf' }]
                            });
                    }
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

            break

        default:
            res.setHeader("Allow", ["GET", "POST"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}