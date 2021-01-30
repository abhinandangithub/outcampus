import React, { useState, useEffect, Fragment, useRef } from "react"
import { format } from "date-fns"
import { isEmpty } from "lodash"
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
} from "@chakra-ui/core"
import { Input, FormError } from "components/common/form"
import { truncate } from "lodash"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAuth } from "../../../utils/useAuth"
import Plyr from "plyr"
import S3 from "react-aws-s3";
import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig()

const TeacherSessionRating = ({ sessionId, hasRatedSessionAsStudent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overall, setOverall] = useState(-1);
  const [audio, setAudio] = useState(-1);
  const [video, setVideo] = useState(-1);
  const [content, setContent] = useState(-1);
  const [course_structure, setCourseStructure] = useState(-1);
  const [professionalism, setProfessionalism] = useState(-1);
  const [communication, setCommunication] = useState(-1);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(true);
  const [hasRatedSession, setHasRatedSession] = useState(hasRatedSessionAsStudent)

  const { token } = useAuth()
  const toast = useToast()

  // Set rating value and set error to false
  const setOverallRating = (value) => {
    setOverall(value)
    setError(false)
  }


  const onSubmitRating = async () => {
    let values = {
      "overall": overall,
      "audio": audio,
      "video": video,
      "content": content,
      "course_structure": course_structure,
      "professionalism": professionalism,
      "communication": communication,
      "comment": comment,
      "class_session_id": sessionId,
    }
    overall < 0 ? setError(true) : setError(false)
    if (!error) {
      return await fetch(`/api/teacher_ratings`, {
        method: "POST",
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
          }
          return response.json()
        })
        .then(() => {
          setHasRatedSession(true)
          toast({
            title: "Success",
            description: "You have rated successfully",
            status: "success",
            position: "top",
          })
          onClose()
        })
        .catch((error) => {
          toast({
            title: "Failed",
            description: `Rating failed. Error is ${error.message}`,
            status: "error",
            position: "top",
          })
        })
    } else {
      console.log("Over Value is required")
    }

  }

  const ratingButton = () => {
    if (hasRatedSession) {
      return (
        <button className="flex flex-col p-2" onClick={onOpen}>
          <img
            src="/img/ratings-done.svg"
            height="18px"
            width="18px"
            className="self-center text-yellow-300 fill-yellow-300"
          ></img>
          <p className="text-yellow-300">Rate Class</p>
          <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Class Rating</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <h3>You have already submitted rating for this session</h3>
                <div className="flex flex-row justify-end">
                  <button className="ml-4 mt-2 inline-block text-center rounded-md py-2 px-4 bg-yellow-300 hover:bg-yellow-400 cursor-pointer" onClick={onClose}>Close</button>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </button>

      )
    } else {
      return (
        <button className="flex flex-col p-2" onClick={onOpen}>
          <img
            src="/img/ratings-enabled.svg"
            height="18px"
            width="18px"
            className="self-center text-black fill-current"
          ></img>
          <p className="text-black">Rate Class</p>
          <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Class Rating</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div className="flex flex-col">
                  {/* Rating Section 1 */}
                  <div>
                    <div className="w-full text-2xl">How was the Overall Rating of the class? * <span className={`text-lg ${error ? "text-red-500" : "text-gray-400"}`}>(required)</span></div>
                    <div className="flex flex-row justify-between w-full mt-4">
                      <div className="w-1/8">
                        {overall <= 1 && overall > -1 && (
                          <Fragment>
                            <img src="/img/ratings/rating_0.png" onClick={() => setOverallRating(0)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${overall == 0 ? "filter-none" : "filter-grayscale"}`} />
                            <span className="mx-auto text-sm">Never Coming Back</span>
                          </Fragment>
                        )}
                      </div>
                      <div className="flex flex-row">
                        <span className="flex flex-col px-2" onClick={() => setOverallRating(1)}>
                          <img src="/img/ratings/rating_1.png" className={` justify-center h-8 w-8 hover:filter-none hover:shadow-sm ${overall == 1 ? "filter-none" : "filter-grayscale"}`} />
                          <span className="mx-auto">1</span>
                        </span>
                        <span className="flex flex-col px-2" onClick={() => setOverallRating(2)}>
                          <img src="/img/ratings/rating_2.png" className={`h-8 w-8 hover:filter-none hover:shadow-sm ${overall == 2 ? "filter-none" : "filter-grayscale"}`} />
                          <span className="mx-auto">2</span>
                        </span>
                        <span className="flex flex-col px-2" onClick={() => setOverallRating(3)}>
                          <img src="/img/ratings/rating_3.png" className={`h-8 w-8 hover:filter-none hover:shadow-sm ${overall == 3 ? "filter-none" : "filter-grayscale"}`} />
                          <span className="mx-auto">3</span>
                        </span>
                        <span className="flex flex-col px-2" onClick={() => setOverallRating(4)}>
                          <img src="/img/ratings/rating_4.png" className={`h-8 w-8 hover:filter-none hover:shadow-sm ${overall == 4 ? "filter-none" : "filter-grayscale"}`} />
                          <span className="mx-auto">4</span>
                        </span>
                        <span className="flex flex-col px-2" onClick={() => setOverallRating(5)}>
                          <img src="/img/ratings/rating_5.png" className={`h-8 w-8 hover:filter-none hover:shadow-sm ${overall == 5 ? "filter-none" : "filter-grayscale"}`} />
                          <span className="mx-auto">5</span>
                        </span>
                      </div>
                      <div>
                        {overall >= 5 && (
                          <Fragment>
                            <img src="/img/ratings/rating_6.png" onClick={() => setOverallRating(6)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${overall == 6 ? "filter-none" : "filter-grayscale"}`} />
                            <span className="mx-auto text-sm text-center">Best Class Ever</span>
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Rating section 2 */}
                  <div className="mt-4">
                    <div className="w-full text-2xl">How was your experience ? <span className="text-sm text-gray-400">(optional)</span></div>
                    {/* Connectivity */}
                    <div className="flex flex-row w-full mx-auto mt-4">
                      <div className="my-auto flex-1 text-lg">Connectivity</div>
                      <div className="flex flex-col flex-1">
                        <div className="mx-auto">Audio</div>
                        <div className="flex flex-row mx-auto">
                          <span className="m-1">
                            <img src="/img/ratings/rating_1.png" onClick={() => setAudio(0)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${audio == 0 ? "filter-none" : "filter-grayscale"}`} />
                          </span>
                          <span className="m-1">
                            <img src="/img/ratings/rating_4.png" onClick={() => setAudio(1)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${audio == 1 ? "filter-none" : "filter-grayscale"}`} />
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row flex-1 justify-center">
                        <div>
                          <div className="justify-center">Video</div>
                          <div className="flex flex-row justify-center">
                            <span className="m-1">
                              <img src="/img/ratings/rating_1.png" onClick={() => setVideo(0)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${video == 0 ? "filter-none" : "filter-grayscale"}`} />
                            </span>
                            <span className="m-1">
                              <img src="/img/ratings/rating_4.png" onClick={() => setVideo(1)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${video == 1 ? "filter-none" : "filter-grayscale"}`} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Course */}
                    <div className="flex flex-row w-full mx-auto mt-4">
                      <div className="my-auto flex-1 text-lg">Course</div>
                      <div className="flex flex-col flex-1">
                        <div className="mx-auto">Content</div>
                        <div className="flex flex-row mx-auto">
                          <span className="m-1">
                            <img src="/img/ratings/rating_1.png" onClick={() => setContent(0)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${content == 0 ? "filter-none" : "filter-grayscale"}`} />
                          </span>
                          <span className="m-1">
                            <img src="/img/ratings/rating_4.png" onClick={() => setContent(1)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${content == 1 ? "filter-none" : "filter-grayscale"}`} />
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row flex-1 justify-center">
                        <div>
                          <div className="justify-end">Structure</div>
                          <div className="flex flex-row justify-center">
                            <span className="m-1">
                              <img src="/img/ratings/rating_1.png" onClick={() => setCourseStructure(0)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${course_structure == 0 ? "filter-none" : "filter-grayscale"}`} />
                            </span>
                            <span className="m-1">
                              <img src="/img/ratings/rating_4.png" onClick={() => setCourseStructure(1)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${course_structure == 1 ? "filter-none" : "filter-grayscale"}`} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Teacher */}
                    <div className="flex flex-row w-full mx-auto mt-4">
                      <div className="my-auto flex-1 text-lg">Teacher</div>
                      <div className="flex flex-col flex-1">
                        <div className="mx-auto">Professionalism</div>
                        <div className="flex flex-row mx-auto">
                          <span className="m-1">
                            <img src="/img/ratings/rating_1.png" onClick={() => setProfessionalism(0)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${professionalism == 0 ? "filter-none" : "filter-grayscale"}`} />
                          </span>
                          <span className="m-1">
                            <img src="/img/ratings/rating_4.png" onClick={() => setProfessionalism(1)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${professionalism == 1 ? "filter-none" : "filter-grayscale"}`} />
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row flex-1 justify-center">
                        <div>
                          <div className="justify-end">Communication</div>
                          <div className="flex flex-row justify-center">
                            <span className="m-1">
                              <img src="/img/ratings/rating_1.png" onClick={() => setCommunication(0)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${communication == 0 ? "filter-none" : "filter-grayscale"}`} />
                            </span>
                            <span className="m-1">
                              <img src="/img/ratings/rating_4.png" onClick={() => setCommunication(1)} className={`mx-auto h-8 w-8 hover:filter-none hover:shadow-sm ${communication == 1 ? "filter-none" : "filter-grayscale"}`} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Rating Section 3  */}
                  <div className="mt-2">
                    <div className="text-2xl my-2">Comments <span className="text-sm text-gray-400">(optional)</span></div>
                    <textarea className="mt-1 block w-full h-32 px-3 py-1 text-sm rounded-md shadow-inner border focus:outline-none focus:shadow-outline-blue focus:border-blue-300" placeholder="Any Suggestions ?"
                      name="comment"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    >
                    </textarea>
                  </div>
                  {/* Actions */}
                  <div className="flex flex-row justify-end">
                    <button className="ml-4 mt-2 inline-block text-center rounded-md py-2 px-4 bg-gray-300 hover:bg-gray-400 cursor-pointer" onClick={onClose}>Cancel</button>
                    <button className={`ml-4 mt-2 inline-block text-center rounded-md py-2 px-4 bg-yellow-300 hover:bg-yellow-400 ${error ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={error ? false : onSubmitRating}>Save</button>
                  </div>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </button>
      )
    }

  }


  return (
    <Fragment>
      {ratingButton()}
    </Fragment >
  )
}

