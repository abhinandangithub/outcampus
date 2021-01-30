import React, { Fragment, useState, useMemo } from "react"
import { AdminLayout } from "../layout"
import { useAuth } from "../../utils/useAuth"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"
import { gql } from "apollo-boost"
import { useQuery, useMutation } from "@apollo/react-hooks"
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
  useToast,
  Badge,
  Alert,
  AlertIcon
} from "@chakra-ui/core";
import Axios from "axios"

const COURSES = gql`
  {
    course(order_by: { created_at: desc }) {
      id
      title
      status
      user {
        first_name
        last_name
        avatar
      }
    }
  }
`

const SUBJECTS = gql`
  {
    subject {
      id
      name
      created_at
    }
  }
`
const TEACHERS = gql`
  {
    teacher: user(where: { role: { name: { _eq: "teacher" } } }) {
      id
      first_name
      last_name
      email
      phone
      avatar
      outcampus_id
    }
  }
`

const STUDENTS = gql`
  {
    student: user(where: { role: { name: { _eq: "student" } } }) {
      id
      first_name
      last_name
      avatar
      email
      phone
      outcampus_id
    }
  }
`

const ADMINS = gql`
  {
    admin: user(where: { role: { name: { _eq: "admin" } } }) {
      id
      email
    }
  }
`

const EDIT_TASK = gql`
  mutation updateCourse($id: Int!, $status: String!) {
    update_course(where: { id: { _eq: $id } }, _set: { status: $status }) {
      affected_rows
    }
  }
`

