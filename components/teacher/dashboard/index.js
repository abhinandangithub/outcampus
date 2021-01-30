import React, { useState, useEffect } from "react"
import { App } from "components/layout"
import List from "components/common/list"
import Tabs from "components/common/tabs"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  SlideIn,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Button,
  useToast,
  Divider,
  Badge,
  Checkbox,
  Stack,
  CheckboxGroup,
  ModalFooter,
  IconButton,
} from "@chakra-ui/core"
import useSWR, { mutate } from "swr"
import { useAuth } from "utils/useAuth"
import DatePicker from "react-datepicker"
import { getDay, addDays, isValid, addWeeks, add } from "date-fns"
import Files from "react-butterfiles"
import Crop, { readFile } from "components/common/imageCrop"
import { Label, Input } from "components/common/form"

const Dashboard = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tab, setTab] = useState("all")
  const { token, role, user } = useAuth()
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json())
  const { data: courses, error } = useSWR("/api/courses", fetcher)
  const { data: subjects, error: subjects_error } = useSWR(
    "/api/subjects",
    fetcher
  )

  const getTeacherAcademy = () => {
    let aNames = []
    if (courses && courses.length > 0) {
      courses.map((course) => {
        if (course.academy.length > 0) {
          aNames.push(course.academy.toString())
        }
      })
    }
    let nameSize = aNames.length - 1
    if (nameSize > 0) {
      return aNames[nameSize]
    }
    return ""
  }

  return (
    <App title="Dashboard" screen="dashboard">
      <div className="max-w-7xl m-auto pt-4 pb-8 px-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">My Courses</h1>
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 text-sm leading-5 font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow focus:border-yellow-400 active:bg-yellow-400"
            onClick={onOpen}
          >
            Add a new course
          </button>
        </div>
        <div className="mb-3">
          <Tabs tab={tab} setTab={setTab} />
        </div>
        {error ? (
          <div>Error fetching course</div>
        ) : (
            <List
              error={error}
              courses={courses}
              tab={tab}
              emptyMessage="You haven't added any course yet."
            />
          )}
        <SlideIn in={isOpen}>
          {(styles) => (
            <Modal
              isOpen={isOpen}
              onClose={onClose}
              closeOnEsc={false}
              closeOnOverlayClick={false}
              isCentered
              scrollBehavior="inside"
              size="3xl"
            >
              <ModalOverlay opacity={styles.opacity} />
              <ModalContent
                {...styles}
                className="rounded shadow-lg overflow-hidden"
              >
                <ModalHeader>Add Course</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <CourseForm
                    courses={courses}
                    onSuccess={onClose}
                    subjects={subjects}
                    subjects_error={subjects_error}
                    onClose={onClose}
                    getTeacherAcademy={getTeacherAcademy}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </SlideIn>
      </div>
    </App>
  )
}

const CourseForm = ({ courses, subjects, onClose, getTeacherAcademy }) => {
  const toast = useToast()
  const { token } = useAuth()
  const courseSchema = Yup.object().shape({
    title: Yup.string()
      .required("Please enter title")
      .max(76, "Title is too long. Please keep it to max 76 chars"),
    summary: Yup.string()
      .max(500, "Summary is too long. Keep it to below 500 chars")
      .required("Please add a summary"),
    format: Yup.string().required("Please choose a format of the course"),
    subject_id: Yup.string().required("Please choose a category"),
    size_min: Yup.number()
      .positive("Class size cannot be negative")
      .required("Please enter min class size")
      .min(1, "size cannot be 0"),
    size_max: Yup.number()
      .positive("Class size cannot be negative")
      .required("Please enter max class size")
      .max(30, "Size cannot be more than 30")
      .test("size_max >= size_min", "Max size should be greater or equal to Min size",
        function (size_max) {
          let size_min = this.parent['size_min'];
          return size_max >= size_min ? true : false;
        }),
    // .moreThan(Yup.ref("size_min"), "Max size should be more than min size"),
    age_min: Yup.number()
      .required("Please enter age group")
      .positive("Age cannot be negative")
      .integer("No decimals please")
      .min(2, "Minimum allowed age is 2"),
    age_max: Yup.number()
      .required("Please enter age group")
      .positive("Age cannot be negative")
      .integer("No decimals please")
      .max(18, "Maximum allowed age is 18")
      .test("age_max >= age_min", "Max age should be greater or equal to Min age",
        function (age_max) {
          let age_min = this.parent['age_min'];
          return age_max >= age_min ? true : false;
        }),
    price: Yup.number()
      .required("Please enter price")
      .moreThan(-1, "Price cannot be negative")
      .integer("No decimals please")
      .max(99999, "That's too expensive!"),
    duration: Yup.number().required("Please enter duration"),
    cover: Yup.string().required("Please upload a cover image"),
    academy: Yup.string().min(1).max(45),
    level: Yup.string().required("Please select a level"),
    objective: Yup.string()
      .max(500, "Please keep this to 500 chars")
      .required("This field cannot be left blank"),
    classes: Yup.array()
      .of(Yup.object().shape(
        {
          start_time: Yup.mixed(),
          end_time: Yup.mixed(),
          topic: Yup.string().required("Session topic is required"),
          summary: Yup.string()
        })
      )
  })
  const formik = useFormik({
    initialValues: {
      title: "",
      summary: "",
      format: "single",
      subject_id: "",
      size_min: "",
      size_max: "",
      age_min: "",
      age_max: "",
      price: "",
      hasGST: true,
      duration: "",
      cover: "",
      academy: getTeacherAcademy(),
      level: "",
      objective: "",
      classes: [
        {
          start_time: null,
          end_time: null,
          topic: "",
          summary: "",
        },
      ],
    },
    onSubmit: (values) => {
      return fetch("/api/courses", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((course) => {
          toast({
            title: "Success",
            description: "Course sucessfully created",
            status: "success",
            position: "top-right",
            duration: 1000,
          })
          mutate("/api/courses", courses)
          onClose()
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            isClosable: true,
            position: "top-right",
            duration: 1000,
          })
        })
    },
    validationSchema: courseSchema,
  })
  return (
    <form
      className="py-4"
      onSubmit={formik.handleSubmit}
      noValidate
      onBlur={formik.handleBlur}
    >
      <fieldset disabled={formik.isSubmitting}>
        <div>
          <Input
            name="title"
            placeholder="Title of the course (max 76 chars)"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            isValid={formik.touched.title && !formik.errors.title}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.title}</p>
          )}
        </div>

        <div className="mt-4">
          <Label name="summary" label="Summary" />
          <textarea
            className={`mt-1 block w-full h-32 px-3 py-1 text-sm rounded-md shadow-inner border focus:outline-none focus:shadow-outline-blue focus:border-blue-300 ${
              formik.touched.summary && formik.errors.summary
                ? "border-red-300 bg-red-50"
                : "border-gray-300"
              }`}
            name="summary"
            value={formik.values.summary}
            onChange={formik.handleChange}
            placeholder="Give a brief summary of the course (max 500 chars)"
          />
          {formik.touched.summary && formik.errors.summary && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.summary}</p>
          )}
        </div>

        <div className="mt-4">
          <Label name="objective" label="What will the student learn" />
          <textarea
            className={`mt-1 block w-full h-32 px-3 py-1 text-sm rounded-md shadow-inner border focus:outline-none focus:shadow-outline-blue focus:border-blue-300 ${
              formik.touched.objective && formik.errors.objective
                ? "border-red-300 bg-red-50"
                : "border-gray-300"
              }`}
            name="objective"
            value={formik.values.objective}
            onChange={formik.handleChange}
            placeholder="Please describe what the student is expected to learn at end of the course? (max 500 chars)"
          />
          {formik.touched.objective && formik.errors.objective && (
            <p className="mt-1 text-xs text-red-500">
              {formik.errors.objective}
            </p>
          )}
        </div>

        <div className="mt-4 flex justify-between">
          <div className="w-1/2 pr-3">
            <Input
              name="academy"
              label="Academy"
              placeholder="Name of the academy"
              value={formik.values.academy}
              isRequired={false}
              onChange={formik.handleChange}
              isValid={formik.touched.academy && !formik.errors.academy}
            />
          </div>
          <div className="w-1/2 pl-3">
            <div>
              <Label name="level" label="Level" />
              <select
                id="level"
                className={`mt-1 block form-select w-full py-2 px-3 py-0 border ${
                  formik.touched.level && formik.errors.level
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                  }  bg-white rounded-md shadow-inner focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                value={formik.values.level}
                onChange={formik.handleChange}
              >
                <option value="" disabled>
                  Choose a level
                </option>
                <option value="all">All</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              {formik.touched.level && formik.errors.level && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.level}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <div className="w-1/2 pr-3">
            <div>

              <Label name="format" label="Format" isRequired={false} />
              <select
                id="format"
                className={`mt-1 block form-select w-full py-2 px-3 py-0 border ${
                  formik.touched.format && formik.errors.format
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                  }  bg-white rounded-md shadow-inner focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                value={formik.values.format}
                onChange={formik.handleChange}
              >
                <option value="" disabled>
                  Choose a format
                </option>
                <option value="multiple">Multi-session</option>
                <option value="single">Single session</option>
              </select>
              {formik.touched.format && formik.errors.format && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.format}
                </p>
              )}
            </div>
          </div>
          <div className="w-1/2 pl-3">
            <div>
              <Label name="subject_id" label="Category" />
              <select
                id="subject_id"
                className={`mt-1 block form-select w-full py-2 px-3 py-0 border ${
                  formik.touched.subject_id && formik.errors.subject_id
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                  }  bg-white rounded-md shadow-inner focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                value={formik.values.subject_id}
                onChange={formik.handleChange}
              >
                <option value="" disabled>
                  Choose a category
                </option>
                {subjects &&
                  subjects.map((subject) => (
                    <option value={subject.id}>{subject.name}</option>
                  ))}
              </select>
              {formik.touched.subject_id && formik.errors.subject_id && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.subject_id}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <div className="w-1/3 pr-3">
            <Label name="duration" label="Session duration" />
            <select
              id="duration"
              className={`mt-1 block form-select w-full py-2 px-3 py-0 border ${
                formik.touched.duration && formik.errors.duration
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
                }  bg-white rounded-md shadow-inner focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
              value={formik.values.duration}
              onChange={formik.handleChange}
            >
              <option value="" disabled>
                Choose duration
              </option>
              <option value="15">15 mins</option>
              <option value="30">30 mins</option>
              <option value="45">45 mins</option>
              <option value="60">1 hour</option>
              <option value="75">1 hour 15 mins</option>
              <option value="90">1 hour 30 mins</option>
              <option value="105">1 hour 45 mins</option>
              <option value="120">2 hours</option>
            </select>
            {formik.touched.duration && formik.errors.duration && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.duration}
              </p>
            )}
          </div>
          <div className="w-1/3 pl-3">
            <Input
              name="price"
              label="Price per course"
              placeholder="Price in INR"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              isValid={formik.touched.price && !formik.errors.price}
            />

            {formik.touched.price && formik.errors.price && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.price}</p>
            )}
          </div>

          <div className="w-1/3 mt-4 ml-4 flex items-center">
            <input
              id="hasGST"
              type="checkbox"
              name="hasGST"
              className="formik-checkbox h-4 w-4 text-yellow-600 transition duration-150 ease-in-out mr-2"
              onChange={formik.handleChange}
              isRequired={false}
              checked={formik.values.hasGST}
              value={true}
            />
            <Label name="hasGST" label="Add GST" />
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <div className="w-1/2 pr-3">
            <Label name="size_min" label="Age group (2-18)" />
            <div className="flex items-center">
              <input
                id="age_min"
                type="number"
                min="0"
                name="age_min"
                className={`mt-1 shadow-inner appearance-none block w-20 px-3 py-2 border ${
                  formik.touched.age_min && formik.errors.age_min
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-250 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.age_min}
                placeholder="min"
              />{" "}
              <span className="mx-2 text-xs">to</span>{" "}
              <input
                name="age_max"
                type="number"
                min="0"
                className={`mt-1 shadow-inner appearance-none block w-20 px-3 py-2 border ${
                  formik.touched.age_max && formik.errors.age_max
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-250 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.age_max}
                placeholder="max"
              />{" "}
              <span className="text-xs ml-2">Years</span>
            </div>
            {((formik.touched.age_min && formik.errors.age_min) ||
              (formik.touched.age_max && formik.errors.age_max)) && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.age_min || formik.errors.age_max}
                </p>
              )}
          </div>

          <div className="w-1/2 pl-3">
            <Label name="size_min" label="Size (1-30)" />
            <div className="flex items-center">
              <input
                id="size_min"
                name="size_min"
                type="number"
                min="0"
                className={`mt-1 shadow-inner appearance-none block w-20 px-3 py-2 border ${
                  formik.touched.size_min && formik.errors.size_min
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-250 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.size_min}
                placeholder="min"
              />{" "}
              <span className="mx-2 text-xs">to</span>{" "}
              <input
                name="size_max"
                type="number"
                min="0"
                className={`mt-1 shadow-inner appearance-none block w-20 px-3 py-2 border ${
                  formik.touched.size_max && formik.errors.size_max
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-250 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.size_max}
                placeholder="max"
              />{" "}
              <span className="text-xs ml-2">Students</span>
            </div>
            {((formik.touched.size_min && formik.errors.size_min) ||
              (formik.touched.size_max && formik.errors.size_max)) && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.size_min || formik.errors.size_max}
                </p>
              )}
          </div>
        </div>

        <div className="mt-4">
          <Label name="cover" label="Upload cover image" />
          <ImageInput
            name="cover"
            value={formik.values.cover}
            onChange={formik.handleChange}
          />
          {formik.touched.cover && formik.errors.cover && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.cover}</p>
          )}
        </div>

        <div className="mt-6">
          <Scheduling
            name="classes"
            formik={formik}
            format={formik.values.format}
            duration={formik.values.duration}
            value={formik.values.classes}
            onChange={formik.handleChange}
          />
        </div>

        <div className="mt-10 flex justify-end">
          <Button variant="ghost" onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button
            variantColor="yellow"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <Spinner size="sm" /> : "Create course"}
          </Button>
        </div>
      </fieldset>
    </form>
  )
}