const TeacherStudentsRating = ({ sessionId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { token } = useAuth()
  const toast = useToast()

  const onSubmitRating = async () => {
    let values = {
      "class_session_id": sessionId,
      "student_id": 0,
      "performance": 0,
      "participation": 0,
      "remark": ""
    }
    return await fetch(`/api/teacher_ratings`, {
      method: "POST",
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
        }
        return response.json()
      })
      .then(() => {

        toast({
          title: "Success",
          description: "You have rated successfully",
          status: "success",
          position: "top",
        })
        onClose()
      })
      .catch((error) => {
        toast({
          title: "Failed",
          description: `Rating failed. Error is ${error.message}`,
          status: "error",
          position: "top",
        })
      })
  }


  return (
    <Fragment>
      <button className="flex flex-col p-2" onClick={onOpen}>
        <img
          src="/img/ratings-enabled.svg"
          height="18px"
          width="18px"
          className="self-center text-black fill-current"
        ></img>
        <p className="text-black">Rate Class</p>
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Session Students Rating</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="flex flex-col">
                <p>Session Rating for students</p>

              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </button>
    </Fragment >
  )
}

const HomeWorkForm = ({ onSuccess, onError }) => {
  const homeWorkSchema = Yup.object().shape({
    title: Yup.string()
      .required("Please enter title"),
    upload: Yup.string().required("Please upload file"),
  })

  const fileInput = useRef();

  const formik = useFormik({
    initialValues: {
      title: "",
      upload: "",
    },
    onSubmit: async (values) => {
      const { title, upload } = values;
      const config = {
        bucketName: publicRuntimeConfig.S3_BUCKET,
        region: publicRuntimeConfig.S3_REGION,
        accessKeyId: publicRuntimeConfig.S3_ACCESS_KEY_ID,
        secretAccessKey: publicRuntimeConfig.S3_SECRET_ACCESS_KEY,
      };
      const ReactS3Client = new S3(config);

      let file = fileInput.current.files[0];
      let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
      console.log('title, upload ', file, newFileName, config, values);
      ReactS3Client.uploadFile(file, newFileName).then(async (data) => {
        console.log(data);
        if (data.status === 204) {
          console.log("success");
          onSuccess(data);
        } else {
          console.log("fail");
        }
      });
    },
    validationSchema: homeWorkSchema,
  })

  return (
    <form
      className="mb-2"
      action="/homework"
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
            Title
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="title"
                type="text"
                required
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.title && formik.errors.title
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.title}
              />
            </div>
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.title}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="upload"
            className="border-solid block text-sm font-medium leading-5 text-gray-700 required-field"
          >
            Upload
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="upload"
                type="file"
                ref={fileInput}
                required
                onChange={formik.handleChange}
                value={formik.values.upload}
              />
            </div>
            {formik.touched.upload && formik.errors.upload && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.upload}</p>
            )}
            {/* {fileInput && fileInput.current ? fileInput.current.files[0] : <p className="mt-1 text-xs text-red-500">
              {formik.errors.upload}error
            </p>} */}
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

