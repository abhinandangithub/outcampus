import authorize from "../../../utils/authorize"
import { editSession } from "../../../services/session"

async function sessionHandler(req, res, { sub, role }) {
  const {
    method,
    query: { session_id },
    body,
  } = req

  switch (method) {
    case "PATCH":
      if (!session_id) {
        return res.status(400).json({ message: "session Id is required" })
      }

      return editSession(Number(session_id), body)
        .then(() => {
          console.log("SERVICE: Edit sessions", session_id)
          res.status(200).json({ message: "Success" })
        })
        .catch((error) => {
          console.error("ERROR IN SESSION API:PATCH", error)
          res.status(500).json({ message: "Error in API" })
        })

    default:
      res.setHeader("Allow", ["PATCH"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default authorize(sessionHandler)
