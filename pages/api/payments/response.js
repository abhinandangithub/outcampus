import db from "../../../utils/database"
export default async function paymentHandler(req, res) {
  // store details in DB and show success/failure message
  const { method, body: pg_response } = req
  console.log("PAYMENT_RESPONSE", pg_response)
  let status = "PENDING"
  if (pg_response.txStatus === "SUCCESS") {
    status = "SUCCESS"
  }

  db.transaction
    .update({
      where: {
        order_id: pg_response.orderId,
      },
      data: {
        pg_response,
        status: pg_response.txStatus,
        enrolment: {
          update: {
            status,
          },
        },
      },
    })
    .then((txn) => {
      console.log("PAYMENT_RESPONSE", txn)
      res.writeHead(301, {
        Location: `/enrolment/${pg_response.orderId}`,
      })
      res.end("One moment please...")
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json(error)
    })
}
