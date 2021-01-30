import dynamic from "next/dynamic"
const SlotsBox = dynamic(() => import("../components/slots"), {
  ssr: false,
})

export default (props) => <SlotsBox />
