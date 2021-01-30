import React, { useState, useEffect, useReducer } from "react"
import { App } from "components/layout";
import sha256 from 'crypto-js/sha256';
import HmacSHA256 from 'crypto-js/hmac-sha256';

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Spinner,
    useToast
} from "@chakra-ui/core"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"
import { useAuth } from "../utils/useAuth"
import Axios from "axios"
import useSWR from "swr"
import { Input, Label } from "./common/form";

const Slots = (props) => {

    const router = useRouter()
    const age = router.query.age;

    const [date, setDate] = useState(new Date('2020-10-04 06:15:00'));
    const [alert, setAlert] = useState({ type: "idle" });

    const [orderId, setOrderId] = useState();
    const [isUserPaid, setIsUserPaid] = useState(false);

    const { role, token, user } = useAuth();

    useEffect(() => {
        return () => {
            localStorage.removeItem("price");
        };
    }, []);

    useEffect(() => {
        if (role !== 'student' || (!token || !user)) {
            router.push({
                pathname: '/login',
                query: { isPayment: true }
            });
        } else {
            Axios.get(`/api/payment/${user.id}`).then((response) => {
                if (response.data && response.data.length) {
                    setIsUserPaid(true);
                } else {
                    router.push("/");
                }
            }).catch((e) => {
                router.push("/");
            })
        }
    }, [role]);

    const fetcher = (url) =>
        fetch(url)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText)
                return response.json()
            })
            .catch((error) => {
                throw Error(error.message)
            })
    const { data: courses, error } = useSWR("/api/courses", fetcher)

    return (
        <App title="buy now">
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                {alert.type !== "success" ? (

                    !courses || !isUserPaid ? (
                        <div className="flex justify-center">
                            <Spinner />
                        </div>
                    ) : (
                            < div >
                                <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                                        Select your slot
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

                                        <SlotsForm setAlert={setAlert} courses={courses} age={age} setDate={setDate} />
                                    </div>
                                </div>
                            </div>
                        )
                ) : (
                        <div className="max-w-2xl mx-auto">
                            <Alert status="success">
                                {/* <AlertIcon /> */}
                                {/* <AlertTitle className="mr-2">
                                    <p>Congratulations!!</p>
                                    <br></br>
                                    <p>{user.firstName} enrollment for the Young Leader Program is confirmed! {user.firstName} course will begin from {date.getDate()}/{date.getMonth()}/{date.getFullYear()} at {date.getHours()}: {date.getMinutes()} (IST).</p>
                                    <br></br>
                                    <p>Kindly ensure that you have arranged a Laptop/PC which has a stable Internet connection to attend the class. Please join at least 5 minutes before the commencement of the class.</p>
                                    <br></br>
                                    <p>Look forward to meeting {user.firstName} in the class.</p>
                                    <br></br>
                                    <p>Thank you,</p>
                                    <p>Team Outcampus</p>
                                </AlertTitle> */}
                                <p>Congratulations!!</p>
                                <br></br>
                                <p>{user.lastName} enrollment for the Young Leader Program is confirmed!
                                    </p>
                            </Alert>


                        </div>
                    )}
            </div>
        </App>
    )
}

