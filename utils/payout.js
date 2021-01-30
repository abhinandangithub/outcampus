const Payouts = require("cashfree-sdk").Payouts

const config = {
  ClientID: "CF17384ESFQNM7DAQOIQAU",
  ClientSecret: "37076067b2cc5eb991f99ecbff914922d2ad2de7",
  ENV: "TEST",
}

const { Beneficiary, Transfers } = Payouts

const bene = {
  beneId: "JOHN1801277890990877",
  name: "john doe",
  email: "johndoe@cashfree.com",
  phone: "9876543210",
  bankAccount: "00011020001772",
  ifsc: "HDFC0000001",
  address1: "ABC Street",
  city: "Bangalore",
  state: "Karnataka",
  pincode: "560001",
}

const transfer = {
  beneId: bene.beneId,
  transferId: "tranfer0012341239936",
  amount: "1.00",
}

const handleResponse = console.log

;(async () => {
  Payouts.Init(config)
  let addBene = false
  //Get Beneficiary details
  try {
    const response = await Beneficiary.GetDetails({
      beneId: bene.beneId,
    })
    console.log("get beneficiary details response")
    console.log(response)
    if (
      response.status === "ERROR" &&
      response.subCode === "404" &&
      response.message === "Beneficiary does not exist"
    ) {
      addBene = true
    } else {
      handleResponse(response)
    }
  } catch (err) {
    console.log("err caught in getting beneficiary details")
    console.log(err)
    return
  }
  if (addBene) {
    //Beneficiary Addition
    try {
      const response = await Beneficiary.Add(bene)
      console.log("beneficiarry addition response")
      console.log(response)
      handleResponse(response)
    } catch (err) {
      console.log("err caught in beneficiarry addition")
      console.log(err)
      return
    }
  }
  //Request transfer
  try {
    const response = await Transfers.RequestTransfer(transfer)
    console.log("request transfer response")
    console.log(response)
    handleResponse(response)
  } catch (err) {
    console.log("err caught in requesting transfer")
    console.log(err)
    return
  }
  //Get transfer status
  try {
    const response = await Transfers.GetTransferStatus({
      transferId: transfer.transferId,
    })
    console.log("get transfer status response")
    console.log(response)
    handleResponse(response)
  } catch (err) {
    console.log("err caught in getting transfer status")
    console.log(err)
    return
  }
})()

export default Payouts
