import jwt from "jsonwebtoken"

const secret = "Walhalla"

const signToken = (data) => jwt.sign(data, secret)
const verifyToken = (data) =>
  new Promise((resolve, reject) => {
    jwt.verify(data, secret, { ignoreExpiration: true }, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded)
    })
  })

export { signToken, verifyToken }
