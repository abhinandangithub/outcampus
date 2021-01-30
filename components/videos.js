import VidesoDashboard from "components/teacher/videos"
import { useAuth } from "utils/useAuth"

const TeacherVideoDashboard = (props) => {
  const { role } = useAuth()

  if (role === "student") return (<div>Don't have access</div>)

  return <VidesoDashboard />
}

export default TeacherVideoDashboard
