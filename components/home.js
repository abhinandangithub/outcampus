import React, { Fragment, useState, useEffect, useRef } from "react"
import { PublicLayout } from "./layout"
import Link from "next/link"
import { Card } from "./common/list"
import { Spinner, Skeleton } from "@chakra-ui/core"
import useSWR from "swr"

import { Twitter, Facebook, Instagram, Check } from "react-feather"
import LetsGetStarted from "./common/letGetStarted"
import Testimonials from "./common/testimonials"

import { YoungLeadersMainHero, FeatureSection, YoungLeadersProgramDetails, FAQSection } from "./youngLeaders/index"

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const Home = (props) => {
  return (
    <PublicLayout title="Live online classes for kids">
      {/* <Hero /> */}
      {/* <PopularCourses /> */}
      {/* <Something /> */}
      {/* <Features /> */}
      {/* <Teachers /> */}

      {/* New Revamp layout here */}
      <div className="flex mx-auto flex-col justify-center">
        <MainHero />
        <AboutUs />
        {/* <OurCourses /> */}
        {/* <YoungLeaderCourse /> */}
        <YoungLeadersMainHero />
        <FeatureSection />
        <YoungLeadersProgramDetails />
        <FAQSection />
        <HowItWorks />
        {/* <Blogs /> */}
        <Testimonials />
        <LetsGetStarted />
      </div>
    </PublicLayout>
  )
}

const MainHero = () => {
  return (
    <div className="flex flex-col flex-wrap md:flex-row px-1 md:px-2 justify-center pt-10  max-w-screen-xl w-full md:mx-auto">
      <div className="text-center md:text-left md:w-1/2">
        <span className="text-black text-2xl md:text-4xl lg:6xl font-bold">Create Leaders of Tomorrow</span>
        {/* Stats section */}
        <span>
          <div className="flex flex-col hidden md:w-full md:block py-2">
            <div className="block text-left text-lg">Outcampus courses improve</div>
            <div className="flex flex-row w-full justify-between mt-2">
              <div className="flex flex-col">
                <span className="inline-block text-blue-400 my-2">
                  <img className="inline-block" src="/img/home/blue-check.svg"></img>
                  <span className="px-2">English by 80%</span>
                </span>
                <span className="inline-block text-blue-400 my-2">
                  <img className="inline-block" src="/img/home/blue-check.svg"></img>
                  <span className="px-2">Maths by 75%</span>
                </span>
                <span className="inline-block text-blue-400 my-2">
                  <img className="inline-block" src="/img/home/blue-check.svg"></img>
                  <span className="px-2">Mental age by 2-4 years</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="inline-block text-green-400 my-2">
                  <img className="inline-block" src="/img/home/green-check.svg"></img>
                  <span className="px-2">Communication</span>
                </span>
                <span className="inline-block text-green-400 my-2">
                  <img className="inline-block" src="/img/home/green-check.svg"></img>
                  <span className="px-2">Memory</span>
                </span>
                <span className="inline-block text-green-400 my-2">
                  <img className="inline-block" src="/img/home/green-check.svg"></img>
                  <span className="px-2">Logical Reasoning</span>
                </span>
              </div>
            </div>
            <div className="flex flex-row w-2/3 justify-between py-2">
              <div className="flex flex-col">
                <span className="text-4xl text-yellow-300 font-bold">1:5</span>
                <span className="text-sm">Class size</span>
              </div>

              <div className="flex flex-col">
                <span className="text-4xl text-yellow-300 font-bold">6-15</span>
                <span className="text-sm">Age groups</span>
              </div>

              <div className="flex flex-col">
                <span className="text-4xl text-yellow-300 font-bold">LIVE</span>
                <span className="text-sm">Interactive classes</span>
              </div>
            </div>
            <Link href="/register">
              <div className="w-2/3 cursor-pointer bg-yellow-300 py-2 text-center my-4 hover:bg-yellow-500 transition duration-300">
                <span className="cursor-pointer">Start free Trial</span>
              </div>
            </Link>
          </div>

        </span>
      </div>
      <div className="text-center md:w-1/2">
        <img className="mx-auto -mt-16" src="/img/hero-boy.svg"></img>
      </div>

      {/* Mobile Version TODO Convert into single component */}
      <div className="flex flex-col md:w-1/2 md:hidden py-2">
        <div className="block text-left text-xl">Outcampus courses improve</div>
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col">
            <span className="text-blue-400">English by 80%</span>
            <span className="text-blue-400">Maths by 75%</span>
            <span className="text-blue-400">Mental age +2-4 years</span>
          </div>
          <div className="flex flex-col">
            <span className="text-green-400">Communication</span>
            <span className="text-green-400">Memory</span>
            <span className="text-green-400">Logical Reasoning</span>
          </div>
        </div>
        <div className="flex flex-row justify-between py-2">
          <div className="flex flex-col">
            <span className="text-4xl text-yellow-300 font-bold">1:5</span>
            <span className="text-sm">Class size</span>
          </div>

          <div className="flex flex-col">
            <span className="text-4xl text-yellow-300 font-bold">6-15</span>
            <span className="text-sm">Age groups</span>
          </div>

          <div className="flex flex-col">
            <span className="text-4xl text-yellow-300 font-bold">LIVE</span>
            <span className="text-sm">Interactive classes</span>
          </div>
        </div>
        <div className="w-full bg-yellow-300 py-2 text-center my-4 hover:bg-yellow-500 transition duration-300">
          <span>Start free Trial</span>
        </div>


      </div>


    </div>
  )

}

