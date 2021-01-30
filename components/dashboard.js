import TeacherDashboard from "components/teacher/dashboard"
import StudentDashboard from "components/student/dashboard"
import { useAuth } from "utils/useAuth"

const UserDashboard = (props) => {
  const { role } = useAuth()

  if (role === "student") return <StudentDashboard />

  return <TeacherDashboard />
}

export default UserDashboard