const SlotsForm = ({ setAlert, courses, age, setDate }) => {
    const router = useRouter();
    const toast = useToast()

    const { role, token, user } = useAuth();

    const [courseSlots, setCourseSlots] = useState([]);
    const [ageGroup, setAgeGroup] = useState(Number(age));


    function formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ampm;
        return strTime;
    }

    function filterCourses() {
        let temp = [];
        setCourseSlots([]);

        let weekday = [];
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

        let ageArray = [];
        if (ageGroup === 7) {
            ageArray = [6, 7];
        } else if (ageGroup === 9) {
            ageArray = [8, 9];
        } else if (ageGroup === 12) {
            ageArray = [10, 11, 12];
        } else {
            ageArray = [13, 14, 15];
        }

        temp = courses.filter((c) => {
            return c.status === 'approved' &&
                ageArray.indexOf(c.age_max) > -1 &&
                new Date(c.class_session[0].start_time) > new Date() &&
                c.size_max > c.enrolment.filter((x) => x.status === "SUCCESS").length
        });
        if (temp && temp.length) {
            setDate(temp[0].class_session[0].start_time);
        }
        temp.map((c) => {
            let startIndex = 0;
            let endIndex = c.class_session.length - 1;

            let startDayOfWeek = new Date(c.class_session[0].start_time).getDay();
            startDayOfWeek = weekday[startDayOfWeek];

            // console.log('startDayOfWeek ', startDayOfWeek);
            // let day = '';
            // c.class_session.map((s, index) => {
            //     let startDay = new Date(s.start_time).getDay();
            //     startDay = weekday[startDay];
            //     if (endIndex === index) {
            //         day = day.concat(startDay + ' ');
            //     } else {
            //         day = day.concat(startDay + '-');
            //     }
            // });

            let day = '';
            for (let i = 0; i < c.class_session.length; i++) {
                let startDay = new Date(c.class_session[i].start_time).getDay();
                startDay = weekday[startDay];
                if (i) {
                    if (startDayOfWeek === startDay) break;
                }
                if (endIndex === i) {
                    day = day.concat(startDay + ' ');
                } else {
                    day = day.concat(startDay + '-');
                }
            }

            let startDate = new Date(c.class_session[startIndex].start_time);
            let startHour = formatAMPM(startDate);

            let endHour = formatAMPM(new Date(startDate.getTime() + c.duration * 60000));

            let hour = `${startHour}-${endHour}`;
            setCourseSlots(prevState => [...prevState, { 'name': day + hour, id: c.id }]);

        });
    }

    useEffect(() => {
        filterCourses()
    }, [courses, ageGroup]);

    useEffect(() => {
        if (courseSlots.length) {
            formik.values.slot = courseSlots[0].id;
        } else {
            formik.values.slot = undefined;
        }
    }, [courseSlots]);

    const slotsSchema = Yup.object().shape({

    })

    const formik = useFormik({
        initialValues: {
            // slot: courseSlots.length ? courseSlots[0].id : 0
        },
        onSubmit: async (values) => {
            if (!!values.slot) {

                fetch(`/api/enrolment/slot`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        course_id: values.slot,
                        amountPaid: localStorage.getItem('price') ? localStorage.getItem('price') : 0
                    }),
                })
                    .then((response) => {
                        if (response.status === 409) {
                            toast({
                                title: "Already enrolled",
                                description:
                                    "You have already enrolled for this course. Please check your dashboard for more details",
                                status: "info",
                                position: "top",
                                duration: 1000,
                            })
                        }
                        if (response.status === 200) {
                            console.log('abhi enroll ', response);
                            Axios.patch(`/api/payment/${user.id}`, {
                                paymentId: localStorage.getItem('paymentId'),
                                courseId: values.slot
                            }).then((response) => {
                                console.log('response ', response);
                            })
                            setAlert({
                                type: "success",
                                message: "Successfully enrolled.",
                            });
                            setTimeout(() => {
                                router.push({
                                    pathname: '/dashboard'
                                });
                            }, 2000);
                        }
                        return response.json()
                    })
                    .then((data) => {
                        if (data.error) {
                            toast({
                                title: "Enrolment failed",
                                description: data.message,
                                status: "error",
                                position: "top",
                                duration: 1000,
                            })
                        }
                    })
                    .catch(console.error)
                    .finally(() => {
                    })
            }
        },
        validationSchema: slotsSchema,
    })

    return (
        <form
            className="mb-2"
            onSubmit={formik.handleSubmit}
            onBlur={formik.handleBlur}
            noValidate
        >
            <fieldset disabled={formik.isSubmitting}>

                <div className="mt-6">
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
                                className={"h-10 w-full flex justify-center py-2 px-2 border-transparent text-xs md:text-sm font-medium text-black placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-300 " + (ageGroup == 7 ? "bg-yellow-300" : "bg-white")}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAgeGroup(7)
                                }}
                            >
                                6 & 7
                        </button>
                        </span>
                        <span className=" w-full  shadow-sm">
                            <button
                                type="button"
                                className={"h-10 w-full flex justify-center py-2 px-2 border-transparent text-xs md:text-sm font-medium text-black placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-300 " + (ageGroup == 9 ? "bg-yellow-300" : "bg-white")}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAgeGroup(9)
                                }}
                            >
                                8 & 9
                            </button>
                        </span>
                        <span className=" w-full shadow-sm">
                            <button
                                type="button"
                                className={"h-10 w-full flex justify-center py-2 px-2 border-transparent text-xs md:text-sm font-medium text-black placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-300 " + (ageGroup == 12 ? "bg-yellow-300" : "bg-white")}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAgeGroup(12)
                                }}
                            >
                                10, 11 & 12
                            </button>
                        </span>
                        <span className=" w-full shadow-sm">
                            <button
                                type="button"
                                className={"h-10 w-full flex justify-center py-2 px-2 border-transparent text-xs md:text-sm font-medium text-black placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-300 " + (ageGroup == 15 ? "bg-yellow-300" : "bg-white")}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAgeGroup(15)
                                }}
                            >
                                13, 14 & 15
                            </button>
                        </span>
                    </div>
                </div>

                <div className="mt-6">
                    <Label name="slot" label="Slot" />
                    {courseSlots.length === 0 ? 'No slots available' : ''}
                    <select
                        id="slot"
                        className={`disabled mt-1 block form-select w-full py-2 px-3 py-0 border ${
                            formik.touched.slot && formik.errors.slot
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            }  bg-white rounded-md shadow-inner focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                        value={formik.values.slot}
                        onChange={formik.handleChange}
                        disabled={!courseSlots.length}
                    >
                        <option value='0' disabled>
                            Choose a slot
                        </option>
                        {courseSlots.length && courseSlots.map((c, index) => {
                            return (
                                <option selected={index == 0} value={c.id}>{c.name}</option>
                            );
                        })}

                    </select>
                    {formik.touched.format && formik.errors.format && (
                        <p className="mt-1 text-xs text-red-500">
                            {formik.errors.format}
                        </p>
                    )}
                </div>

                <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                        <button
                            type="submit"
                            className="h-10 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:border-yellow-400 focus:shadow-outline-yellow active:bg-yellow-400 transition duration-150 ease-in-out"
                            disabled={formik.isSubmitting || formik.values.slot == 0}
                        >
                            {formik.isSubmitting ? <Spinner size="sm" /> : "Confirm"}
                        </button>
                    </span>
                </div>

            </fieldset>
        </form>
    )
}

export default Slots
