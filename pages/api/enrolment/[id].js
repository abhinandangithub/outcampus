import db from "../../../utils/database"

export default async function searchHandler(req, res) {
    const {
        body,
        method,
        headers: { authorization },
        query: { id },
    } = req
    try {
        console.log('abhi id ', id);
        switch (method) {
            case "DELETE":
                await db.enrolment
                    .delete({
                        where: {
                            id: Number(id)
                        }
                    });
                res.status(204).json({ message: "Deleted" })
                break
            default:
                res.setHeader("Allow", ["DELETE"])
                res.status(405).end(`Method ${method} Not Allowed`)
        }
    } catch (error) {
        console.error(error.message)
        res.status(403).end("Access denied")
    }
}
