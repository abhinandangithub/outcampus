import { random } from "lodash"
import { format } from "date-fns"

const getRandomAlphabet = () => {
  var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  return randomChars.charAt(Math.floor(Math.random() * randomChars.length))
}

const getRandomNumber = (length) => {
  // Support 4 and 5 digits for now as others aren't needed
  return length === 4 ? random(1000, 9999) : random(10000, 99999)
}

const generateOutcampusId = (role) => {
  const monthYearString = format(new Date(), "MMyy")
  return role === "teacher"
    ? `T${getRandomAlphabet()}-${monthYearString}-${getRandomNumber(4)}`
    : `S${getRandomAlphabet()}-${monthYearString}-${getRandomNumber(5)}`
}

const generateCourseId = () => {
  const monthYearString = format(new Date(), "MMyy")
  return `C${getRandomAlphabet()}-${monthYearString}-${getRandomNumber(5)}`
}

export { generateOutcampusId, generateCourseId }
