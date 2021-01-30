import db from "utils/database"

export default async function subjectHandler(req, res) {
  const {
    body: { name },
    method,
  } = req

  switch (method) {
    case "GET":
      let msgs = await db.subject.findMany()

      res.status(200).json(msgs)
      break

    case "POST":
      let subject = await db.subject.create({
        data: {
          name,
        },
      })
      res.status(201).json(subject)
      break

    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
