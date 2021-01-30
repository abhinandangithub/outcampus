import { useRouter } from "next/router"
import CourseEditPage  from "../../../components/course/edit/edit"

const CourseEdit = (props) => {
    const router = useRouter()
    const { course_id } = router.query
    if (!course_id) return null

    return <CourseEditPage courseId={course_id} />
}

export default CourseEdit
