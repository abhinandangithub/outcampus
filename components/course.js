import React, { useState, Fragment } from "react"
import { App, PublicLayout } from "./layout"
import {
  Spinner,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  useToast,
  Avatar,
} from "@chakra-ui/core"
import { Card } from "./common/list"
import { useAuth } from "../utils/useAuth"
import SessionCard from "components/common/cards/sessionCard"
import StudentCard from "components/common/cards/studentCard"
import useSWR from "swr"
import ReactMarkdown from "react-markdown"
import { useRouter } from "next/router"

const CourseDetailsPage = ({ courseId }) => {
  const { role, token } = useAuth()
  const [ctaLoading, setCtaLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()
  return (
    <PublicLayout title="Course details">
      <div className="min-h-screen max-w-screen-xl m-auto p-4 lg:p-8">
        <CourseDetails
          courseId={Number(courseId)}
          ctaLoading={ctaLoading}
          onCTAClick={(e) => {
            // @TODO: This part needs refactoring
            setCtaLoading(true)
            if (role === "student") {
              fetch(`/api/enrolment`, {
                headers: {
                  authorization: `Bearer ${token}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                  course_id: courseId,
                }),
              })
                .then((response) => {
                  if (response.status === 409) {
                    toast({
                      title: "Already enrolled",
                      description:
                        "You have already enrolled for this course. Please check your dashboard for more details",
                      status: "info",
                      position: "top",
                      duration: 1000,
                    })
                  }
                  return response.json()
                })
                .then((data) => {
                  console.log(data)
                  if (data.error) {
                    toast({
                      title: "Enrolment failed",
                      description: data.message,
                      status: "error",
                      position: "top",
                      duration: 1000,
                    })
                  }
                  if (data.pg_link) location.href = data.pg_link
                })
                .catch(console.error)
                .finally(() => {
                  setCtaLoading(false)
                })
              return
            }
            if (role === "teacher") {
              toast({
                title: "Not allowed",
                description: "Teachers cannot enroll for a course.",
                status: "error",
                position: "top",
                duration: 1000,
              })
              setCtaLoading(false)
              return
            }
            window.history.pushState(
              { prevUrl: window.location.href },
              null,
              ""
            )
            toast({
              title: "Login",
              description: "Please log in to enroll for this course",
              status: "warning",
              position: "top",
              duration: 1000,
            })
            setCtaLoading(false)
            sessionStorage.setItem('ref', location.pathname);
            router.push("/login", undefined, {
              shallow: true,
            })
          }}
        />
      </div>
    </PublicLayout>
  )
}

const CourseListingPage = (props) => {
  const { role } = useAuth()
  const fetcher = (url) =>
    fetch(url)
      .then((response) => {
        console.info(response.status)
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .catch((error) => {
        console.error(error.message)
        throw Error(error.message)
      })
  const { data: courses, error } = useSWR("/api/courses", fetcher)
  if (error) return <div>error</div>
  console.log(courses, error)
  let Layout = role === "student" ? App : PublicLayout
  return (
    <Layout title="All Courses" screen="courses">
      <div className="max-w-screen-xl min-h-screen m-auto px-4">
        <h1 className="text-2xl font-semibold text-gray-900 my-6">
          All Courses
        </h1>
        {!courses ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
            <CourseListing courses={courses} />
          )}
      </div>
    </Layout>
  )
}

const CourseDetails = ({ courseId, onCTAClick, ctaLoading }) => {
  const { role, token } = useAuth()
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.info(response.status)
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .catch((error) => {
        console.error(error.message)
        throw Error(error.message)
      })
  const { data: course, error } = useSWR(`/api/courses/${courseId}`, fetcher)

  if (error) return <div>{error.message}</div>

  if (!course)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    )

  return (
    <div>
      <div>
        <div className="flex flex-col lg:flex-row mt-4">
          <div className="lg:w-1/2 lg:pr-4 relative order-1 lg:order-0 flex flex-col justify-between">
            <div>
              <Badge>{course.subject.name}</Badge>
              <Badge className="ml-2">{course.level}</Badge>
              <h1 className="text-4xl my-4 font-bold text-gray-800 leading-none">
                {course.title}
              </h1>
              <div className="my-4">
                <div className="text-lg markdown">
                  <ReactMarkdown source={course.summary} />
                </div>
              </div>
              <div className="my-4">
                <p className="text-sm text-gray-800">
                  <span className="text-black">What will you learn</span>:{" "}
                  {course.objective}
                </p>
              </div>
              <p>
                {course.enrolmentCount > 2 ? course.enrolmentCount : 2} students
                enrolled
              </p>
              <div className="my-4 flex items-center">
                <Avatar
                  size="sm"
                  src={course.user.avatar}
                  name={`${course.user.first_name} ${course.user.last_name}`}
                />
                <span className="text-md ml-2">
                  {course.user.first_name} {course.user.last_name}
                </span>
                {course.academy && (
                  <span className="text-md ml-2">| {course.academy}</span>
                )}
              </div>
            </div>

            {/* {!course.canEdit && !course.isEnrolled && (
              <Fragment>
                {course.class_session.some(
                  (x) => new Date(x.end_time).getTime() > Date.now()
                ) ? (
                    <div>
                      {course.size_max > course.enrolmentCount ? (
                        <button
                          className="rounded-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium text-gray-800 hover:text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10 shadow hover:shadow-sm"
                          onClick={onCTAClick}
                          disabled={ctaLoading}
                        >
                          {ctaLoading ? (
                            <Spinner />
                          ) : (
                              <Fragment>
                                {Number(course.price) === 0 ? (
                                  <span>Enroll for FREE!</span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                      Enroll for ₹{course.price}{" "}
                                      {course.hasGST && (
                                        <span className="text-xs ml-3">
                                          (+ 18% GST)
                                        </span>
                                      )}
                                    </span>
                                  )}
                              </Fragment>
                            )}
                        </button>
                      ) : (
                          <button
                            disabled
                            className="rounded-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium text-gray-800 bg-gray-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10 shadow cursor-not-allowed"
                          >
                            <s>
                              <Fragment>
                                {Number(course.price) === 0 ? (
                                  <span>Enroll for FREE!</span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                      Enroll for ₹{course.price}{" "}
                                      <span className="text-xs ml-3">
                                        (+ 18% GST)
                                </span>
                                    </span>
                                  )}
                              </Fragment>
                            </s>{" "}
                            <span className="ml-3 font-bold">Slots full!</span>
                          </button>
                        )}
                    </div>
                  ) : (
                    <div>
                      <span className="inline-block rounded-full px-8 py-3 border border-transparent text-base leading-6 font-medium text-gray-800 bg-yellow-300 md:py-4 md:text-lg md:px-10 shadow">
                        This course is completed
                    </span>
                    </div>
                  )}
              </Fragment>
            )}
            {course.isEnrolled && (
              <div>
                <span className="inline-block rounded-full px-8 py-3 border border-transparent text-base leading-6 font-medium text-gray-800 bg-yellow-300 md:py-4 md:text-lg md:px-10 shadow">
                  You've already enrolled.
                </span>
              </div>
            )} */}
            {/* <Share url={`https://outcampus.in/courses/${course.id}`} title={course.title} description={course.summary} /> */}
          </div>
          <div className="lg:w-1/2 order-0 lg:order-1  mb-4 lg:mb-0">
            <img className="rounded-lg w-full" src={course.cover} />
          </div>
        </div>
        <div className="my-10 lg:my-16 py-3 lg:py-6 border-t border-b border-gray-200">
          <StatGroup className="text-center">
            <Stat>
              <StatLabel className="text-gray-600">
                <span className="text-xs lg:text-base">Sessions</span>
              </StatLabel>
              <StatNumber>
                <span className="text-sm lg:text-2xl">
                  {course.class_session.length}
                </span>
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel className="text-gray-600">
                <span className="text-xs lg:text-base">Duration</span>
              </StatLabel>
              <StatNumber>
                <span className="text-sm lg:text-2xl">
                  {course.duration} mins
                </span>
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel className="text-gray-600">
                <span className="text-xs lg:text-base">Ages</span>
              </StatLabel>
              <StatNumber>
                <span className="text-sm lg:text-2xl">
                  {course.age_min} to {course.age_max}
                </span>
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel className="text-gray-600">
                <span className="text-xs lg:text-base">Size</span>
              </StatLabel>
              <StatNumber>
                <span className="text-sm lg:text-2xl">
                  {course.size_min} to {course.size_max}
                </span>
              </StatNumber>
            </Stat>
          </StatGroup>
        </div>
      </div>

      <div className="mt-10">
        <h4 className="font-semibold text-3xl text-gray-800">
          Course Schedule
        </h4>
        {/* TODO: To move to MobX */}
        <div className="flex flex-wrap">
          {course.class_session.map((session, index) => (
            <SessionCard
              day={index + 1}
              start_time={session.start_time}
              end_time={session.end_time}
              meeting_link={session.meeting_link}
              topic={session.topic}
              summary={session.summary}
              role={role}
              key={`session-card-${index}`}
              canJoin={course.canJoin}
              sessionId={session.id}
              sessionLink={session.session_link}
              isEnrolled={course.isEnrolled}
              canEdit={course.canEdit}
              hasRatedSessionAsStudent={session.hasRatedSessionAsStudent}
              course_id={course.id}
              home_work={session.home_work}
            />
          ))}
        </div>
      </div>

      {course.enrolment && (
        <div className="mt-20">
          <h4 className="font-semibold text-3xl text-gray-800">
            Students Enrolled
          </h4>
          <div className="flex flex-wrap">
            {course.enrolment &&
              course.enrolment.map(({ user }, index) => (
                <StudentCard
                  first_name={user.first_name}
                  last_name={user.last_name}
                />
              ))}
          </div>
        </div>
      )}

      {/* <div className="mt-16">
        <h4 className="font-semibold text-3xl text-gray-800">
          Other courses by {course.user.first_name}
        </h4>
        <CourseListing
          courses={course.teacher.courses.filter(
            (x) => x.status === "approved"
          )}
        />
      </div> */}
    </div>
  )
}

const CourseListing = ({ courses }) => {
  return (
    <div
      className="flex overflow-x-auto pt-4 pb-10 px-4 -mx-4"
      style={{ flex: 1 }}
    >
      <div className="flex lg:flex-wrap lg:w-full -mx-4">
        {courses
          .filter(
            (x) =>
              x.status === "approved" &&
              Date.now() <
              new Date(
                x.class_session[x.class_session.length - 1].end_time
              ).getTime()
          )
          .map((course) => (
            <div className="px-4 w-80 lg:w-1/4 mb-8">
              <Card course={course} />
            </div>
          ))}
      </div>
    </div>
  )
}

export { CourseDetailsPage, CourseListingPage }
