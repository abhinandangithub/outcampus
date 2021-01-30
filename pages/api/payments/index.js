import PG from "utils/pg"

export default async function paymentHandler(req, res) {
  console.log(PG)
  PG.Orders.CreateOrders({
    orderId: "CX-0620-11289-SY-0620-1984", // required
    orderAmount: "154", // required
    orderCurrency: "INR",
    orderNote: "CX-0620-11289",
    customerName: "Anjali Mathur", // required
    customerPhone: "9111122222", // required
    customerEmail: "anjali@apnerve.com", // required
    sellerPhone: "",
    returnUrl: "http://localhost:3000/api/payments/response", // required
    notifyUrl: "https://example.com/notify",
    paymentModes: "",
    pc: "",
  })
    .then(res.status(200).json)
    .catch((error) => console.error(error))
  // PG.Orders.GetLink({
  //   orderId:"CX-0620-11289-TK-0620-1857"
  // }).then(res.status(200).json).catch(console.error)
}
