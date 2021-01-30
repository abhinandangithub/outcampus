const PG = require("cashfree-sdk").PG

const appId = process.env.PG_APP_ID
const secretKey = process.env.PG_APP_SECRET

// PG.Init({
//   env: "TEST",
//   apiVersion: "1.0.0",
//   appId,
//   secretKey,
// })

export default PG
