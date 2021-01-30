import React, { useState } from "react"
import { App } from "components/layout"
import { useAuth } from "utils/useAuth"
import { Avatar, Button, Spinner } from "@chakra-ui/core"
import { truncate } from "lodash"
import { formatDistanceToNowStrict, formatDistanceToNow } from "date-fns"
import useSWR, { mutate } from "swr"

const Inbox = (props) => {
  const { token } = useAuth()
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json())
  const [user_id, setUserId] = useState(null)
  return (
    <App title="Inbox" screen="inbox">
      <div className="flex h-screen overflow-hidden">
        <div className="flex-grow-0 border-r" style={{ width: "360px" }}>
          <Sidebar fetcher={fetcher} setUserId={setUserId} />
        </div>
        <div className="flex-grow">
          <Main fetcher={fetcher} user_id={user_id} token={token} />
        </div>
      </div>
    </App>
  )
}

const Sidebar = ({ setUserId, fetcher }) => {
  const { data: messages, error } = useSWR("/api/messages", fetcher)
  return (
    <div className="h-screen">
      <div className="border-b p-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Inbox</h1>
        <input
          className="py-2 px-3 block rounded-md shadow-inner border b-gray-300 shadow-xs w-full focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          placeholder="search for students or teachers"
        />
      </div>

      <div>
        {!messages ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <div>
            {messages.map((message) => (
              <div
                className="flex items-center cursor-pointer hover:bg-gray-100 p-4"
                onClick={(e) => {
                  setUserId(message.message.user.id)
                }}
              >
                <Avatar
                  name={`${message.message.user.first_name} ${message.message.user.last_name}`}
                />
                <div className={`${message.read ? "" : "font-semibold"} ml-2`}>
                  <h2 className="text-md text-gray-900">
                    {message.message.user.first_name}{" "}
                    {message.message.user.last_name}
                  </h2>
                  <p className="text-gray-500 text-sm truncate">
                    {truncate(message.message.body, { length: 25 })}{" "}
                    <span className="text-gray-400 text-xs ml-1">
                      {formatDistanceToNowStrict(
                        new Date(message.message.created_at)
                      )}{" "}
                      ago
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const Main = ({ user_id, fetcher, token }) => {
  if (!user_id)
    return (
      <div className="flex items-center justify-center w-full h-full text-xl">
        All your messages at one place
      </div>
    )

  const [message, setMessage] = useState("")

  const { data, error } = useSWR(`/api/users/${user_id}/messages`, fetcher)

  const recipient = data && data.recipient
  const messages = data && data.messages

  return (
    <div className="h-screen">
      {!data ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="h-screen flex flex-col justify-between">
          <div className="border-b p-4">
            <div className="flex items-center py-3">
              <Avatar name={`${recipient.first_name} ${recipient.last_name}`} />
              <div className="ml-2">
                <h2 className="text-md font-bold text-gray-900">
                  {recipient.first_name} {recipient.last_name}
                </h2>
                <p className="text-xs font-semibold text-gray-500">
                  Id: TX-0620-7785
                </p>
              </div>
            </div>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            <div>
              {messages.map((message) => (
                <div
                  className={`clear-both ${
                    message.isIncoming ? "" : "float-right"
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      message.isIncoming ? "" : "justify-end"
                    }`}
                  >
                    <Avatar
                      className={message.isIncoming ? "" : "order-2"}
                      name={`${message.from.first_name} ${message.from.last_name}`}
                      size="sm"
                    />
                    <h3
                      className={`${
                        message.isIncoming ? "ml-1" : "mr-1 order-1"
                      } text-sm leading-none`}
                    >
                      {message.from.first_name} {message.from.last_name}
                    </h3>
                    <p
                      className={`text-xs text-gray-400 ${
                        message.isIncoming ? "ml-2" : "mr-2 order-first"
                      }`}
                    >
                      {formatDistanceToNow(new Date(message.sent_at))} ago
                    </p>
                  </div>
                  <div
                    className={`bg-yellow-200 shadow-sm p-3 mt-4 rounded-md max-w-lg text-sm ml-6 mb-10 ${
                      message.isIncoming ? "float-left" : "float-right"
                    }`}
                  >
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-32 border-t p-4">
            <div className="flex">
              <textarea
                className="w-full h-24 flex-grow p-2 shadow-inner border b-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 rounded-md"
                placeholder="Type your message here"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                }}
              />
              <Button
                className="ml-3"
                variantColor="yellow"
                onClick={(e) => {
                  console.log(message)
                  fetch("/api/messages", {
                    method: "POST",
                    headers: {
                      authorization: `Bearer ${token}`,
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      message,
                      to: user_id,
                    }),
                  })
                    .then(() => {
                      mutate(`/api/users/${user_id}/messages`, data)
                      setMessage("")
                    })
                    .catch((error) => {
                      console.error(error)
                    })
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inbox
