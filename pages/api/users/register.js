import { registerUser } from "services/register"
import nodemailer from "nodemailer"
import * as Aws from "aws-sdk"

Aws.config.update({
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  region: process.env.S3_REGION,
})

const email_to = process.env.OPS_EMAIL;


export default async function registerHandler(req, res) {
  const { body, method } = req
  switch (method) {
    case "POST":
      try {
        let user = await registerUser(body);
        if (user) {
          sendEmailToAdmin({ to: email_to, user: user })
        }
        res.status(201).json(user)
      } catch (error) {
        console.error("ERROR CODE", error)
        if (error.code === "P2002") {
          res.status(409).end("Email already exists")
        } else {
          console.log(error)
          res.status(500).json(error)
        }
      }
      break

    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}


// @TODO: Move this to an email service
function sendEmailToAdmin({ to, user }) {
  const transporter = nodemailer.createTransport({
    SES: new Aws.SES(),
  })

  return transporter
    .sendMail({
      from: "Outcampus <notifications@outcampus.in>",
      to: to,
      subject: `Received a Free Trial Request ID: LEAD${user.id}`,
      text: `Hi,\n\n Here are the details of a new lead. \n Parents Name - : ${user.parent_name} \n Parents Email - : ${user.parent_email} \n Mobile Number - : ${user.phone} \n Child's Name - : ${user.child_name} \n Program - : ${user.course_name} \n Age - : ${user.age_group} \n Date Time Slot - : ${new Date(user.trial_date)} \n  \n \n\nThanks,\nTech Team Outcampus`,
      // attachments: [{
      //   path: 'refunds.pdf'
      // }]
    })
    .catch(console.error)
}