const AboutUs = () => {
  return (
    <div className="flex mx-auto flex-col md:flex-row  justify-center h-auto bg-yellow-300 w-full">
      <div className="flex flex-col-reverse px-1 md:mx-2 md:flex-row max-w-screen-xl w-full md:mt-10">
        <div className="flex flex-col md:hidden md:flex-row justify-between my-10">
          <span className="text-center mb-6 md:text-left underline font-bold text-xl text-gray-800 align-bottom"><Link href="/about">Know More</Link></span>
          <div className="flex flex-row cursor-pointer w-full justify-center">
            <Link href="/register"><span className="bg-gray-800 text-white text-center py-2 px-10">Start your free trial now</span></Link>
          </div>

        </div>
        <div className="md:w-1/2 mt-2">
          <div className="flex flex-row flex-wrap space-y-4">
            <div className="w-1/2 flex flex-col">
              <img className="w-20 h-20 md:w-auto md:h-auto self-center" src="/img/home/about/output.svg"></img>
              <span className="text-center py-3">Proprietary curriculum designed by gold medalists and top alumni of IIT/IIM
</span>
            </div>
            <div className="w-1/2 flex flex-col">
              <img className="w-20 h-20 md:w-auto md:h-auto self-center" src="/img/home/about/nep.svg"></img>
              <span className="text-center py-3">India's 1st curriculum designed within <br /> <span className="inline-block font-bold"> New Education Policy</span>
              </span>
            </div>
            <div className="w-1/2 flex flex-col">
              <img className="w-20 h-20 md:w-auto md:h-auto self-center" src="/img/home/about/handpicked.svg"></img>
              <span className="text-center py-3">Handpicked top 0.1% teachers. Highly trained in virtual teaching</span>
            </div>
            <div className="w-1/2 flex flex-col">
              <img className="w-20 h-20 md:w-auto md:h-auto self-center" src="/img/home/about/laptop.svg"></img>
              <span className="text-center py-3">Student feedback after every session</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:w-1/2">

          <div className="font-bold text-4xl my-4">We think that every child is extraordinary </div>
          <div className="break-words text-xl hidden md:block">Outcampus’s new way of learning helps bring the best out of your child. Regular interactive sessions help nurture the child’s brain and challenge to visualise the day-to-day things differently. Our proprietary curriculum and our certified teachers make the learning process
          more engaging and fun at the same time.
          </div>
          <div className="flex-col hidden md:flex md:flex-row justify-between align-middle my-20">
            <Link href="/about"><span className="text-center mb-6 md:text-left cursor-pointer underline font-bold text-xl text-gray-800 align-bottom"></span></Link>
            <div>
              <Link href="/register"><span className="bg-gray-800 text-white cursor-pointer py-2 px-6 h-auto hover:bg-gray-700">Start your free trial now</span></Link>
            </div>
          </div>
        </div>
      </div >

    </div >
  )
}

