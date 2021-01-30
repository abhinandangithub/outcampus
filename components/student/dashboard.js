import React, { useState } from "react"
import { App } from "components/layout"
import useSWR from "swr"
import { Spinner } from "@chakra-ui/core"
import { useAuth } from "utils/useAuth"
import List from "components/common/list"

const StudentDashboard = (props) => {
  const [tab, setTab] = useState("all")
  const { token } = useAuth()
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json())
  const { data: enrolments, error } = useSWR("/api/enrolment", fetcher)
  return (
    <App title="Dashboard" screen="dashboard">
      <div className="max-w-7xl m-auto pt-4 pb-8 px-4">
        <h1 className="text-2xl font-semibold text-gray-900">My Courses</h1>
        <div className="mb-3">
          <div className="py-6 overflow-x-auto">
            <nav className="flex">
              <button
                className={`${
                  tab === "all" ? "bg-gray-200" : ""
                  } px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:bg-gray-100`}
                onClick={() => {
                  setTab("all")
                }}
              >
                All
              </button>
              <button
                className={`${
                  tab === "ongoing" ? "bg-gray-200" : ""
                  } ml-3 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:bg-gray-100`}
                onClick={() => {
                  setTab("ongoing")
                }}
              >
                Ongoing
              </button>
              <button
                className={`${
                  tab === "upcoming" ? "bg-gray-200" : ""
                  } ml-3 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:bg-gray-100`}
                onClick={() => {
                  setTab("upcoming")
                }}
              >
                Upcoming
              </button>
              <button
                className={`${
                  tab === "completed" ? "bg-gray-200" : ""
                  } ml-3 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:bg-gray-100`}
                onClick={() => {
                  setTab("completed")
                }}
              >
                Completed
              </button>
            </nav>
          </div>
        </div>
        {enrolments ? (
          <div className="mt-3">
            <List
              error={error}
              courses={enrolments.map((x) => x.course)}
              tab={tab}
              emptyMessage="You haven't enrolled for any courses yet."
            />
          </div>
        ) : (
            <div className="h-64 flex items-center justify-center">
              <Spinner />
            </div>
          )}
      </div>
    </App>
  )
}

export default StudentDashboard
