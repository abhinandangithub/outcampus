import { createUser, getUsers } from "services/user"

export default async function userHandler(req, res) {
  const { body, method } = req

  switch (method) {
    case "GET":
      const users = await getUsers()
      res.status(200).json(users)
      break

    case "POST":
      console.log(body)
      try {
        let user = await createUser(body)
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

    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
