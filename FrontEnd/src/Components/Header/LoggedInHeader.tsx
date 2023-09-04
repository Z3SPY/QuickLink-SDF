import React, { useState, useRef, useEffect}from 'react'
import './Header.css'
import 'flowbite'
import Login from '../User-Authentication/Login'
import ScrollMagic from 'scrollmagic';
import gsap from 'gsap';
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";


  
const navItems: Array<{ name: string, id: number, goTo: string }> = [
  { name: "HOME", id: 1, goTo: "#" }, { name: "FIND TALENT", id: 2, goTo: "#ShowcaseAnchor" },
  { name: "BLOG", id: 3, goTo: "#Blog" }, { name: "SUPPORT", id: 4, goTo: "#Support" },
];
  /*new navButton("HOME", 1), new navButton("FREELANCERS", 2), 
  new navButton("BLOG", 3), new navButton("SUPPORT",4)*/


const LoggedInHeader = () => {
  const [LoggedInState, setLoggedState] = useState(false);
 

  const [isActive, setIsActive] = useState(1);


  const NavBtn = (p : any) => {

    const handleState = (b:number) => {
      setIsActive(b);
    }

  
    const handleClick = (e : any) => {
      let curID : number = 0;

      for (let i = 0; i < navItems.length; i++) {
        if (navItems[i].id == p.id) {
          console.log(navItems[i].id);
          curID = navItems[i].id;
        }
          
      }
      
      handleState(curID);
    }
      
    return (
      <li className={isActive == p.id ? 'active' : ''}>
        <a href={p.goTo} className="block py-2 lg:pl-3 pr-4 text-gray-900 md:pl-1 cursor-pointer" onClick={handleClick}>{p.name}</a>
      </li>
    );
  }


  

  /*Dunno What an Aria Current is, putting this here so I remember */
  /** Note IM Using FlowBite for popup */

  return ( 
    <div className="fixed w-screen inset-0 z-50 " >
      <nav className=" fixed w-full top-0 left-0" style={{    'backgroundColor': '#FFF5E0'    }}>
        <div className="flex flex-wrap items-center justify-between mx-auto p-4" id="Header">
        
        <a href="#" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-500">Quick-<span className='text-black'>Link</span></span>
        </a>

        <div className="flex md:order-2">
          <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500  hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1" >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..." />
          </div>
          <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
        </div>



          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2" id="navbar-search">
            <div className="relative mt-3 md:hidden" >
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" >
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500" placeholder="Search..."  />
            </div>


            
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  ">
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:p-0 " aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">About</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">Services</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>


  )
}


export default LoggedInHeader;



/**<div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 " id="navbar-sticky-Logged"> 
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
                    <li>
                      <a className="block py-2 lg:pl-3 pr-0 text-gray-900 md:pl-1 cursor-pointer" >Find Talent</a>
                    </li>
                   
                </ul>
                
              </div> */