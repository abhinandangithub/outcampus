import db from "utils/database"
import authorize from "utils/authorize"

async function userMessagesHandler(req, res, { sub, role }) {
  const {
    query: { user_id },
    method,
  } = req

  switch (method) {
    case "GET":
      const { recipient, messages } = await getMessageThread(
        sub,
        Number(user_id)
      )
      res
        .status(200)
        .json({ recipient, messages: messages.map(formatMessage(sub)) })
      break
    default:
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const getMessageThread = async (sender_id, recipient_id) => {
  const recipient = await db.user.findOne({
    where: {
      id: recipient_id,
    },
  })

  const messages = await db.message.findMany({
    where: {
      OR: [
        {
          user: {
            id: sender_id,
          },
          message_recipient: {
            every: {
              user_id: recipient_id,
            },
          },
        },
        {
          user: {
            id: recipient_id,
          },
          message_recipient: {
            every: {
              user_id: sender_id,
            },
          },
        },
      ],
    },
    select: {
      body: true,
      created_at: true,
      user: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
      },
      message_recipient: {
        select: {
          read: true,
        },
      },
    },
  })
  return { recipient, messages }
}

const formatMessage = (sub) => (message) => {
  return {
    message: message.body,
    sent_at: message.created_at,
    isIncoming: message.user.id !== sub,
    from: message.user,
    read: message.message_recipient[0].read,
  }
}

export default authorize(userMessagesHandler)
