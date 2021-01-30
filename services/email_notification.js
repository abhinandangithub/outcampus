import db from "../utils/database"

const createEmailNotification = async (
    { to, from, subject, text, date }
) => {
    try {
        console.log('createEmailNotification service');
        return await db.email_notification.create({
            data: {
                to: to ? to : process.env.OPS_EMAIL,
                from: from,
                subject: subject,
                text: text,
                trial_date: date
            }
        })
    } catch (error) {
        throw error
    }
}

const fetcheEmailNotifications = async () => {
    try {
        return await db.email_notification.findMany({
            where: {
                email_sent: false,
            },
        })
    } catch (error) {
        throw error
    }
}


const fetcheEmailNotifications_test = async (n) => {
    let date = new Date().getTime() + Number(n);
    console.log('abhi date ', date);
    try {
        return await db.register.findMany({
            where: {
                trial_date: {
                    lte: new Date(date).toISOString()
                }
            },
        })
    } catch (error) {
        throw error
    }
}

const fetcheEmailNotifications_class_session = async (n) => {
    let date = new Date().getTime() + Number(n);
    console.log('abhi date ', date);
    try {
        return await db.class_session.findMany({
            where: {
                start_date: {
                    lte: new Date(date).toISOString()
                }
            },
        })
    } catch (error) {
        throw error
    }
}

const deleteEmailNotification = async (
    id
) => {
    try {
        return await db.email_notification.delete({
            where: { id: id },
        })
    } catch (error) {
        throw error
    }
}

const updateEmailNotification = async (
    id
) => {
    try {
        return await db.email_notification.update({
            data: {
                email_sent: true
            },
            where: { id: id },
        });

    } catch (error) {
        throw error
    }
}

export {
    createEmailNotification,
    fetcheEmailNotifications,
    deleteEmailNotification,
    updateEmailNotification,
    fetcheEmailNotifications_test,
    fetcheEmailNotifications_class_session
}

