import React from "react"
import { PublicLayout } from "../layout"
import { Box, Divider } from "@chakra-ui/core"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/core";
import Link from "next/link";
import useSWR from "swr"

import LetsGetStarted from "../common/letGetStarted"
import Testimonials from "../common/testimonials"

const YoungThinkers = () => {
    return (
        <PublicLayout title="Outcampus - Young Thinkers">
            <YoungThinkersMainHero />
            <FeatureSection />
            <YoungSpeakers />
            <FAQSection />
            <Testimonials />
            <LetsGetStarted />
        </PublicLayout>
    )
}


const YoungThinkersMainHero = () => {
    return (
        <div className="bg-green-500">
            <div className="flex flex-col flex-wrap md:flex-row px-1 md:px-2 justify-center py-10  max-w-screen-xl md:mx-auto">
                <div className="text-left md:text-left md:w-1/2">
                    <span className="text-black text-left text-4xl md:text-4xl lg:6xl font-bold">Young Thinkers</span>
                    {/* Stats section */}
                    <span>
                        <div className="flex flex-col  md:w-full md:block py-2">
                            <div className="block text-left text-3xl">Critical Thinking and
Logical Reasoning</div>
                            <div className="text-black w-full">Enroll your child in our award winning “Young Thinkers” Program, designed by
                            gold medalists from IIT/IIM and delivered LIVE online by IIT /IIM PhD/ Teach for India alumni teachers. Designed
                            within the New Education Policy 2020 framework, it is India’s 1st structured and comprehensive program that builds
                            foundational capacity in critical thinking and logical reasoning in kids aged 6-14. Kids are taught “How to Think”
                            and structure their thoughts through an industry first gamified LIVE learning platform.</div>
                            <Link href="/register">
                                <div className="w-full cursor-pointer md:w-2/3 bg-yellow-300 py-2 text-center my-12 hover:bg-yellow-500 transition duration-300">
                                    <span>Start free Trial</span>
                                </div>
                            </Link>
                        </div>

                    </span>
                </div>
                <div className="text-center md:w-1/2">
                    <img src="/img/hero-boy.svg" className="-mt-16"></img>
                </div>
            </div>
        </div>
    )

}

const PricingConfig = [
    {
        tabTitle: "Age 6 & 7",
        pricingConfig: [
            {
                title: "Basic",
                discountedPrice: "₹4499",
                actualPrice: "₹5999",
                isPopular: false,
                link: "",
                features: [
                    { img: "", label: "Course Coming Soon ✨" },

                ]
            },
            {
                title: "Intermediate",
                discountedPrice: "₹9999",
                actualPrice: "₹12999",
                isPopular: true,
                link: "",
                features: [
                    { img: "", label: "Course Coming Soon ✨" },

                ]
            },
            {
                title: "Advanced",
                discountedPrice: "₹15999",
                actualPrice: "₹19999",
                isPopular: false,
                link: "",
                features: [
                    { img: "", label: "Course Coming Soon ✨" },

                ]
            },
        ]
    },
    {
        tabTitle: "Age 8 & 10",
        pricingConfig: [
            {
                title: "Basic",
                discountedPrice: "₹4499",
                actualPrice: "₹5999",
                isPopular: false,
                link: "",
                features: [
                    { img: "", label: "Course Coming Soon ✨" },

                ]
            },
            {
                title: "Intermediate",
                discountedPrice: "₹9999",
                actualPrice: "₹12999",
                isPopular: true,
                link: "",
                features: [
                    { img: "", label: "Course Coming Soon ✨" },

                ]
            },
            {
                title: "Advanced",
                discountedPrice: "₹15999",
                actualPrice: "₹19999",
                isPopular: false,
                link: "",
                features: [
                    { img: "", label: "Course Coming Soon ✨" },

                ]
            },
        ]
    },
    {
        tabTitle: "Age 10, 11 & 12",
        pricingConfig: [
            {
                title: "Basic",
                discountedPrice: "₹4499",
                actualPrice: "₹5999",
                isPopular: false,
                link: "",
                features: [
                    { img: "", label: "Course Coming Soon ✨" },

                ]
            },
            {
                title: "Intermediate",
                discountedPrice: "₹9999",
                actualPrice: "₹12999",
                isPopular: true,
                link: "",
                features: [
                    { img: "", label: "Course Coming Soon ✨" },

                ]
            },
            {
                title: "Advanced",
                discountedPrice: "₹15999",
                actualPrice: "₹19999",
                isPopular: false,
                link: "",
                features: [
                    { img: "", label: "Course Coming Soon ✨" },

                ]
            },
        ]
    },
    {
        tabTitle: "Age 13 & 14",
        pricingConfig: [
            {
                title: "Basic",
                discountedPrice: "₹4499",
                actualPrice: "₹5999",
                isPopular: false,
                link: "",
                features: [
                    { img: "", label: "Course Coming Soon ✨" },

                ]
            },
            {
                title: "Intermediate",
                discountedPrice: "₹9999",
                actualPrice: "₹12999",
                isPopular: true,
                link: "",
                features: [
                    { img: "", label: "Course Coming Soon ✨" },

                ]
            },
            {
                title: "Advanced",
                discountedPrice: "₹15999",
                actualPrice: "₹19999",
                isPopular: false,
                link: "",
                features: [
                    { img: "", label: "Course Coming Soon ✨" },

                ]
            },
        ]
    },

]

