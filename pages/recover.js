import { PublicLayout } from "components/layout"
import { useState, useEffect, Fragment } from "react"
import { useRouter } from "next/router"
import { Spinner, Button, useToast } from "@chakra-ui/core"
import Link from "next/link"
import { Input, FormError } from "components/common/form"
import { useFormik } from "formik"
import * as Yup from "yup"
import Axios from "axios"
import { useAuth } from "utils/useAuth"

export default function Recover(props) {
  // Can be PENDING or RESOLVED
  const [tokenState, setTokenState] = useState("PENDING")
  const router = useRouter()
  const token = router.query.token

  useEffect(() => {
    if (token) {
      Axios.post("/api/recover", { token })
        .then((response) => {
          console.log(response.data)
          localStorage.setItem("session", JSON.stringify(response.data))
          setTokenState("RESOLVED")
        })
        .catch((error) => {
          console.error("ERROR:", error)
          setTokenState("REJECTED") // Can be anything apart from resolved,pending
        })
    }
  }, [token])

  return (
    <PublicLayout title="Recover password">
      <div className="bg-gray-50">
        <div className="max-w-md mx-auto py-10">
          <div className="shadow-md p-8 rounded-lg bg-white">
            {tokenState === "PENDING" ? (
              <Loading />
            ) : (
              <Fragment>
                {tokenState === "RESOLVED" ? (
                  <ChangePasswordForm />
                ) : (
                  <Message />
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}

function ChangePasswordForm() {
  const { token } = JSON.parse(localStorage.getItem("session")) || {
    role: "guest",
    token: null,
  }
  const toast = useToast()
  const router = useRouter()
  const [message, setMessage] = useState(null)

  const changePasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Please enter your new password")
      .min(8, "Password should have minimum of 8 characters"),
    confirmPassword: Yup.string()
      .required()
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords do not match. Please check"
      ),
  })

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values)
      return Axios.post(
        "/api",
        {
          newPassword: values.newPassword,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((data) => {
          console.log(data)
          toast({
            title: "Success",
            description:
              "Password changed successfully. Redirecting to your dashboard",
            status: "success",
            position: "top",
            duration: 1000,
          })
          router.push("/dashboard")
        })
        .catch((error) => {
          // @TODO: Show better error message for good UX
          console.error("ERROR", error)
          setMessage(error.message)
        })
    },
    validationSchema: changePasswordSchema,
  })

  if (!token) return null
  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium pb-2 mb-2 border-b border-gray-100">
          Set a new password
        </h1>
      </div>
      {message && (
        <p className="text-red-500 text-sm py-2 px-4 border border-red-200 rounded-lg mb-4">
          Error: {message}
        </p>
      )}
      <form onSubmit={formik.handleSubmit}>
        <fieldset disabled={formik.isSubmitting}>
          <div className="mb-4">
            <Input
              name="newPassword"
              label="New password"
              type="password"
              placeholder="Choose your new password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              isValid={formik.touched.newPassword && !formik.errors.newPassword}
            />
            <FormError
              touched={formik.touched.newPassword}
              error={formik.errors.newPassword}
            />
          </div>
          <div className="mb-6">
            <Input
              name="confirmPassword"
              label="Confirm password"
              type="password"
              placeholder="Enter the same password to confirm"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              isValid={
                formik.touched.confirmPassword && !formik.errors.confirmPassword
              }
            />
            <FormError
              touched={formik.touched.confirmPassword}
              error={formik.errors.confirmPassword}
            />
          </div>
          <div>
            <Button
              type="submit"
              variantColor="yellow"
              isLoading={formik.isSubmitting}
            >
              Change password
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

function Message() {
  return (
    <div>
      <h1 className="font-medium text-2xl mb-4">Sorry!</h1>
      <p className="text-sm">
        The password reset link is invalid / has expired, possibly because it
        has already been used. Please request a new{" "}
        <Link href="/forgot">
          <a className="underline">password reset</a>
        </Link>
      </p>
    </div>
  )
}

function Loading() {
  return (
    <div className="flex justify-center items-center h-32">
      <Spinner />
      <span className="ml-2 text-sm">Verifying</span>
    </div>
  )
}