const OurCourses = () => {
  return (
    <div className="flex mx-auto flex-col md:flex-row justify-center h-auto bg-yellow-300 w-full pb-12">
      <div className="flex flex-col px-1 md:px-2 md:flex-row max-w-screen-xl w-full md:mt-10">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="text-gray-800 font-bold my-4 text-4xl h-20">OUR COURSES</div>

          <YoungSpeaker />
        </div>
        <div className="flex flex-col w-full md:w-1/2">

          <div className="hidden md:flex text-gray-800 my-4 h-20">
            A curious mindset is capable of critical thinking leading to better problem
            solving and numerical ability. Effective communication and clear speech can
            make your child a confident leader. Master these two skills and your child
            can excel in any field
            </div>
          <YoungThinker />
        </div>
      </div >

    </div >

  )
}

const YoungLeaderCourse = () => {
  return (
    <div className="flex mx-auto flex-col justify-center h-auto bg-yellow-300 w-full pb-12">
      <div className="flex flex-col mx-auto max-w-screen-xl w-full">
        <div className="flex flex-col px-1 md:px-2 md:flex-row md:mt-10">
          <div className="flex flex-col w-full md:w-1/2">
            <div className="text-gray-800 font-bold my-4 text-4xl h-20">OUR COURSES</div>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <div className="hidden md:flex text-gray-800 my-4 h-20">
              A curious mindset is capable of critical thinking leading to better problem
              solving and numerical ability. Effective communication and clear speech can
              make your child a confident leader. Master these two skills and your child
              can excel in any field
            </div>
          </div>
        </div >

        <YoungLeader />

      </div>

    </div >
  )
}

const YoungLeader = () => {
  return (
    <div className="flex flex-col w-full md:w-full bg-white h-auto md:h-auto justify-start">
      <div className="flex flex-row mt-4 pt-2 pb-1 items-center">
        <span className="bg-green-500 w-4 h-10 inline-block"></span>
        <span className="flex-1 h-10 inline-block px-4 align-baseline font-bold text-xl md:text-3xl">Young Leaders: Thinkers + Speakers</span>
      </div>
      <div className="py-10 md:py-1 px-8 text-xl md:text-3xl font-light">Master effective communication skills, critical thinking and logical reasoning for ages 6-15
</div>
      <div className="md:my-4 px-12 text-xl font-bold">Highlights of the course</div>
      <div className="flex flex-col md:flex-row justify-evenly my-2 px-12">
        <ul className="w-full md:w-1/2 px-1 md:px-16">
          <li>Phonics and Grammar</li>
          <li>Structuring Thoughts Mentally</li>
          <li>Public Speaking and Debate</li>
          <li>Group Discussion with GK</li>
          <li>Quiz in current affairs</li>
          <li>Leadership and Entrepreneurship</li>
        </ul>
        <ul className="w-full md:w-1/2 px-1 md:px-16">
          <li>Logic and reasoning</li>
          <li>Pattern and Process Sequencing</li>
          <li>Numerical Ability</li>
          <li>Brain Training</li>
          <li>Analytical Thinking</li>
          <li>Decision Making</li>
        </ul>
      </div>
      <div className="flex flex-col md:flex-row justify-between my-2 px-8 py-4">
        <Link href="/young-leaders"><span className="underline text-lg cursor-pointer text-gray-800 align-bottom pt-2 text-center md:text-left hover:cursor-pointer">Learn More</span></Link>
        <Link href="/register"><span className="bg-green-500 text-white cursor-pointer py-2 px-4 text-center md:text-left hover:bg-green-600">Book your free trial</span></Link>
      </div>
    </div >
  )
}

const YoungThinker = () => {
  return (
    <div className="flex flex-col w-full md:w-11/12 bg-white h-auto md:h-128 justify-start">
      <div className="flex flex-row mt-4 pt-2 pb-1 items-center">
        <span className="bg-green-500 w-4 h-10 inline-block"></span>
        <span className="flex-1 h-10 inline-block px-4 align-baseline py-2 font-bold">YOUNG THINKERS</span>
      </div>
      <div className="px-8 text-4xl font-light">Master critical thinking and logical reasoning for ages 6-15
</div>
      <div className="my-4 px-8 font-bold">Highlights of the course</div>
      <div className="my-2 px-12">
        <ul>
          <li>Logic and reasoning</li>
          <li>Pattern and Process Sequencing</li>
          <li>Numerical Ability</li>
          <li>Brain Training</li>
          <li>Analytical Thinking</li>
          <li>Decision Making</li>
        </ul>
      </div>
      <div className="flex flex-col md:flex-row justify-between my-2 px-8 py-4">
        <Link href="/young-thinkers"><span className="underline text-lg cursor-pointer text-gray-800 align-bottom pt-2 text-center md:text-left hover:cursor-pointer">Learn More</span></Link>
        <Link href="/register"><span className="bg-green-500 text-white cursor-pointer py-2 px-4 text-center md:text-left hover:bg-green-600">Book your free trial</span></Link>
      </div>
    </div >
  )

}

