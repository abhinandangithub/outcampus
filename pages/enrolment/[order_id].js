import { useRouter } from "next/router"
import EnrolmentScreen from "components/enrolmentscreen"

export default (props) => {
  const router = useRouter()
  const { order_id } = router.query
  if (!order_id) return null

  return <EnrolmentScreen order_id={order_id} />
}