const Select = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  isValid = true,
}) => {
  return (
    <div className="w-full">
      <Label name={name} label={label} />
      <select
        id={name}
        className={`mt-1 block form-select w-full py-2 px-3 py-0 border ${
          isValid ? "border-red-300 bg-red-50" : "border-gray-300"
          }  bg-white rounded-md shadow-inner focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        <option value="all">All</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>
  )
}

const Scheduling = ({ format, ...props }) => {
  return (
    <div>
      <Divider />
      <h2 className="font-medium text-gray-600 text-lg mt-10 mb-4">
        Schedule sessions
      </h2>
      {format === "multiple" ? (
        <MultipleSessions {...props} />
      ) : (
          <SingleSession {...props} />
        )}
    </div>
  )
}

const MultipleSessions = ({ formik: formik, value: classes, onChange, duration }) => {
  const [daysOfWeek, setDaysOfWeek] = useState([])
  const [noOfClasses, setNoOfClasses] = useState(2)
  console.log('abhi classes ', classes)

  const template = {
    start_time: classes[0].start_time,
    end_time: "",
    topic: "",
    summary: "",
  }

  useEffect(() => {
    if (noOfClasses > 1) {
      // console.log("total",noOfClasses)
      // console.log("length",classes.length)
      if (noOfClasses > classes.length) {
        onChange({
          target: {
            name: "classes",
            value: classes.concat(template),
          },
        })
      }
      if (noOfClasses < classes.length) {
        onChange({
          target: {
            name: "classes",
            value: classes.slice(0, noOfClasses),
          },
        })
      }
    }
  }, [noOfClasses])

  // console.log("VALUE",classes)

  const highlightedDates = getHighlightedDate(
    classes[0].start_time,
    noOfClasses,
    daysOfWeek
  )

  // console.log(highlightedDates)

  return (
    <div>
      <div className="mt-4 flex">
        <div className="w-1/5 p3-3">
          <Label label="No. of sessions" />
          <div className="flex items-center">
            <IconButton
              size="sm"
              icon="minus"
              onClick={() => {
                if (noOfClasses > 2) {
                  setNoOfClasses(noOfClasses - 1)
                }
              }}
            />
            <input
              className="w-8 text-center border-none bg-white text-sm"
              value={noOfClasses}
              disabled
            />
            <IconButton
              size="sm"
              icon="add"
              onClick={() => {
                setNoOfClasses(noOfClasses + 1)
              }}
            />
          </div>
        </div>
        <div className="w-4/5 pl-3">
          <Label
            name="days_of_week"
            label="Days on which the sessions would be conducted"
          />
          <CheckboxGroup
            isInline
          //  mt="1"
            // onChange={(days) => setDaysOfWeek(days.map(Number).sort())}
            // defaultValue={daysOfWeek}
          >
            <div className="border b-gray-300 rounded-md py-1 px-2 mr-2">
              <Checkbox size="sm" value={1} >
                Mon a
              </Checkbox>
            </div>
            <div className="border b-gray-300 rounded-md py-1 px-2 mr-2">
              <Checkbox size="sm" value={2}>
                Tue
              </Checkbox>
            </div>
            <div className="border b-gray-300 rounded-md py-1 px-2 mr-2">
              <Checkbox size="sm" value={3}>
                Wed
              </Checkbox>
            </div>
            <div className="border b-gray-300 rounded-md py-1 px-2 mr-2">
              <Checkbox size="sm" value={4}>
                Thu
              </Checkbox>
            </div>
            <div className="border b-gray-300 rounded-md py-1 px-2 mr-2">
              <Checkbox size="sm" value={5}>
                Fri
              </Checkbox>
            </div>
            <div className="border b-gray-300 rounded-md py-1 px-2 mr-2">
              <Checkbox size="sm" value={6}>
                Sat
              </Checkbox>
            </div>
            <div className="border b-gray-300 rounded-md py-1 px-2">
              <Checkbox size="sm" value={0}>
                Sun
              </Checkbox>
            </div>
          </CheckboxGroup>
        </div>
      </div>

      <div className="mt-4 flex">
        <div className="w-1/2 pr-3">
          <Label
            name="start_time"
            label="First session starts at (Choose date and time)"
            isRequired={false}
          />
          <div>
            <DatePicker
              selected={classes[0].start_time}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="dd/MM/yyyy h:mm aa"
              minDate={new Date()}
              onChange={(date) => {
                onChange({
                  target: {
                    name: "classes[0]",
                    value: {
                      ...value[0],
                      ...{
                        topic: "Session",
                        start_time: date,
                        end_time: add(date, { minutes: duration }),
                      },
                    },
                  },
                })
              }}
            />

            <DatePicker
              showPopperArrow={false}
              minDate={new Date()}
              selected={classes[0].start_time}
              onChange={(date) => {
                // console.log("date", date)
                onChange({
                  target: {
                    name: "classes[0]",
                    value: {
                      ...classes[0],
                      ...{
                        start_time: date,
                        end_time: add(date, { minutes: duration }),
                      },
                    },
                  },
                })
              }}
              showTimeSelect
              timeIntervals={15}
              timeFormat="HH:mm"
              dateFormat="dd/MM/yyyy h:mm aa"
              // filterDate={(date) => {
              //   return daysOfWeek.includes(getDay(date))
              // }}
            />
          </div>
        </div>
        <div className="w-1/2 pl-3">
          <div className="mt-4">
            <DatePicker
              inline
              showPopperArrow={false}
              includeDates={highlightedDates}
              highlightDates={highlightedDates}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        {classes.map((session, index) => (
          <div className="my-4 py-3 border-b">
            <div className="flex justify-between">
              <div className="w-full">
                <Input
                  label={`Topic for session ${index + 1}`}
                  placeholder="Enter session topic (max 85 chars)"
                  name={`session-topic-${index + 1}`}
                  value={classes[index].topic}
                  onChange={(e) => {
                    const newClasses = classes.slice()
                    newClasses[index].topic =
                      e.target.value.length <= 85
                        ? e.target.value
                        : e.target.value.slice(0, 85)
                    newClasses[index].start_time = highlightedDates[index]
                    onChange({
                      target: {
                        name: "classes",
                        value: newClasses,
                      },
                    })
                  }}
                />

                {formik && formik.values && formik.values.classes.length > 0 && formik.errors.classes && formik.errors.classes.length > 0 && formik.errors.classes[index] && (
                  <p className="mt-1 text-xs text-red-500">{formik.errors.classes[index].topic}</p>

                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SingleSession = ({ formik, value, onChange, duration }) => {
  console.log(formik)
  console.log('abhi classes ', value)

  return (
    <div className="flex">
      <div className="w-full">
        <div>
          {JSON.stringify(value[0].start_time)}
          <Label
            name="start_time"
            label="Session starts at (choose date and time)"
            isRequired={false}
          />
          <div className="mt-1">
            <DatePicker
              selected={value[0].start_time}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="dd/MM/yyyy h:mm aa"
              minDate={new Date()}
              onChange={(date) => {
                onChange({
                  target: {
                    name: "classes[0]",
                    value: {
                      ...value[0],
                      ...{
                        topic: "Session",
                        start_time: date,
                        end_time: add(date, { minutes: duration }),
                      },
                    },
                  },
                })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const getHighlightedDate = (start_date, total, originaldaysOfWeek) => {
  if (!isValid(start_date) || total === 0 || originaldaysOfWeek.length === 0)
    return []
  let count = 0
  let daysOfWeek = originaldaysOfWeek.slice()
  rotateArray(daysOfWeek, daysOfWeek.indexOf(getDay(start_date)))
  let daysLength = daysOfWeek.length
  const dates = []
  while (count < Number(total)) {
    let week = Math.floor(count / daysLength)
    let dayIndex = count % daysLength
    let days =
      daysOfWeek[dayIndex] < getDay(start_date)
        ? daysOfWeek[dayIndex] - getDay(start_date) + 7
        : daysOfWeek[dayIndex] - getDay(start_date)
    dates.push(addWeeks(addDays(start_date, days), week))
    count++
  }
  return dates
}

const rotateArray = (arr, index) => {
  index -= arr.length * Math.floor(index / arr.length)
  arr.push.apply(arr, arr.splice(0, index))
  return arr
}

const ImageInput = ({ value, onChange }) => {
  return (
    <div className="mt-1 rounded-md shadow-xs overflow-hidden relative">
      <img src={value} className="h-64 w-full object-cover" />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-0 hover:opacity-75 z-1 flex items-center justify-center">
        <UploadPicture
          onChange={onChange}
          label={value ? "Change" : "Upload"}
        />
      </div>
    </div>
  )
}

const UploadPicture = ({ label, onChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [image, setImage] = useState(null)
  return (
    <Files
      accept={["image/png", "image/jpg", "image/jpeg"]}
      onSuccess={async (file) => {
        const fileURI = await readFile(file[0].src.file)
        setImage(fileURI)
        onOpen()
      }}
    >
      {({ browseFiles, getDropzoneProps, getLabelProps }) => (
        <div>
          <button
            type="button"
            className="py-2 px-3 border border-gray-300 bg-white rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
            onClick={browseFiles}
          >
            {label}
          </button>
          <Modal
            isOpen={isOpen}
            size="4xl"
            scrollBehavior="inside"
            closeOnEsc={false}
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Crop image</ModalHeader>
              <ModalBody className="relative">
                <Crop
                  src={image}
                  aspect={16 / 9}
                  onCrop={(img) => {
                    setImage(img)
                    onChange({
                      target: {
                        name: "cover",
                        value: img,
                      },
                    })
                    onClose()
                  }}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )}
    </Files>
  )
}

export default Dashboard
