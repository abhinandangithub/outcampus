import Razorpay from 'razorpay';

export default async function orderHandler(req, res) {
    const { body, method } = req
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_ID,
        key_secret: process.env.RAZORPAY_SECRET
    });

    switch (method) {

        case "POST":
            try {
                instance.payments.fetch(body.payment_id, function (err, order) {
                    res.status(201).json(order)
                })
            } catch (error) {
                console.error("ERROR CODE", error)
                res.status(500).json(error)
            }
            break

        default:
            res.setHeader("Allow", ["POST"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}