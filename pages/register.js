import dynamic from "next/dynamic"
const RegisterBox = dynamic(() => import("../components/public/auth/register"), {
  ssr: false,
})

export default (props) => <RegisterBox />
