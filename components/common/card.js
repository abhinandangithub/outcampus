import React from "react"
import { Badge, Avatar } from "@chakra-ui/core"

const Card = ({ title, description, image, tags, teacher, subject }) => {
  const backgrounds = [
    "https://docs.begin.com/_static/backgrounds/gradient-green-blue-sm-c9fc366f6d.png",
    "https://docs.begin.com/_static/backgrounds/gradient-pink-blue-sm-5197579d69.png",
    "https://docs.begin.com/_static/backgrounds/gradient-purple-green-sm-af0f00770d.png",
    "https://docs.begin.com/_static/backgrounds/gradient-pink-purple-sm-79754a6705.png",
  ]
  const background = backgrounds[Math.floor(Math.random() * backgrounds.length)]
  return (
    <article className="w-64 shadow-lg rounded overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
        className="h-40 relative"
      ></div>
      <div className="p-3">
        <Badge>{subject}</Badge>
        <p className="text-lg leading-snug font-medium">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      <footer className="mt-4 p-3 border-t border-gray-100">
        <Avatar name={teacher} size="sm" />
        <span>{teacher}</span>
      </footer>
    </article>
  )
}

const LongCard = ({ course }) => {
  return (
    <article className="border-b border-gray-200 px-3 py-5 hover:bg-gray-50 flex justify-between">
      <div className="w-1/4">
        <img src={course.cover} />
      </div>
      <div className="w-3/4 pl-4">
        <h1 className="font-semibold text-xl mb-2">{course.title}</h1>

        <p className="text-gray-800">{course.summary}</p>
        <footer className="mt-6 flex justify-between text-sm font-medium text-gray-500">
          <div className="">
            Ages {course.age_min} - {course.age_max}
          </div>
          <div className="">
            Class Size {course.size_min} - {course.size_max}
          </div>
          <div>{course.format}</div>
        </footer>
      </div>
    </article>
  )
}

export default Card
export { LongCard }
