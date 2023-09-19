import React, { useState, useEffect } from 'react';
import 'flowbite';
import 'flowbite/dist/flowbite.css'; // Import Flowbite 

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'




function Register() {

    const [date, setDate] = useState(false);
    function LoginFunction(event : any) {
        console.log("Register");
        
    }
    
    return (
        <div id="authentication-modal-Register" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-xl max-h-full">
                    <div className="relative bg-white p-2  rounded-3xl shadow-2xl mt-10 ">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-red-200 hover:text-black rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="authentication-modal-Register">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h1 className="mb-4 text-5xl font-medium text-gray-800 text-center"> <span className="text-red-500">Quick-</span>Link </h1>
                            <h3 className="mb-1 text-xl font-medium text-gray-800 text-center">Sign Up and Register</h3>
                            <h3 className="mb-4 text-xs font-medium text-gray-400 text-center">Start Your Quick Link Journey</h3>
                            <form className="space-y-5" action="post">
                                <div>
                                    <input type="email" name="email" id="regEmail" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Email or Username" required />
                                </div>
                                <div>
                                    <input type="password" name="password" id="regPassword" placeholder="Set up Password" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                                </div>
                                <div>
                                    <input type="password" name="password" id="regPasswordConf" placeholder="Confirm Password" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                                </div>
                                
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-20">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                            </svg>
                                        </div>
                                        <DatePicker name="Date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" selected={date} onChange={(date : any) => setDate(date===false? new Date() : date)} placeholderText={'Birth Date'}  />
                                    </div>
                                </div>

                                
                                <button type="submit" className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Account</button>
                                
                            </form>
                            <div style={{marginTop: '10px'}}className="text-xl font-medium text-gray-800 mt-1 text-center "> OR </div>
                            <ul className="my-2 space-y-3 ">
                                <li>
                                    <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-blue-100 hover:bg-gray-100 group hover:shadow">
                                        <img src="./icons8-google.svg" className="h-7" alt="Google Logo" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Register with Google</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-blue-100 hover:bg-gray-100 group hover:shadow">
                                        <img src="./icons8-linkedin.svg" className="h-7" alt="Google Logo" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Register with LinkedIn</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-blue-100 hover:bg-gray-100 group hover:shadow">
                                        <img src="./icons8-twitterx.svg" className="h-7" alt="Google Logo" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Register with Twitter</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
    )
}

export default Register;