import React, { useState, useReducer } from "react"
import Link from "next/link"
import { PublicLayout } from "../../layout"
import authService from "./authService";
import emailNotificationService from "./emailNotificationService";

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
import DatePicker from "react-datepicker"
import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import subDays from "date-fns/subDays"
import addDays from "date-fns/addDays"
import getHours from "date-fns/getHours"

const Register = (props) => {

  const router = useRouter()

  const [alert, setAlert] = useState({ type: "idle" })

  return (
    <PublicLayout title="Create your account">
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {alert.type !== "success" ? (
          <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
              <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Registration for free trial
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

                <RegisterForm setAlert={setAlert} />

                {/* Hiding Google Register */}
                {/* <GoogleLogin
                  render={(renderProps) => (

                    <button
                      {...renderProps}
                      type="submit"
                      className="h-10 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:border-yellow-400 focus:shadow-outline-yellow active:bg-yellow-400 transition duration-150 ease-in-out"

                    >
                      Register with Google
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
                /> */}

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
                  Our executive will contact you soon.
              </AlertDescription>
              </Alert>
            </div>
          )}
      </div>
    </PublicLayout>
  )
}

const RegisterForm = ({ setAlert }) => {
  const router = useRouter();
  const [ageGroup, setAgeGroup] = useState('6 & 7');
  const [courseName, setCourseName] = useState('Young Leaders: Thinkers + Speakers');
  const availableDate = 17 <= getHours(new Date()) <= 23 ? addDays(new Date(), 1) : new Date();
  const date = availableDate.setHours(getHours(new Date()) < 9 && getHours(new Date()) < 18 ? 9 : getHours(new Date()) + 1, 0, 0);
  const [freeTrialDate, setFreeTrialDate] = useState(null);

  const registerSchema = Yup.object().shape({
    parentName: Yup.string().required("Please enter parent name"),
    childName: Yup.string().required("Please enter your child name"),
    parentEmail: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    phone: Yup.string().required("Please enter your phone number"),
    trialDate: Yup.date().required("Please select trial date"),
    agree: Yup.boolean().oneOf(
      [true],
      "You must accept terms and conditions to continue"
    ),
  })

  function sendEmailNotifications({ parentName, childName, parentEmail, phone, ageGroup, courseName, trialDate, user }) {
    // send email to admin immediately
    let to = null;
    let from = "Outcampus <notifications@outcampus.in>";
    let subject = `Received a Free Trial Request ID: LEAD${user.data.id}`;
    let text = "Hi,\\n\\n Here are the details of a new lead. \\n Parents Name - : " + parentName + " \\n Parents Email - : " + parentEmail + " Mobile Number - :" + phone + " \\n Child's Name - : " + childName + " \\n Program - : " + "user.course_name \\n Age - : " + ageGroup + " \\n Date Time Slot - :  " + new Date(trialDate) + " \\n  \\n \\n\\nThanks,\\nTech Team Outcampus";
    let date = new Date().getTime() + 300000;
    date = new Date(date).toISOString();
    let attachments = [];

    // emailNotificationService.notify({ to, from, subject, text, date });

    // send email to parent after 5 mins
    to = parentEmail;
    from = "Outcampus <notifications@outcampus.in>";
    setTimeout(() => {
      subject = `Your Kid’s Trial Session for Outcampus Young Leader Program is confirmed.`;
      text = `Dear  ${parentName},\nCongratulations!\n
        ${childName} Outcampus Live Trial Session for Young Leader Program is confirmed! The session for  ${childName}
        has been scheduled for ${new Date(trialDate).toLocaleDateString()} (IST). Your dedicated teacher will be waiting for you online at this
        time so kindly mark the day/time on your calendar.\n
        Please join with your Laptop/PC which has a stable Internet connection at least 5 minutes before the commencement of the
        class to ensure a smooth session!\n
        ${childName} will be evaluated by our top-rated / gold medalist teachers and will be provided with a detailed,
        Personalized Performance Report Card from a team of alumni of IIT, IIM, British Council on successful trial completion.
        \nThank you,\nTeam Outcampus\nFor support, call us at 1234567890`;
      date = new Date().getTime() + 300000;
      date = new Date(date).toISOString();
      attachments = [{ path: 'pages/api/assets/trial-2-mins.pdf' }];
      emailNotificationService.notify({ to, from, subject, text, date, attachments });
    }, 120000);

    setTimeout(() => {
      subject = `What is the Young Leaders Program?.`;
      text = `Dear ${parentName},\n
        ${childName} will have their scheduled Trial Session on ${new Date(trialDate).toLocaleTimeString()} \n
        Communication impacts on all areas of life. Poor language predicts poor literacy skills and without the right help, between
        50% and 90% of children with average or below communication skills go on to have difficulties in achieving the desired
        growth in life. It is also important to teach children from early childhood how to ask good questions, define a problem,
        examine evidence, analyze assumptions and biases.\n
        Outcampus is an online teaching platform that conducts live sessions and curated courses to facilitate the all-round.
        development of children. The Young Leader Program provides properly structured cooperative learning environments
        where children perform and participate, learn Cs of communication and critical thinking with continuous support and
        feedback from other students and the teacher. This program is designed by a cross functional senior team having experts
        from IIT, IIM, Oxford and companies like Google and Tesla. Our Educators are Top 1% teachers who passed a rigorous
        recruitment process and have taught online in places like British Academy\n
        What will [Child's Name] learn through the Young Leader Program at Outcampus?\n
        How to Think, What to Think, Fundamentals of logic, Public Speaking Format Orientations in areas such as Group
        Discussions & Debates, Opinion Development, Articulation Skills, Basics of Leadership, Lateral Thinking, Entrepreneurial
        Skills and Interpersonal skills. \n
        The Young Leader Program for kids at Outcampus is about the child improving critical and creative thinking, logical
        reasoning, focus and concentration, bringing fluency while speaking and getting rid of shyness, developing leadership
        traits, learning sentence formation, vocabulary, mannerism and etiquettes and body language and initiative-taking. The
        Young Leader Program additionally specializes in instilling such indomitable confidence in a child that can never be
        altered with. Through our curated Young Leader Program for kids, a child learns to tap the power of excellence and hidden
        potential. This is why we have developed and designed our curriculum /module in a way to promote practice until the child
        becomes perfect at it. Each teacher follows a strict protocol to avoid any mistakes. \n
        We are sure you have questions about the curriculum, so please find the curriculum attached. \n
        ${childName} will be evaluated by our top-rated/ gold medalist teachers and will be provided with a detailed,
        Personalized Performance Report Card from a team of alumni of IIT, IIM, British Council on successful trial completion.\n
        Your exclusive class link will be shared with you. Please join with your Laptop/PC which has a stable Internet connection
        at least 5 minutes before the commencement of the class to ensure a smooth session!
        \nThank you,\nTeam Outcampus\nFor support, call us at 1234567890`;

      attachments = [{ path: 'pages/api/assets/trial-5-mins.pdf' }];
      date = new Date().getTime() + 300000;
      date = new Date(date).toISOString();
      emailNotificationService.notify({ to, from, subject, text, date, attachments });
    }, 300000);

    //send remainder mail to parent before 24 hrs of trial date
    // to = parentEmail;
    // from = "Outcampus <notifications@outcampus.in>";
    // subject = `Mark/Book your calendar for Trial Session at Outcampus.`;
    // text = "Dear " + parentName + ",\\n\\n" +
    //   childName + "Outcampus Live Trial Session for Young Leader Program is confirmed! The session for" + childName + " \\n" +
    //   "has been scheduled for" + new Date(trialDate).toLocaleDateString() + new Date(trialDate).toLocaleTimeString() + " (IST). Your dedicated teacher will be waiting for you online at this \\n" +
    //   "time so kindly mark the day/time on your calendar.\\n\\n" +
    //   "Please join with your Laptop/PC which has a stable Internet connection at least 5 minutes before the commencement of the\\n" +
    //   "class to ensure a smooth session!\\n\\n" +
    //   childName + "will be evaluated by our top-rated/ gold medalist teachers and will be provided with a detailed,\\n" +
    //   "Personalized Performance Report Card from a team of alumni of IIT, IIM, British Council on successful trial completion.\\n\\n" +
    //   "Thank you,\\nTeam Outcampus\\nFor support, call us at 1234567890";
    // date = new Date(trialDate).getTime() - 86400000;
    // date = new Date(date).toISOString();
    // emailNotificationService.notify({ to, from, subject, text, date });

    //send remainder mail to parent before 4 hrs of trial date
    // to = parentEmail;
    // from = "Outcampus <notifications@outcampus.in>";
    // subject = `Today’s To-Do List for Trial session`;
    // text = "Dear " + parentName + ",\\n\\n" +
    //   "We are excited to see" + childName + " in their Outcampus Live Online Young Leader Program Free Trial Session \\n" +
    //   "<b>TODAY</b> at " + new Date(trialDate).toLocaleTimeString() + ". In just a bit, " + childName + " will have their scheduled session with one of our top teachers. \\n\\\n" +
    //   "We are sure you have questions about the curriculum, so please find the session-by-session breakdown of the full \\n" +
    //   "curriculum attached link \\n\\n" +
    //   childName + " will be evaluated by our top-rated/ gold medalist teachers and will be provided with a detailed, \\n\\n" +
    //   "Pleasebe on time for your trial session! We're running a full schedule and have reserved a dedicated teacher for you. Your \\n" +
    //   "exclusive class link [Zoom Link]. Please join with your Laptop/PC which has a stable Internet connection at least \\n" +
    //   "minutes before the commencement of the class to ensure a smooth session! \\n\\n\\n" +
    //   "Thank you,\\nTeam Outcampus\\nFor support, call us at 1234567890";
    // date = new Date(trialDate).getTime() - 14400000;
    // date = new Date(date).toISOString();
    // let currentTime = new Date().getTime() + 14400000;
    // if (new Date(trialDate).getTime() > currentTime)
    //   emailNotificationService.notify({ to, from, subject, text, date });
  }

  const formik = useFormik({
    initialValues: {
      parentName: "",
      childName: "",
      parentEmail: "",
      phone: "",
      trialDate: freeTrialDate,
      agree: true,
    },
    onSubmit: async (values) => {
      console.log('values ', values);
      const { parentName, childName, parentEmail, phone, trialDate } = values

      return authService
        .register({ parentName, childName, parentEmail, phone, ageGroup, courseName, trialDate })
        .then((user) => {
          setAlert({
            type: "success",
          });
          sendEmailNotifications({ parentName, childName, parentEmail, phone, ageGroup, courseName, trialDate, user });
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
    validationSchema: registerSchema,
  })

  const excludedTimings = [
    setHours(setMinutes(new Date(), 0), 0),
    setHours(setMinutes(new Date(), 30), 0),
    setHours(setMinutes(new Date(), 0), 1),
    setHours(setMinutes(new Date(), 30), 1),
    setHours(setMinutes(new Date(), 0), 2),
    setHours(setMinutes(new Date(), 30), 2),
    setHours(setMinutes(new Date(), 0), 3),
    setHours(setMinutes(new Date(), 30), 3),
    setHours(setMinutes(new Date(), 0), 4),
    setHours(setMinutes(new Date(), 30), 4),
    setHours(setMinutes(new Date(), 0), 5),
    setHours(setMinutes(new Date(), 30), 5),
    setHours(setMinutes(new Date(), 0), 6),
    setHours(setMinutes(new Date(), 30), 6),
    setHours(setMinutes(new Date(), 0), 7),
    setHours(setMinutes(new Date(), 30), 7),
    setHours(setMinutes(new Date(), 0), 8),
    setHours(setMinutes(new Date(), 30), 8),
    setHours(setMinutes(new Date(), 0), 9),
    setHours(setMinutes(new Date(), 30), 9),
    setHours(setMinutes(new Date(), 0), 10),
    setHours(setMinutes(new Date(), 30), 10),
    setHours(setMinutes(new Date(), 0), 11),
    setHours(setMinutes(new Date(), 30), 11),
    setHours(setMinutes(new Date(), 0), 12),
    setHours(setMinutes(new Date(), 30), 12),
    setHours(setMinutes(new Date(), 0), 13),
    setHours(setMinutes(new Date(), 30), 13),
    setHours(setMinutes(new Date(), 0), 14),
    setHours(setMinutes(new Date(), 30), 14),
    setHours(setMinutes(new Date(), 0), 20),
    setHours(setMinutes(new Date(), 30), 20),
    setHours(setMinutes(new Date(), 0), 21),
    setHours(setMinutes(new Date(), 30), 21),
    setHours(setMinutes(new Date(), 0), 22),
    setHours(setMinutes(new Date(), 30), 22),
    setHours(setMinutes(new Date(), 0), 23),
    setHours(setMinutes(new Date(), 30), 23),
  ]

  return (
    <form
      className="mb-2"
      onSubmit={formik.handleSubmit}
      onBlur={formik.handleBlur}
      noValidate
    >
      <fieldset disabled={formik.isSubmitting}>
        <div>
          <div className="w-full text-center pb-4 text-lg font-bold">Register for <br />{courseName}</div>
          <label
            htmlFor="parentName"
            className="block text-sm font-medium leading-5 text-gray-700 required-field"
          >
            Parent's Name
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="parentName"
                name="parentName"
                required
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.parentName && formik.errors.parentName
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.parentName}
              />
            </div>
            {formik.touched.parentName && formik.errors.parentName && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.parentName}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="parentEmail"
            className="block text-sm font-medium leading-5 text-gray-700 required-field"
          >
            Parent's Email
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="parentEmail"
                type="email"
                name="parentEmail"
                required
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.parentEmail && formik.errors.parentEmail
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={(e) => {
                  formik.handleChange(e)
                  setAlert({ type: "idle" })
                }}
                value={formik.values.parentEmail}
              />
            </div>
            {formik.touched.parentEmail && formik.errors.parentEmail && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.parentEmail}</p>
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
            htmlFor="childName"
            className="block text-sm font-medium leading-5 text-gray-700 required-field"
          >
            Child's Name
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="childName"
                type="text"
                name="childName"
                required
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.childName && formik.errors.childName
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.childName}
              />
            </div>
            {formik.touched.childName && formik.errors.childName && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.childName}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <label
            htmlFor="ageGroup"
            className="block text-sm font-medium leading-5 text-gray-700 required-field"
          >
            Age Group
          </label>
          <div className="mt-2 flex justify-center ">
            <span className=" w-full  shadow-sm">
              <button
                type="button"
                className={"h-10 w-full flex justify-center py-2 px-2 border-transparent text-xs md:text-sm font-medium text-black placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-300 " + (ageGroup == "6 & 7" ? "bg-yellow-300" : "bg-white")}
                onClick={(e) => {
                  e.preventDefault();
                  setAgeGroup('6 & 7')
                }}
              >
                6 & 7
            </button>
            </span>
            <span className=" w-full  shadow-sm">
              <button
                type="button"
                className={"h-10 w-full flex justify-center py-2 px-2 border-transparent text-xs md:text-sm font-medium text-black placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-300 " + (ageGroup == "8 & 9" ? "bg-yellow-300" : "bg-white")}
                onClick={(e) => {
                  e.preventDefault();
                  setAgeGroup('8 & 9')
                }}
              >
                8 & 9
            </button>
            </span>
            <span className=" w-full shadow-sm">
              <button
                type="button"
                className={"h-10 w-full flex justify-center py-2 px-2 border-transparent text-xs md:text-sm font-medium text-black placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-300 " + (ageGroup == "10, 11 & 12" ? "bg-yellow-300" : "bg-white")}
                onClick={(e) => {
                  e.preventDefault();
                  setAgeGroup('10, 11 & 12')
                }}
              >
                10, 11 & 12
            </button>
            </span>
            <span className=" w-full shadow-sm">
              <button
                type="button"
                className={"h-10 w-full flex justify-center py-2 px-2 border-transparent text-xs md:text-sm font-medium text-black placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-300 " + (ageGroup == "13, 14 & 15" ? "bg-yellow-300" : "bg-white")}
                onClick={(e) => {
                  e.preventDefault();
                  setAgeGroup('13, 14 & 15')
                }}
              >
                13, 14 & 15
            </button>
            </span>
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="trialDate"
            className="block text-sm font-medium leading-5 text-gray-700 required-field">
            Select free trial slot
            </label>
          <div className="mt-2 flex justify-center w-full ">
            <DatePicker
              className={`appearance-none block w-full px-3 py-2 border ${
                formik.touched.trialDate && formik.errors.trialDate
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
                } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
              selected={freeTrialDate}
              minDate={subDays(new Date(), 0)}
              maxDate={addDays(new Date(), 7)}
              onChange={date => {
                setFreeTrialDate(date)
                formik.handleChange;
                formik.values.trialDate = date;
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              excludeTimes={excludedTimings}
              minTime={setHours(setMinutes(new Date(), 0), 15)}
              maxTime={setHours(setMinutes(new Date(), 30), 19)}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              id="trialDate"
            />
          </div>
          {formik.touched.trialDate && !formik.values.trialDate && (
            <p className="mt-1 text-xs text-red-500">Please select trial date</p>
          )}

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
            //  disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner size="sm" /> : "Book a free trial"}
            </button>
          </span>
        </div>
        {/* Hiding register with Google */}
        {/* <div className="mt-6">
          <span className="block text-center w-full rounded-md shadow-sm">
            OR
          </span>
        </div> */}
      </fieldset>
    </form>
  )
}

export default Register
