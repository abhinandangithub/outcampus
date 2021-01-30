import { PrismaClient } from "@prisma/client"
const db = new PrismaClient({
  log: ["info", "warn", "query"],
})
export default db
