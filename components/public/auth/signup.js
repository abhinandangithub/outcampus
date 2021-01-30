import React, { useState, useReducer } from "react"
import Link from "next/link"
import { PublicLayout } from "../../layout"
import authService from "./authService"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Divider,
} from "@chakra-ui/core"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"
import GoogleLogin from "react-google-login"
import PhoneInput, { formatPhoneNumber } from "react-phone-number-input"
import flags from 'react-phone-number-input/flags'

const Signup = (props) => {
  let defaultRole = new URL(location).searchParams
    .get("role")
    .replace(/\/$/, "")
  const router = useRouter()
  if (!["teacher", "student"].includes(defaultRole)) {
    defaultRole = null
  }
  const [alert, setAlert] = useState({ type: "idle" })

  return (
    <PublicLayout title="Create your account">
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {alert.type !== "success" ? (
          <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
              <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Sign up with Outcampus{" "}
                {defaultRole ? `as a ${defaultRole}` : ""}
              </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                {alert.message && (
                  <div className="mb-4">
                    <Alert status={alert.type}>
                      <AlertIcon />
                      {alert.message}
                    </Alert>
                  </div>
                )}
                <GoogleLogin
                  render={(renderProps) => (
                    <button
                      {...renderProps}
                      className="text-center bg-blue-500 text-white w-full p-2 rounded-md hover:bg-blue-600 mt-4 shadow"
                    >
                      Sign up with Google
                    </button>
                  )}
                  clientId="133325719695-l7pu1ha53kva8gp2no4qd1gl947i8nkv.apps.googleusercontent.com"
                  onSuccess={(payload) => {
                    authService
                      .googleLogin(payload, defaultRole)
                      .then(() => {
                        setAlert({
                          type: "success",
                        })
                        let ref = sessionStorage.getItem('ref');
                        let redirectRoute = ref ? ref.replace(/\/$/, "") : "/dashboard"
                        sessionStorage.removeItem('ref');
                        location.href = redirectRoute
                      })
                      .catch((error) => {
                        if (error.response.status === 409) {
                          setAlert({
                            type: "error",
                            message:
                              "An account already exists with this email address. Please use a different email address",
                          })
                        } else {
                          setAlert({
                            type: "error",
                            message: "Internal server error",
                          })
                        }
                      })
                  }}
                  onFailure={console.error}
                />
                <Divider my={6} />
                <SignupForm setAlert={setAlert} defaultRole={defaultRole} />
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login">
                    <a className="underline cursor-pointer hover:text-black">
                      Log in
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ) : (
            <div className="max-w-2xl mx-auto">
              <Alert status="success">
                <AlertIcon />
                <AlertTitle className="mr-2">
                  Thank you for signing up.
              </AlertTitle>
                <AlertDescription>
                  You'll soon be redirected to your dashboard.
              </AlertDescription>
              </Alert>
            </div>
          )}
      </div>
    </PublicLayout>
  )
}

const SignupForm = ({ setAlert, defaultRole }) => {
  const router = useRouter()
  const signupSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    phone: Yup.string().required("Please enter your phone number"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Password must contain minimum 8 characters"),
    agree: Yup.boolean().oneOf(
      [true],
      "You must accept terms and conditions to continue"
    ),
  })

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: defaultRole || "teacher",
      phone: "",
      agree: false,
    },
    onSubmit: async (values) => {
      const { firstName, lastName, email, password, role, phone } = values
      return authService
        .signup({ firstName, lastName, email, password, role, phone })
        .then(() => {
          return authService.login(email, password).then((token) => {
            setAlert({
              type: "success",
            })
            let ref = sessionStorage.getItem('ref');
            let redirectRoute = ref ? ref.replace(/\/$/, "") : "/dashboard"
            sessionStorage.removeItem('ref');
            location.href = redirectRoute
          })
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setAlert({
              type: "error",
              message:
                "An account already exists with this email address or phone. Please use a different email address/phone",
            })
          } else {
            setAlert({
              type: "error",
              message: "Internal server error",
            })
          }
        })
    },
    validationSchema: signupSchema,
  })

  return (
    <form
      className="mb-2"
      onSubmit={formik.handleSubmit}
      onBlur={formik.handleBlur}
      noValidate
    >
      <fieldset disabled={formik.isSubmitting}>
        {!defaultRole && (
          <div className="mb-6">
            <label className="block text-sm font-medium leading-5 text-gray-700">
              I'm a
            </label>
            <div className="mt-1 flex">
              <div className="flex items-center">
                <input
                  id="teacher"
                  name="role"
                  value="teacher"
                  type="radio"
                  className="h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  checked={formik.values.role === "teacher"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="teacher" className="ml-1">
                  <span className="block text-sm leading-5 text-gray-700">
                    Teacher
                  </span>
                </label>
              </div>
              <div className="flex items-center ml-6">
                <input
                  id="student"
                  name="role"
                  value="student"
                  type="radio"
                  className="h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  checked={formik.values.role === "student"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="student" className="ml-1">
                  <span className="block text-sm leading-5 text-gray-700">
                    student
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Parent Full Name
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="firstName"
                name="firstName"
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
            </div>
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.firstName}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Child Full Name
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="lastName"
                type="text"
                name="lastName"
                required
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-5 text-gray-700 required-field"
          >
            Email address
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="email"
                type="email"
                name="email"
                required
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={(e) => {
                  formik.handleChange(e)
                  setAlert({ type: "idle" })
                }}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-5 text-gray-700 required-field"
          >
            Phone number
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <div
                className={`mt-1 flex border rounded-md shadow-sm overflow-hidden ${
                  formik.touched.phone && formik.errors.phone
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  }`}
              >
                <PhoneInput
                  international
                  id="phone"
                  name="phone"
                  international
                  placeholder="Enter phone number"
                  defaultCountry="IN"
                  className={`appearance-none block w-full px-3 py-2  placeholder-gray-400  transition duration-150 ease-in-out sm:text-sm sm:leading-5 rounded-md`}
                  flags={flags}
                  value={formik.values.phone}
                  onChange={(e) => {
                    formik.values.phone = e ? e.toString() : ""
                    debugger
                    formik.handleChange
                  }}
                />
              </div>
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.phone}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-5 text-gray-700 required-field"
          >
            Password
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="password"
                type="password"
                name="password"
                required
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 text-sm leading-5">
          <div className="flex">
            <input
              id="agree"
              type="checkbox"
              name="agree"
              className="formik-checkbox h-4 w-4 text-yellow-600 transition duration-150 ease-in-out"
              onChange={formik.handleChange}
              checked={formik.values.agree}
              value={true}
            />
            <label
              htmlFor="agree"
              className="ml-2 block text-sm leading-5 text-gray-900 required-field"
            >
              I agree to outcampus'{" "}
              <a
                href="/terms"
                target="_blank"
                className="font-medium text-yellow-600 hover:text-yellow-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                target="_blank"
                className="font-medium text-yellow-600 hover:text-yellow-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Privacy Policy
              </a>
            </label>
          </div>
          {formik.touched.agree && formik.errors.agree && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.agree}</p>
          )}
        </div>

        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              className="h-10 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:border-yellow-400 focus:shadow-outline-yellow active:bg-yellow-400 transition duration-150 ease-in-out"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner size="sm" /> : "Create"}
            </button>
          </span>
        </div>
      </fieldset>
    </form>
  )
}

export default Signup
