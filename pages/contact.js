import { PublicLayout } from "components/layout"
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    Box, useToast, Spinner,
} from "@chakra-ui/core";
import React, { useState } from 'react';
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAuth } from "utils/useAuth"
import PhoneInput from "react-phone-number-input"
import flags from 'react-phone-number-input/flags'
import Axios from "axios";

export default (props) => (
    <PublicLayout title="Contact us">
        {/*wrapper*/}
        <div className="">
            {/*Section 1*/}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center">
                <div className="flex flex-col md:w-1/2 sm:w-full section-height justify-center">
                    <div className="text-3xl text-center">Contact our Support and Sales Teams</div>
                    <div className="text-sm text-center">Need to get in touch with the team? We’re all ears.</div>
                </div>
                <div className="flex section-height md:w-1/2 sm:w-full bg-yellow-300 justify-center">
                    <img className="sm:w-sm sm:h-sm md:w-md md:h-md items-center my-auto p-4" src="/img/contact-phone.svg" />
                </div>
            </div>
            {/*Section 2*/}
            <div className="flex flex-col bg-yellow-300 pt-4 pb-6 items-center">
                <div className="items-center">
                    <div className="text-center text-3xl font-bold my-6 mx-4">Get in touch with us if you are :</div>
                    {/* Items */}
                    <div className="max-w-6xl flex flex-row flex-wrap items-center">

                        {/*Item*/}
                        <div className="flex justify-start max-w-sm mt-6">
                            <div className="flex">
                                <div className="mx-10">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold">Existing Students</span>
                                        <span>Already enjoying outcampus courses? Feel free to contact us for support or feedback.</span>
                                        <span className="text-white"><a href="mailto:support@outcampus.in" target="blank">support@outcampus.in</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Item*/}
                        <div className="flex justify-start max-w-sm mt-6">
                            <div className="flex">
                                <div className="mx-10">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold">Existing Teacher</span>
                                        <span>Facing technical issues (Adding a course, payments, Updating details or anything else)? Just drop an e-mail. </span>
                                        <span className="text-white"><a href="mailto:support@outcampus.in" target="blank">support@outcampus.in</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Item*/}
                        <div className="flex justify-start max-w-sm mt-6">
                            <div className="flex">
                                <div className="mx-10">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold">New Student</span>
                                        <span>Not an Outcampus student yet? Contact our experts to know more about our offerings. </span>
                                        <span className="text-white"><a href="mailto:support@outcampus.in" target="blank">support@outcampus.in</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*Item*/}
                        <div className="flex justify-start max-w-sm mt-6">
                            <div className="flex">
                                <div className="mx-10">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold">New Teacher</span>
                                        <span>Want to join the outcampus team and start teaching today? Reach out to us now. </span>
                                        <span className="text-white"><a href="mailto:join@outcampus.in" target="blank">join@outcampus.in</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*Item*/}
                        <div className="flex justify-start max-w-sm mt-6">
                            <div className="flex">
                                <div className="mx-10">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold">Arrange a call back</span>
                                        <span>Prefer speaking with us? Enter your number, we will call you.</span>
                                        <span className="text-white width-full"><ArrangeCallbackForm /></span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*Item*/}
                        <div className="flex justify-start max-w-sm mt-6">
                            <div className="flex">
                                <div className="mx-10">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold">Call Us</span>
                                        <span>Need to talk to us urgently? Call us right away.</span>
                                        <ShowNumber />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>

            {/*Section 3*/}
            <div className="flex flex-col pt-4 pb-6 items-center">
                <div className="items-center">
                    <div className="text-center text-3xl font-bold my-6 ml-4">Frequently asked questions</div>
                    {/* Items */}
                    <div className="flex flex-row flex-wrap items-center">
                        <Accordion className="md:max-w-6xl md:min-w-6xl sm:max-w-sm">
                            <AccordionItem>
                                <AccordionHeader>
                                    <Box flex="1" textAlign="left" className="font-bold">
                                        What is Outcampus ?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionHeader>
                                <AccordionPanel pb={4}>
                                    Outcampus is an online teaching platform that conducts live sessions and curated courses to facilitate all-round development of children in the age group of 3 to 18
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem>
                                <AccordionHeader>
                                    <Box flex="1" textAlign="left" className="font-bold">
                                        How does the Outcampus platform work ?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionHeader>
                                <AccordionPanel pb={4}>
                                    Outcampus is a one -stop-shop. After signing up on our platform, students can browse and enroll for the courses listed on our platform. The payment for the same is made on our platform during enrollment. At the time of session, the students need to login and “join session” from their dashboards. All communication after class hours (including homework) is done on the Outcampus platform as well.
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem>
                                <AccordionHeader>
                                    <Box flex="1" textAlign="left" className="font-bold">
                                        Can I view video recordings of live online classes ?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionHeader>
                                <AccordionPanel pb={4}>
                                    Video recording of live online classes will be available for enrolled students only. These can be viewed from the course page.
                                </AccordionPanel>
                            </AccordionItem>



                            <AccordionItem>
                                <AccordionHeader>
                                    <Box flex="1" textAlign="left" className="font-bold">
                                        Is the OutCampus platform free ?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionHeader>
                                <AccordionPanel pb={4}>
                                    Yes. Currently we do not charge any commission or platform fees for students or teachers to register on our platform. However, students need to pay for the course enrollment fees for the course of their choice.
                                </AccordionPanel>
                            </AccordionItem>


                            <AccordionItem>
                                <AccordionHeader>
                                    <Box flex="1" textAlign="left" className="font-bold">
                                        How do teachers get paid ?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionHeader>
                                <AccordionPanel pb={4}>
                                    Teachers will be paid for the course after completion of their respective course. The payment will be made within 3 business days of completion of course directly in the preferred mode of payment as specified by the teacher. For teachers based outside India and no Indian bank account, payment will be made via Paypal.
                                </AccordionPanel>
                            </AccordionItem>




                        </Accordion>

                    </div>


                </div>
            </div>

        </div>
    </PublicLayout >
)


