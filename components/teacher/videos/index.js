import React, { useState, useEffect } from "react"
import Link from "next/link"
import Plyr from "plyr"
import { useRouter } from "next/router"
import { useAuth } from "../../../utils/useAuth"



let french_videos = {
    name: "French",
    p1: {
        age: "6-9",
        teacher: "",
        level: "Introduction to French Part 1",
        date: "",
        name: "French",
        header: "6-9 Introduction to French Part 1",
        courses: ["https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+1.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+2.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+3.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+4.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+5.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+6.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+7.mp4"],
    },
    p2: {
        age: "6-9",
        teacher: "",
        level: "Introduction to French Part 2",
        date: "",
        name: "French",
        header: "6-9 Introduction to French Part 2",
        courses: ["https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+151/Course+151+Session+1+.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+151/Course+151+Session+2.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+151/Course+151+Session+3.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+151/Course+151+Session+4.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+151/Course+151+Session+5.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+151/Course+151+Session+6.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+151/Course+151+Session+7.mp4"],
    },
    p3: {
        age: "10-16",
        teacher: "",
        level: "Introduction to French Part 1",
        date: "",
        name: "French",
        header: "10-16 Introduction to French Part 1",
        courses: [
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+44/Course+44+Session+1.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+44/Course+44+Session+2.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+44/Course+44+Session+3.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+44/Course+44+Session+4.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+44/Course+44+Session+5.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+44/Course+44+Session+6.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+44/Course+44+Session+7.mp4",
        ]
    },
    p4: {
        age: "10-16",
        teacher: "",
        level: "Introduction to French Part 2",
        date: "",
        name: "French",
        header: "10-16 Introduction to French Part 2",
        courses: [
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+152/Course+152+Session+1.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+152/Course+152+Session+2.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+152/Course+152+Session+3.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+152/Course+152+Session+4.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+152/Course+152+Session+5.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+152/Course+152+Session+6.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+152/Course+152+Session+7.mp4",
        ]
    }
}

let speakers_videos = {
    name: "Young Speaker",
    p1: {
        age: "6-7",
        teacher: "Miti",
        level: "",
        date: "19/8/2020",
        name: "Young Speaker",
        header: "6-7 Miti",
        courses: ["https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+1.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+2.mp4"],
    },
    p2: {
        age: "8-9",
        teacher: "Shivangi",
        level: "",
        date: "15/8/2020",
        name: "Young Speaker",
        header: "8-9 Shivangi",
        courses: ["https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+1.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+2.mp4"],
    },
    p3: {
        age: "8-9",
        teacher: "Vaishali",
        level: "",
        date: "15/8/2020",
        name: "Young Speaker",
        header: "8-9 Vaishali",
        courses: ["https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+1.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Course+43/Course+43+Session+2.mp4"],
    },
    p4: {
        age: "",
        teacher: "",
        level: "",
        date: "",
        name: "",
        header: "",
        courses: [],
    }
}
let training_videos = {
    name: "Personality Development",
    p1: {
        age: "10-12",
        teacher: "Aashi",
        level: "",
        date: "",
        name: "Personality Development",
        header: "10-12 Aashi",
        courses: ["https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Skillsphere/PD+%5B10-12%5D+Aashi.mp4",
            "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Skillsphere/PD+%5B10-12%5D+aashi+(2).mp4"]
    },
    p2: {
        age: "6-9",
        teacher: "Pranjali",
        level: "",
        date: "",
        name: "Personality Development",
        header: "6-9 Pranjali",
        courses: ["https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Skillsphere/PD+%5B6-9%5D+Pranjali.mp4",
        "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Skillsphere/PD+%5B6-9%5D+Pranjali(1).mp4",
        "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Skillsphere/PD+%5B6-9%5D+Pranjali(2).mp4",
        "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Skillsphere/PD+%5B6-9%5D+Pranjali(3).mp4",
        "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Skillsphere/PD+%5B6-9%5D+(1).mp4",
        "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Skillsphere/PD+%5B6-9%5D+(2).mp4",
        "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Skillsphere/PD+%5B6-9%5D+(3).mp4",
        "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Skillsphere/PD+%5B6-9%5D+(4).mp4",
        "https://outcampus-class-recordings.s3.ap-south-1.amazonaws.com/Skillsphere/PD+%5B6-9%5D.mp4"],
    },
    p3: {
        age: "",
        teacher: "",
        level: "",
        date: "",
        name: "",
        header: "",
        courses: [],
    },
    p4: {
        age: "",
        teacher: "",
        level: "",
        date: "",
        name: "",
        header: "",
        courses: [],
    }
}

