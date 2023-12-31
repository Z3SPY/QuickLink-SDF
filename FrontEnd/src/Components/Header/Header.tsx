import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import "flowbite";
import "flowbite/dist/flowbite.js";
import ScrollMagic from "scrollmagic";
import gsap from "gsap";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";
import "../User-Authentication/Login.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Navbar,
} from "flowbite-react";
import { number } from "prop-types";

//*Seding token with reqeuests
const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  return token ? `Token ${token}` : "";
};

//LOGIN COMPONENT -------------------------------------------------
const Login = (p: any) => {
  const [userData, setUserData] = useState<Record<string, any>>({});

  const navigate = useNavigate();

  function navigateIfSuccess(data: any) {
    // Somewhere in your code, e.g. inside a handler:
    //REMINDER UTILIZE DJANGO TOKENS
    //navigate("/posts", {state:{userData}});

    navigate("/posts", { state: { receivedData: data } });
  }

  function LoginFunction(event: any) {
    // console.log("logged");
    event.preventDefault();
    const curUsername = event.target.userNm.value;
    const curPassword = event.target.password.value;
    // console.log(curPassword + " " + curUsername);
    getUserVal(curUsername, curPassword);
  }

  let getUserVal = async (name: string, password: string) => {
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
          // console.log("PASSED DATA", data); // Pass to Authenticated Page After Success
          if (data.data.Token) {
            localStorage.setItem("authToken", data.data.token);
            setUserData(data);
            navigateIfSuccess(data);
          }
        } else {
          alert("User does not exist.");
        }
      })
      .catch((error) => {
        console.error("Error occurred while checking user existence:", error);
        alert("Error occurred while checking user existence.");
      });
  };

  return (
    <Modal
      dismissible
      show={p.propsOpenModal === "form-login"}
      popup
      onClose={() => p.OpenModalFunc(undefined)}
    >
      <Modal.Body className="auth-Container">
        <Modal.Header className="closeModal" />
        <div className="relative w-full">
          <div className="relative bg-white p-2  ">
            <div className="px-6 py-6 lg:px-8">
              <div className="w-10 h-10 mx-auto bg-red-500 rounded-full"></div>
              <h1 className="mb-4 text-5xl font-medium text-gray-800 text-center">
                <span className="text-red-500">Quick-</span>Link{" "}
              </h1>
              <h3 className="mb-1 text-xl font-medium text-gray-800 text-center">
                Sign in to our platform
              </h3>
              <form className="space-y-5" action="GET" onSubmit={LoginFunction}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-800 "
                  >
                    Your username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="userNm"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="ex: JohnAdams123"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-800"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm font-medium text-gray-800 "
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-red-500 hover:underline hover:text-gray-800 "
                  >
                    Lost Password?
                  </a>
                </div>
                <div className="text-sm font-medium text-gray-8000 ">
                  Not registered?{" "}
                  <a
                    href="#"
                    className="text-red-500 hover:underline hover:text-gray-800"
                  >
                    Create account
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Login to your account
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
//LOGIN COMPONENT -------------------------------------------------

//REGISTER COMPONENT ----------------------------------------------
const Register = (p: any) => {
  const [date, setDate] = useState<Date | null>(new Date());
  function RegisterFunction(event: any) {
    // console.log("Registered");
    event.preventDefault();
    const curUsername = event.target.regUserNm.value;
    const curEmail = event.target.regEmail.value;
    const curPassword = event.target.regPassword.value;
    const passConf = event.target.regPasswordConf.value;

    // console.log(curPassword + " " + curUsername + " " + curEmail);

    if (passConf === curPassword) {
      createUserVal(curUsername, curEmail, curPassword);
    } else {
      alert("Passwords do not match");
    }
  }

  let createUserVal = async (name: string, email: string, password: string) => {
    const givenUsername = name;
    const givenPass = password;
    const givenEmail = email;

    await fetch(
      `/api/createUser/?username=${givenUsername}&password=${givenPass}&email=${givenEmail}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.user_logged_in) {
          alert("User created!");
        } else {
          alert("Failed to create user");
        }
      })
      .catch((error) => {
        console.error("Error occurred while creating user:", error);
        alert("Error occurred while creating user:");
      });
  };

  return (
    <Modal
      dismissible
      show={p.propsOpenModal === "form-register"}
      popup
      onClose={() => p.OpenModalFunc(undefined)}
    >
      <Modal.Body className="auth-Container">
        <Modal.Header className="closeModal" />
        <div className="relative w-full">
          <div className="relative bg-white p-2 rounded-3xl mt-10 ">
            <div className="px-6 py-6 lg:px-8">
              <h1 className="mb-4 text-5xl font-medium text-gray-800 text-center">
                {" "}
                <span className="text-red-500">Quick-</span>Link{" "}
              </h1>
              <h3 className="mb-1 text-xl font-medium text-gray-800 text-center">
                Sign Up and Register
              </h3>
              <h3 className="mb-4 text-xs font-medium text-gray-400 text-center">
                Start Your Quick Link Journey
              </h3>
              <form
                className="space-y-5"
                action="POST"
                onSubmit={RegisterFunction}
              >
                <div>
                  <input
                    type="text"
                    name="username"
                    id="regUserNm"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Username"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="regEmail"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="regPassword"
                    placeholder="Set up Password"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="regPasswordConf"
                    placeholder="Confirm Password"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
//REGISTER COMPONENT ----------------------------------------------

const navItems: Array<{ name: string; id: number; goTo: number }> = [
  { name: "HOME", id: 1, goTo: 0 },
  { name: "FIND TALENT", id: 2, goTo: 0.0584 },
  { name: "BLOG", id: 3, goTo: 0.133 },
  { name: "SUPPORT", id: 4, goTo: 1 },
];
/*new navButton("HOME", 1), new navButton("FREELANCERS", 2), 
  new navButton("BLOG", 3), new navButton("SUPPORT",4)*/

const Header = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const [LoggedInState, setLoggedState] = useState(false);
  const [isActive, setIsActive] = useState(1);

  //const tl : gsap.core.Timeline = gsap.timeline();
  useEffect(() => {
    const controller: ScrollMagic.Controller = new ScrollMagic.Controller();
    // Scene 1: Animation when entering the "Showcase" section
    let prevIsActive = isActive;

    const scene = new ScrollMagic.Scene({
      triggerElement: ".App",
      triggerHook: 0,
      duration: "1300%",
    })
      .addTo(controller)
      .on("progress", (event: any) => {
        // Store the current isActive value
        const currentIsActive =
          event.progress >= 0.02 && event.progress < 0.1
            ? 2
            : event.progress >= 0.1 && event.progress < 0.95
            ? 3
            : event.progress >= 0.95
            ? 4
            : 1;

        // Check if isActive has changed before updating it
        if (currentIsActive !== prevIsActive) {
          setIsActive(currentIsActive);
          prevIsActive = currentIsActive; // Update the stored value
        }
      });

    return () => {
      scene.destroy(true);
      controller.destroy(true);
    };
  }, []);

  /**Nav Button Template */
  const NavBtn = (p: any) => {
    const handleState = (b: number) => {
      setIsActive(b);
    };

    const handleClick = (e: any) => {
      let curID: number = 0;

      for (let i = 0; i < navItems.length; i++) {
        if (navItems[i].id == p.id) {
          // console.log(navItems[i].id);
          curID = navItems[i].id;
        }
      }

      handleState(curID);

      // Define the numeric value you want to scroll to

      /*var h: any = document.documentElement,
        b: any = document.body,
        st: any = "scrollTop",
        sh: any = "scrollHeight";

      var percent =
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100; For Testing*/

      // Smoothly scroll to the specified y-coordinate
      const h: any = document.body;
      const scrollPos = h.clientHeight * p.goTo;
      // console.log(scrollPos);

      window.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      });
    };

    return (
      <li className={isActive == p.id ? "active" : ""}>
        <a
          className="block py-2 lg:pl-3 pr-4 text-gray-900 md:pl-1 cursor-pointer"
          onClick={handleClick}
        >
          {p.name}
        </a>
      </li>
    );
  };

  /*Dunno What an Aria Current is, putting this here so I remember */
  /** Note IM Using FlowBite for popup */

  return (
    <Navbar
      fluid
      rounded
      className="fixed w-100 inset-0 z-50 mx-auto headerCont"
      id="Header"
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <a href="#" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-500 ml-7 mt-5">
            Quick-<span className="text-black">Link</span>
          </span>
        </a>
      </Navbar.Brand>

      <div className="flex md:order-2 sm:mr-8 sm:mt-5 lg:m-0">
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse id="navBarButtons">
        <Button
          id="logHdr"
          onClick={() => props.setOpenModal("form-login")}
          className="flex md:order-2 border-2 border-red-100 text-gray-900  
                    font-medium rounded-lg text-base lg:px-10 px-8 py-2 text-center mx-2 md:mr-0"
        >
          LOGIN
        </Button>
        <Button
          id="regHdr"
          onClick={() => props.setOpenModal("form-register")}
          className="flex md:order-2 border-2 border-red-100 text-gray-900  
                    font-medium rounded-lg text-base lg:px-10 px-8 py-2 text-center mx-2 md:mr-0"
        >
          REGISTER
        </Button>

        {navItems.map((item: { name: string; id: number; goTo: number }) => {
          return <NavBtn name={item.name} id={item.id} goTo={item.goTo} />;
        })}

        <div id="selector" className="sm:hidden md:hidden lg:block">
          <svg width="50" height="50">
            <rect
              x="0"
              y="0"
              width="10"
              height="20"
              style={{ fill: "red", strokeWidth: 5, opacity: 0.5 }}
            />
          </svg>
        </div>
      </Navbar.Collapse>

      <Login
        propsOpenModal={props.openModal}
        OpenModalFunc={props.setOpenModal}
      ></Login>
      <Register
        propsOpenModal={props.openModal}
        OpenModalFunc={props.setOpenModal}
      ></Register>
    </Navbar>
  );
};

export default Header;