function ShowNumber() {
    const [showNumber, setShowNumber] = useState(false);
    return (
        showNumber ? <span className="text-white pt-2"><a href="tel:+919035777011">+91 90357 77011</a></span> : <span className="text-black bg-white px-1 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-center" onClick={() => setShowNumber(!showNumber)}>Get the number</span>
    )
}

function ArrangeCallbackForm() {
    const toast = useToast()
    const { token } = useAuth()
    const callbackSchema = Yup.object().shape({
        phone: Yup.string()
            .required("Please enter phone number")
    })

    const formik = useFormik({
        initialValues: {
            phone: "",
        },
        onSubmit: async (values) => {
            return Axios.post("/api/contact", values)
                .then((data) => {
                    toast({
                        title: "Success",
                        description: "Request Received Successfully",
                        status: "success",
                        position: "top-right",
                    })
                })
                .catch((error) => {
                    toast({
                        title: "Error",
                        description: "Request failed",
                        status: "error",
                        position: "top-right",
                    })
                });
        },
        validationSchema: callbackSchema
    })

    return (
        <form
            onSubmit={formik.handleSubmit}
            noValidate
            onBlur={formik.handleBlur}
        >
            <fieldset disabled={formik.isSubmitting}>
                <div className="flex space-x-2">
                    <div className="w-2/3">
                        <div className="rounded-md shadow-sm">
                            <div
                                className={`mt-1 flex border rounded-md shadow-sm overflow-hidden ${
                                    formik.touched.phone && formik.errors.phone
                                        ? "border-red-500 bg-white"
                                        : "border-white"
                                    }`}
                            >
                                <PhoneInput
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    flags={flags}
                                    defaultCountry="IN"
                                    className="callback-form appearance-none block px-3 py-2  placeholder-white  transition duration-150 ease-in-out sm:text-sm sm:leading-5 rounded-md"
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
                    <button type="submit"
                        className="w-1/3 text-center mt-1 px-2 py-2 h-10 bg-white hover:bg-gray-100 rounded-md text-black cursor-pointer"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? <Spinner size="sm" /> : "Assist Me"}
                    </button>
                </div>
            </fieldset>
        </form>
    )
}