const DELETE_SUBJECT = gql`
  mutation deleteSubject($id: Int!) {
    delete_subject(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

const adminService = {
  login: async (email, password) => {
    return await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
  },
}

const AdminHome = (props) => {
  const { role, token } = useAuth()
  const [tab, setTab] = useState("courses")
  return (
    <Fragment>
      {["super_admin", "admin"].includes(role) ? (
        <AdminLayout
          title="Admin dashboard"
          role={role}
          tab={tab}
          setTab={setTab}
        >
          <h1 className="text-2xl font-semibold text-gray-900">{tab}</h1>
          {tab === "courses" && <AdminCourses token={token} />}
          {tab === "course categories" && <AdminSubjects token={token} />}
          {tab === "teachers" && <AdminTeachers token={token} />}
          {tab === "students" && <AdminStudents token={token} />}
          {tab === "admins" && <AdminAdmins token={token} />}
          {tab === "Student Mappings" && <AdminStudentMappings token={token} />}
        </AdminLayout>
      ) : (
          <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-xl">
              <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                OutCampus Admin
            </h2>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-xl">
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        )}
    </Fragment>
  )
}

const LoginForm = (props) => {
  const router = useRouter()
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
      const session = await adminService
        .login(email, password)
        .catch(console.error)

      console.log(session)
      session && localStorage.setItem("session", JSON.stringify(session))
      location.reload()
      formik.setSubmitting(false)
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
            className="block text-sm font-medium leading-5 text-gray-700"
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
            className="block text-sm font-medium leading-5 text-gray-700"
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

        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              className="w-full h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:border-yellow-400 focus:shadow-outline-yellow active:bg-yellow-400 transition duration-150 ease-in-out"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner size="sm" /> : "Save"}
            </button>
          </span>
        </div>
      </fieldset>
    </form>
  )
}

const AdminCourses = (props) => {
  const [editTask] = useMutation(EDIT_TASK)
  const { loading, data, error, refetch } = useQuery(COURSES, {
    fetchPolicy: "no-cache",
  })

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    )

  if (error) return <div>500. Internal server error</div>
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md mt-8">
      <ul>
        {data.course.map((course, index) => (
          <li
            className={`${index === 0 ? "" : "border-t border-gray-200"}`}
            key={`course-${index}`}
          >
            <a
              href={`/courses/${course.id}`}
              target="_blank"
              className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm leading-5 font-medium text-gray-800 truncate">
                      {course.title}
                      <span className="ml-1 font-normal text-gray-500">
                        by {course.user.first_name} {course.user.last_name}
                      </span>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm leading-5 text-gray-500">
                        <span className="mr-3">Id: {course.id}</span>
                        <Badge
                          variantColor={
                            course.status === "unapproved" ? "red" : "gray"
                          }
                        >
                          {course.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0">
                    {course.status === "unapproved" && (
                      <Button
                        size="xs"
                        variantColor="green"
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          editTask({
                            variables: { id: course.id, status: "approved" },
                          }).then(() => {
                            refetch()
                          })
                        }}
                      >
                        Approve
                      </Button>
                    )}

                    {!["unapproved", "cancelled"].includes(course.status) && (
                      <Button
                        size="xs"
                        variantColor="orange"
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          editTask({
                            variables: { id: course.id, status: "cancelled" },
                          }).then(() => {
                            refetch()
                          })
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                    {course.status === "cancelled" && (
                      <Button
                        size="xs"
                        variantColor="blue"
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          editTask({
                            variables: { id: course.id, status: "approved" },
                          }).then(() => {
                            refetch()
                          })
                        }}
                      >
                        Reinstate
                      </Button>
                    )}
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const AdminSubjects = (props) => {
  const subjectSchema = Yup.object().shape({
    name: Yup.string().required(),
  })
  const [deleteSubject] = useMutation(DELETE_SUBJECT)
  const [subject, setSubject] = useState("")
  const { loading, data, error, refetch } = useQuery(SUBJECTS, {
    fetchPolicy: "no-cache",
  })
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      return fetch("/api/subjects", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
        }),
      })
        .then((response) => {
          if (!response.ok) throw Error(response.statusText)
          return response.json()
        })
        .then((data) => {
          toast({
            title: "Created",
            description: `Course category ${values.name} created`,
            status: "success",
            position: "top",
            duration: 1000,
          })
          refetch()
        })
        .catch((error) => {
          console.error(error)
          toast({
            title: "Error",
            description: "Unable to create category",
            status: "error",
            position: "top",
            duration: 1000,
          })
        })
    },
    validationSchema: subjectSchema,
  })
  const toast = useToast()

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    )

  if (error) return <div>500. Internal server error</div>
  return (
    <div className="max-w-lg">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center my-8 pr-4">
          {" "}
          <input
            name="name"
            className={`mt-1 shadow-inner appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-250 ease-in-out sm:text-sm sm:leading-5 mr-3 ${
              formik.touched.name && formik.errors.name
                ? "border-red-500 bg-red-50"
                : ""
              }`}
            placeholder="Add a new course category"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            size="sm"
            variantColor="yellow"
            className="block"
          >
            {formik.isSubmitting ? <Spinner /> : "Add"}
          </Button>
        </div>
      </form>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Category name</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {data.subject.map((subject, index) => (
            <tr
              key={`subject-${index}`}
              className={
                index % 2 === 0
                  ? "bg-gray-50 hover:bg-gray-100"
                  : "hover:bg-gray-100"
              }
            >
              <td className="px-4 py-2">{subject.name}</td>
              <td className="px-4 py-2 text-right">
                <Button
                  size="sm"
                  onClick={(e) => {
                    deleteSubject({ variables: { id: subject.id } })
                      .then(() => {
                        toast({
                          title: "Deleted",
                          description: `Course category deleted`,
                          status: "success",
                          position: "top",
                          duration: 1000,
                        })
                        refetch()
                      })
                      .catch(console.error)
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const AdminTeachers = (props) => {
  const { loading, data, error } = useQuery(TEACHERS, {
    fetchPolicy: "no-cache",
  })

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    )

  if (error) return <div>Unable to fetch teacher details</div>
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Id</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Phone</th>
        </tr>
      </thead>
      <tbody>
        {data.teacher.map((teacher, index) => (
          <tr key={`teacher-${index}`}>
            <td className="px-4 py-2 text-left border border-gray-300">
              {teacher.first_name} {teacher.last_name}
            </td>
            <td className="px-4 py-2 text-left border border-gray-300">
              {teacher.outcampus_id}
            </td>
            <td className="px-4 py-2 text-left border border-gray-300">
              {teacher.email}
            </td>
            <td className="px-4 py-2 text-left border border-gray-300">
              {teacher.phone}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const AdminStudents = (props) => {
  const { loading, data, error } = useQuery(STUDENTS, {
    fetchPolicy: "no-cache",
  })

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    )

  if (error) return <div>Unable to get student details</div>
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Id</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Phone</th>
        </tr>
      </thead>
      <tbody>
        {data.student.map((student, index) => (
          <tr key={`student-${index}`}>
            <td className="px-4 py-2 text-left border border-gray-300">
              {student.first_name} {student.last_name}
            </td>
            <td className="px-4 py-2 text-left border border-gray-300">
              {student.outcampus_id}
            </td>
            <td className="px-4 py-2 text-left border border-gray-300">
              {student.email}
            </td>
            <td className="px-4 py-2 text-left border border-gray-300">
              {student.phone}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const AdminAdmins = (props) => {
  const { token } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function deleteAdmin(adminId) {
    return fetch(`/api/admins/${adminId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Unable to delete admin")
        }
      })
      .catch((error) => {
        alert(`ERROR: ${error.message}`)
      })
  }

  const { loading, data, error, refetch } = useQuery(ADMINS, {
    fetchPolicy: "no-cache",
  })

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    )

  if (error) return <div>500. Internal server error</div>
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.log(email, password)
          fetch("/api/admins", {
            method: "POST",
            headers: {
              authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          })
            .then((response) => {
              if (!response.ok) {
                throw Error("Unable to add admin")
              }
              return response.json()
            })
            .then(() => {
              alert("Admin added successfully")
              refetch()
            })
            .catch((error) => {
              alert(`ERROR: ${error.message}`)
            })
            .finally(() => {
              setEmail("")
              setPassword("")
            })
        }}
      >
        <input
          placeholder="admin email"
          className="p-2 border"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <input
          placeholder="admin password"
          className="p-2 border"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <Button type="submit">Create Admin</Button>
      </form>
      <table>
        <tbody>
          {data.admin.map((admin, index) => (
            <tr key={`admin-${index}`}>
              <td>{admin.email}</td>
              <td>
                <Button
                  onClick={(e) => {
                    deleteAdmin(admin.id).then(() => {
                      refetch()
                    })
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const EnrollMentForm = ({ enroll, onSuccess, onError }) => {
  console.log('abhi dataToUpdate ', enroll);
  const { role, token } = useAuth();
  const [alert, setAlert] = useState({ type: "idle" });

  const emrollmentSchema = Yup.object().shape({
    courseId: Yup.number().required("Please enter course id"),
    studentId: Yup.string().required("Please enter student id"),
    amountPaid: Yup.number().required("Please enter amount")
  })

  const formik = useFormik({
    initialValues: {
      courseId: enroll ? enroll.course_id : "",
      studentId: enroll ? enroll.student_id : "",
      amountPaid: enroll ? enroll.amountPaid : "",
    },
    onSubmit: async (values) => {
      console.log('abhi values ', values);
      let body = {
        course_id: values.courseId,
        student_id: values.studentId,
        email: values.email,
        amountPaid: enroll ? enroll.amountPaid : 0,
        status: "SUCCESS",
        rating: 4,
        id: enroll ? enroll.id : 0
      }

      return await fetch(`/api/enrolment/search`, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ ...body })
      })
        .then(onSuccess).catch((e) => { })
    },
    validationSchema: emrollmentSchema,
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
            Course Id
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="courseId"
                required
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.courseId && formik.errors.courseId
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.courseId}
              />
            </div>
            {formik.touched.courseId && formik.errors.courseId && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.courseId}</p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="studentId"
            className="block text-sm font-medium leading-5 text-gray-700 required-field"
          >
            {enroll ? "Student Id" : "Student Email"}
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                disabled={enroll ? true : false}
                id="studentId"
                required
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.studentId && formik.errors.studentId
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.studentId}
              />
            </div>
            {formik.touched.studentId && formik.errors.studentId && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.studentId}</p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-5 text-gray-700 required-field"
          >
            Amount
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="amountPaid"
                disabled={enroll ? true : false}
                required
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.amountPaid && formik.errors.amountPaid
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.amountPaid}
              />
            </div>
            {formik.touched.amountPaid && formik.errors.amountPaid && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.amountPaid}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              className="w-full h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:border-yellow-400 focus:shadow-outline-yellow active:bg-yellow-400 transition duration-150 ease-in-out"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner size="sm" /> : "Save"}
            </button>
          </span>
        </div>
      </fieldset>
    </form>
  )
}

