import React, { Fragment, useState, useEffect, useRef } from "react"
import Link from "next/link"

const LetsGetStarted = () => {
    return (
        <div className="flex m-auto h-80 flex-col md:flex-row justify-center w-full bg-yellow-300 mb-1">
            <div className="flex flex-row max-w-screen-xl w-full justify-center">
                <div className="flex flex-col md:flex-row justify-between w-full md:mx-12 mx-4 my-auto">
                    <div className="flex flex-col">
                        <span className="block text-4xl font-bold">Let's Get Started!</span>
                        <span className="block w-full md:w-2/3 mt-6">Experience Outcampus - A new way of learning.
Get a free trial for our program right away.</span>
                    </div>
                    <div className="my-4 md:my-auto">
                        <Link href="/register">
                            <span className="flex flex-row justify-center bg-gray-700 px-4 py-2 mx-auto hover:bg-gray-800 cursor-pointer">

                                <span className="mx-6 text-center text-lg text-white">Start your free trial</span>

                                <img src="/img/home/testimonials/arrow-right.svg"></img>
                            </span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default LetsGetStarted