import { addEmail, removeEmail, fetchEmails } from "services/register"

export default async function teacherEmailHandler(req, res) {
  const { body, method } = req

  switch (method) {

    case "POST":
      try {
        let user = await addEmail(body);
        res.status(201).json(user)
      } catch (error) {
        console.error("ERROR CODE", error)
        if (error.code === "P2002") {
          res.status(409).end("Email already exists")
        } else {
          console.log(error)
          res.status(500).json(error)
        }
      }
      break

    case "GET":
      try {
        let user = await fetchEmails(body);
        res.status(201).json(user)
      } catch (error) {
        console.error("ERROR CODE", error)
        console.log(error)
        res.status(500).json(error)
      }
      break

    case "DELETE":
      try {
        let user = await removeEmail(body.data.id);
        res.status(201).json(user)
      } catch (error) {
        console.error("ERROR CODE", error)
        console.log(error)
        res.status(500).json(error)
      }
      break

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}