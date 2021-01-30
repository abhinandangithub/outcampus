import db from "../../../utils/database"

export default async function studentHandler(req, res) {
  const { body, method } = req

  switch (method) {
    case "GET":
      const users = await db.student.findMany({
        include: {
          user: true,
        },
      })
      res.status(200).json(users)
      break

    case "POST":
      const course = await db.student.create({
        data: {
          user: {
            create: body,
          },
        },
      })
      res.status(201).json(course)
      break

    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
