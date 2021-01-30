import React from "react"
import { App } from "components/layout"
import { Button, Spinner } from "@chakra-ui/core"
import { useAuth } from "utils/useAuth"
import useSWR from "swr"
import { format } from "date-fns"

const Payment = (props) => {
  const { token } = useAuth()
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json())
  const { data: courses, error } = useSWR("/api/courses", fetcher)
  return (
    <App title="Payment" screen="payment">
      <div className="max-w-7xl m-auto pt-4 pb-8 px-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Payment</h1>
        <div className="flex flex-col">
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200">
              {!courses ? (
                <div className="flex items-center justify-center h-32">
                  <Spinner />
                </div>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Course name and details
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        End date
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-right">
                        Students Enrolled
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-right">
                        Total earning
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-right">
                        Pending dues
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {courses
                      .filter((x) => x.status === "approved")
                      .map((course) => (
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w16">
                                <img
                                  className="h-10 w-16"
                                  src={course.cover}
                                  alt={course.title}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm leading-5 font-medium text-gray-900">
                                  {course.title}
                                </div>
                                <div className="text-sm leading-5 text-gray-500">
                                  {course.format}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              {format(
                                new Date(course.created_at),
                                "MMM dd yyyy"
                              )}
                            </div>
                            <div className="text-xs leading-5 text-gray-500">
                              {format(new Date(course.created_at), "hh:mm a")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-xs text-gray-500 text-right">
                            0
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-xs text-gray-500 text-right">
                            Rs.0
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-xs leading-5 text-gray-500 text-right">
                            Rs.0
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                            {/* <Button size="sm" variantColor="yellow">Request Payment</Button> */}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </App>
  )
}

export default Payment
