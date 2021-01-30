import dynamic from "next/dynamic"
const AdminPage = dynamic(import("../../components/admin"), { ssr: false })

export default (props) => <AdminPage />
