import db from "utils/database"
import authorize from "utils/authorize"

async function messageHandler(req, res, { sub }) {
  const {
    query: { message_id },
    method,
  } = req

  switch (method) {
    case "PATCH":
      await markMessageAsRead(Number(message_id), sub)
      res.status(200).end()
      break

    default:
      res.setHeader("Allow", ["PATCH"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const markMessageAsRead = async (message_id, recipient_id) => {
  return await db.message_recipient.update({
    where: {
      id: message_id,
    },
    data: {
      read: true,
    },
  })
}

export default authorize(messageHandler)
