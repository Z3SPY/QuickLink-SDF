import React, { useState, useEffect } from 'react';
import 'flowbite';
import './Login.css';
import 'flowbite/dist/flowbite.js'




function Login() {

    //const [curUser, getUser] = useState<{ user: string, pass: string }>({ user: "", pass: "" });

    function LoginFunction(event : any) {
        console.log("logged");
        event.preventDefault()
    
        const curEmail = event.target.email.value;
        const curPassword = event.target.password.value;
        console.log(curPassword + " " +curEmail);
        getUserVal(curEmail, curPassword);
    }

    let getUserVal = async(name : string, password : string) => {
        const username = name;
        const givenPass = password;


        await fetch(`/api/getUser/?username=${username}&password=${givenPass}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            if (data.user_logged_in) {
                alert("User exists!");
            } else {
                alert("User does not exist.");
            }
        })
        .catch((error) => {
            console.error("Error occurred while checking user existence:", error);
            alert("Error occurred while checking user existence.");
        });

    }

    return (
      
            <div id="authentication-modal-Login" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white p-2 rounded-3xl shadow-2xl  ">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-red-200 hover:text-black rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="authentication-modal-Login">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <div className="w-10 h-10 bg-red-500 rounded-full mx-36"></div>
                            <h1 className="mb-4 ml-16 text-5xl font-medium text-gray-800 "> <span className="text-red-500">Quick-</span>Link </h1>
                            <h3 className="mb-1 text-xl font-medium text-gray-800 text-center">Sign in to our platform</h3>
                            <form className="space-y-5" action="GET" onSubmit={LoginFunction}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800 ">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " />
                                        </div>
                                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-800 ">Remember me</label>
                                    </div>
                                    <a href="#" className="text-sm text-red-500 hover:underline hover:text-gray-800 ">Lost Password?</a>
                                </div>
                                <div className="text-sm font-medium text-gray-8000 ">
                                    Not registered? <a href="#" className="text-red-500 hover:underline hover:text-gray-800">Create account</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >Login to your account</button>
                                
                            </form>
                            <div style={{marginTop: '10px'}}className="text-xl font-medium text-gray-800 mt-1 text-center "> OR </div>
                            <ul className="my-2 space-y-3 ">
                                <li>
                                    <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-blue-100 hover:bg-gray-100 group hover:shadow">
                                        <img src="./icons8-google.svg" className="h-7" alt="Google Logo" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Sign in with Google</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-blue-100 hover:bg-gray-100 group hover:shadow">
                                        <img src="./icons8-linkedin.svg" className="h-7" alt="Google Logo" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Sign in with LinkedIn</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-blue-100 hover:bg-gray-100 group hover:shadow">
                                        <img src="./icons8-twitterx.svg" className="h-7" alt="Google Logo" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Sign in with Twitter</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
        
    )
}

export default Login;

/**Remember TO Link  */