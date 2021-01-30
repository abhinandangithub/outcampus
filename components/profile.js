import React, { useState, useEffect } from "react"
import { App } from "components/layout"
import Files from "react-butterfiles"
import useSWR, { mutate } from "swr"
import { useAuth } from "utils/useAuth"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Label, Input, FormError } from "components/common/form"
import { Button, useToast, Spinner } from "@chakra-ui/core"
import PhoneInput, { formatPhoneNumber } from "react-phone-number-input"
import flags from 'react-phone-number-input/flags'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

const Profile = (props) => {
  return (
    <App title="Profile" screen="profile">
      <div className="max-w-7xl m-auto pt-4 pb-8 px-4">
        <h1 className="text-2xl font-semibold text-gray-900 pb-6">Profile</h1>
        <div className="mt-10 sm:mt-0">
          <div className="">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <div className="max-w-4xl mt-6">
              <ProfileForm />
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-10">
          <div className="">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Settings
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Manage your password
              </p>
            </div>
            <div className="mt-6 max-w-4xl">
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </App>
  )
}

const ProfileForm = (props) => {
  const { token } = useAuth()
  const toast = useToast()

  const profileSchema = Yup.object().shape({
    first_name: Yup.string().required("Please enter your first name"),
    last_name: Yup.string().required("Please enter your last name"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email"),
    phone: Yup.string().required("Please enter your phone number"),
    pincode: Yup.string().matches(/^[0-9]{6}$/, "Please enter a valid pincode"),
  })
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json())
  const { data, error } = useSWR("/api", fetcher)
  const formik = useFormik({
    initialValues: {
      first_name: data ? data.first_name : "",
      last_name: data ? data.last_name : "",
      email: data && data.email ? data.email : "",
      phone: data && data.phone ? data.phone : "",
      address: data && data.profile ? data.profile.address : "",
      country: data && data.profile ? data.profile.country : "",
      city: data && data.profile ? data.profile.city : "",
      state: data && data.profile ? data.profile.state : "",
      pincode: data && data.profile && data.profile.pincode ? data.profile.pincode : "",
      bio: data && data.profile ? data.profile.bio : "",
      avatar: data && data.avatar,
      document: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values)
      return fetch("/api", {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText)
          } else {
            return response.json()
          }
        })
        .then((json) => {
          console.log(json)
          toast({
            title: "Updated",
            description: "Profile updated",
            satus: "success",
            position: "top",
            duration: 1000,
          })
          mutate("/api", data)
        })
        .catch((error) => {
          console.error(error)
          toast({
            title: "Error",
            description: "Unable to save profile",
            status: "error",
            position: "top",
            duration: 1000,
          })
        })
    },
    validationSchema: profileSchema,
  })

  return (
    <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} noValidate>
      <fieldset disabled={formik.isSubmitting}>
        <div className="shadow overflow-hidden sm:rounded-md relative">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="First name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  name="first_name"
                  isValid={
                    formik.touched.first_name && !formik.errors.first_name
                  }
                />
                <FormError
                  touched={formik.touched.first_name}
                  error={formik.errors.first_name}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  name="last_name"
                  label="Last name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  isValid={formik.touched.last_name && !formik.errors.last_name}
                />
                <FormError
                  touched={formik.touched.last_name}
                  error={formik.errors.last_name}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="email"
                  name="email"
                  label="Email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  isValid={formik.touched.email && !formik.errors.email}
                />
                <FormError
                  touched={formik.touched.email}
                  error={formik.errors.email}
                />
                {/* {data && data.email_verified ? (
                  ""
                ) : (
                  <span className="text-xs text-gray-500">
                    You email isn't verified yet. {` `}
                    <a className="text-yellow-300 hover:text-yellow-400 underline cursor-pointer">
                      Verify now
                    </a>
                  </span>
                )} */}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label for="country" class="block text-sm font-medium leading-5 text-gray-600 required-field">Phone number</label>
                <PhoneInput
                  international
                  id="phone"
                  name="phone"
                  className={`border-gray-300 mt-1 shadow-inner appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-250 ease-in-out sm:text-sm sm:leading-5`}
                  flags={flags}
                  value={formik.values.phone}
                  onChange={(e) => {
                    let value = e ? e.toString() : ""
                    formik.setFieldValue("phone", value)
                    setTimeout(() => formik.setFieldTouched("phone", true))
                    formik.handleChange
                  }}
                />
                <FormError
                  touched={formik.touched.phone}
                  error={formik.errors.phone}
                />
                {/* {data && data.phone_verified ? (
                  ""
                ) : (
                  <span className="text-xs text-gray-500">
                    You phone isn't verified yet. {` `}
                    <a className="text-yellow-300 hover:text-yellow-400 underline cursor-pointer">
                      Verify now
                    </a>
                  </span>
                )} */}
              </div>

              <div className="col-span-6">
                <Input
                  name="address"
                  label="Address"
                  isRequired={false}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label for="country" class="block text-sm font-medium leading-5 text-gray-600">Country</label>
                <CountryDropdown
                  className="border-gray-300 mt-1 shadow-inner appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-250 ease-in-out sm:text-sm sm:leading-5"
                  value={formik.values.country}
                  onChange={(val) => {
                    let value = val ? val.toString() : ""
                    formik.setFieldValue("country", value)
                    setTimeout(() => formik.setFieldTouched("country", true))
                    formik.handleChange
                  }} />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label for="state" class="block text-sm font-medium leading-5 text-gray-600">State</label>
                <RegionDropdown
                  className="border-gray-300 mt-1 shadow-inner appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-250 ease-in-out sm:text-sm sm:leading-5"
                  country={formik.values.country}
                  value={formik.values.state}
                  onChange={(val) => {
                    let value = val ? val.toString() : ""
                    formik.setFieldValue("state", value)
                    setTimeout(() => formik.setFieldTouched("state", true))
                    formik.handleChange
                  }} />

                {/* <Input
                  name="state"
                  label="State"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                /> */}
              </div>

              <div className="col-span-6 sm:col-span-2">
                <Input
                  name="city"
                  label="City"
                  isRequired={false}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <Input
                  name="pincode"
                  label="Pincode"
                  isRequired={false}
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  isValid={formik.touched.phone && !formik.errors.phone}
                />
                <FormError
                  touched={formik.touched.pincode}
                  error={formik.errors.pincode}
                />
              </div>
            </div>
            <div className="mt-6">
              <Input
                type="textarea"
                name="bio"
                isRequired={false}
                label="Bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
              />
            </div>

            {/* <div className="flex justify-between mt-6">
            <div className="">
              <label className="block text-sm leading-5 font-medium text-gray-700">
                Photo
              </label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <img className="h1-2 w-12" src={formik.values.avatar} />
                </span>
                <span className="ml-5 rounded-md shadow-sm">
                  <UploadPicture />
                </span>
              </div>
            </div>
            <div className="ml-6 w-1/2">
              <label className="block text-sm leading-5 font-medium text-gray-700">
                Certifications
              </label>
              <div className="h-16 flex items-center">
                <UploadDocument />
              </div>
            </div>
          </div> */}
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Button
              type="submit"
              variantColor="yellow"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner /> : "Save"}
            </Button>
          </div>
          {!data && (
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-white opacity-50 flex items-center justify-center">
              {error ? (
                <p className="text-white text-sm">
                  Unable to load profile details
                </p>
              ) : (
                  <Spinner size="lg" />
                )}
            </div>
          )}
        </div>
      </fieldset>
    </form>
  )
}

