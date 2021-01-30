import React from "react"
import { Avatar } from "@chakra-ui/core"

export default function StudentCard({
  id,
  avatar,
  first_name,
  last_name,
  outcampus_id,
}) {
  return (
    <div className="lg:w-1/5 pr-6 mb-6">
      <article className="bg-white border border-gray-50 shadow-md hover:shadow-xl transition duration-300 rounded-lg p-4">
        <div className="text-center">
          <Avatar src={avatar} name={`${first_name} ${last_name}`} size="lg" />
          <h2 className="text-2xl font-normal my-2 truncate">
            {first_name} {last_name}
          </h2>
          <p>{outcampus_id}</p>
        </div>
        <ul className="text-center">
          <li>Attendance:-</li>
          <li>Performance:-</li>
          <li>Participation:-</li>
        </ul>
        <div>
          <button
            className="w-full bg-gray-300 p-2 mt-2 rounded-md cursor-not-allowed"
            disabled
          >
            Message
          </button>
        </div>
      </article>
    </div>
  )
}
