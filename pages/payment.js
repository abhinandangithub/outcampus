import { App } from "components/layout"
import { PricingPayment } from '../components/youngLeaders';

const Payment = (props) => (
  <App title="Payment" screen="Payment">
    <div className="max-w-7xl m-auto pt-4 pb-8 px-4">
      {/* <h1 className="text-2xl font-semibold text-gray-900">Payment aa</h1>
      <p className="mt-6 text-md font-medium">Coming soon ✨</p> */}
      <PricingPayment />
    </div>
  </App>
)
export default Payment
