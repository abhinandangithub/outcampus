import db from "utils/database"
import authorize from "utils/authorize"

async function profileHandler(req, res, { sub, role }) {
  const {
    query: { user_id },
    method,
  } = req

  switch (method) {
    case "GET":
      const profile = await db.user.findOne({
        where: { id: Number(user_id) },
        include: { profile: true },
      })
      res.status(200).json(profile)
      break
    default:
      res.setHeader("Allow", ["GET", "PATCH"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default authorize(profileHandler)
