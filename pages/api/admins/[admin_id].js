import db from "../../../utils/database"
import { verifyToken } from "../../../utils/token"

export default async function adminHandler(req, res) {
  const {
    method,
    query: { admin_id },
    headers: { authorization },
  } = req

  try {
    const [, token] = authorization.split(" ")
    const decodedToken = await verifyToken(token)
    if (decodedToken && decodedToken.role === "super_admin") {
      switch (method) {
        // get isn't needed now anyway
        case "GET":
          const admin = await db.user.findOne({
            where: {
              id: Number(admin_id),
            },
            select: {
              id: true,
              email: true,
              role: {
                select: {
                  name,
                },
              },
            },
          })
          if (admin) {
            res.status(200).json(admin)
          } else {
            res.status(404).end("Not found")
          }

          break

        case "DELETE":
          try {
            await db.user.delete({
              where: {
                id: Number(admin_id),
              },
            })
            res.status(204).end("Deleted")
          } catch {
            res.status(400).end("Invalid admin")
          }

          break

        default:
          res.setHeader("Allow", ["GET", "DELETE"])
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
