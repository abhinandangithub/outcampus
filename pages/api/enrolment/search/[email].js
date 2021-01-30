import db from "../../../../utils/database"
import { verifyToken } from "../../../../utils/token"

export default async function searchHandler(req, res) {
    const {
        body,
        method,
        headers: { authorization },
        query: { email },
    } = req
    try {
        console.log('abhi email ', email);
        // const [, token] = authorization.split(" ")
        // const decodedToken = await verifyToken(token)
        // if (decodedToken && decodedToken.role === "super_admin") {
        if (true) {
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
                                user: {
                                    select: {
                                        first_name: true,
                                        last_name: true,
                                        id: true,
                                        outcampus_id: true,
                                    },
                                },

                            },
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



                default:
                    res.setHeader("Allow", ["GET", "POST"])
                    res.status(405).end(`Method ${method} Not Allowed`)
            }
        } else {
            res.status(403).end("Access denied")
        }
    } catch (error) {
        console.error(error.message)
        res.status(403).end("Access denied")
    }
}