const FeatureSection = () => {
    return (
        <div className="bg-gray-200">
            <div className="flex flex-col flex-wrap md:flex-row px-1 md:px-2 justify-center py-10  max-w-screen-xl md:mx-auto bg-gray-200">
                <div className="flex w-full justify-center">
                    <div className="flex flex-row flex-wrap md:flex-row md:space-x-16 bg-white py-8  w-10/12 justify-center -my-32 rounded-md">
                        <div className="flex flex-col justify-center w-1/2 md:w-1/6">
                            <span className="flex w-20 h-32 md:w-auto md:h-40 mx-auto"><img src="/img/home/about/handpicked.svg"></img> </span>
                            <span className="text-center text-sm md:text-sm h-20">Top 0.1% teachers from premier IIT/IIM</span>
                        </div>
                        <div className="flex flex-col justify-center w-1/2 md:w-1/6">
                            <span className="flex w-20 h-32 md:w-auto md:h-40 mx-auto"><img src="/img/young-thinkers/gamified.svg"></img> </span>
                            <span className="text-center text-sm md:text-sm h-20">India’s 1st <b>assited gamified critical thinking program</b> for ages 6-15.</span>
                        </div>
                        <div className="flex flex-col justify-center w-1/2 md:w-1/6">
                            <span className="flex w-20 h-32 md:w-auto md:h-40 mx-auto"><img src="/img/young-thinkers/gears.svg"></img> </span>
                            <span className="text-center text-sm md:text-sm h-20">Improve your mental ability</span>
                        </div>
                        <div className="flex flex-col justify-center w-1/2 md:w-1/6">
                            <span className="flex w-20 h-32 md:w-auto md:h-40 mx-auto"><img src="/img/young-thinkers/equation.svg"></img> </span>
                            <span className="text-center text-sm md:text-sm h-20">Improve your maths skills</span>
                        </div>
                    </div>
                </div>

                <div className="h-auto w-full mt-40">
                    <PricingTabs pricing={PricingConfig} />
                </div>
            </div>
        </div>
    )
}


