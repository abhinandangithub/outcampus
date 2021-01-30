import db from "utils/database"
import authorize from "utils/authorize"

// @TODO: format responses to send only required data

async function messagesHandler(req, res, { sub }) {
  const { body, method } = req

  switch (method) {
    case "GET":
      const msgs = await getMessages(sub)

      res.status(200).json(msgs)
      break

    case "POST":
      const message = await sendMessageToId({
        sender_id: sub,
        recipient_id: body.to,
        message: body.message,
      })
      res.status(201).json(message)

      break

    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const sendMessageToId = async ({ sender_id, recipient_id, message }) => {
  return db.message_recipient.create({
    data: {
      message: {
        create: {
          body: message,
          user: {
            connect: {
              id: Number(sender_id),
            },
          },
        },
      },
      user: {
        connect: {
          id: recipient_id,
        },
      },
    },
  })
}

const getMessages = async (user_id) => {
  const messages = await db.message_recipient.findMany({
    where: {
      OR: [
        {
          user_id: Number(user_id),
        },
        {
          message: {
            user: {
              id: Number(user_id),
            },
          },
        },
      ],
    },
    select: {
      id: true,
      read: true,
      user: true,
      message: {
        include: {
          user: true,
        },
      },
    },
  })
  return messages
}

const searchMessages = (term) => {}

export default authorize(messagesHandler)
