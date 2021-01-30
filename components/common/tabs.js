import React from "react"

const Tabs = ({ tab, setTab }) => {
  return (
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
        <button
          className={`${
            tab === "unapproved" ? "bg-gray-200" : ""
          } ml-3 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:bg-gray-100`}
          onClick={() => {
            setTab("unapproved")
          }}
        >
          Unapproved
        </button>
      </nav>
    </div>
  )
}

export default Tabs
