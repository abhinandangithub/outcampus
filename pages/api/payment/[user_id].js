import db from "../../../utils/database"
import { borderTop } from "styled-system";

export default async function paymentHandler(req, res) {
    const { body, method, query } = req

    console.log('Abhi payment ', body);
    switch (method) {

        case "GET":
            const payment_details = await db.payment.findMany({
                where: { user_id: Number(query.user_id), status: "SUCCESS" }
            })
            res.status(200).json(payment_details)
            break

        case "POST":
            const payment = await db.payment.create({
                data: {
                    order_id: body.order_id,
                    razorpay_payment_id: body.razorpay_payment_id,
                    razorpay_order_id: body.razorpay_order_id,
                    razorpay_signature: body.razorpay_signature,
                    status: body.status,
                    user_id: Number(query.user_id),
                    amount: Number(body.amount),
                    discount_amount: Number(body.discount_amount)
                },
            })
            res.status(201).json(payment)
            break

        case "PATCH":
        console.log('abhi body ', body);
            const resp = await db.payment.update({
                where: {
                    id: Number(body.paymentId),
                },
                data: {
                    course_id: Number(body.courseId)
                },
            })
            res.status(201).json(resp)
            break

        default:
            res.setHeader("Allow", ["GET", "POST", "PATCH"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