const YoungSpeaker = () => {
  return (
    <div className="flex flex-col w-full md:w-11/12 bg-white h-auto md:h-128 justify-start">
      <div className="flex flex-row mt-4 pt-2 pb-1 items-center">
        <span className="bg-blue-500 w-4 h-10 inline-block"></span>
        <span className="flex-1 h-10 inline-block px-4 align-baseline py-2 font-bold">YOUNG SPEAKERS</span>
      </div>
      <div className="px-8 text-4xl font-light">Master effective communication skills for ages 6-15</div>
      <div className="my-4 px-8 font-bold">Highlights of the course</div>
      <div className="my-2 px-12">
        <ul>
          <li>Phonics and Grammar</li>
          <li>Structuring Thoughts</li>
          <li>Public Speaking and debate</li>
          <li>Group Discussion with GK</li>
          <li>Quiz in current affairs</li>
          <li>Leadership and Entrepreneurship</li>
        </ul>
      </div>
      <div className="flex flex-col md:flex-row justify-between my-2 px-8 py-4">
        <Link href="/young-speakers"><span className="underline text-lg text-gray-800 align-bottom pt-2 text-center md:text-left cursor-pointer">Learn More</span></Link>
        <Link href="/register"><span className="bg-blue-500 text-white py-2 px-4 text-center md:text-left hover:bg-blue-600 cursor-pointer">Book your free trial</span></Link>
      </div>
    </div >
  )
}

const HowItWorks = () => {
  const customDesktopStyle = {
    backgroundImage: `url(${"/img/home/works/steps.svg"})`,
    backgroundRepeat: "no-repeat",
    height: "30rem",
  }
  const customMobileStyle = {
    backgroundImage: `url(${"/img/home/works/steps-mobile.svg"})`,
    backgroundRepeat: "no-repeat",
    height: "40rem",
  }
  return (
    <div className="flex flex-col md:flex-row justify-center h-auto w-full mx-auto py-12">
      <div className="flex flex-col  max-w-screen-xl w-full px-1 md:px-2 md:mt-10">
        <div className="flex flex-col mb-4 md:-mb-16 w-full">
          <span className="text-gray-800 font-bold">HOW IT WORKS</span>
          <span className="text-2xl md:text-5xl  font-bold">Just Four Simple Steps</span>
          <span>All you need is a laptop with good internet connectivity.</span>
        </div>
        <div class="bg-contain justify-center hidden md:flex bg-scroll md:-my-16 w-full" style={customDesktopStyle}>
        </div >
        <div class="bg-contain flex md:hidden justify-center bg-scroll w-full" style={customMobileStyle}>
        </div >
        <div className="flex flex-col -mt-16 w-full items-center md:items-end">
          <span className="w-5/12 hidden md:block break-words text-right pb-4 md:-mt-16">
            Enroll your child in India’s 1st <br /> communication & critical thinking curriculum <br /> designed within the <b>NEP 2020 framework</b>
          </span>
          <Link href="/register"><span className="bg-yellow-300 text-lg md:text-xl py-4 px-20 md:px-12 hover:bg-yellow-400 cursor-pointer">Start your free trial</span></Link>
        </div>
      </div>
    </div >


  )
}

const Blogs = () => {
  return (
    <div>Blogs</div>
  )
}


