import React, { useState, Fragment } from "react"
import { Avatar, Badge } from "@chakra-ui/core"
import pluralize from "pluralize"
import { times } from "lodash"
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share"

const Hero = ({
  className,
  id,
  title,
  description,
  objective,
  category,
  cover,
  level,
  rating,
  ratingCount,
  enrollment,
  teacher,
  permalink,
  price,
}) => {
  return (
    <article className={className}>
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="lg:w-7/12 lg:pr-16 flex flex-col justify-between order-1 lg:order-0">
          <div>
            <div>
              <Badge>{category}</Badge>
              <Badge className="ml-4">{level}</Badge>
            </div>
            <h1 className="text-4xl my-4 font-bold text-gray-800 leading-none">
              {title}
            </h1>
            <p className="my-4 text-sm">{description}</p>
            <p className="my-4 text-sm">
              <span className="font-bold">What will you learn:</span>
              <span className="ml-2">{objective}</span>
            </p>
            <div className="flex items-center">
              {rating && (
                <div className="mr-4 ">
                  <Rating rating={rating} ratingCount={ratingCount} />
                </div>
              )}
              <div className="text-xs">
                {enrollment} {pluralize("student", enrollment)} enrolled
              </div>
            </div>
            <div className="flex items-center my-6">
              <Avatar
                name={`${teacher.first_name} ${teacher.last_name}`}
                src={teacher.avatar}
              />
              <div className="ml-3 flex items-center text-sm">
                <span className="font-medium">
                  {teacher.first_name} {teacher.last_name}
                </span>
                {teacher.academy && (
                  <Fragment>
                    <span className="mx-1">|</span>
                    <span>{teacher.academy}</span>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="order-0 lg:order-1 lg:w-5/12 flex-shrink-0 mb-6 lg:mb-0">
          <img className="rounded-lg" src={cover} />
        </div>
      </div>
      <div className="lg:flex items-center">
        <div>
          <Enroll courseId={id} price={price} />
        </div>
        <div className="mt-4 lg:ml-6 lg:mt-0">
          <Share url={permalink} title={title} description={description} />
        </div>
      </div>
    </article>
  )
}

const Enroll = ({ courseId, price }) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <button className="w-full bg-yellow-300 cursor-pointer py-4 px-10 rounded-lg flex items-center justify-center transition duration-300 hover:shadow-lg">
      <span className="font-semibold text-lg">Enroll for ₹{price}</span>{" "}
      <span className="ml-4 text-xs">(+ 18% GST)</span>
    </button>
  )
}

const Share = ({ url, title, description }) => {
  return (
    <div className="flex items-center">
      <span className="py-3 px-4 flex items-center text-gray-700">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
        </svg>
        <span className="ml-2">Share</span>
      </span>
      <div className="flex items-center">
        <FacebookShareButton url={url} quote={title} className="mr-1">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title} className="mx-1">
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton
          url={url}
          title={title}
          summary={description}
          className="mx-1"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={url} title={title} className="ml-1">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  )
}

const Rating = ({ rating, ratingCount }) => {
  return (
    <div className="flex items-center">
      <Stars rating={rating} />
      <div className="text-xs ml-4">
        {rating} ({ratingCount} Ratings)
      </div>
    </div>
  )
}

const Stars = ({ rating }) => {
  const noOfStars = Math.round(rating)
  return (
    <div className="flex">
      {times(5).map((index) => (
        <span
          className={index < noOfStars ? "text-yellow-300" : "text-gray-300"}
          key={`star-${index}`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
        </span>
      ))}
    </div>
  )
}

export default Hero
export { Share }
