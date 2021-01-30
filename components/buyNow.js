import React, { useState, useEffect, useReducer } from "react"
import { App } from "components/layout";
import sha256 from 'crypto-js/sha256';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig()

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
} from "@chakra-ui/core"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"
import { useAuth } from "../utils/useAuth"
import Axios from "axios"

const Register = (props) => {

  const router = useRouter()
  let price = undefined;
  let age = undefined;

  let myCart = JSON.parse(localStorage.getItem('myCart'));
  if (!!myCart && Object.keys(myCart).length) {
    price = myCart['price'];
    age = myCart['age'];
  } else {
    price = router.query.price;
    age = router.query.age;
    localStorage.setItem('myCart', JSON.stringify({
      price: router.query.price,
      age: router.query.age,
    }));
  }

  // clear up
  useEffect(() => {
    if (token || user) {
      return () => {
        localStorage.removeItem("myCart");
      };
    }
  }, []);

  const [alert, setAlert] = useState({ type: "idle" })
  const [orderId, setOrderId] = useState();

  const { role, token, user } = useAuth();

  useEffect(() => {
    if (role !== 'student' || (!token || !user)) {
      router.push({
        pathname: '/login',
        query: { isPayment: true }
      });
    } else {
      //  options['prefill']['contact'] = user.phone;
      //  options['prefill']['email'] = user.email;
      options['prefill']['name'] = user.firstName;
    }
  }, [role]);

  let options = {
    "key": publicRuntimeConfig.RAZORPAY_ID,
    "amount": price,
    "currency": "INR",
    "name": "Plush technologies",
    "description": "Outcampus",
    // "image": "/img/outcampus_logo_white-long.svg",
    "order_id": "order_9A33XWu170gUtm",
    "isVerified": false,
    "isCouponValid": false,
    "discount_amount": 0,
    "couponCode": undefined,
    "handler": function (response) {
      let generated_signature = HmacSHA256(options['order_id'] + "|" + response.razorpay_payment_id, publicRuntimeConfig.RAZORPAY_SECRET);

      if (generated_signature == response.razorpay_signature) {
        setAlert({
          type: "success",
          message: "SUCCESSFUL payment.",
        });

        let data = {
          order_id: options['order_id'],
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          status: "SUCCESS",
          amount: options['amount'],
          discount_amount: options['discount_amount']
        }

        Axios.post(`/api/payment/${user.id}`, data).then((response) => {
          console.log('response ', response);
          localStorage.setItem('price', options['amount']);
          localStorage.setItem('paymentId', response.data.id);
          if (options["isVerified"] && options["isCouponValid"]) {
            Axios.put(`/api/discount/${options['couponCode']}/${user.id}`).then((response) => {
            }).catch((error) => {
            })
          }
          router.push({
            pathname: `/slots`,
            query: { age }
          });
        })

      } else {
        setAlert({
          type: "error",
          message: "server error.",
        })
      }
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#faca15"
    }
  };

  return (
    <App title="buy now">
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {alert.type !== "success" ? (
          <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
              <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Buy Now
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
                <RegisterForm setAlert={setAlert} options={options} price={price} setOrderId={setOrderId} orderId={orderId} />
              </div>
            </div>
          </div>
        ) : (
            <div className="max-w-2xl mx-auto">
              <Alert status="success">
                <AlertIcon />
                <AlertTitle className="mr-2">
                  Your payment is successful redirecting to you to select slots.
              </AlertTitle>
              </Alert>
              <div className="flex justify-center">
                <Spinner />
              </div>
            </div>
          )}
      </div>
    </App>
  )
}

