import dynamic from "next/dynamic"
const TeacherCrud = dynamic(() => import("../components/teacher/email"), {
  ssr: false,
})

export default (props) => <TeacherCrud />
