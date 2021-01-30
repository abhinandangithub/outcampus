import React, { Fragment, useState, useEffect, useRef } from "react"

const Testimonials = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);

    function reset() {
        setSeconds(0);
        setIsActive(false);
    }

    const testimonials = [
        {
            img: "/img/home/testimonials/sample-img.png",
            text: "“Akshat has always been a shy and introverted kid. Kudos to Outcampus for helping my child build confidence! He is more expressive now and is able to speak his mind. He also interacts more in his school classes and his English has improved tremendously. Will recommend this course to everyone!”",
            name: "Akshat's Mom"
        },
        {
            img: "/img/home/testimonials/sample-img.png",
            text: "“I have seen a major improvement in Aditya’s communication skills.He used to speak in Hindi most of the time and now has started speaking in English even at home.The weekly feedback provided by the teachers gave a better understanding of my kid’s weaknesses.The sessions were incredibly interactive and fun.Looking forward to more such sessions!!”",
            name: "Aditya's Mom"
        },
        {
            img: "/img/home/testimonials/sample-img.png",
            text: "“The activities made Pihu think outside the box and enhanced her creativity. The Young leader program helped my child to get interested and put on her thinking hat which otherwise always has been a difficult task for me”",
            name: "Pihu's Mom"
        },
    ]
    const indexCount = testimonials.length - 1;

    function handleBack() {
        if (currentIndex == 0) {
            setCurrentIndex(indexCount)
        } else {
            setCurrentIndex(currentIndex - 1)
        }
    }
    function handleForward() {
        if (currentIndex == indexCount) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1)
        }
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                handleForward();
            }, 5000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <div className="flex mx-auto flex-col md:flex-row justify-center w-full bg-gray-800 py-12">
            <div className="flex flex-col px-1 md:px-2 max-w-screen-xl w-full md:mt-10">
                <div className="text-3xl pt-2 md:p-0 md:text-normal text-yellow-300">TESTIMONIALS</div>
                <div className="text-white text-2xl md:text-4xl mt-4 text-left">Few of our valuable client</div>
                <div className="flex flex-col">
                    <div className="w-auto hidden md:block text-white self-end">
                        {
                            testimonials.map((testimonial, index) => {
                                return <span key={index} className={"inline-block text-white w-5 h-5 mx-2 " + (currentIndex == index ? "bg-yellow-300" : "bg-white")}></span>
                            })
                        }


                    </div>

                    {
                        testimonials.map((testimonial, index) => {
                            return (
                                <div className={"flex-col md:flex-row px-2 py-2 md:m-10 md:py-2 " + (currentIndex == index ? "flex" : "hidden")}>
                                    {/* <div className="w-full md:w-5/12">
                                        <img src={testimonial.img}></img>
                                    </div> */}
                                    <div className="flex flex-col m-2 w-full md:m-8 md:w-12/12">
                                        <div className="py-4 my-0 md:my-2 text-white break-words h-80 md:h-40">
                                            <img src="/img/home/testimonials/quote.svg" className="m-2"></img>
                                            <div className="py-4">{testimonial.text}</div>                                            
                                        </div>
                                        <div className="text-white my-2 md:my-4 font-semibold block">
                                            {testimonial.name}
                                        </div>
                                        <div className="flex flex-row mt-2 space-x-1">
                                            <span className="px-6 py-4 bg-yellow-300" onClick={() => { handleBack(); setIsActive(false) }}>
                                                <img src="/img/home/testimonials/arrow-left.svg"></img>
                                            </span>
                                            <span className="px-6 py-4 bg-yellow-300" onClick={() => { handleForward(); setIsActive(false) }}>
                                                <img src="/img/home/testimonials/arrow-right.svg"></img>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Testimonials