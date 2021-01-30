import React, { useState, Fragment, useEffect } from "react"
import { App } from "components/layout"
import {
    Spinner,
    useToast,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalContent,
    ModalHeader,
    IconButton,
    Divider
} from "@chakra-ui/core"
import Files from "react-butterfiles"
import Crop, { readFile } from "components/common/imageCrop"
import { useAuth } from "../../../utils/useAuth"
import useSWR, { mutate } from "swr"
import { useRouter } from "next/router"
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Label } from "../../common/form";
import DatePicker from "react-datepicker"
import { getDay, addDays, isValid, addWeeks, add } from "date-fns"

const CourseEditPage = ({ courseId }) => {
    const { token } = useAuth();

    const fetcher = (url) =>
        fetch(url, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText)
                return response.json()
            })
            .catch((error) => {
                console.error(error.message)
                throw Error(error.message)
            })
    let { data: course, error } = useSWR(`/api/courses/${courseId}`, fetcher)
    const { data: subjects, error: subjects_error } = useSWR(
        "/api/subjects",
        fetcher
    )


    if (!course) {
        return (
            <App title={"Edit course"}>
                <div className="flex justify-center mt-24">
                    <Spinner />
                </div>
            </App>

        )
    }

    return (
        <App title={"Edit course"}>
            <div className="flex justify-center mx-24 my-10">
                <CourseForm course={course} subjects={subjects} subjects_error={subjects_error} courseId={courseId}></CourseForm>
            </div>
        </App>
    )
}


