import React from "react"
import { Badge, Avatar, Spinner } from "@chakra-ui/core"
import Link from "next/link"
import { useAuth } from "utils/useAuth"

const List = ({ courses, tab, emptyMessage }) => {
  if (!courses)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="md" />
      </div>
    )
  const filteredCourses = filterCourses(courses, tab)
  if (filteredCourses.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        {tab === "all" ? (
          <p>{emptyMessage}</p>
        ) : (
          <p>There are no {tab} courses.</p>
        )}
      </div>
    )
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredCourses.map((course, index) => (
        <div className="" key={`course-${index}`}>
          <Card course={course} />
        </div>
      ))}
    </div>
  )
}

const Card = ({ course }) => {
  let currentSession = null
  const { token, role, user } = useAuth()
  const canEdit = (course, user) => {
    if (user){
      return course.user.outcampus_id === user.outcampus_id || ["admin", "super_admin"].includes(role) ? true : false
    }
    return false

  }
  if (course.canJoin) {
    currentSession = course.class_session.find((session) => {
      let now = Date.now()
      let start = new Date(session.start_time).getTime()
      let end = new Date(session.end_time).getTime()
      if (now + 900000 >= start && now <= end) {
        return true
      }
      return false
    })
  }
  const isComplete = course.class_session.every(
    (x) => new Date(x.end_time).getTime() < Date.now()
  )

  return (
    <Link href="/courses/[course_id]" as={`/courses/${course.id}`}>
      <a>
        <article
          className={`bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-200 ease-in-out  transform hover:scale-105 ${
            isComplete ? "opacity-75" : "opacity-100"
          }`}
        >
          <div>
            <div
              style={{
                backgroundImage: `url(${course.cover})`,
                backgroundSize: "cover",
                paddingBottom: `${900 / 16}%`,
                filter: `grayscale(${isComplete ? "1" : "0"})`,
              }}
              className="relative"
            ></div>
          </div>
          <div className="h-40 relative px-3 py-2">
            <div className="">
              <Badge>{course.subject.name}</Badge>
              <p className="text-lg leading-snug font-medium">{course.title}</p>
            </div>
            <div className="text-xs text-gray-500 font-semibold absolute bottom-0 left-0 px-3 right-0">
              <div className="flex justify-between">
                <span>
                  Ages {course.age_min} - {course.age_max}{" "}
                </span>{" "}
                <span>
                  Size {course.size_min} - {course.size_max}{" "}
                </span>{" "}
                <span>{course.duration} mins</span>
              </div>
            </div>
          </div>
          <footer className="mt-4 p-3 border-t border-gray-100 relative">
            <div className="flex items-center">
              <Avatar
                name={course.user.first_name}
                src={course.user.avatar}
                size="sm"
              />
              <span className="ml-2 text-gray-600 text-sm">
                {course.user.first_name} {course.user.last_name}
              </span>
              {canEdit(course, user) && (<a href={"/courses/edit/" + course.id} className="flex flex-1 justify-end" onClick={(e) => e.stopPropagation()}>
                <span className="px-2 py-2 bg-yellow-300 rounded-md self-end" >Edit</span>
              </a>)}


            </div>
            {currentSession && currentSession.meeting_link && (
              <a
                href={currentSession.meeting_link}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-1 bg-yellow-300 hover:bg-yellow-400 rounded shadow absolute right-2 top-0 mt-4 z-10 flex items-center justify-center"
              >
                <div className="blob-red mr-2"></div>
                <span className="text-xs uppercase tracking-wide font-semibold">
                  Join
                </span>
              </a>
            )}
          </footer>
        </article>
      </a>
    </Link>
  )
}

function filterCourses(courses, tab) {
  console.log(courses, tab)

  if (tab === "upcoming") {
    let upcomingCourses = courses
      .filter((x) => x.status === "approved")
      .filter(
        (x) => Date.now() < new Date(x.class_session[0].start_time).getTime()
      )

    return upcomingCourses
  }

  if (tab === "ongoing") {
    let ongoingCourses = courses
      .filter((x) => x.status === "approved")
      .filter((x) => {
        return (
          Date.now() + 900000 >=
            new Date(x.class_session[0].start_time).getTime() &&
          Date.now() <=
            new Date(
              x.class_session[x.class_session.length - 1].end_time
            ).getTime()
        )
      })

    return ongoingCourses
  }

  if (tab === "completed") {
    let completedCourses = courses
      .filter((x) => x.status === "approved")
      .filter(
        (x) =>
          Date.now() >
          new Date(
            x.class_session[x.class_session.length - 1].end_time
          ).getTime()
      )

    return completedCourses
  }

  return tab === "all" ? courses : courses.filter((x) => x.status === tab)
}

export default List
export { Card }