const YoungSpeakers = () => {
    return (
        <div className="bg-blue-600">
            <div className="flex flex-col flex-wrap md:flex-row px-1 md:px-2 justify-center py-10  max-w-screen-xl md:mx-auto">
                <div className="flex flex-col-reverse md:flex-row justify-center">
                    <div className="flex flex-col md:hidden justify-between mt-20">

                        <Link href="/young-speakers"><span className="underline text-lg text-center mb-12">Know more</span></Link>
                        <Link href="/register"><span className="py-2 px-10 bg-yellow-300 text-center">Start a free trial</span></Link>
                    </div>
                    <div className="w-full md:w-1/2">
                        <img className="self-center" src="/img/hero-girl.svg"></img>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="flex flex-col">
                            <div className="text-4xl font-bold mb-4 text-center md:text-left">
                                Young Speakers
                        </div>
                            <div className="hidden md:block break-words w-10/12">
                                Enroll your child in our award winning “Young Speakers” Program, designed by gold medalists from IIT/IIM and
                                India’s top early childhood learning experts and delivered LIVE online by Cambridge CELTA® certified teachers.
                                Designed within the New Education Policy 2020 framework, it is India’s 1st structured and comprehensive program
                                that builds foundational capacity in effective communication in kids aged 6-14.
                        </div>
                            <div>
                                <div className="flex-row hidden md:flex justify-between mt-20">
                                    <Link href="/young-speakers"><span className="underline text-lg">Know more</span></Link>
                                    <Link href="/register"><span className="py-2 px-10 bg-yellow-300 self-end">Start a free trial</span></Link>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

const FAQSection = () => {
    return (

        <div className="flex flex-col flex-wrap md:flex-row px-1 md:px-2 justify-center py-10  max-w-screen-xl md:mx-auto">
            <div className="flex flex-col md:flex-row w-full h-auto">
                <div className="flex flex-col md:w-1/2 w-full justify-between h-auto">
                    <div className="text-2xl font-bold md:font-normal md:text-3xl">
                        Frequently Asked Questions
                    </div>
                    <div className="w-full hidden md:block md:w-1/2">
                        For other questions you can contact us directly on <a href="mailto:info@outcampus.in" className="text-blue-500">info@outcampus.in</a>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                            <AccordionHeader>
                                <Box flex="1" textAlign="left" className="font-bold">
                                    What is Outcampus ?
                                    </Box>
                                <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                Outcampus is an online teaching platform that conducts live sessions and curated courses to facilitate all-round development of children in the age group of 3 to 18
                                </AccordionPanel>
                        </AccordionItem>


                        <AccordionItem>
                            <AccordionHeader>
                                <Box flex="1" textAlign="left" className="font-bold">
                                    How does the Outcampus platform work ?
                                    </Box>
                                <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                Outcampus is a one-stop-shop. After signing up on our platform, students can browse and enroll for the courses listed on our platform. The payment for the same is made on our platform during enrollment. At the time of session, the students need to login and “join session” from their dashboards. All communication after class hours (including homework) is done on the Outcampus platform as well.
                                </AccordionPanel>
                        </AccordionItem>


                        <AccordionItem>
                            <AccordionHeader>
                                <Box flex="1" textAlign="left" className="font-bold">
                                    Can I view video recordings of live online classes ?
                                    </Box>
                                <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                Video recording of live online classes will be available for enrolled students only. These can be viewed from the course page.
                                </AccordionPanel>
                        </AccordionItem>



                        <AccordionItem>
                            <AccordionHeader>
                                <Box flex="1" textAlign="left" className="font-bold">
                                    Is the Outcampus platform free ?
                                    </Box>
                                <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                Yes. Currently we do not charge any commission or platform fees for students or teachers to register on our platform. However, students need to pay for the course enrollment fees for the course of their choice.
                                </AccordionPanel>
                        </AccordionItem>


                        <AccordionItem>
                            <AccordionHeader>
                                <Box flex="1" textAlign="left" className="font-bold">
                                    How do teachers get paid ?
                                    </Box>
                                <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel pb={4}>
                                Teachers will be paid for the course after completion of their respective course. The payment will be made within 3 business days of completion of course directly in the preferred mode of payment as specified by the teacher. For teachers based outside India and no Indian bank account, payment will be made via Paypal.
                                </AccordionPanel>
                        </AccordionItem>

                    </Accordion>
                </div>
                <div className="w-full md:hidden mt-4 md:w-1/2">
                    For other questions you can contact us directly on <a href="mailto:info@outcampus.in" className="text-green-500">info@outcampus.in</a>
                </div>
            </div>
        </div>

    )
}

const PricingTabs = (props) => {
    const pricing = props.pricing
    const [tabIndex, setTabIndex] = React.useState(1);

    const handleTabsChange = index => {
        setTabIndex(index);
    };
    const selectedStyle =
    {
        color: "black",
        bg: "white",
        borderBottom: "4px solid",
        borderBottomColor: "green.300",
    }
    return (
        <div className="">
            <Tabs isFitted variant="unstyled" index={tabIndex} onChange={handleTabsChange}>
                <TabList className="bg-green-400 h-16">
                    {/* Render all tabs */}
                    {pricing.map((item, index) => {
                        return (<Tab key={index} _selected={
                            selectedStyle
                        }>{item.tabTitle}</Tab>)
                    })}
                </TabList>
                <TabPanels>
                    {/* Render all tabs panels with pricing content */}
                    {
                        pricing.map((tab, index) => {
                            return (
                                <TabPanel key={index}>
                                    <Pricing priceConfig={tab.pricingConfig} />
                                </TabPanel>)
                        })
                    }

                </TabPanels>
            </Tabs>
        </div >
    )
}



const Pricing = (props) => {
    const priceConfigs = props.priceConfig

    return (
        <div className="flex flex-col md:flex-row justify-between w-full px-2 bg-white">
            {
                priceConfigs.map((priceConfig, index) => {
                    return (
                        <div className="flex flex-col w-full md:flex-col md:w-1/3 my-12 px-4 border-r-2 border-solid">
                            <div className={"text-sm font-light h-5"}>
                                <span className={"" + (priceConfig.isPopular ? "" : " hidden")}> Most Popular</span>
                            </div>
                            <div className="text-2xl">{priceConfig.title}</div>
                            <div>
                                <span className="text-3xl inline">{priceConfig.discountedPrice}</span>
                                {/* <span className="text-lg line-through inline px-4 font-thin">{priceConfig.actualPrice}</span> */}
                            </div>
                            <div className="my-8">
                                <Link href={priceConfig.link}>
                                    <span className={"py-4 px-16 border-solid border border-yellow-300 " + (priceConfig.isPopular ? "bg-yellow-300" : "bg-yellow-200")}>Buy Now</span>
                                </Link>
                            </div>
                            <Divider />
                            <div>
                                {priceConfig.features.map((value, index) => {
                                    return <ListItem image={value.img} label={value.label} />
                                })}
                            </div>

                        </div>

                    )
                })
            }


        </div>
    )
}

const ListItem = (props) => {
    return (
        <div className="flex">
            <span className="m-1"><img src={props.image}></img> </span>
            <span className="m-1">{props.label}</span>
        </div>
    )
}
export default YoungThinkers