const AddNewEnrolment = ({ setStudentData, email }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alert, setAlert] = useState({ type: "idle" });
  const toast = useToast();

  return (
    <Button
      type="button"
      size="sm"
      variantColor="yellow"
      className="block ml-3"
      onClick={onOpen}
    >
      Add New
            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new enrolment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EnrollMentForm
              onSuccess={() => {
                console.log('abhi onclose');
                onClose();
                // toast({
                //   title: "Enroll student",
                //   description: "Successfully Added",
                //   status: "success",
                //   position: "top",
                //   duration: 1000,
                // })
              }}
              onError={(error) => {
                console.error("LOGIN ERROR", error)
                toast({
                  title: "Enroll student",
                  description: "Falied to add.",
                  status: "error",
                  position: "top",
                  duration: 1000,
                })
              }} enroll={undefined} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Button>
  )
}

const UpdateEnrolment = ({ enroll, setStudentData, email }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alert, setAlert] = useState({ type: "idle" });
  const toast = useToast();

  return (
    <Button
      size="sm"
      onClick={onOpen}
      id={enroll.id}
    >
      Edit
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update enrolment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {alert.message && (
              <Alert status={alert.type}>
                <AlertIcon />
                {alert.message}
              </Alert>
            )}
            <EnrollMentForm
              onSuccess={() => {
                console.log('abhi onclose');
                // toast({
                //   title: "Enroll student",
                //   description: "Successfully Updated.",
                //   status: "success",
                //   position: "top",
                //   duration: 1000,
                // })
                onClose();
                fetch(`/api/enrolment/search/${email}`, {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  }
                })
                  .then((response) => {
                    if (!response.ok) throw Error(response.statusText)
                    return response.json()
                  })
                  .then((data) => {
                    console.log('abhi search ', data);
                    setStudentData(data);
                  })
              }}
              onError={(error) => {
                console.error("LOGIN ERROR", error);
                toast({
                  title: "Enroll student",
                  description: "Falied to update.",
                  status: "error",
                  position: "top",
                  duration: 1000,
                })
              }} enroll={enroll} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Button>
  )
}

