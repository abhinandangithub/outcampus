import React, { useState } from "react"
import { PublicLayout } from "../../layout"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Input, FormError } from "components/common/form"
import { Button, Spinner } from "@chakra-ui/core"
import Axios from "axios"

export default (props) => {
  const [success, setSuccess] = useState(false)

  return (
    <PublicLayout title="Forgot Password">
      <div className="bg-gray-50">
        <div className="max-w-lg mx-auto py-10">
          <div className="shadow-md p-8 rounded-lg bg-white">
            <h1 className="text-2xl font-medium pb-2 mb-2 border-b border-gray-100 leading-none">
              Recover password
            </h1>
            {success ? (
              <Message />
            ) : (
              <ForgotPasswordForm onSuccess={setSuccess} />
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}

function Message(props) {
  return (
    <div>
      <p className="flex">
        <svg
          className="w-8 h-8 text-green-500 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          ></path>
        </svg>{" "}
        An email with recovery link has been sent. Please click the link when
        you get it.
      </p>
    </div>
  )
}

function ForgotPasswordForm({ onSuccess }) {
  const [message, setMessage] = useState(null)

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async function submitForm(values) {
      console.log(values)
      return Axios.post("/api/forgot-password", values)
        .then((data) => {
          console.log(data)
          onSuccess(true)
        })
        .catch((error) => {
          setMessage(error.response.data.message)
        })
    },
    validationSchema: forgotPasswordSchema,
  })

  return (
    <div>
      {message && (
        <p className="text-red-500 text-sm py-2 px-4 border border-red-200 rounded-lg mb-4 flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <span>{message}</span>
        </p>
      )}
      <p className="mb-1 text-sm text-gray-600">
        Forgot your password? Don't worry, happens to the best of us.
      </p>
      <p className="mb-6 text-sm text-gray-600">
        Enter your email here and we'll send you a password recovery link.
      </p>
      <form onSubmit={formik.handleSubmit} noValidate>
        <fieldset disabled={formik.isSubmitting}>
          <div className="mb-4">
            <Input
              name="email"
              label="Email"
              placeholder="Enter your email here"
              onChange={formik.handleChange}
              isValid={formik.touched.email && !formik.errors.email}
            />
            <FormError
              touched={formik.touched.email}
              error={formik.errors.email}
            />
          </div>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variantColor="yellow"
          >
            {formik.isSubmitting ? (
              <Spinner />
            ) : (
              <span>Email me a recovery link</span>
            )}
          </Button>
        </fieldset>
      </form>
    </div>
  )
}
