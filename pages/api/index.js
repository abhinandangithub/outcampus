import db from "../../utils/database"
import authorize from "utils/authorize"
import { changePassword } from "services/user"

const apiHandler = async (req, res, { sub, role }) => {
  const { method, body } = req
  switch (method) {
    case "GET":
      await db.user
        .findOne({
          where: {
            id: Number(sub),
          },
          select: {
            id: true,
            email: true,
            email_verified: true,
            first_name: true,
            last_name: true,
            avatar: true,
            phone: true,
            phone_verified: true,
            profile: true,
          },
        })
        .then((user) => {
          res.status(200).json(user)
        })
        .catch((error) => {
          console.error(error)
          res.status(401).end("unauthorized")
        })
      break

    case "POST":
      // @NOTE: We aren't using POST for anything else at the moment
      changePassword(Number(sub), body.oldPassword, body.newPassword)
        .then(() => {
          res.status(200).json({ message: "Password changed" })
        })
        .catch((error) => {
          console.error(error)
          res.status(400).end("something went wrong")
        })

      break

    case "PATCH":
      db.user
        .update({
          where: {
            id: Number(sub),
          },
          data: {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            phone: body.phone,
            profile: {
              upsert: {
                create: {
                  city: body.city,
                  state: body.state,
                  country: body.country,
                  bio: body.bio,
                  pincode: Number(body.pincode),
                  address: body.address,
                },
                update: {
                  city: body.city,
                  state: body.state,
                  country: body.country,
                  bio: body.bio,
                  pincode: Number(body.pincode),
                  address: body.address,
                },
              },
            },
          },
        })
        .then((user) => {
          res.status(200).json(user)
        })
        .catch((error) => {
          console.error(error)
          res.status(400).end("something went wrong")
        })
      break

    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default authorize(apiHandler)
