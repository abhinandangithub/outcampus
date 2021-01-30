import dynamic from "next/dynamic"
const SignupBox = dynamic(() => import("../components/public/auth/signup"), {
  ssr: false,
})

export default SignupBox
