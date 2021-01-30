import db from "../../utils/database"

export default async function arrangeCallBackHandler(req, res){
    const { method, body } = req
    switch (method) {
        case "POST":
            console.log(body.phone)
            try {
                const result = await db.callback_request.create({
                    data: {
                        phone: body.phone,
                    }
                })
                if (result) {
                    res
                        .status(200)
                        .json({ message: "Your request is saved" })
                } else {
                    res
                        .status(404)
                        .json({ message: "Error occurred" })
                }
            } catch (error) {
                console.error(error)
                res
                    .status(400)
                    .json({ message: "No record added" })
            }
            break
        default:
            res.setHeader("Allow", ["POST"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

}