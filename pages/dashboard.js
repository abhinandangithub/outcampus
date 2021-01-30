import dynamic from "next/dynamic"
const Dashboard = dynamic(import("../components/dashboard"), { ssr: false })

const Home = (props) => <Dashboard />

export default Home
