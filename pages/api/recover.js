import db from "../../utils/database"
import { autoLogin } from "../../services/user"

const recoverHandler = async (req, res) => {
  const { method, body } = req
  switch (method) {
    case "POST":
      console.log(body.token)
      try {
        const result = await db.forgot_password.findOne({
          where: {
            token: body.token,
          },
          include: {
            user: true,
          },
        })
        if (result) {
          let session = await autoLogin(result.user.email)
          res.status(200).json(session)
        } else {
          res.status(404).json({ message: "User doesn't exist" })
        }
      } catch (error) {
        res.status(400).json({ message: "Wrong token" })
      }
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default recoverHandler
