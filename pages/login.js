import dynamic from "next/dynamic"
const LoginBox = dynamic(() => import("../components/public/auth/login"), {
  ssr: false,
})

export default (props) => <LoginBox />
