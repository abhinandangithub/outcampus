import db from "../../utils/database"
import nodemailer from "nodemailer"
import * as Aws from "aws-sdk"

Aws.config.update({
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  region: process.env.S3_REGION,
})

export default async function forgotPasswordHandler(req, res) {
  const { method, body } = req
  switch (method) {
    case "POST":
      console.log(body.email)
      try {
        const result = await db.forgot_password.create({
          data: {
            user: {
              connect: {
                email: body.email,
              },
            },
          },
          include: {
            user: true,
          },
        })

        if (result) {
          let email = await sendRecoveryLink({
            to: result.user.email,
            recoveryLink: `https://outcampus.in/recover?token=${result.token}`,
          })
            .then(console.log)
            .catch(console.error)
          res
            .status(200)
            .json({ message: "Email with verification link has been sent" })
        } else {
          res
            .status(404)
            .json({ message: "No user with this email exists in our database" })
        }
      } catch (error) {
        console.error(error)
        // @NOTE: This error would also show up if email doesn't get through
        res
          .status(400)
          .json({ message: "No user with this email exists in our database" })
      }
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

// @TODO: Move this to an email service
function sendRecoveryLink({ to, recoveryLink }) {
  const transporter = nodemailer.createTransport({
    SES: new Aws.SES(),
  })

  return transporter
    .sendMail({
      from: "Outcampus <notifications@outcampus.in>",
      to: to,
      subject: "Reset your Outcampus password",
      text: `Hi,\n\nForgot your password? Simply click on the link below to choose a new one. It’s as easy as that.\n\n${recoveryLink} \n\nDidn’t mean to reset your password? No worries! Your email address may have been entered by mistake. If you ignore or delete this email, your password will not change. \n\nThanks,\nTeam Outcampus`,
    })
    .catch(console.error)
}