const RegisterForm = ({ setAlert, options, setOrderId, orderId, price }) => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(true);
  let couponCode = undefined;
  const [ageGroup, setAgeGroup] = useState("6 & 7");
  const [couponMsg, setCouponMsg] = useState(null);

  const { role, token, user } = useAuth();

  const registerSchema = Yup.object().shape({
    amount: Yup.string().required("Please enter amount"),
    coupon: Yup.string()
  })

  const createOrder = (amount) => {
    //  options["order_id"] = response.data.id;
    return Axios.post(`/api/payment/order`, { amount }).then((response) => {
      options["order_id"] = response.data.id;
      let rzp1 = new Razorpay(options);
      setOrderId(response.data.id);
      options["isVerified"] = isVerified;
      rzp1.open();
    })
  }

  const formik = useFormik({
    initialValues: {
      amount: options['amount'],
      coupon: ""
    },
    onSubmit: async (values) => {
      const { amount, coupon } = values;
      let response = await createOrder(amount);
    },
    validationSchema: registerSchema,
  })

  // const updateDiscountCoupon = () => {
  //   console.log('abhi updateDiscountCoupont');
  //   Axios.put(`/api/discount/${formik.values.coupon}/${user.id}`).then((response) => {
  //     console.log('abhi response discount', response);
  //   }).catch((error) => {
  //     console.log('abhi response discount error', error);
  //   })
  // }

  const verifyCoupon = () => {
    if (formik.values.coupon) {
      setIsVerified(false);
      Axios.get(`/api/discount/${formik.values.coupon}/${user.id}`).then((response) => {
        if (!!response.data && response.data.length && response.data[0].isActive) {
          setCouponMsg('Discount coupon is applied.');
          if (!!price) {
            options['amount'] = price - response.data[0].value;
          }
          formik.values.amount = options['amount'];
          options["isCouponValid"] = true;
          options['couponCode'] = formik.values.coupon;
          options['discount_amount'] = response.data[0].value
          // updateDiscountCoupon();
        } else {
          setCouponMsg('Invalid coupon or expired or already used!!.');
        }
        setIsVerified(true);
      }).catch((error) => {
        setIsVerified(false);
      })
    }
  }

  return (
    <form
      className="mb-2"
      onSubmit={formik.handleSubmit}
      onBlur={formik.handleBlur}
      noValidate
    >
      <fieldset disabled={formik.isSubmitting}>

        {/* <div className="mt-6">
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
        </div> */}

        <div className="mt-6">
          <label
            htmlFor="coupon"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Discount coupon
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="coupon"
                name="coupon"
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.coupon && formik.errors.coupon
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={formik.handleChange}
                value={formik.values.coupon}
              />
            </div>
            {couponMsg && (
              <p className="mt-1 text-xs">
                {couponMsg}
              </p>
            )}
          </div>

          <div className="mt-6">
            <span className="block w-full rounded-md shadow-sm">
              <button disabled={!isVerified}
                type="button"
                className="h-10 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:border-yellow-400 focus:shadow-outline-yellow active:bg-yellow-400 transition duration-150 ease-in-out "
                onClick={(e) => {
                  verifyCoupon()
                }}
              >
                {!isVerified ? <Spinner size="sm" /> : "Verify"}
              </button>
            </span>
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-5 text-gray-700 required-field"
          >
            Amount
          </label>
          <div className="mt-1">
            <div className="rounded-md shadow-sm">
              <input
                id="amount"
                type="amount"
                name="amount"
                disabled
                required
                className={`appearance-none block w-full px-3 py-2 border ${
                  formik.touched.amount && formik.errors.amount
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                onChange={(e) => {
                  formik.handleChange(e)
                }}
                value={formik.values.amount}
              />
            </div>
            {formik.touched.amount && formik.errors.amount && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.amount}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              className="h-10 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:border-yellow-400 focus:shadow-outline-yellow active:bg-yellow-400 transition duration-150 ease-in-out"
              disabled={formik.isSubmitting || !isVerified}
            >
              {formik.isSubmitting ? <Spinner size="sm" /> : "Proceed to pay"}
            </button>
          </span>
        </div>

      </fieldset>
    </form>
  )
}

export default Register

