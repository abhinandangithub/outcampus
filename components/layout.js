import React, { useState, Fragment, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import authService from "./public/auth/authService"
import { useRouter } from "next/router"
import { useAuth } from "../utils/useAuth"
import ClickOutside from "react-click-outside"

import {
  Power,
  Home,
  CreditCard,
  Inbox,
  User,
  Menu,
  Facebook,
  Instagram,
  Award,
  Search,
  X,
} from "react-feather"
import { useDisclosure } from "@chakra-ui/core"
import { useGoogleLogout } from "react-google-login"

const App = ({ title, children, screen }) => {
  const { role, token, user, isGoogleLogin } = useAuth()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { signOut, loaded } = useGoogleLogout({
    // @TODO: Move this to env variables
    clientId:
      "133325719695-l7pu1ha53kva8gp2no4qd1gl947i8nkv.apps.googleusercontent.com",
    onLogoutSuccess: () => {
      authService.logout().then(() => {
        router.push("/login")
      })
    },
    onFailure: () => {
      console.error("Logout failed")
    },
  })
  useEffect(() => {
    if (
      (["teacher", "student"].includes(role) && (!token || !user)) ||
      role === "guest"
    ) {
      signOut()
    }
  }, [role])
  if (role === "guest") return null

  return (
    <div>
      <Head>
        <title>{title} - Outcampus</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

        <meta name="title" content="Live online classes for kids" />
        <meta
          name="description"
          content="Outcampus is a platform that provides live online classes in extra-curricular learnings for children aged between 3 and 18"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://outcampus.in/" />
        <meta property="og:title" content="Live online classes for kids" />
        <meta
          property="og:description"
          content="Outcampus is a platform that provides live online classes in extra-curricular learnings for children aged between 3 and 18"
        />
        <meta
          property="og:image"
          content="https://outcampus.in/img/hero.jpeg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://outcampus.in/" />
        <meta property="twitter:title" content="Live online classes for kids" />
        <meta
          property="twitter:description"
          content="Outcampus is a platform that provides live online classes in extra-curricular learnings for children aged between 3 and 18"
        />
        <meta
          property="twitter:image"
          content="https://outcampus.in/img/hero.jpeg"
        />
        <meta name="viewport" content="width=device-width"></meta>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <div className="h-screen flex overflow-hidden bg-cool-gray-50">
        {isOpen && (
          <div className="md:hidden">
            <div className={`fixed inset-0 z-40 ${isOpen ? "flex" : "hidden"}`}>
              <div
                className={`fixed inset-0 transition-opacity ease-linear duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0"
                  }`}
              >
                <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
              </div>

              <div
                className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800 transition ease-in-out duration-300 transform ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
              >
                {isOpen && (
                  <div className="absolute top-0 right-0 -mr-14 p-1">
                    <button
                      className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                      aria-label="Close sidebar"
                      onClick={onClose}
                    >
                      <svg
                        className="h-6 w-6 text-white"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                <div className="flex-shrink-0 flex items-center px-4">
                  <Link href="/">
                    <a>
                      <img
                        className="h-8 w-auto"
                        src="/img/outcampus-logo.svg"
                        alt="Outcampus"
                      />
                    </a>
                  </Link>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="mt-5 flex-1 px-2 bg-gray-800">
                    <Fragment>
                      <Link href="/dashboard">
                        <a
                          className={`${
                            screen === "dashboard"
                              ? "text-white bg-gray-900"
                              : "text-gray-300 hover:bg-gray-700"
                            } group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md  focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150`}
                        >
                          <Home className="mr-3" size={20} />
                          Dashboard
                        </a>
                      </Link>

                      {role === "student" && (
                        <Link href="/courses">
                          <a
                            className={`${
                              screen === "courses"
                                ? "text-white bg-gray-900"
                                : "text-gray-300 hover:bg-gray-700"
                              } mt-2 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md  focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150`}
                          >
                            <Search className="mr-3" size={20} />
                            Our Courses
                          </a>
                        </Link>
                      )}

                      <Link href="/payment">
                        <a
                          className={`${
                            screen === "payment"
                              ? "text-white bg-gray-900"
                              : "text-gray-300 hover:bg-gray-700"
                            } mt-2 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md  focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150`}
                        >
                          <CreditCard className="mr-3" size={20} />
                          Payment
                        </a>
                      </Link>

                      <Link href="/performance">
                        <a
                          className={`${
                            screen === "performance"
                              ? "text-white bg-gray-900"
                              : "text-gray-300 hover:bg-gray-700"
                            } mt-2 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md  focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150`}
                        >
                          <Award className="mr-3" size={20} />
                          Performance
                        </a>
                      </Link>

                      <Link href="/inbox">
                        <a
                          className={`${
                            screen === "inbox"
                              ? "text-white bg-gray-900"
                              : "text-gray-300 hover:bg-gray-700"
                            } mt-2 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md  focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150`}
                        >
                          <Inbox className="mr-3" size={20} />
                          Inbox
                        </a>
                      </Link>

                      <Link href="/profile">
                        <a
                          className={`${
                            screen === "profile"
                              ? "text-white bg-gray-900"
                              : "text-gray-300 hover:bg-gray-700"
                            } mt-2 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md  focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150`}
                        >
                          <User className="mr-3" size={20} />
                          Profile
                        </a>
                      </Link>
                    </Fragment>
                  </nav>
                </div>
              </div>
              <div className="flex-shrink-0 w-14"></div>
            </div>
          </div>
        )}

        {/* <!-- Static sidebar for desktop --> */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-gray-800">
            <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div>
                <Link href="/">
                  <a>
                    <img className="px-2" src="/img/outcampus_logo_white-long.svg" />
                  </a>
                </Link>
              </div>
              {/* <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-white text-sm font-semibold">
                  Outcampus <span className="font-thin">{role}</span>
                </h1>
              </div> */}
              {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
              <nav className="mt-5 flex-1 px-2 bg-gray-800">
                <Fragment>
                  <Link href="/dashboard">
                    <a
                      className={`${
                        screen === "dashboard"
                          ? "text-white bg-gray-900"
                          : "text-gray-300 hover:bg-gray-700"
                        } group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md  focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150`}
                    >
                      <Home className="mr-3" size={20} />
                      Dashboard
                    </a>
                  </Link>

                  {/* {role === "student" && (
                    <Link href="/courses">
                      <a
                        className={`${
                          screen === "courses"
                            ? "text-white bg-gray-900"
                            : "text-gray-300 hover:bg-gray-700"
                          } mt-2 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md  focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150`}
                      >
                        <Search className="mr-3" size={20} />
                        Find courses
                      </a>
                    </Link>
                  )} */}

                  <Link href="/payment">
                    <a
                      className={`${
                        screen === "payment"
                          ? "text-white bg-gray-900"
                          : "text-gray-300 hover:bg-gray-700"
                        } mt-2 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md  focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150`}
                    >
                      <CreditCard className="mr-3" size={20} />
                      Payment
                    </a>
                  </Link>

                  <Link href="/performance">
                    <a
                      className={`${
                        screen === "performance"
                          ? "text-white bg-gray-900"
                          : "text-gray-300 hover:bg-gray-700"
                        } mt-2 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md  focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150`}
                    >
                      <Award className="mr-3" size={20} />
                      Performance
                    </a>
                  </Link>

                  <Link href="/inbox">
                    <a
                      className={`${
                        screen === "inbox"
                          ? "text-white bg-gray-900"
                          : "text-gray-300 hover:bg-gray-700"
                        } mt-2 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md  focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150`}
                    >
                      <Inbox className="mr-3" size={20} />
                      Inbox
                    </a>
                  </Link>

                  <Link href="/profile">
                    <a
                      className={`${
                        screen === "profile"
                          ? "text-white bg-gray-900"
                          : "text-gray-300 hover:bg-gray-700"
                        } mt-2 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md  focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150`}
                    >
                      <User className="mr-3" size={20} />
                      Profile
                    </a>
                  </Link>
                </Fragment>
              </nav>
            </div>
            <div>
              <div className="bg-gray-700 py-4 px-2 flex items-start justify-start w-full mt-1 px-2 py-2 text-sm leading-5 font-medium text-gray-300">
                {user && (
                  <img
                    className="inline-block w-12 h-12 rounded-full shadow-lg"
                    src={user.avatar || `/img/${role}.svg`}
                  />
                )}
                <div className="ml-3">
                  {user && (
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  )}
                  {user && <p className="text-xs">{user.outcampus_id}</p>}
                  <div className="mt-2">
                    <a
                      className="hover:underline cursor-pointer flex items-center text-sm"
                      onClick={
                        isGoogleLogin
                          ? signOut
                          : () => {
                            authService.logout().then(() => {
                              router.push("/login")
                            })
                          }
                      }
                    >
                      <span className="mr-1">Logout</span>
                      <Power size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button
              className={`-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-300 relative ${
                isOpen ? "opacity-0" : "z-40 opacity-100"
                }`}
              aria-label="Open sidebar"
              onClick={onOpen}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <main className="flex-1 relative z-0 overflow-y-auto" tabIndex="0">
            <div>{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

const Page = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-cool-gray-50">
      <Head>
        <title>{title} - Outcampus</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div className="bg-yellow-300">
        <div className="h-16 max-w-screen-xl m-auto flex justify-between items-center">
          <div>
            <Link href="/">
              <a className="text-2xl font-bold text-gray-900">Outcampus</a>
            </Link>
          </div>
          <div>Logout</div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

const AdminLayout = ({ title, children, tab, setTab, role }) => {
  return (
    <div className="h-screen flex overflow-hidden bg-cool-gray-50">
      <Head>
        <title>{title} - Outcampus Admin</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-gray-800">
          <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-white text-xl font-semibold">
                Outcampus <span className="font-thin">admin</span>
              </h1>
            </div>
            {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
            <nav className="mt-5 flex-1 px-2 bg-gray-800">
              <button
                className="w-full mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
                onClick={(e) => {
                  setTab("courses")
                }}
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
                  />
                </svg>
                Courses
              </button>

              <button
                className="w-full mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
                onClick={(e) => {
                  setTab("course categories")
                }}
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                Course categories
              </button>

              {role === "super_admin" && (
                <button
                  className="w-full mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
                  onClick={(e) => {
                    setTab("admins")
                  }}
                >
                  <svg
                    className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Admins
                </button>
              )}

              <button
                className="w-full mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
                onClick={(e) => {
                  setTab("Student Mappings")
                }}
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
                  />
                </svg>
                Student Mappings
              </button>

              <button
                className="w-full mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
                onClick={(e) => {
                  setTab("teachers")
                }}
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                Teachers
              </button>

              <button
                className="w-full mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
                onClick={(e) => {
                  setTab("students")
                }}
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                Students
              </button>
            </nav>
          </div>
          <div className="flex-shrink-0 flex bg-gray-700">
            <button
              className="w-full group block  p-4"
              onClick={(e) => {
                localStorage.removeItem("session")
                location.reload()
              }}
            >
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm leading-5 font-medium text-white">
                    Sign out
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            aria-label="Open sidebar"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <main
          className="flex-1 relative z-0 overflow-y-auto pt-2 pb-6 focus:outline-none md:py-6"
          tabIndex="0"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* <!-- Replace with your content --> */}
            <div className="py-4">{children}</div>
            {/* <!-- /End replace --> */}
          </div>
        </main>
      </div>
    </div>
  )
}

const PublicLayout = ({ title, bgColor, children }) => {
  const { role, token, isGoogleLogin } = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
  const { signOut } = useGoogleLogout({
    clientId:
      "133325719695-l7pu1ha53kva8gp2no4qd1gl947i8nkv.apps.googleusercontent.com",
    onLogoutSuccess: () => {
      authService.logout().then(() => {
        router.push("/login")
      })
    },
    onFailure: () => {
      console.error("Logout failed")
    },
  })

  return (
    <div className="min-h-screen">
      <Head>
        <title>{title} - Outcampus</title>
      </Head>
      <div className="h-20">
        <div
          className="h-20 fixed w-full z-50 shadow-lg text-white" style={{ backgroundColor: "#3E3D3D" }}
        >
          <div className="h-20 m-auto max-w-screen-xl flex lg:justify-between items-center px-4 lg:px-8">
            <div className="flex justify-between w-full lg:w-auto items-center">
              <Link href="/">
                <a className="text-2xl font-extrabold text-gray-800">
                  <img src="/img/outcampus_logo_white-long.svg" className="h-8 lg:h-12" />
                </a>
              </Link>
            </div>

            <div>
              <ClickOutside onClickOutside={(e) => setShowMenu(false)}>
                {showMenu ? (
                  <button
                    className="text-white h-12 pl-4 lg:hidden fixed top-0 right-0 mt-4 mr-4"
                    onClick={(e) => {
                      setShowMenu(false)
                    }}
                  >
                    <X />
                  </button>
                ) : (
                    <button
                      className="text-white h-12 pl-4 lg:hidden fixed top-0 right-0 mt-4 mr-4"
                      onClick={(e) => {
                        setShowMenu(true)
                      }}
                    >
                      <Menu />
                    </button>
                  )}
                <nav
                  style={{
                    backgroundColor: showMenu ? "#3e3d3d" : "transparent",
                  }}
                  className={`${
                    showMenu ? "block" : "hidden"
                    } lg:block fixed top-0 left-0 right-0 lg:relative flex flex-col lg:flex-row mt-20 lg:mt-0 lg:bg-transparent  bg-gray-900 p-3 lg:items-center w-full`}
                >
                  {/* <Link href="/courses">
                    <a className="lg:mx-3 py-2 px-2 hover:underline text-white hover:text-gray-400 transition duration-300">
                      Find courses
                    </a>
                  </Link> */}
                  {token ? (
                    <Fragment>
                      <Link href="/dashboard">
                        <a className="lg:mx-3 py-2 px-2 hover:underline text-white hover:text-gray-400 transition duration-300">
                          Dashboard
                        </a>
                      </Link>
                      <a
                        className="ml-2 border border-yellow-300 text-yellow-300 py-2 px-4 rounded shadow-md cursor-pointer hover:border-white hover:text-white transition duration-300"
                        onClick={
                          isGoogleLogin
                            ? signOut
                            : () => {
                              authService.logout().then(() => {
                                router.push("/login")
                              })
                            }
                        }
                      >
                        Logout
                      </a>
                    </Fragment>
                  ) : (
                      <Fragment>
                        <Link href="/signup?role=student">
                          <a className="lg:mx-3 py-2 px-2 hover:underline text-white hover:text-gray-400 transition duration-300">
                            Sign up
                        </a>
                        </Link>
                        <Link href="/login">
                          <a className="lg:ml-3 py-2 px-4 border border-yellow-300 bg-yellow-300 rounded text-black hover:border-white hover:text-gray-400 transition duration-300 text-center">
                            Login
                        </a>
                        </Link>
                      </Fragment>
                    )}
                </nav>
              </ClickOutside>
            </div>
          </div>
        </div>
      </div>
      <div>{children}</div>
      <div className="bg-yellow-300">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row content-around pt-4">
          <div className="flex flex-1 min-w-md items-center justify-center">
            <img src="/img/logo-black-long.svg" className="w-2/3 lg:w-1/2" />
          </div>
          <div className="flex flex-1 min-w-md items-center justify-center">
            <div>
              <nav>
                <ul>
                  <li>
                    <a
                      className="p-1 block hover:underline lg:text-lg"
                      href="/about"
                      target="_blank"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="p-1 block hover:underline lg:text-lg"
                      href="/contact"
                      target="_blank"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="p-1 block hover:underline lg:text-lg"
                      href="/terms.pdf"
                      target="_blank"
                    >
                      Terms and Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      className="p-1 block hover:underline lg:text-lg"
                      href="/privacy.pdf"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className="p-1 block hover:underline lg:text-lg"
                      href="/refunds.pdf"
                      target="_blank"
                    >
                      Cancellation and Refund
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          {/* <div className="flex flex-1 min-w-md items-center justify-center">
            <div className="mx-auto my-auto pt-10">
              <p><span className="text-xl">Plush Technologies Private Limited</span><br />
            241, Ranka Heights, <br />
            Domlur, Bangalore <br />
            Pincode : 560071 <br /> <br /><br /> <br /><br /></p>
            </div>

          </div> */}
        </div>
        <div className="flex max-w-screen-xl mx-auto justify-center py-2">
          <a
            className="transition-transform transform hover:scale-110 duration-300"
            href="https://www.facebook.com/OutCampus-106711891060205"
          >
            <Facebook className="w-6 h-6 lg:w-8 lg:h-8" />
          </a>
          <a
            className="transition-transform transform hover:scale-110 duration-300 mx-8"
            href="https://www.instagram.com/outcampus.in/"
          >
            <Instagram className="w-6 h-6 lg:w-8 lg:h-8" />
          </a>
          <a
            target="_blank"
            className="transition-transform transform hover:scale-110 duration-300"
            href="https://api.whatsapp.com/send?phone=919035777011&text=hi&lang=en"
          >
            <img
              src="/img/whatsapp.svg"
              className="w-6 h-6 lg:w-8 lg:h-8"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export { Page, App, AdminLayout, PublicLayout }
