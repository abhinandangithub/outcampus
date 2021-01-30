import db from "../../../utils/database"
import { verifyToken } from "utils/token"

async function homeWorkHandler(req, res) {
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
                console.log('abhi homework api ', body);
                const home_work = await db.home_work.create({
                    data: {
                        isTeacher: body.isTeacher,
                        course_id: Number(body.course_id),
                        url: body.url.location,
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
                res.status(201).json(home_work)
            }

            break

        case "PUT":
            if (["admin", "super_admin", "teacher", "student"].includes(role)) {
                console.log('abhi homework api update ', body);

                const home_work = await db.home_work.update({
                    data: {
                        url: body.url.location
                    },
                    where: { id: body.id },
                })
                res.status(201).json(home_work)
            }
            break
        default:
            res.setHeader("Allow", ["PUT", "POST"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default homeWorkHandler
