import { fetcheEmailNotifications_class_session } from "services/email_notification";
import sendEmail from '../../send_email';

export default async function emailNotificationHandler(req, res) {
    const {
        body,
        method,
        query: { milli_seconds }
    } = req

    const getTemplate = (time, parentName, childName, trialDate) => {
        let mappings =
        {
            "120000": {
                subject: `${childName} Trial Session for Outcampus Young Leader Program (Critical Thinking & Communication) is confirmed .`,
                text: `Dear ${parentName} \n\nCongratulations!\n\n
                ${childName} Outcampus Live Trial Session for Young Leader Program is confirmed! The session for ${childName} \n
                has been scheduled for ${new Date(trialDate).toLocaleTimeString()} (IST). Your dedicated teacher will be waiting for you online at this \n
                time so kindly mark the day/time on your calendar.\n\n
                We are sure you have questions about the curriculum, so please find the curriculum attached. \n\n
                Your exclusive class link will be shared with you. Please join with your Laptop/PC which has a stable Internet connection\n
                at least 5 minutes before the commencement of the class to ensure a smooth session! \n\n
                ${childName} will be evaluated by our top-rated/ gold medalist teachers and will be provided with a detailed,\n
                Personalized Performance Report Card from a team of alumni of IIT, IIM, British Council on successful trial completion.\n\n
                Thank you,\nTeam Outcampus\nFor support, call us at 1234567890`
            },
            "300000": {
                subject: `What is the Young Leaders Program?.`,
                attachment: [{
                    path: 'five-minute.pdf'
                }],
                text: `Dear ${parentName},\n\n
                ${childName} will have their scheduled Trial Session on ${new Date(trialDate).toLocaleTimeString()} \n\n
                Communication impacts on all areas of life. Poor language predicts poor literacy skills and without the right help, between  \n

                50% and 90% of children with average or below communication skills go on to have difficulties in achieving the desired\n
                growth in life. It is also important to teach children from early childhood how to ask good questions, define a problem,\n
                examine evidence, analyze assumptions and biases.\n\n

                Outcampus is an online teaching platform that conducts live sessions and curated courses to facilitate the all-round.\n
                development of children. The Young Leader Program provides properly structured cooperative learning environments\n
                where children perform and participate, learn Cs of communication and critical thinking with continuous support and \n
                feedback from other students and the teacher. This program is designed by a cross functional senior team having experts\n
                from IIT, IIM, Oxford and companies like Google and Tesla. Our Educators are Top 1% teachers who passed a rigorous \n
                recruitment process and have taught online in places like British Academy\n\n
                What will [Child's Name] learn through the Young Leader Program at Outcampus?\n\n
                How to Think, What to Think, Fundamentals of logic, Public Speaking Format Orientations in areas such as Group \n
                Discussions & Debates, Opinion Development, Articulation Skills, Basics of Leadership, Lateral Thinking, Entrepreneurial \n
                Skills and Interpersonal skills. \n\n

                The Young Leader Program for kids at Outcampus is about the child improving critical and creative thinking, logical \n
                reasoning, focus and concentration, bringing fluency while speaking and getting rid of shyness, developing leadership\n
                traits, learning sentence formation, vocabulary, mannerism and etiquettes and body language and initiative-taking. The\n
                Young Leader Program additionally specializes in instilling such indomitable confidence in a child that can never be\n
                altered with. Through our curated Young Leader Program for kids, a child learns to tap the power of excellence and hidden \n
                potential. This is why we have developed and designed our curriculum /module in a way to promote practice until the child \n
                becomes perfect at it. Each teacher follows a strict protocol to avoid any mistakes. \n\n

                We are sure you have questions about the curriculum, so please find the curriculum attached. \n\n

                ${childName} will be evaluated by our top-rated/ gold medalist teachers and will be provided with a detailed,\n
                Personalized Performance Report Card from a team of alumni of IIT, IIM, British Council on successful trial completion.\n\n

                Your exclusive class link will be shared with you. Please join with your Laptop/PC which has a stable Internet connection \n
                at least 5 minutes before the commencement of the class to ensure a smooth session! \n\n

                Thank you,\nTeam Outcampus\nFor support, call us at 1234567890`
            },
            "18000000": {
                subject: `Mark/Book your calendar for Trial Session at Outcampus .`,
                attachment: [{
                    path: 'five-hour.pdf'
                }],
                text: `Dear ${parentName} !\n\n
                At Outcampus, the Young Leader Program is designed with the New Education Policy 2020 framework; it is India's 1 \n
                structured and comprehensive program that builds foundational capacity resulting in effective communication and critical \n
                thinking. ${childName} Free Trial Session is scheduled for ${new Date(trialDate).toLocaleTimeString()}.\n\n
                We are sure you have questions about the curriculum, so please find the curriculum attached\n\n
                Your exclusive class link will be shared with you. Please join with your Laptop/PC which has a stable internet connection\n
                at least 5 minutes before the commencement of the class to ensure a smooth session!\n\n
                Thank you,\nTeam Outcampus\nFor support, call us at 1234567890`
            },
            "3600000": {
                subject: `Today’s To-Do List for Trial session.`,
                attachment: [{
                    path: 'one-hour.pdf'
                }],
                text: `Dear ${parentName} !\n\n
                We are excited to see ${childName} in their Outcampus Live Online Young Leader Program Free Trial Session TODAY \n
                at ${new Date(trialDate).toLocaleTimeString()}. In just a bit, ${childName} will have their scheduled session with one of our top teachers.\n\n
                We are sharing the curriculum once again, so please find it attached.\n\n
                ${childName} will be evaluated by our top-rated/ gold medalist teachers and will be provided with a detailed,\n
                personalized performance report card from a team of alumni of IIT, IIM on successful trial completion.\n
                Please be on time for your trial session! We're running a full schedule and have reserved a dedicated teacher for you. Your\n
                exclusive class link will be shared with you. Please join with your Laptop/PC which has a stable Internet connection at\n
                least 5 minutes before the commencement of the class to ensure a smooth session! \n\n

                Thank you,\nTeam Outcampus\nFor support, call us at 1234567890`
            }
        };

        return mappings[time];
    }


    switch (method) {
        case "GET":
            try {
                let resp = await fetcheEmailNotifications_class_session(milli_seconds);

                for (let i = 0; i < resp.length; i++) {
                    console.log('abhi resp[i] ', resp[i]);
                    let parentName = resp[i].parent_name;
                    let childName = resp[i].child_name;
                    let trialDate = resp[i].trial_date;

                    let { subject, text } = getTemplate(milli_seconds, parentName, childName, trialDate);

                    sendEmail(
                        {
                            to: resp[i].parent_email,
                            from: 'notifications@outcampus.in',
                            subject: subject,
                            text: text
                        });
                }
                res.status(201).json(resp)
            } catch (error) {
                res.status(500).json(error)
            }
            break

        default:
            res.setHeader("Allow", ["GET"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
