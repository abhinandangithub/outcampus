import dynamic from "next/dynamic"
const BuyNowBox = dynamic(() => import("../components/buyNow"), {
  ssr: false,
})

export default (props) => <BuyNowBox />