const Hero = () => (
  <div className="relative bg-white overflow-hidden">
    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center mt-10">
      <div className="lg:w-1/2 py-10 lg:py-20 order-1 lg:order-0">
        <h1 className="text-3xl lg:text-5xl font-medium leading-tight">
          Live video sessions by top teachers
        </h1>
        <h2 className="my-8 text-xl">
          Learning beyond academics | For ages 3 to 18
        </h2>
        <ul className="my-2">
          <li className="flex items-center my-2">
            <Check size={14} className="mr-3" /> Small class size
          </li>
          <li className="flex items-center my-2">
            <Check size={14} className="mr-3" /> Visibility to progress
          </li>
          <li className="flex items-center my-2">
            <Check size={14} className="mr-3" /> Innovative teaching methods
          </li>
        </ul>
        <div className="flex mt-6">
          <Link href="/courses">
            <a className="bg-yellow-300 py-3 px-8 rounded-md shadow-sm text-lg font-medium cursor-pointer">
              Find your interests
            </a>
          </Link>
        </div>
      </div>
      <div className="lg:w-1/2 flex items-center justify-center py-6 order-0 lg:order-1">
        <img src="/img/hero.jpeg" />
      </div>
    </div>
  </div>
)

const PopularCourses = () => {
  const fetcher = (url) =>
    fetch(url)
      .then((response) => {
        console.info(response.status)
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .catch((error) => {
        console.error(error.message)
        throw Error(error.message)
      })
  const { data: courses, error } = useSWR("/api/courses", fetcher)
  return (
    <div className="relative py-8">
      <div className="max-w-screen-xl m-auto px-4 lg:px-8 relative z-10">
        <div>
          <h4 className="font-bold text-3xl lg:text-5xl mb-4">
            Popular courses
          </h4>

          {!courses ? (
            <div>
              <div
                className="flex overflow-x-auto pt-4 pb-10 px-4 -mx-4"
                style={{ flex: 1 }}
              >
                <div className="flex -mx-4">
                  <div className="px-4 w-1/4">
                    <article className="w-full shadow-lg rounded overflow-hidden bg-white">
                      <div className="h-40 relative bg-gray-300"></div>
                      <div className="p-3 h-40">
                        <Skeleton height="16px" width="32px" />
                        <Skeleton height="16px" width="64px" />
                      </div>
                      <footer className="mt-4 p-3 border-t border-gray-100">
                        <Skeleton height="32px" width="32px" />
                      </footer>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          ) : (
              <Fragment>
                {error ? (
                  <div>error</div>
                ) : (
                    <div>
                      <div
                        className="flex overflow-x-auto pt-4 pb-10 px-4 -mx-4"
                        style={{ flex: 1 }}
                      >
                        <div className="flex lg:w-full lg:flex-wrap -mx-4">
                          {courses
                            .filter(
                              (x) =>
                                Date.now() <
                                new Date(
                                  x.class_session[
                                    x.class_session.length - 1
                                  ].end_time
                                ).getTime()
                            )
                            .slice(0, 8)
                            .map((course) => (
                              <div className="px-4 w-80 lg:w-1/4 mb-8">
                                <Card course={course} />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
              </Fragment>
            )}
        </div>
      </div>
      <div className="absolute z-0 top-0 w-1/2 bg-yellow-300 left-0 bottom-0" />
      <div className="absolute z-0 bg-yellow-300 left-0 right-0 bottom-0 h-48" />
    </div>
  )
}

const Features = (props) => {
  return (
    <div className="pt-10 pb-16 relative">
      <div className="max-w-xl mx-auto px-4 lg:max-w-screen-xl lg:px-8">
        <div className="relative z-10">
          <h3 className="text-3xl lg:text-5xl mb-6 lg:mb-10 font-bold">
            Why Outcampus
          </h3>
          <div className="flex flex-wrap justify-center">
            <div className="w-1/2 lg:w-1/5 pr-2 lg:pr-4 mb-4 lg:mb-8">
              <div className="border-2 border-black flex rounded flex-col h-64 p-10 items-center justify-around shadow-lg">
                <img className="w-24 h-24" src="/img/live.svg" />
                <p className="text-center text-lg leading-tight">
                  Live online classes
                </p>
              </div>
            </div>
            <div className="w-1/2 lg:w-1/5 pl-2 lg:px-4 mb-4 lg:mb-8">
              <div className="border-2 border-black flex rounded flex-col h-64 p-10 items-center justify-around shadow-lg">
                <img className="w-24 h-24" src="/img/ribbon.svg" />
                <p className="text-center text-lg leading-tight">
                  Curated top teachers
                </p>
              </div>
            </div>
            <div className="w-1/2 lg:w-1/5 pr-2 lg:px-4 mb-4 lg:mb-8">
              <div className="border-2 border-black flex rounded flex-col h-64 p-10 items-center justify-around shadow-lg">
                <img className="w-24 h-24" src="/img/seminar.svg" />
                <p className="text-center text-lg leading-tight">
                  Small class size for maximum attention
                </p>
              </div>
            </div>
            <div className="w-1/2 lg:w-1/5 pl-2 lg:px-4 mb-4 lg:mb-8">
              <div className="border-2 border-black flex rounded flex-col h-64 p-10 items-center justify-around shadow-lg">
                <img className="w-24 h-24" src="/img/test.svg" />
                <p className="text-center text-lg leading-tight">
                  Visibility to progress
                </p>
              </div>
            </div>
            <div className="w-1/2 lg:w-1/5 lg:pl-4 lg:mb-8">
              <div className="border-2 border-black flex rounded flex-col h-64 p-10 items-center justify-around shadow-lg">
                <img className="w-24 h-24" src="/img/video.svg" />
                <p className="text-center text-lg leading-tight">
                  Innovative teaching methods
                </p>
              </div>
            </div>
          </div>
        </div>
        <Patch position="right" />
      </div>
    </div>
  )
}

const Teachers = (props) => {
  return (
    <div className="relative pb-6">
      <div className="lg:max-w-screen-xl lg:px-8 m-auto py-10 relative z-10">
        <div className="relative z-10">
          <h3 className="text-3xl lg:text-5xl mb-6 lg:mb-16 font-bold">
            Teachers at Outcampus
          </h3>
          <div className="flex lg:block overflow-auto lg:overflow-visible">
            <div className="flex items-center lg:justify-center w-full lg:w-auto">
              <Teacher
                image="/img/sandeep.png"
                name="Sandeep Chitkara"
                bio="Sandeep is a FIDE GrandMaster, and ex National University Champion, with 27 years of playing and training experience. He is favourite among his students for his coaching methods and techniques. Under his tutelage more than 2000 international students have built their careers, including GM Vaibhav Suri, IM Rishi Sardana, WIM Vantika Agrawal &amp; FM Harshal Shahi."
                academy="Genius Chess Academy"
                certifications={[
                  "FIDE Instructor",
                  "FIDE Arbiter",
                  "FIDE Arena Grandmaster",
                ]}
                experience="26"
                subject="Chess"
              />
              <Teacher
                image="/img/aparna.jpeg"
                name="Aparna Athreya"
                bio="Aparna Athreya is a Certified Storyteller, Story Coach, Motivational Speaker, Educator, and Entrepreneur. She is a TEDx speaker and has won several accolades for her extensive contribution to the development and training of kid's education.  She has been awarded Women Entrepreneur by Canara Bank in 2016 and was featured as a leading entrepreneur in The Hindu Metroplus in 2016."
                academy="Story triangle"
                certifications={[
                  "Certified Storyteller by Bangalore Storytelling Society",
                  "Qualified Visual Arts based Storyteller",
                  "woman entrepreneur of the year",
                ]}
                experience="6"
                subject="Story telling"
                isBig
              />
              <Teacher
                image="/img/lisha.png"
                name="Lisha Arora"
                bio="Lisha is all things french! She doesn’t just teach French language, but lives the french culture which allows her to teach her learners french as a native speaker. Apart from being a gold medallist (Certificate in French by University of Delhi), she’s also a trained professional french dancer. Lisha has taught over 300+ students internationally."
                academy="LA Classe"
                certifications={["Diploma in French", "DELF Certification"]}
                experience="5"
                subject="French"
                adjust
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-0 top-0 w-1/2 bg-yellow-300 right-0 h-full" />
    </div>
  )
}

const Teacher = ({
  image,
  name,
  bio,
  academy,
  certifications,
  experience,
  subject,
  isBig,
  adjust,
}) => (
    <div
      className={`w-11/12 lg:w-1/3 lg:px-10 mb-6 flex-shrink-0 lg:flex-shrink   ${
        isBig ? "transform lg:scale-110" : ""
        }`}
    >
      <div className="rounded border-2 border-black shadow-lg bg-white mx-3 lg:mx-0">
        <div className="flex justify-center p-2">
          <img src={image} className="rounded-full w-32 h-32" />
        </div>
        <div className="p-4">
          <h4 className="text-base font-bold">{name}</h4>
          <h5 className="text-base">{academy}</h5>
          <p className={`text-xs my-4 ${adjust ? "mb-10" : ""}`}>{bio}</p>
          <div>
            <h5 className="mb-2 leading-none text-base">Certification</h5>
            <ul>
              {certifications.map((certification) => (
                <li className="text-xs">{certification}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <h5 className="mb-1 leading-none">Experience</h5>
              <p className="text-sm">{experience} years</p>
            </div>
            <div className="text-right">
              <h5 className="mb-1 leading-none">Teaches</h5>
              <p className="text-sm">{subject}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

const Something = () => (
  <div className="my-16 max-w-screen-xl m-auto px-4 lg:px-8 text-center">
    <h3 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
      Something for everyone
    </h3>
    <p className="text-md max-w-2xl m-auto">
      At Outcampus you can teach your child anything! Unique courses,
      complimented by top teachers to unlock your child’s full potential
    </p>
    <div className="mt-10">
      <div className="flex flex-wrap justify-center my-4">
        <p className="border border-yellow-300 rounded-md shadow-md py-1 px-2 lg:px-4 mx-1 lg:mx-3 whitespace-no-wrap text-xs lg:text-sm mb-2">
          Pre - Schoolers (3-5)
        </p>
        <p className="border border-yellow-300 rounded-md shadow-md py-1 px-2 lg:px-4 mx-1 lg:mx-3 whitespace-no-wrap text-xs lg:text-sm mb-2">
          Grade Schoolers (6-12)
        </p>
        <p className="border border-yellow-300 rounded-md shadow-md py-1 px-2 lg:px-4 mx-1 lg:mx-3 whitespace-no-wrap text-xs lg:text-sm mb-2">
          High Schools (13-18)
        </p>
      </div>
      <div className="flex justify-center flex-wrap">
        {[
          "Dance",
          "Yoga",
          "Story Telling",
          "Art",
          "Music",
          "Chess",
          "Communcation Skills",
        ].map((category, index) => (
          <p
            key={`category-${index}`}
            className="bg-yellow-300 rounded-full shadow-md py-1 px-4 mx-3 my-1 whitespace-no-wrap text-xs lg:text-sm"
          >
            {category}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap justify-center my-4">
        <p className="border border-yellow-300 rounded-md shadow-md py-1 px-2 lg:px-4 mx-1 lg:mx-3 whitespace-no-wrap text-xs lg:text-sm mb-2">
          Beginner Classes
        </p>
        <p className="border border-yellow-300 rounded-md shadow-md py-1 px-2 lg:px-4 mx-1 lg:mx-3 whitespace-no-wrap text-xs lg:text-sm mb-2">
          Intermediate Classes
        </p>
        <p className="border border-yellow-300 rounded-md shadow-md py-1 px-2 lg:px-4 mx-1 lg:mx-3 whitespace-no-wrap text-xs lg:text-sm mb-2">
          Advanced Classes
        </p>
      </div>
    </div>
  </div>
)

const Video = () => {
  const usps = [
    "Live online classes",
    "Curated top teachers",
    "Small class size for maximum attention",
    "Visibility to progress",
    "Innovative teaching methods",
  ]
  const [activeUsp, setActiveUsp] = useState(0)
  useInterval(() => {
    if (activeUsp === usps.length - 1) {
      setActiveUsp(0)
    } else {
      setActiveUsp(activeUsp + 1)
    }
  }, 4000)
  return (
    <div className="relative w-full lg:w-8/12">
      <video
        src="/outcampus.mp4"
        autoPlay
        muted
        loop
        controls
        className="bg-gray-200 w-full rounded-md shadow-md"
      />
      <div className="absolute bottom-0 left-0 right-0 px-4 mb-32">
        <p
          className="text-white font-bold text-2xl text-center"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.80)" }}
        >
          {usps[activeUsp]}
        </p>
      </div>
    </div>
  )
}

const Patch = ({ position }) => (
  <div
    className={`absolute z-0 top-0 bottom-0 ${
      position === "left" ? "left-0" : "right-0"
      } w-1/2 bg-yellow-300`}
  />
)

export default Home
