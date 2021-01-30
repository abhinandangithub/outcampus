import db from "../../../../utils/database"
import { verifyToken } from "utils/token"
import { truncate } from "lodash"

export default async function courseHandler(req, res) {
  const {
    body,
    method,
    query: { course_id },
    headers: { authorization },
  } = req

  // @TODO: This logic needs to move to a middleware
  const token = authorization && authorization.split(" ")[1]
  let decoded = null
  if (token) {
    decoded = await verifyToken(token).catch((error) => {
      console.error("JWT ERROR:", error.message)
    })
  }
  switch (method) {
    case "GET":
      const course = await db.course
        .findOne({
          where: {
            id: Number(course_id),
          },
          include: {
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
            user: true,
            enrolment: {
              where: {
                status: "SUCCESS",
              },
              select: {
                user: true,
                status: true,
              },
            },
            class_session: {
              orderBy: {
                start_time: "asc",
              },
              include: {
                teacher_rating: {
                  select: {
                    id: true,
                    overall: true,
                    audio: true,
                    video: true,
                    content: true,
                    course_structure: true,
                    professionalism: true,
                    communication: true,
                    comment: true
                  },
                },
                home_work: {
                  select: {
                    id: true,
                    url: true,
                    course_id: true,
                    user_id: true,
                    class_session_id: true,
                    isTeacher: true,
                    user: true,
                  }
                },
              }
            },
          },
        })
        .catch(console.error)

      const enrolmentCount = course.enrolment.filter(
        (x) => x.status === "SUCCESS"
      ).length

      const isEnrolled =
        decoded &&
        decoded.role === "student" &&
        Boolean(
          course.enrolment.find(
            (x) => x.user.id === decoded.sub && x.status === "SUCCESS"
          )
        )
      const isCreator =
        decoded && decoded.role === "teacher" && course.user.id === decoded.sub
      const isAdmin = decoded && ["super_admin", "admin"].includes(decoded.role)
      const canEdit = isCreator || isAdmin

      // @TODO: Fix this ugly if/else branching
      if (course) {
        if (isEnrolled || isCreator || isAdmin) {
          res.status(200).json({
            ...course,
            ...{
              enrolmentCount,
              canJoin: true,
              canEdit,
              isEnrolled,
              class_session: course.class_session.map((x) => ({
                ...x,
                // Check if the  current user has rated the session already
                hasRatedSessionAsStudent: x.teacher_rating.length > 0 ? true : false,
              })),
            },
          })
        } else if (course.status === "approved") {
          res.status(200).json({
            ...course,
            ...{
              enrolmentCount,
              enrolment: null,
              isEnrolled: isEnrolled,
              class_session: course.class_session.map((x) => ({
                start_time: x.start_time,
                end_time: x.end_time,
                topic: x.topic,
                summary: x.summary,
                teacher_rating: x.teacher_rating
              })),
            },
          })
        } else {
          res.status(404).json({ message: "404. Course not found" })
        }
      } else {
        // What about genuine server errors?
        res.status(404).json({ message: "404. Course not found" })
      }

      break

    case "PATCH":
      console.log('abhi api ', body.classes_delete);
      console.log('abhi api classes ', body.classes);
      const session_insert = body.classes.filter((o) => { return o.type === "insert" });
      const session_update = body.classes.filter((o) => { return o.type === "update" });
     // const session_delete = body.classes.filter((o) => { return o.type === "delete" });
     const session_delete = body.classes_delete;
     
      for (let x = 0; x < session_update.length; x++) {
        await db.class_session.update({
          data: {
            start_time: session_update[x].start_time,
            end_time: session_update[x].end_time,
            topic: session_update[x].topic,
            summary: session_update[x].summary,
          },
          where: { id: session_update[x].id },
        });
      }

      for (let x = 0; x < session_delete.length; x++) {
        await db.class_session.delete({
          where: { id: session_delete[x].id },
        });
      }
      const patchedCourse = await db.course.update({
        where: {
          id: Number(course_id),
        },
        data: {
          title: body.title,
          status: body.status,
          objective: body.objective,
          academy: body.academy,
          // is_popular: body.is_popular,
          summary: body.summary,
          format: body.format,
          duration: body.duration && Number(body.duration),
          cover: body.cover,
          class_session: {
            create: session_insert.map((session) => ({
              start_time: session.start_time,
              end_time: session.end_time,
              topic: session.topic,
              summary: session.summary,
            })),
          },
          age_min: body.age_min && Number(body.age_min),
          age_max: body.age_max && Number(body.age_max),
          size_min: body.size_min && Number(body.size_min),
          size_max: body.size_max && Number(body.size_max),
          price: body.price && Number(body.price),
          hasGST: body.hasGST,
          level: body.level,
          subject: { connect: { id: parseInt(body.subject_id) } },
        },
      })
      res.status(200).json(patchedCourse)
      break

    case "DELETE":
      try {
        await db.course.delete({
          where: {
            id: Number(course_id),
          },
        })
        res.status(204).json({ message: "Deleted" })
      } catch {
        res.status(400).json({ message: "Invalid course", status: "error" })
      }

      break

    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"])
      res.status(405).json({ message: `Method ${method} Not Allowed` })
  }
}
