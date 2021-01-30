import db from "../../../../../utils/database"

export default async function couponHandler(req, res) {

    const {
        body,
        method,
        query: { coupon_code },
    } = req

    switch (method) {
        case "GET":
            const coupon_details = await db.discount_coupon.findMany({
                where: { code: coupon_code }
            })
            res.status(200).json(coupon_details)
            break

        case "PUT":
        console.log('abhi   ', req.query);
            const response = await db.discount_coupon.update({
                data: {
                    isActive: false,
                    user_id: Number(req.query.user_id)
                },
                where: { code: coupon_code },
            })
            res.status(200).json(response)
            break

        default:
            res.setHeader("Allow", ["GET", "PUT"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
