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
  const [searchQuery, setSearchQuery] = useState("");
  //console.log(curUserData);

  const navigate = useNavigate();

  const ProfileNavFunc = (data: any) => {
    console.log("Check");
    navigate("/Profile", { state: { recievedData: data } });
  };

  const handleSearch = () => {
    // Call the backend API to perform the search
    fetch(`/api/search/?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the search results, update state, etc.
        console.log("Search results:", data.search_results);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
      <div className="flex md:order-2 mt-5">
        <Navbar.Toggle className="mx-10" />
      </div>

      <Navbar.Collapse id="navBarButtons" className="mt-3">
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
          className="sm:mt-3 sm:p-2 md:mt-0 px-10 rounded-3xl border-4 border-red-500 hover:bg-white"
          id="profileBtn"
        >
          PROFILE
        </button>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default LoggedInHeader;
