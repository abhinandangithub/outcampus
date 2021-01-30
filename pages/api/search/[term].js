import db from "utils/database"
export default async function searchHandler(req, res) {
  const {
    query: { term },
    method,
  } = req
  if (method === "GET") {
    const result = await db.user.findMany({
      where: {
        OR: [
          {
            first_name: {
              contains: term,
            },
          },
          {
            last_name: {
              contains: term,
            },
          },
          {
            outcampus_id: {
              contains: term.toUpperCase(),
            },
          },
        ],
      },
    })
    const messages = await db.message.findMany({
      where: {
        body: {
          contains: term,
        },
      },
    })
    res.status(200).json({ result, messages })
  } else {
  }
}
