import { verifyToken } from "./token"

const authorize = (handler) => async (req, res) => {
  const {
    headers: { authorization },
  } = req
  const token = authorization && authorization.split(" ")[1]
  if (token) {
    var decoded = await verifyToken(token).catch((error) => {
      console.error("JWT ERROR:", error.message)
    })
    if (decoded && decoded.sub) {
      return handler(req, res, decoded)
    }
  }

  res.status(403).send("Not Authorized")
}

export default authorize
