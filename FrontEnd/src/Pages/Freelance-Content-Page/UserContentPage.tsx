import LoggedInHeader from '../../Components/Header/LoggedInHeader.tsx';
import { useState, useEffect } from 'react';
import ScrollMagic from 'scrollmagic';
import gsap from 'gsap';
import random from "lodash/random";
import Masonry from 'react-layout-masonry';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import './UserContentPage.css';


function Comment(item : any) {

    return( 
      <div>

      </div>


    );
}


function FreelancePage(){

  const params = useParams();

  console.log(params); 
    
//            <LoggedInHeader></LoggedInHeader>

    return(
        <>

            <div id="Post-Page" className='flex flex-wrap w-screen h-auto mt-20 '> 
              <div id="Post-Container" className='flex flex-wrap'> 
                <div className='w-full h-full  relative'> 
                  <div id="Post-Img" className='w-[95%] h-[90%] bg-red-200'> 
                  </div>
                </div>
                <div id="Post-Recommend" className='w-full mx-5 shadow '> 
                </div>
              </div>
              <div id="Post-Description" className='flex-wrap grow rounded-3xl shadow m-5 mr-6'>
                <div id="Post-UserValues"> 
                  <div className='Design'></div>
                  <div className='ProfilePic'></div>
                  <div className='ProfileVals'></div>

                </div>
                <div id="Post-Comments" className=' '>
                  <h1 className='text-gray-400 p-5'> 1 Comment</h1>
                  <div id="Comment-List">

                  </div>
                </div>




              </div>
              

            </div>
            
           
            
        </>
    )
}

export default FreelancePage;
