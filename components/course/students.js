import React from "react"
import StudentCard from "components/common/cards/studentCard"

const Students = (props) => {
  return (
    <section>
      <h2 className="text-3xl font-medium">Students</h2>
      <div className="flex flex-wrap">
        <StudentCard first_name="Shah" last_name="Sid" />
        <StudentCard first_name="Stacy" last_name="Gwen" />
        <StudentCard first_name="Dawood" last_name="kapoor" />
        <StudentCard first_name="Kamble" last_name="Khanna" />
        <StudentCard first_name="Pingle" last_name="Sarkar" />
        <StudentCard first_name="Tendulkar" last_name="Reddy" />
        <StudentCard first_name="Sachin" last_name="Bansal" />
      </div>
    </section>
  )
}

export default Students
