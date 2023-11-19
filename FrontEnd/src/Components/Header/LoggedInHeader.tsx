import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import "flowbite";
import "flowbite/dist/flowbite.js";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";
import "../User-Authentication/Login.css";
import "react-datepicker/dist/react-datepicker.css";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Navbar,
} from "flowbite-react";

const navItems: Array<{ name: string; id: number; goTo: string }> = [
  { name: "HOME", id: 1, goTo: "/Posts" },
  { name: "FIND TALENT", id: 2, goTo: "/Posts" },
  { name: "BLOG", id: 3, goTo: "/Posts" },
  { name: "SUPPORT", id: 4, goTo: "/Posts" },
];
/*new navButton("HOME", 1), new navButton("FREELANCERS", 2), 
  new navButton("BLOG", 3), new navButton("SUPPORT",4)*/
const NavBtn = (p: any) => {
  return (
    <li>
      <a
        onClick={() => {
          console.log(p.goTo);
          p.Nav(p.goTo, { state: { recievedData: p.curUserData } });
        }}
        className="block py-2 lg:pl-3  text-gray-900 md:pl-1 cursor-pointer"
      >
        {p.name}
      </a>
    </li>
  );
};

const LoggedInHeader = React.memo((props: any) => {
  const curUserData = props.UserData;
  console.log(curUserData);

  const navigate = useNavigate();

  const ProfileNavFunc = (data: any) => {
    console.log("Check");
    navigate("/Profile", { state: { recievedData: data } });
  };

  /*Dunno What an Aria Current is, putting this here so I remember */
  /** Note IM Using FlowBite for popup */

  return (
    <Navbar
      fluid
      rounded
      className="fixed w-screen inset-0 z-50 mx-auto headerCont"
      id="Header"
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <a href="#" className="flex items-center">
          <span className="ml-7  self-center text-2xl font-semibold whitespace-nowrap text-red-500">
            Quick-<span className="text-black">Link</span>
          </span>
        </a>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse id="navBarButtons">
        <button
          type="button"
          data-collapse-toggle="navbar-search"
          aria-controls="navbar-search"
          aria-expanded="false"
          className="md:hidden text-gray-500  hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search..."
          />
        </div>

        {navItems.map((item: { name: string; id: number; goTo: string }) => {
          return (
            <NavBtn
              name={item.name}
              id={item.id}
              goTo={item.goTo}
              Nav={navigate}
              curUserData={curUserData}
            />
          );
        })}
        <button
          onClick={() => {
            ProfileNavFunc(curUserData);
          }}
          className="px-10 rounded-3xl border-4 border-red-500 hover:bg-white"
          id="profileBtn"
        >
          PROFILE
        </button>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default LoggedInHeader;
