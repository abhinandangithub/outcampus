import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "../../utils/useAuth"
import teacherServices from './teacherService';

const Dashboard = (props) => {

    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');

    const router = useRouter();
    const { role, token, user, isGoogleLogin } = useAuth();

    useEffect(() => {
        async function fetchData() {
            let res = await teacherServices.fetchEmails();
            setData(res.data);
        }
        fetchData();
        if (role === 'admin' || role === 'super_admin') {

        } else {
            router.push("/login");
        }
    }, [role])

    async function deleteEmail(obj) {
        let temp = data.filter((o) => {
            return obj.id !== o.id;
        })
        setData(temp);
        await teacherServices.removeEmail(obj);
    }

    async function insertEmail() {
        await teacherServices.addEmail(email).catch((error) => {
            console.log('error ', error);
        })
        let res = await teacherServices.fetchEmails();
        setData(res.data);
    }

    return (
        <div className="min-h-screen">
            <div className="h-20">
                <div
                    className="h-20 fixed w-full z-50 shadow-lg text-black bg-white"
                >
                    <div className="h-20 m-auto max-w-screen-xl flex lg:justify-between items-center px-4 lg:px-8">
                        <div className="flex justify-between w-full lg:w-auto items-center">
                            <Link href="/">
                                <a className="text-2xl font-extrabold text-gray-800">
                                    <img src="/img/outcampus-logo.svg" className="h-8 lg:h-12" />
                                </a>
                            </Link>
                        </div>

                        <div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:w-1/3  sm:w-full mx-auto my-20 sm:p-5">
                <div class="lg:text-4xl  md:text-4xl  sm:text-sm text-center">Share with Teachers</div>
                <div class="flex justify-between h-10 mt-10">
                    <input onChange={e => setEmail(e.target.value)} class="w-2/3 bg-white focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block appearance-none leading-normal" type="email" placeholder="jane@example.com"></input>
                    <button onClick={() => { insertEmail() }} class="w-1/4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 shadow">
                        ADD
                    </button>
                </div>
                {
                    data.map((o) => {
                        return (
                            <div class="flex justify-between  mt-4">
                                <label class="w-2/3">{o.email}</label>
                                <button onClick={() => { deleteEmail(o) }} class="w-1/4 bg-white hover:bg-gray-100 text-gray-800 font-semibold  px-4 border border-gray-400 shadow">
                                    Remove
                                </button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Dashboard
