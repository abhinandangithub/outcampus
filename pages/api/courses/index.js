import db from "../../../utils/database"
import { addMinutes } from "date-fns"
import { generateCourseId } from "utils/idGenerator"
import { verifyToken } from "utils/token"

async function coursesHandler(req, res) {
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
    case "GET":
      const courses = sub
        ? await db.course.findMany({
          where: {
            user: {
              id: Number(sub),
            },
          },
          include: {
            user: true,
            enrolment: true,
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
            class_session: {
              select: {
                start_time: true,
                end_time: true
              },
              orderBy: {
                start_time: "asc",
              },
            },
          },
        })
        : await db.course.findMany({
          where: {
            status: "approved",
          },
          include: {
            user: true,
            enrolment: true,
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
            class_session: {
              select: {
                start_time: true,
                end_time: true,
              },
              orderBy: {
                start_time: "asc",
              },
            },
          },
        })

      res
        .status(200)
        .json(
          courses.filter((x) =>
            x.class_session.some(
              (y) => new Date(y.end_time).getTime() >= Date.now()
            )
          )
        )
      break

    case "POST":
      if (["admin", "super_admin", "teacher"].includes(role)) {
        const course = await db.course.create({
          data: {
            title: body.title,
            summary: body.summary,
            format: body.format,
            cover: body.cover,
            price: Number(body.price),
            duration: Number(body.duration),
            academy: body.academy,
            level: body.level,
            objective: body.objective,
            age_min: body.age_min,
            age_max: body.age_max,
            size_min: body.size_min,
            size_max: body.size_max,
            hasGST: body.hasGST,
            user: {
              connect: {
                id: Number(sub), //@TODO: should be teacherId when added by admin/super_admin
              },
            },
            outcampus_course_id: generateCourseId(),
            subject: {
              connect: {
                id: Number(body.subject_id),
              },
            },
            class_session: {
              create: body.classes.map((session) => ({
                start_time: session.start_time,
                end_time: addMinutes(
                  new Date(session.start_time),
                  Number(body.duration)
                ),
                topic: session.topic,
                summary: session.summary,
              })),
            },
          },
        })
        res.status(201).json(course)
      }

      break

    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default coursesHandler