const CourseForm = ({ course, subjects, subjects_error, courseId }) => {
    const { token, role } = useAuth()
    const toast = useToast()
    const router = useRouter()
    const courseSchema = Yup.object().shape({
        title: Yup.string()
            .required("Please enter title")
            .max(76, "Title is too long. Please keep it to max 76 chars"),
        status: Yup.string(),
        is_popular: Yup.bool(),
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
            title: course.title,
            summary: course.summary,
            status: course.status,
            is_popular: course.is_popular ? true : false,
            format: course.format,
            subject_id: course.subject_id,
            size_min: course.size_min,
            size_max: course.size_max,
            age_min: course.age_min,
            age_max: course.age_max,
            price: course.price,
            hasGST: course.hasGST,
            duration: course.duration,
            cover: course.cover,
            academy: course.academy,
            level: course.level,
            objective: course.objective,
            
            classes: course.class_session.map((session) => {
                return {
                    start_time: session.start_time,
                    end_time: session.end_time,
                    topic: session.topic,
                    summary: session.summary,
                    id: session.id,
                    type: 'update'
                }
            }),
            classes_delete: []
        },
        onSubmit: (values) => {

            return fetch(`/api/courses/${course.id}`, {
                method: "PATCH",
                headers: {
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((response) => response.json())
                .then((course) => {
                    const fetcher = () =>
                        fetch(`/api/courses/${courseId}`, {
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                        })
                            .then((response) => {
                                if (!response.ok) throw Error(response.statusText)
                                return response.json()
                            })
                            .catch((error) => {
                                console.error(error.message)
                                throw Error(error.message)
                            })
                    fetcher().then((resp) => {
                        formik.handleChange({
                            target: {
                                name: "classes",
                                value: resp.class_session.map((o) => {
                                    return {
                                        start_time: o.start_time,
                                        end_time: o.end_time,
                                        topic: o.topic,
                                        summary: o.summary,
                                        id: o.id,
                                        type: 'update'
                                    }
                                })
                            },
                        });
                        formik.handleChange({
                            target: {
                                name: "classes_delete",
                                value: []
                            },
                        });
                    })
                    
                    toast({
                        title: "Success",
                        description: "Course successfully edited",
                        status: "success",
                        position: "top-right",
                        duration: 1000,
                    })
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

    const cancelEdit = (e) => {
        e.preventDefault();
        window.history.back();
        // router.push('/dashboard')
    }

    return (
        <Fragment>
            <form
                className="py-4"
                onSubmit={formik.handleSubmit}
                noValidate
                onBlur={formik.handleBlur}
            >
                <fieldset disabled={formik.isSubmitting}>
                    <div className="text-2xl py-4 font-bold">Editing : {course.title} : {course.outcampus_course_id}</div>
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
                    {["admin", "super_admin"].includes(role) &&
                        (<div className="mt-4 flex justify-between">
                            <div className="w-1/2 pr-3">
                                <div>
                                    <Label name="status" label="Status" />
                                    <select
                                        id="status"
                                        className={`disabled mt-1 block form-select w-full py-2 px-3 py-0 border ${
                                            formik.touched.status && formik.errors.status
                                                ? "border-red-300 bg-red-50"
                                                : "border-gray-300"
                                            }  bg-white rounded-md shadow-inner focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                                        value={formik.values.status}
                                        onChange={formik.handleChange}
                                    >
                                        <option value="" disabled>
                                            Choose a Status
                                </option>
                                        <option value="unapproved">Un Approve</option>
                                        <option value="approved">Approve</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    {formik.touched.format && formik.errors.format && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {formik.errors.format}
                                        </p>
                                    )}
                                </div>
                            </div>


                            <div className="w-1/2 mt-4 ml-4 flex items-center">
                                <input
                                    id="is_popular"
                                    type="checkbox"
                                    name="is_popular"
                                    className="formik-checkbox h-4 w-4 text-yellow-600 transition duration-150 ease-in-out mr-2"
                                    onChange={formik.handleChange}
                                    checked={formik.values.is_popular}
                                    value={false}
                                />
                                <Label name="isPopular" label="Is Popular" />
                            </div>
                            {formik.touched.is_popular && formik.errors.is_popular && (
                                <p className="mt-1 text-xs text-red-500">{formik.errors.is_popular}</p>
                            )}

                        </div>)}

                    <div className="mt-4 flex justify-between">
                        <div className="w-1/2 pr-3">
                            <Input
                                name="academy"
                                label="Academy"
                                placeholder="Name of the academy"
                                value={formik.values.academy}
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
                                <Label name="format" label="Format" />
                                <select
                                    id="format"
                                    className={`disabled mt-1 block form-select w-full py-2 px-3 py-0 border ${
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
                                    <option value="multiple" disabled>Multi-session</option>
                                    <option value="single" disabled>Single session</option>
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
                        <div className="w-1/3 pl-3 ">
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
                                checked={formik.values.hasGST}
                                value={true}
                            />
                            <Label name="hasGST" label="Add GST" />
                        </div>
                        {formik.touched.hasGST && formik.errors.hasGST && (
                            <p className="mt-1 text-xs text-red-500">{formik.errors.hasGST}</p>
                        )}
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


                    {/* TODO: Sessions should be made editable and save individual session*/}
                    {/*<div className="mt-6">*/}
                    {/*    <Scheduling*/}
                    {/*        name="classes"*/}
                    {/*        format={formik.values.format}*/}
                    {/*        duration={formik.values.duration}*/}
                    {/*        value={formik.values.classes}*/}
                    {/*        onChange={formik.handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className="mt-6">
                        <Scheduling
                            name="classes"
                            formik={formik}
                            format={formik.values.format}
                            duration={formik.values.duration}
                            value={formik.values.classes}
                            onChange={formik.handleChange}
                            classes_delete={formik.values.classes_delete}
                        />
                    </div>

                    <div className="mt-10 flex justify-end">
                        <Button variant="ghost" mr={3} onClick={cancelEdit}>
                            Cancel
                    </Button>
                        <Button
                            variantColor="yellow"
                            type="submit"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? <Spinner size="sm" /> : "Save Changes"}
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Fragment>
    )
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
                        closeOnEsc={true}
                        closeOnOverlayClick={true}
                        onClose={onClose}
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

const MultipleSessions = ({ formik: formik, value: classes, onChange, duration, classes_delete }) => {
    const [daysOfWeek, setDaysOfWeek] = useState([])
    const [noOfClasses, setNoOfClasses] = useState(classes.length);
    const [classesCopy, setClassesCopy] = useState(classes);

    console.log('classes ', classes, noOfClasses);

    const template = {
        start_time: "",
        end_time: "",
        topic: "",
        summary: "",
        type: 'insert'
    }

    useEffect(() => {
        if (noOfClasses > 1) {
            if (noOfClasses > classes.length) {
                onChange({
                    target: {
                        name: "classes",
                        value: classes.concat(template),
                    },
                })
            }

            if (noOfClasses < classes.length) {
                let x;
                let currentSession = classes[classes.length - 1];
                if (currentSession.type === 'update') {
                    classes_delete.push(currentSession);
                    onChange({
                        target: {
                            name: "classes_delete",
                            value: classes_delete,
                        },
                    })
                }
                x = classes.slice(0, noOfClasses);

                onChange({
                    target: {
                        name: "classes",
                        value: x,
                    },
                })
            }
        }
    }, [noOfClasses])

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
            </div>
            {classes.map((session, index) =>
                <div className="mt-4 flex justify-between py-3">

                    <div className="w-1/3">
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

                    <div className="w-1/3 pl-5">
                        <Label
                            name="start_time"
                            label="Choose date and time"
                            isRequired={false}
                        />
                        <div>
                            <DatePicker
                                showPopperArrow={false}
                                minDate={index && classes[index - 1].start_time ? new Date((new Date(classes[index - 1].start_time).getTime() + 86400000)) : new Date()}
                                selected={classes[index].start_time ? new Date(classes[index].start_time) : ""}
                                onChange={(date) => {
                                    onChange({
                                        target: {
                                            name: `classes[${index}]`,
                                            value: {
                                                ...classes[index],
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
                            //     return daysOfWeek.includes(getDay(date))
                            // }}
                            />

                            <div>
                                {
                                    !classes[index].start_time && <p className="mt-1 text-xs text-red-500">Date is required</p>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const SingleSession = ({ formik, value, onChange, duration }) => {

    return (
        <div className="flex">
            <div className="w-full">
                <div>
                    <Label
                        name="start_time"
                        label="Session starts at (choose date and time)"
                        isRequired={false}
                    />
                    <div className="mt-1">
                        <DatePicker
                            selected={value[0].start_time ? new Date(value[0].start_time) : ""}
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

export default CourseEditPage