const AdminStudentMappings = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const subjectSchema = Yup.object().shape({
    email: Yup.string().required("Please enter email id")
  })
  const [deleteSubject] = useMutation(DELETE_SUBJECT)
  const [subject, setSubject] = useState("")
  let { loading, data, error, refetch } = useQuery(SUBJECTS, {
    fetchPolicy: "no-cache",
  });
  const [studentData, setStudentData] = useState([]);
  const [alert, setAlert] = useState({ type: "idle" });

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit: (values) => {
      return fetch(`/api/enrolment/search/${values.email}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
        .then((response) => {
          if (!response.ok) throw Error(response.statusText)
          return response.json()
        })
        .then((data) => {
          console.log('abhi search ', data);
          setStudentData(data);
        })
        .catch((error) => {
          console.error(error)
        })
    },
    validationSchema: subjectSchema,
  });

  const deleteEnrolment = (id) => {
    return fetch(`/api/enrolment/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        fetch(`/api/enrolment/search/${email}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })
          .then((response) => {
            if (!response.ok) throw Error(response.statusText)
            return response.json()
          })
          .then((data) => {
            setStudentData(data);
          })
        return response.json()
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const toast = useToast()

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    )

  if (error) return <div>500. Internal server error</div>
  return (
    <div className="max-w-2xl">
      <form onSubmit={formik.handleSubmit} noValidate>

        <div className="flex items-center my-8 pr-4">
          {" "}
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="Enter student email id"
            className={`appearance-none block w-full px-3 py-2 border ${
              formik.touched.email && formik.errors.email
                ? "border-red-500 bg-red-50"
                : "border-gray-300"
              } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
            onChange={(e) => {
              formik.handleChange(e)
            }}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
          )}
          <Button
            type="submit"
            size="sm"
            variantColor="yellow"
            className="block ml-3"
          >
            {formik.isSubmitting ? <Spinner /> : "search"}
          </Button>
          <AddNewEnrolment setStudentData={setStudentData} email={formik.values.email} />
        </div>
      </form>

      <p>Student enrolled courses</p>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="pr-6 py-2">ID</th>
            <th className="pr-6 py-2">Student ID</th>
            <th className="pr-6 py-2">Course ID</th>
            {/* <th className="pr-4 py-2">Amount Paid</th> */}

          </tr>
        </thead>
        <tbody>
          {studentData.map((enroll, index) => (
            <tr
              key={`course-${index}`}
              className={
                index % 2 === 0
                  ? "bg-gray-50 hover:bg-gray-100"
                  : "hover:bg-gray-100"
              }
            >
              <td className="px-4 py-2">{enroll.id}</td>
              <td className="px-4 py-2">{enroll.student_id}</td>
              <td className="px-4 py-2">{enroll.course_id}</td>
              {/* <td className="px-4 py-2">{enroll.amountPaid}</td> */}
              <td className="px-4 py-2 text-right">
                <UpdateEnrolment enroll={enroll} setStudentData={setStudentData} email={formik.values.email} />
              </td>
              <td className="px-4 py-2 text-right">
                <Button
                  size="sm"
                  onClick={(e) => {
                    deleteEnrolment(enroll.id)
                  }}
                >
                  Delete
                  </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}

export default AdminHome
