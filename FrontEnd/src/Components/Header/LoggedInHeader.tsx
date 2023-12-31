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
  { name: "FIND TALENT", id: 2, goTo: "/Jobs" },
  { name: "BLOG", id: 3, goTo: "/Blog" },
  { name: "SUPPORT", id: 4, goTo: "/Support" },
];
/*new navButton("HOME", 1), new navButton("FREELANCERS", 2), 
  new navButton("BLOG", 3), new navButton("SUPPORT",4)*/
const NavBtn = (p: any) => {
  return (
    <li>
      <a
        onClick={() => {
          // console.log(p.goTo);
          p.Nav(p.goTo, { state: { receivedData: p.curUserData } });
        }}
        className="block py-2 lg:pl-3  text-gray-900 md:pl-1 md:text-xs lg:text-sm   	 cursor-pointer"
      >
        {p.name}
      </a>
    </li>
  );
};

const LoggedInHeader = React.memo((props: any) => {
  const curUserData = props.UserData;
  const [searchQuery, setSearchQuery] = useState("");

  const [curSearchVal, setSearchVal] = useState([]);
  //console.log(curUserData);

  const navigate = useNavigate();

  const ProfileNavFunc = (data: any) => {
    // console.log("Check");
    navigate("/Profile", { state: { userProfileData: data } });
  };

  //SERCH
  const handleSearch = () => {
    // Call the backend API to perform the search
    if (searchQuery == null || searchQuery.trim() === "") {
      setSearchVal([]);
      // console.log("YO", curSearchVal);
    } else {
      fetch(`/api/search/?query=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          // Handle the search results, update state, etc.
          // console.log("Search results:", data.Posts);
          setSearchVal(data.Posts);
        });
    }
  };

  useEffect(() => {
    props.searchFunc(curSearchVal);
  }, [curSearchVal]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Navbar
      fluid
      rounded
      className="fixed w-screen inset-0 z-50 mx-auto headerCont"
      id="Header"
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <a href="/" className="flex items-center">
          <span className="ml-7  self-center text-2xl font-semibold whitespace-nowrap text-red-500">
            Quick-<span className="text-black">Link</span>
          </span>
        </a>
      </Navbar.Brand>
      <div className="flex md:order-2 mt-5">
        <Navbar.Toggle className="mx-10" />
      </div>

      <Navbar.Collapse id="navBarButtons" className="mt-3">
        <input
          type="text"
          id="h-navbar"
          className="md:hidden mx-2 mb-2 text-gray-500 bg-white hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1 "
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 mb-3 text-gray-500 dark:text-gray-400"
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
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
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
          className="sm:mt-3 sm:p-2 md:mt-0 md:px-10  rounded-xl border-4 border-red-500 hover:bg-white"
          id="profileBtn"
        >
          PROFILE
        </button>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default LoggedInHeader;
