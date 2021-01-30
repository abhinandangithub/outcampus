import React from "react"
import SessionCard from "components/common/cards/sessionCard"

const Schedule = ({ className }) => {
  return (
    <section className={className}>
      <h2 className="text-3xl font-medium">Course Schedule</h2>
      <div className="flex flex-wrap">
        <SessionCard
          role="teacher"
          day={1}
          topic="Introduction"
          summary="Steps on Ghungaroo song - Part 1"
          start_time="2020-06-14T05:00:00"
          end_time="2020-06-14T05:45:00"
          meeting-link="https://fakemeeting.ling"
        />
        <SessionCard
          role="teacher"
          day={2}
          topic="Basics"
          summary="Steps on Ghungaroo song - Part 2"
          start_time="2020-06-14T05:00:00"
          end_time="2020-06-14T05:45:00"
          meeting-link="https://fakemeeting.ling"
        />
        <SessionCard
          role="teacher"
          day={7}
          topic="Intermedia steps"
          summary="Steps on Ghungaroo song - Part 3"
          start_time="2020-06-14T05:00:00"
          end_time="2020-06-14T05:45:00"
          meeting-link="https://fakemeeting.ling"
        />
        <SessionCard
          role="teacher"
          day={3}
          topic="Advanced"
          summary="Steps on Ghungaroo song - Part 4"
          start_time="2020-06-14T05:00:00"
          end_time="2020-06-14T05:45:00"
          meeting-link="https://fakemeeting.ling"
        />
        <SessionCard
          role="teacher"
          day={4}
          topic="More advanced"
          summary="Steps on Ghungaroo song - Part 5"
          start_time="2020-06-14T05:00:00"
          end_time="2020-06-14T05:45:00"
          meeting-link="https://fakemeeting.ling"
        />
        <SessionCard
          role="teacher"
          day={5}
          topic="Most advanced"
          summary="Steps on Ghungaroo song - Part 6"
          start_time="2020-06-14T05:00:00"
          end_time="2020-06-14T05:45:00"
          meeting-link="https://fakemeeting.ling"
        />
        <SessionCard
          role="teacher"
          day={6}
          topic="Zen level"
          summary="Steps on Ghungaroo song - Part 7"
          start_time="2020-06-14T05:00:00"
          end_time="2020-06-14T05:45:00"
          meeting-link="https://fakemeeting.ling"
        />
      </div>
    </section>
  )
}

export default Schedule
