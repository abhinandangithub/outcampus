import dynamic from "next/dynamic"
const Videos = dynamic(import("../components/videos"), { ssr: false })

const Home = (props) => <Videos />

export default Home
