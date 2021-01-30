import { updateUserFromSocialLogin } from "services/user"
const { OAuth2Client } = require("google-auth-library")
const clientId =
  "133325719695-l7pu1ha53kva8gp2no4qd1gl947i8nkv.apps.googleusercontent.com"
const client = new OAuth2Client(clientId)

export default async function redirectHandler(req, res) {
  const {
    body: { token, role },
  } = req
  try {
    let ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    })
    if (ticket) {
      let {
        given_name: firstName,
        family_name: lastName,
        email,
        picture: avatar,
      } = ticket.payload
      let session = await updateUserFromSocialLogin({
        firstName,
        lastName,
        email,
        avatar,
        role,
      })
      res.status(200).json(session)
    }
  } catch (error) {
    if (error.code === "P2002") {
      res.status(409).end("User already exists")
    }
    res.status(404).end("User doesn't exist")
  }
}