const Dashboard = (props) => {
    const [videos, setVideos] = useState(french_videos);
    const [header, setHeader] = useState('French');
    const [showContent, setShowContent] = useState(false);

    const router = useRouter();
    const { role, token, user, isGoogleLogin } = useAuth();

    useEffect(() => {
        console.log('abhi useeffect ', videos.length);
    }, [videos]);

    useEffect(() => {
        if (role === 'teacher') {

        } else {
            router.push("/login");
        }
    }, [role])

    return (
        <div className="min-h-screen">
            <div className="h-20">
                <div
                    className="h-20 fixed w-full z-50 shadow-lg text-black bg-white"
                >
                    <div className="h-20 m-auto max-w-screen-xl flex lg:justify-between items-center px-4 lg:px-8">
                        <div className="flex justify-between w-full lg:w-auto items-center">
                            <Link href="/">
                                <a className="text-2xl font-extrabold text-gray-800">
                                    <img src="/img/outcampus-logo.svg" className="h-8 lg:h-12" />
                                </a>
                            </Link>
                        </div>

                        <div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8">
                {showContent ?
                    <Content data={videos} setShowContent={setShowContent} />
                    :
                    <NavBar setVideos={setVideos} setHeader={setHeader} setShowContent={setShowContent} />
                }
            </div>
        </div>
    )
}

export default Dashboard

const NavBar = ({ setVideos, setHeader, setShowContent }) => {
    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-4xl h-74 font-semibold text-center mt-6">
                <label>Courses</label>
            </div>
            <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                    <button
                        type="button"
                        className="h-74 w-full flex justify-center py-2 px-4 border border-transparent text-4xl font-medium text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:border-yellow-400 focus:shadow-outline-yellow active:bg-yellow-400 transition duration-150 ease-in-out"
                        onClick={(e) => {
                            setVideos(french_videos)
                            setHeader('French')
                            setShowContent(true)
                        }}
                    >
                        French
                    </button>
                </span>
            </div>
            <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                    <button
                        type="button"
                        className="h-74 w-full flex justify-center py-2 px-4 border border-transparent text-4xl font-medium text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:border-yellow-400 focus:shadow-outline-yellow active:bg-yellow-400 transition duration-150 ease-in-out"
                        onClick={(e) => {
                            setVideos(speakers_videos)
                            setHeader('Young speakers program')
                            setShowContent(true)
                        }}
                    >
                        Young speakers program
                    </button>
                </span>
            </div>
            <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                    <button
                        type="button"
                        className="h-74 w-full flex justify-center py-2 px-4 border border-transparent text-4xl font-medium text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:border-yellow-400 focus:shadow-outline-yellow active:bg-yellow-400 transition duration-150 ease-in-out"
                        onClick={(e) => {
                            setVideos(training_videos)
                            setHeader('Teacher Training Demo')
                            setShowContent(true)
                        }}
                    >
                        Teacher Training Demo
                    </button>
                </span>
            </div>
        </div>
    )
}

const Content = ({ data, setShowContent }) => {

    return (
        <div>
            <div class="absolute top-0 right-0 mt-10 mr-5">
                <button class="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                    onClick={(e) => {
                        setShowContent(false)
                    }}>
                    Back
                    </button>
            </div>
            <div className="flex my-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="w-full">
                    <span className="block w-full rounded-md shadow-sm">
                        <button
                            type="button"
                            className="h-74 text-4xl w-full flex justify-center py-2 px-4 border border-transparent font-medium text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:border-yellow-400 focus:shadow-outline-yellow active:bg-yellow-400 transition duration-150 ease-in-out"
                        >
                            {data.name}
                        </button>
                    </span>
                </div>
            </div>
            <Card videos={data['p1']['courses'].length ? data['p1']['courses'] : []} text={data['p1'].header} age="age6" part="p1" />
            <Card videos={data['p2']['courses'].length ? data['p2']['courses'] : []} text={data['p2'].header} age="age6" part="p2" />
            <Card videos={data['p3']['courses'].length ? data['p3']['courses'] : []} text={data['p3'].header} age="age10" part="p1" />
            <Card videos={data['p4']['courses'].length ? data['p4']['courses'] : []} text={data['p4'].header} age="age10" part="p2" />
        </div>
    )
}

const Card = ({ videos, text, age, part }) => {

    return (
        videos && videos.length ? (
            <div class="text-center mt-8">
                <label class="font-semibold text-base">{text}</label>
                <div className="flex flex-wrap justify-start mt-4">
                    {
                        videos.map((url, index) => {
                            return (
                                <VideoCpm url={url} key={`video-${index}`} age={age} part={part} index={index} />
                            )
                        })
                    }
                </div>
            </div>
        ) : ""
    )
}

const VideoCpm = ({ url, age, part, index }) => {

    useEffect(() => {
        const player = new Plyr("#player" + age + part + index, {
            settings: ["speed", "loop"],
            controls: [
                "play-large",
                "progress",
                "current-time",
                "volume",
                "settings",
                "pip",
                "airplay",
                "fullscreen",
            ],
            disableContextMenu: true,
            hideControls: true,
            ratio: "16:9",
        })
    })

    return (
        <div className="session-card-player w-80 lg:pr-6 lg:w-1/4 mb-6">
            <video id={"player" + age + part + index} playsInline controls>
                <source src={url} type="video/mp4" />
            </video>
        </div>
    );
}