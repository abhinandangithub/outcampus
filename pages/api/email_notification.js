import { createEmailNotification, fetcheEmailNotifications, updateEmailNotification } from "services/email_notification";
import sendEmail from './send_email';

export default async function emailNotificationHandler(req, res) {
    const { body, method } = req;
    switch (method) {
        case "POST":
            console.log('emailNotificationHandler 3');
            try {
                // let resp = await createEmailNotification(body);
                // res.status(201).json({})
                let { to, from, subject, text, attachments } = body;
                // console.log(to, from, subject, text, attachments);
                sendEmail(
                    {
                        to, from, subject, text, attachments
                    });
                res.status(200).json({})
            } catch (error) {
                res.status(500).json(error)
            }
            break;

        case "GET":
            try {
                let resp = await fetcheEmailNotifications();
                for (let i = 0; i < resp.length; i++) {
                    let currentDateTime = new Date().getTime();
                    let trialDateTime = new Date(resp[i].trial_date).getTime();
                    console.log('before send email ', currentDateTime, trialDateTime);
                    if (currentDateTime >= trialDateTime) {
                        console.log('IF send email ');
                        sendEmail(
                            {
                                to: resp[i].to,
                                from: resp[i].from,
                                subject: resp[i].subject,
                                text: resp[i].text,
                            });
                        updateEmailNotification(resp[i].id);
                    }
                }
                res.status(201).json(resp)
            } catch (error) {
                res.status(500).json(error)
            }
            break

        default:
            res.setHeader("Allow", ["GET", "POST"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}