const ChangePasswordForm = (props) => {
  const toast = useToast()
  const { token } = useAuth()
  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required(
      "Please enter your current password"
    ),
    newPassword: Yup.string()
      .required("Please enter the new password")
      .min(8, "Password must contain minimum 8 characters,"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords do not match. Please check"
    ),
  })
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      return fetch("/api", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          toast({
            title: "Password Changed",
            description: "Password changed succesfully",
            status: "success",
            position: "top",
            duration: 1000,
          })
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            position: "top",
            duration: 1000,
          })
        })
    },
    validationSchema: passwordSchema,
  })
  return (
    <form onSubmit={formik.handleSubmit} noValidate onBlur={formik.handleBlur}>
      <div className="shadow sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-2">
              <Input
                name="currentPassword"
                label="Current password"
                type="password"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                isValid={
                  formik.touched.currentPassword &&
                  !formik.errors.currentPassword
                }
              />
              <FormError
                touched={formik.touched.currentPassword}
                error={formik.errors.currentPassword}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <Input
                name="newPassword"
                label="New password"
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                isValid={
                  formik.touched.newPassword && !formik.errors.newPassword
                }
              />
              <FormError
                touched={formik.touched.newPassword}
                error={formik.errors.newPassword}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <Input
                name="confirmPassword"
                label="Confirm password"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                isValid={
                  formik.touched.confirmPassword &&
                  !formik.errors.confirmPassword
                }
              />
              <FormError
                touched={formik.touched.confirmPassword}
                error={formik.errors.confirmPassword}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button
            type="submit"
            variantColor="yellow"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <Spinner /> : "Save"}
          </Button>
        </div>
      </div>
    </form>
  )
}

const UploadPicture = (props) => {
  return (
    <Files
      accept={["image/png", "image/jpg", "image/jpeg"]}
      onSuccess={(file) => {
        console.log(file)
      }}
    >
      {({ browseFiles, getDropzoneProps, getLabelProps }) => (
        <div>
          <button
            type="button"
            className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
            onClick={browseFiles}
          >
            Change
          </button>
        </div>
      )}
    </Files>
  )
}

const UploadDocument = (props) => {
  return (
    <Files
      accept={["application/pdf", "image/jpg", "image/jpeg"]}
      onSuccess={(file) => {
        console.log(file)
      }}
    >
      {({ browseFiles, getDropzoneProps, getLabelProps }) => (
        <div>
          <button
            type="button"
            className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
            onClick={browseFiles}
          >
            Upload file
          </button>
        </div>
      )}
    </Files>
  )
}

export default Profile
