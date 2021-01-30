import db from "../../../utils/database"
import bcrypt from "bcrypt"
import { verifyToken } from "../../../utils/token"

export default async function adminHandler(req, res) {
  const {
    body,
    method,
    headers: { authorization },
    query: { admin_id },
  } = req
  try {
    const [, token] = authorization.split(" ")
    const decodedToken = await verifyToken(token)
    if (decodedToken && decodedToken.role === "super_admin") {
      switch (method) {
        case "GET":
          const admins = await db.user.findMany({
            where: {
              role: {
                name: "admin",
              },
            },
            select: {
              id: true,
              email: true,
            },
          })
          res.status(200).json(admins)
          break

        case "POST":
          let passwordHash = await bcrypt.hash(body.password, 10)
          const admin = await db.user
            .create({
              data: {
                email: body.email,
                password_hash: passwordHash,
                role: {
                  connect: { name: "admin" },
                },
              },
            })
            .catch(console.error)
          res.status(201).json(admin)
          break

        default:
          res.setHeader("Allow", ["GET", "POST"])
          res.status(405).end(`Method ${method} Not Allowed`)
      }
    } else {
      res.status(403).end("Access denied")
    }
  } catch (error) {
    console.error(error.message)
    res.status(403).end("Access denied")
  }
}
