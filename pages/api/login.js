import db from "../../utils/database"
import { signToken } from "../../utils/token"

export default async function loginHandler(req, res) {
  const {
    body: { email, phone },
    method,
  } = req
  switch (method) {
    case "POST":
      const user = await db.user.findOne({
        where: {
          phone: phone,
          email: email,
        },
        select: {
          id: true,
          phone: true,
        },
      })
      console.log(user)
      if (user) {
        let token = signToken({
          phone: user.phone,
        })
        res.status(201).json({ token })
      } else {
        res.status(401).end("Invalid username or password")
      }

      break

    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
