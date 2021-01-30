import { useRouter } from "next/router"
import { CourseDetailsPage } from "../../components/course"

const CourseDetails = (props) => {
  const router = useRouter()
  const { course_id } = router.query
  if (!course_id) return null

  return <CourseDetailsPage courseId={course_id} />
}

export default CourseDetails
