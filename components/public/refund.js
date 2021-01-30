import React from "react"
import { PublicLayout } from "components/layout"

export default (props) => {
  return (
    <PublicLayout title="Refund and Cancellation Policy">
      <div className="doc">
        <h2>Refund and Cancellation Policy</h2>
        <p>
          Our focus is complete customer satisfaction. In the event, if a
          customer is displeased with the services provided, we will refund back
          the money, provided the reasons are genuine and proved after
          investigation.
        </p>

        <p>
          In case of dissatisfaction from our services, customers have the
          liberty to cancel their course enrollment and request a refund from
          us. Our Policy for the cancellation and refund will be as follows:
        </p>
        <h3>Cancellation Policy</h3>
        <p>For Cancellations please contact us via contact us link.</p>
        <p>
          In case of multiple session courses, requests received before the
          start of the second session of the course will be treated as
          cancellation of services and refund of the full course fee will be
          made according to the Refund Policy.
        </p>
        <p>
          In case of single session courses, requests received before the end of
          the course session will be treated as cancellation of services and
          refund of the full course fee will be made according to the Refund
          Policy.
        </p>
        <h3>Refund Policy</h3>
        <p>
          In case a customer is not completely satisfied with our services, we
          can provide him a full refund, with no penalty charges, subject to
          intimation of cancellation of course enrollment as per the
          Cancellation Policy. Refunds will be issued to the original source of
          payment. Refunds will be made within 5 Business Days.
        </p>
      </div>
    </PublicLayout>
  )
}
