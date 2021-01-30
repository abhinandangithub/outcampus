import Axios from "axios"

export default {
    notify: async ({ to, from, subject, text, attachments }) => {
        console.log('notify 1 ', to, from, subject, text, attachments);
        return await Axios.post(`/api/email_notification`, {
            to,
            from,
            subject,
            text,
            attachments
        })
    }
}
