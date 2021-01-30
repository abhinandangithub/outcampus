import { login } from "services/user"

export default async function adminHandler(req, res) {
  const {
    body: { email, password },
    method,
  } = req

  switch (method) {
    case "POST":
      const result = await login(email, password).catch((error) => {
        res.status(401).end(error.message)
      })
      if (result) {
        res.status(200).json(result)
      }
      break

    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
