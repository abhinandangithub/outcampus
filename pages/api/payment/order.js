import Razorpay from 'razorpay';

export default async function orderHandler(req, res) {
    const { body, method } = req
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_ID,
        key_secret: process.env.RAZORPAY_SECRET
    });

    const options = {
        amount: Number(body.amount) * 100,  
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    console.log('abhi amount ', options);
    switch (method) {

        case "POST":
            try {
                instance.orders.create(options, function (err, order) {
                    res.status(201).json(order)
                });
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