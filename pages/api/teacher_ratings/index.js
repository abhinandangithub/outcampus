import db from "../../../utils/database"
import { addMinutes } from "date-fns"
import { verifyToken } from "utils/token"

async function teacherRatingHandler(req, res) {
    const {
        body,
        method,
        headers: { authorization },
    } = req

    const token = authorization && authorization.split(" ")[1]

    let decoded = (await verifyToken(token).catch((error) => {
        console.error("JWT ERROR:", error.message)
    })) || { sub: null, role: "guest" }

    const { sub, role } = decoded

    switch (method) {
        case "POST":
            if (["admin", "super_admin", "teacher", "student"].includes(role)) {
                const teacher_rating = await db.teacher_rating.create({
                    data: {
                        comment: body.comment,
                        overall: Number(body.overall),
                        audio: Number(body.audio),
                        video: Number(body.video),
                        content: Number(body.content),
                        course_structure: Number(body.course_structure),
                        professionalism: Number(body.professionalism),
                        communication: Number(body.communication),
                        user: {
                            connect: {
                                id: Number(sub), // TODO: this should be the current loggedIn user ID
                            },
                        },
                        class_session: {
                            connect: {
                                id: Number(body.class_session_id),
                            },
                        },
                    },
                })
                res.status(201).json(teacher_rating)
            }

            break

        default:
            res.setHeader("Allow", ["GET", "POST"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default teacherRatingHandler