const HomeWork = ({ sessionId, course_id, home_work }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fileInput = useRef();
  const { role, token, user } = useAuth()
  const toast = useToast();
  console.log('home_work ', home_work);

  let myHomeWork = [];
  if (home_work && home_work.length) {
    if (role === 'teacher' || role === 'admin' || role === 'superadmin') {
      myHomeWork = home_work.filter(h => {
        return h.isTeacher;
      })
    } else {
      myHomeWork = home_work.filter(h => {
        console.log('myHomeWork fileter', user, h);
        return h.user_id === user.id;
      })
    }
  }
  console.log('myHomeWork ', user, myHomeWork);

  let student_home_work = [];
  if (role === 'teacher' || role === 'admin' || role === 'super_admin') {
    student_home_work = home_work.filter(h => {
      return !h.isTeacher;
    })
  }
  console.log('student_home_work ', student_home_work);

  let teacher_home_work = undefined;
  if (role === 'student') {
    teacher_home_work = home_work.find(h => {
      return h.isTeacher;
    })
  }
  console.log('teacher_home_work ', teacher_home_work);

  const addHomeWork = async (url) => {
    let values = {
      "class_session_id": sessionId,
      "url": url,
      "course_id": course_id,
      "isTeacher": role === 'student' ? false : true,
    }

    if (myHomeWork.length && myHomeWork[0].url) {
      return await fetch(`/api/home_work`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, id: myHomeWork[0].id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText)
          }
          return response.json()
        })
        .then(() => {
          toast({
            title: "Success",
            description: "You have successfully uploaded homework",
            status: "success",
            position: "top",
          })
          onClose()
        })
        .catch((error) => {
          toast({
            title: "Failed",
            description: `Uploading failed. Error is ${error.message}`,
            status: "error",
            position: "top",
          })
        })
    } else {
      return await fetch(`/api/home_work`, {
        method: "POST",
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
          }
          return response.json()
        })
        .then(() => {
          toast({
            title: "Success",
            description: "You have successfully uploaded homework",
            status: "success",
            position: "top",
          })
          onClose()
        })
        .catch((error) => {
          toast({
            title: "Failed",
            description: `Uploading failed. Error is ${error.message}`,
            status: "error",
            position: "top",
          })
        })
    }

  }
  const handleClick = (event) => {
    event.preventDefault();
    const config = {
      bucketName: publicRuntimeConfig.S3_BUCKET,
      region: publicRuntimeConfig.S3_REGION,
      accessKeyId: publicRuntimeConfig.S3_ACCESS_KEY_ID,
      secretAccessKey: publicRuntimeConfig.S3_SECRET_ACCESS_KEY,
    };
    const ReactS3Client = new S3(config);

    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");

    ReactS3Client.uploadFile(file, newFileName).then(async (data) => {
      console.log(data);
      if (data.status === 204) {
        console.log("success");
        let values = {
          "class_session_id": sessionId,
          "url": data.location,
          "course_id": course_id,
          "isTeacher": role === 'student'
        }
        return await fetch(`/api/home_work`, {
          method: "POST",
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
            }
            return response.json()
          })
          .then(() => {

            toast({
              title: "Success",
              description: "You have successfully uploaded homework",
              status: "success",
              position: "top",
            })
            onClose()
          })
          .catch((error) => {
            toast({
              title: "Failed",
              description: `Uploading failed. Error is ${error.message}`,
              status: "error",
              position: "top",
            })
          })
      } else {
        console.log("fail");
      }
    });

  };

  const downloadFile = (url) => {
    console.log('url ', url);
    fetch(url)
      .then(response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = 'homework';
          a.click();
        });
        //window.location.href = response.url;
      });
  }

  return (
    <Fragment>
      <button className="flex flex-col p-2" onClick={onOpen}>
        <img
          src="/img/homework-disabled.svg"
          height="18px"
          width="18px"
          className="self-center"
        ></img>
        <p>Homework</p>
        {/* {myHomeWork.length && myHomeWork[0].url && <span>{myHomeWork[0].url}</span>} */}
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Homework upload</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {role === 'student' && teacher_home_work ?
                <div className="mt-1 flex justify-between ml-1">
                  <h3>Homework file from teacher</h3>
                  <button type="submit" class="ml-3 bg-gray-300 hover:bg-gray-400 text-gray-800  py-1 px-1 rounded inline-flex items-center"
                    onClick={() => downloadFile(teacher_home_work.url)}>
                    <svg class="fill-current w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                    <span>Download</span>
                  </button>
                </div> : ""
              }

              {myHomeWork.length && myHomeWork[0].url ?
                <div className="mt-1">
                  <div className="flex justify-between ml-1">
                    <span>You have already uploaded homework</span>
                    <button type="submit" class="ml-3 bg-gray-300 hover:bg-gray-400 text-gray-800  py-1 px-1 rounded inline-flex items-center"
                      onClick={() => downloadFile(myHomeWork[0].url)}>
                      <svg class="fill-current w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                      <span>Download</span>
                    </button>
                  </div>
                  <div className="">Do you want to re-upload?</div>
                </div> : ""
              }

              <div className="mt-4">
                <div className="">
                  <HomeWorkForm
                    onSuccess={(response) => {
                      console.log('onsuccess ', response);
                      addHomeWork(response);
                    }}
                    onError={(error) => {
                      console.error("LOGIN ERROR", error);
                    }}
                  ></HomeWorkForm>
                </div>
              </div>
              {/* <div className="flex flex-col mt-1">
                <label>
                  Upload file:
                    <input type='file' ref={fileInput} />
                </label>
                <br />
                <Button className="w-1/6" type='submit' variantColor="yellow" onClick={handleClick}>Upload</Button>
              </div> */}

              {(role === 'teacher' || role === 'admin' || role === 'super_admin') && student_home_work.length ?
                <div className="mt-4">
                  <h3 className="font-bold text-xl">Students submitted homework</h3>
                  {student_home_work.map((s, index) => (
                    <div class="flex mt-1">
                      <div className="mr-4">{s.user.last_name}</div>
                      <button type="submit" class="ml-3 bg-gray-300 hover:bg-gray-400 text-gray-800  py-1 px-1 rounded inline-flex items-center"
                        onClick={() => downloadFile(s.url)}>
                        <svg class="fill-current w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div> : ""
              }

              {(role === 'admin' || role === 'super_admin') && teacher_home_work && teacher_home_work.length ?
                <div className="mt-1 flex justify-between ml-1">
                  <h3>Homework file from teacher</h3>
                  <button type="submit" class="ml-3 bg-gray-300 hover:bg-gray-400 text-gray-800  py-1 px-1 rounded inline-flex items-center"
                    onClick={() => downloadFile(teacher_home_work.url)}>
                    <svg class="fill-current w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                    <span>Download</span>
                  </button>
                </div> : ""
              }

            </ModalBody>
          </ModalContent>
        </Modal>
      </button>
    </Fragment >
  )
}

const ActionButtons = ({
  role,
  start_time,
  end_time,
  meeting_link,
  session_link,
  sessionId,
  isEnrolled,
  hasRatedSessionAsStudent,
  course_id,
  home_work
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const now = Date.now()
  // @NOTE: The dates have an issue only when queried using graphQL. Works fine for prisma queries
  const start = new Date(start_time).getTime()
  const end = new Date(end_time).getTime()

  console.log('ActionButtons ', home_work);

  let session_state = "UPCOMING"
  if (now + 900000 >= start && now <= end) {
    session_state = "ONGOING"
  }

  if (now > end) {
    session_state = "COMPLETED"
  }

  return (
    <div className="mt-2">
      {/* TODO: Make Rate and Home Work on Edit session only */}

      {session_state === "COMPLETED" && role === "student" && isEnrolled && (
        <div className="flex flex-row justify-between h-auto pb-4 ">

          <TeacherSessionRating sessionId={sessionId} hasRatedSessionAsStudent={hasRatedSessionAsStudent} />
          <span className="mt-2 h-8 border-gray-300 border-l-2"></span>
          <button className="flex flex-col p-2 cursor-not-allowed"></button>

          <HomeWork
            sessionId={sessionId}
            course_id={course_id}
            home_work={home_work}>
          </HomeWork>
        </div>
      )}
      {role === "teacher" && (
        <div className="flex flex-row justify-between h-auto pb-4">
          {/* <p className="text-black">Rate Class</p> */}
          {/* <TeacherStudentsRating sessionId={sessionId} /> */}
          {/* <span className="mt-2 h-8 border-gray-300 border-l-2"></span> */}
          <div className="flex flex-col p-2"></div>

          <HomeWork role={role}
            sessionId={sessionId}
            course_id={course_id}
            home_work={home_work}>
          </HomeWork>
          {/* <button className="flex flex-col p-2">
            <img
              src="/img/homework-disabled.svg"
              height="18px"
              width="18px"
              className="self-center text-gray-300 fill-current disabled"
            ></img>
            <p>Homework</p>
          </button> */}
        </div>
      )}

      {(role === "admin" || role === "super_admin") && (
        <div className="flex flex-row justify-between h-auto pb-4">
          <div className="flex flex-col p-2"></div>
          <HomeWork role={role}
            sessionId={sessionId}
            course_id={course_id}
            home_work={home_work}>
          </HomeWork>
        </div>
      )}

      {/* {["admin", "super_admin"].includes(role) && (
        <div>
          <button
            className="mt-2 inline-block text-center w-full rounded-md py-2 mx-2 bg-yellow-300 hover:bg-yellow-400 cursor-pointer"
            onClick={onOpen}
          >
            Edit
          </button>
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Session</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <EditSessionForm
                  sessionId={sessionId}
                  data={{ meeting_link, session_link }}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )} */}
    </div>
  )
}

const JoinButton = ({
  role,
  start_time,
  end_time,
  meeting_link,
  sessionId,
  session_link,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const now = Date.now()
  // @NOTE: The dates have an issue only when queried using graphQL. Works fine for prisma queries
  const start = new Date(start_time).getTime()
  const end = new Date(end_time).getTime()

  let session_state = "UPCOMING"
  if (now + 900000 >= start && now <= end) {
    session_state = "ONGOING"
  }

  if (now > end) {
    session_state = "COMPLETED"
  }
  return (
    <div className="mt-2">
      {session_state === "ONGOING" && !isEmpty(meeting_link) && (
        <div>
          <a
            href={meeting_link}
            target="_blank"
            className="mt-4 ml-4 flex flex-row w-full rounded-md py-2 px-2 bg-yellow-300 hover:bg-yellow-400"
          >
            <div className="blob-red mr-2 mt-2"></div>
            <span>Join</span>
          </a>
        </div>
      )}
      {(session_state === "UPCOMING" ||
        (session_state === "ONGOING" && isEmpty(meeting_link))) && (
          <button className="mt-4 ml-4 flex flex-row w-full rounded-md py-2 px-2 bg-gray-300 hover:bg-gray-400">
            <div className="mr-2 mt-2"></div>
            <span>Join</span>
          </button>
        )}
      {["admin", "super_admin"].includes(role) && (
        <div>
          <button
            className="ml-4 mt-2 inline-block text-center w-full rounded-md py-2 px-4 bg-yellow-300 hover:bg-yellow-400 cursor-pointer"
            onClick={onOpen}
          >
            Edit
          </button>
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Session</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <EditSessionForm
                  sessionId={sessionId}
                  data={{ meeting_link, session_link }}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  )
}

const EditSessionForm = ({ sessionId, data }) => {
  const { token } = useAuth()
  const toast = useToast()

  // Option to edit only the meeting link for now. Need to add more later
  const editSessionSchema = Yup.object().shape({
    meeting_link: Yup.string().url().required(),
    session_link: Yup.string().url(),
  })

  const formik = useFormik({
    initialValues: {
      meeting_link: data.meeting_link || "",
      session_link: data.session_link || "",
    },
    onSubmit: (values) => {
      return fetch(`/api/sessions/${sessionId}`, {
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
          }
          return response.json()
        })
        .then(() => {
          toast({
            title: "Success",
            description: "Session updated",
            status: "success",
            position: "top",
            duration: 1000,
          })
        })
        .catch((error) => {
          toast({
            title: "Failed",
            description: `Session updation failed. Error is ${error.message}`,
            status: "error",
            position: "top",
            duration: 1000,
          })
        })
    },
    validationSchema: editSessionSchema,
  })

  return (
    <form onSubmit={formik.handleSubmit} noValidate onBlur={formik.handleBlur}>
      <Input
        name="meeting_link"
        label="Meeting link"
        value={formik.values.meeting_link}
        onChange={formik.handleChange}
        isValid={formik.touched.meeting_link && !formik.errors.meeting_link}
      />
      <Input
        name="session_link"
        label="Session link"
        isRequired={false}
        value={formik.values.session_link}
        onChange={formik.handleChange}
        isValid={formik.touched.session_link && !formik.errors.session_link}
      />
      <FormError
        touched={(formik.touched.meeting_link, formik.touched.session_link)}
        error={(formik.errors.meeting_link, formik.errors.session_link)}
      />
      <div className="my-4">
        <Button
          type="submit"
          variantColor="yellow"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <Spinner /> : "Save"}
        </Button>
      </div>
    </form>
  )
}

export default function SessionCard({
  day,
  topic,
  start_time,
  end_time,
  role,
  meeting_link,
  canJoin,
  sessionId,
  sessionLink,
  isEnrolled,
  canEdit,
  hasRatedSessionAsStudent,
  course_id,
  home_work
}) {
  console.log('course_id ', course_id, topic, home_work);
  const date = new Date(start_time)
  // apply the Plyr styles to video component
  useEffect(() => {
    const player = new Plyr("#player" + sessionId, {
      settings: ["speed", "loop"],
      controls: [
        "play-large",
        "progress",
        "current-time",
        "volume",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      disableContextMenu: true,
      hideControls: true,
      ratio: "16:9",
    })
  })

  return (
    <div className="w-80 lg:pr-6 lg:w-1/4 mb-6 session-card">
      <article className="bg-white border border-gray-50 shadow-md hover:shadow-xl transition duration-300 rounded-lg h-full flex flex-col">
        {/* Enrolled User Condition */}
        {isEnrolled && !isEmpty(sessionLink) && (
          <div className="session-card-player">
            <video id={"player" + sessionId} playsInline controls>
              <source src={sessionLink} type="video/mp4" />
            </video>
          </div>
        )}
        {/* Teacher Roles Preview condition */}
        {canEdit && !isEmpty(sessionLink) && (
          <div className="session-card-player">
            <video id={"player" + sessionId} playsInline controls>
              <source src={sessionLink} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Empty View if there is no sessionLink */}
        {isEmpty(sessionLink) && (
          <div className="session-card-player bg-gray-300 flex justify-center items-center">
            <div className="h-full">
              <p className="pt-16">Video Not</p>
              <p>Available</p>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-between p-2">
          <header>
            <h3 className="text-lg font-medium text-gray-900 mt-2 mb-2">
              Session {day}
            </h3>
          </header>
          <main>
            <h4 className="text-2xl font-light leading-snug h-24">
              {truncate(topic, { length: 85 })}
            </h4>
          </main>
          <footer className="flex flex-col pt-4 pb-1 pr-2">
            <div className="flex flex-row ">
              <span>
                <p className="text-2xl font-medium">
                  {format(date, "dd MMMM")}
                </p>
                <p className="text-base">{format(date, "EEEE, hp")}</p>
              </span>
              <span>
                {canJoin && (
                  <JoinButton
                    role={role}
                    start_time={start_time}
                    end_time={end_time}
                    meeting_link={meeting_link}
                    sessionId={sessionId}
                    session_link={sessionLink}
                  />
                )}
              </span>
            </div>
            <ActionButtons role={role}
              start_time={start_time}
              end_time={end_time}
              meeting_link={meeting_link}
              sessionId={sessionId}
              session_link={sessionLink}
              isEnrolled={isEnrolled}
              hasRatedSessionAsStudent={hasRatedSessionAsStudent}
              course_id={course_id}
              home_work={home_work}
            ></ActionButtons>
          </footer>
        </div>
      </article>
    </div>
  )
}
