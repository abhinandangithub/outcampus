import React from "react"

const Alert = ({ type, message }) => {
  return (
    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm leading-5 font-medium text-red-800">
            {message}
          </h3>
          {/* <div className="mt-2 text-sm leading-5 text-red-700">
        <ul className="list-disc pl-5">
          <li>
            Your password must be at least 8 characters
          </li>
          <li className="mt-1">
            Your password must included at least one pro wrestling finishing move
          </li>
        </ul>
      </div> */}
        </div>
      </div>
    </div>
  )
}

export default Alert
