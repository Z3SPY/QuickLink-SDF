import React, { useState, useEffect } from 'react';
import 'flowbite';
import './Login.css'


function Login() {
    return (
      
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-gray-800 p-9 rounded-lg shadow ">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-red-200 hover:text-black rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <div className="w-10 h-10 bg-red-500 rounded-full mx-36"></div>
                            <h1 className="mb-4 ml-12 text-5xl font-medium text-white"> <span className="text-red-500">Quick-</span>Link </h1>
                            <h3 className="mb-4 text-xl font-medium text-white">Sign in to our platform</h3>
                            <form className="space-y-6" action="post">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-50 ">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-50">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " />
                                        </div>
                                        <label for="remember" className="ml-2 text-sm font-medium text-gray-50 ">Remember me</label>
                                    </div>
                                    <a href="#" className="text-sm text-red-500 hover:underline hover:text-gray-50 ">Lost Password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                                <div className="text-sm font-medium text-gray-500 ">
                                    Not registered? <a href="#" className="text-red-500 hover:underline hover:text-gray-50">Create account</a>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div> 
        
    )
}

export default Login;