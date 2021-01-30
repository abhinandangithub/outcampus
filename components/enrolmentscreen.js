import React from "react"
import { PublicLayout } from "components/layout"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import { Spinner } from "@chakra-ui/core"
import { CheckCircle, AlertCircle } from "react-feather"

const ENROLMENT = gql`
  query getEnrolment($order_id: String) {
    transaction(where: { order_id: { _eq: $order_id } }) {
      enrolment {
        course {
          title
        }
      }
      pg_response
    }
  }
`

export default ({ order_id }) => {
  const { loading, error, data } = useQuery(ENROLMENT, {
    variables: { order_id },
  })
  return (
    <PublicLayout title="Enrolment details">
      <div className="min-h-full">
        <div className="max-w-xl p-8 rounded-md shadow-md my-10 mx-auto flex justify-center items-center text-center">
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {data.transaction[0].pg_response.txStatus === "SUCCESS" ? (
                <CheckCircle color="green" size={64} className="m-auto" />
              ) : (
                <AlertCircle color="red" size={64} className="m-auto" />
              )}
              <h2 className="font-semibold text-xl">
                {data.transaction[0].pg_response.txMsg}
              </h2>
              {data.transaction[0].pg_response.txStatus === "SUCCESS" && (
                <p>
                  Transaction id: {data.transaction[0].pg_response.referenceId}
                </p>
              )}
              {data.transaction[0].pg_response.txStatus === "SUCCESS" && (
                <div className="mt-20">
                  <p>Enrolled for</p>
                  <p className="font-bold text-xl">
                    {data.transaction[0].enrolment.course.title}
                  </p>
                  <p>
                    Payment amount : INR{" "}
                    {data.transaction[0].pg_response.orderAmount}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
