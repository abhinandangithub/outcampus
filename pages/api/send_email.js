import nodemailer from "nodemailer"
import * as Aws from "aws-sdk"

Aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    region: process.env.S3_REGION,
})


export default async function sendEmail({ to = process.env.OPS_EMAIL, from, subject, text, attachments = [] }) {
    console.log('text', to, from, subject, text, attachments);

    // let t = JSON.stringify(text)
    // console.log(typeof(text), t.replace(/\n/g, "\n"), "Hi,\/\n\n Here are the details of a new lead. \n Parents Name - :");
    const transporter = nodemailer.createTransport({
        SES: new Aws.SES(),
    })

    return transporter
        .sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
            attachments: attachments
        })
        .catch(console.error)
}