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


const Header = () => {
  const [LoggedInState, setLoggedState] = useState(false);
 

  const [isActive, setIsActive] = useState(1);

   //const tl : gsap.core.Timeline = gsap.timeline();
   useEffect(() => {
    const controller : ScrollMagic.Controller    = new ScrollMagic.Controller();
    // Scene 1: Animation when entering the "Showcase" section
    let prevIsActive = isActive;

    const scene = new ScrollMagic.Scene({
      triggerElement: '.App',
      triggerHook: 0,
      duration: '275%',
    })
      .addTo(controller)
      .on('progress', (event : any) => {
        // Store the current isActive value
        const currentIsActive =
          event.progress >= 0.08344497607655503 && event.progress < 0.42870813397129187
            ? 2
            : event.progress >= 0.42870813397129187 && event.progress < 0.7942583732057417
            ? 3
            : event.progress >= 0.7942583732057417
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
    }
  }, []);




  /**Nav Button Template */
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


  function LoginFunc() {
    console.log("Clicked");
  }

  /*Dunno What an Aria Current is, putting this here so I remember */
  /** Note IM Using FlowBite for popup */

  return ( 
    <div className="fixed w-screen inset-0 z-50 headerCont">
      <nav className="fixed w-full top-0 left-0 ">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4" id="Header">

          <a href="#" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-500">Quick-<span className='text-black'>Link</span></span>
          </a>


            <div className="flex md:order-2">
                <button type="button" className=" border-2 border-red-100 text-gray-900  
                font-medium rounded-lg text-base lg:px-10 px-4 py-2 text-center mx-2 md:mr-0" 
                data-modal-target="authentication-modal-Login" data-modal-toggle="authentication-modal-Login" onClick={LoginFunc}> Login </button>
                <button type="button" className=" border-2 border-red-100 text-gray-900  
                font-medium rounded-lg text-base lg:px-10 px-4 py-2 text-center mx-2 md:mr-0" 
                data-modal-target="authentication-modal-Register" data-modal-toggle="authentication-modal-Register" onClick={LoginFunc}> Register </button>
                <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>

            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0" id="navBarButtons">
                

                {
                  navItems.map((item : { name: string, id: number, goTo: string }) => {
                    return (
                      <NavBtn name={item.name} id={item.id} goTo={item.goTo}/>
                    );
                  })
                }
                
                
                <div id="selector" className="sm:hidden md:hidden lg:block">
                  <svg width="50" height="50">
                    <rect x="0" y="0" width="10" height="20" style={{fill:'red', strokeWidth:5, opacity:0.5}}/>
                  </svg>
                </div>
              </ul>
            </div>
          
        </div>

      </nav>
    </div>
      


  )
}


export default Header;

