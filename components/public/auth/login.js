import React, { useState } from "react"
import Link from "next/link"
import { PublicLayout } from "../../layout"
import { Alert, AlertIcon, Spinner, Divider } from "@chakra-ui/core"
import authService from "./authService"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import * as Yup from "yup"
import GoogleLogin from "react-google-login"

export default (props) => {
  console.log('props ', props);
  const router = useRouter()
  const isPayment = router.query.isPayment;

  console.log('isPayment ', isPayment);

  const [alert, setAlert] = useState({ type: "idle" })

  return (
    <PublicLayout title="Log in">
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          {isPayment ? 'Please login to proceed with payment ' : 'Log in to your Outcampus account'}
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {alert.message && (
              <Alert status={alert.type}>
                <AlertIcon />
                {alert.message}
              </Alert>
            )}
            <GoogleLogin
              clientId="133325719695-l7pu1ha53kva8gp2no4qd1gl947i8nkv.apps.googleusercontent.com"
              onSuccess={(payload) => {
                authService
                  .googleLogin(payload)
                  .then(() => {
                    let ref = sessionStorage.getItem('ref');
                    let redirectRoute = ref ? ref.replace(/\/$/, "") : "/payment"
                    sessionStorage.removeItem('ref');
                    location.href = redirectRoute
                  })
                  .catch((error) => {
                    console.error(error.response.status)
                    if (error.response.status === 404) {
                      setAlert({
                        type: "error",
                        message:
                          "You haven't registered with this email. Please sign up first",
                      })
                    }
                  })
              }}
              onFailure={console.error}
              render={(renderProps) => (
                <button
                  {...renderProps}
                  className="text-center bg-blue-500 text-white w-full p-2 rounded-md hover:bg-blue-600 mt-4"
                >
                  Log in with Google
                </button>
              )}
            />
            <Divider my={6} />
            <LoginForm
              onSuccess={() => {
                let ref = new URL(location).searchParams.get("ref")
                let redirectRoute = ref ? ref.replace(/\/$/, "") : "/payment"
                location.href = isPayment ? "/buyNow" : redirectRoute
              }}
              onError={(error) => {
                console.error("LOGIN ERROR", error)
                setAlert({
                  type: "error",
                  message: "Invalid username or password",
                })
              }}
            />

            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup?role=student">
                <a className="underline cursor-pointer hover:text-black">
                  Create one now
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}

const LoginForm = ({ onSuccess, onError }) => {
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { email, password } = values
      return authService.login(email, password).then(onSuccess).catch(onError)
    },
    validationSchema: loginSchema,
  })

  return (
    <form
      className="mb-2"
      action="/login"
      method="POST"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <fieldset disabled={formik.isSubmitting}>
        <div>
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
                required
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
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

        <div className="mt-1 flex items-center justify-end">
          <div className="text-sm leading-5">
            <Link href="/forgot">
              <a className="font-medium text-yellow-600 hover:text-yellow-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                Forgot your password?
              </a>
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              className="w-full h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:border-yellow-400 focus:shadow-outline-yellow active:bg-yellow-400 transition duration-150 ease-in-out"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner size="sm" /> : "Log in"}
            </button>
          </span>
        </div>
      </fieldset>
    </form>
  )
}
