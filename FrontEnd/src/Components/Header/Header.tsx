import React, { useState, useRef, useEffect}from 'react'
import './Header.css'


class navButton {
  constructor(public name : string, public id : number) {
    this.name = name;
    this.id = id;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
}
  


const navItems : Array<navButton> = [ 
  new navButton("HOME", 1), new navButton("FREELANCERS", 2), 
  new navButton("BLOG", 3), new navButton("SUPPORT",4)
]

const Header = () => {

  const [isActive, setIsActive] = useState(0);

  const NavBtn = (p : any) => {

    const handleState = (b:number) => {
      setIsActive(b);
    }

  
    const handleClick = (e : any) => {
      let curID : number = 0;

      for (let i = 0; i < navItems.length; i++) {
        if (navItems[i].getId() == p.id) {
          console.log(navItems[i].getId());
          curID = navItems[i].getId();
        }
          
      }
      
      handleState(curID);
    }
      
    return (
      <li className={isActive == p.id ? 'active' : ''}>
        <a href="#" className="block py-2 lg:pl-3 pr-4 text-gray-900 md:pl-1" onClick={handleClick}>{p.name}</a>
      </li>
    );
  }

  /*Dunno What an Aria Current is, putting this here so I remember */

  return (
    <div>
      <nav className="fixed w-11/12 z-20 top-0 left-0 border-b border-gray-200 " id="Header">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <a href="#" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-500">Quick-<span className='text-black'>Link</span></span>
          </a>
        
          <div className="flex md:order-2">
              <button type="button" className=" border-2 border-red-100 text-gray-900  font-medium rounded-lg text-sm lg:px-10 px-4 py-2 text-center mr-3 md:mr-0">GET STARTED</button>
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
                navItems.map((item : navButton) => {
                  return (
                    <NavBtn name={item.getName()} id={item.getId()}/>
                  );
                })
              }
              
              
              <div id="selector">
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



