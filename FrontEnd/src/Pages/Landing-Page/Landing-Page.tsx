import { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header.tsx';
import Canvas from '../../Components/Canvas/Canvas.tsx';
import Login from '../../Components/User-Authentication/Login.tsx'
import Register from '../../Components/User-Authentication/Register.tsx'
import './Landing-Page.css';
import ScrollMagic from 'scrollmagic';
import gsap from 'gsap';
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";


function LandingPage() {
  const tl : gsap.core.Timeline = gsap.timeline();

  useEffect(() => {
    const controller : ScrollMagic.Controller    = new ScrollMagic.Controller();
    tl.to("#Showcase", {y: "20vh" }); //Set Position

    // Scene 1: Animation when entering the "Showcase" section
    new ScrollMagic.Scene({
      triggerElement: '#Graphic',
      triggerHook: 0.5,
      duration: '50%',
      offset: 100,
    })
      .addTo(controller)
      .on('end', (event : any) => {
        if (event.scrollDirection == "FORWARD") {
          console.log("enter");

          if (window.innerHeight <= 685) {
            tl.to("#Showcase", { duration: 0.5, y: "-110vh" }); //Slide when Scrolling Downwards
          } else
            tl.to("#Showcase", { duration: 0.5, y: "-85vh" }); 
        } else if (event.scrollDirection == "REVERSE") { 
          tl.to("#Showcase", { duration: 1, y: "20vh" }); //Slide when Scrolling Backwards
        }
      }).addIndicators!();

    return () => controller.destroy(true);
  }, []);

  /* NOTE TO SELF 

    Change How The Text Appears On Load.
    Add Description Text at the bottom.
    Font Could look cleaner.

  
  
  */
  
  return (
    <div id="landing-page">
      <Header />
      <div className='App file:w-full h-screen z-1'>
        <div id="Graphic">
          <div className='z-20 text absolute left-32 top-64 text-7xl sm:text-7xl md:text-8xl md:w-auto lg:text-6xl '>
              <div style={{ color: '#FFBA86' }}>CONNECTING</div>
              <div style={{ color: '#C23373' }}> CREATIVITY:</div>
              <div>LINKING ARTIST </div>
              <div>WORLDWIDE</div>

          </div>
          <Canvas />
        </div>
      </div>

      <Login />
      <Register />
      <div id="ShowcaseAnchor" className='w-screen h-auto bg-transparent absolute bottom-96' />
      <div id="Showcase" className='w-screen h-full'>
        <div className="flex pt-11 gap-3 w-11/12 ml-10 flex-wrap" id="Showcase-Pictures">
          <div className='flex-grow bg-yellow-300'> </div>
          <div className='w-full  bg-red-500 '>  </div>
          <div className='w-2/3' style={{ backgroundColor: '#C23373' }}>  </div>
          <div className='flex-grow bg-red-500' >  </div>
          <div className='flex-grow  bg-yellow-300 '>  </div>
        </div>
      </div>

      <div id="Blog" className='w-screen h-screen z-20 bg-yellow-300 relative'>
        a
      </div>
      <div id="Support" className='w-screen h-screen z-20 bg-red-500 relative'>
        a
      </div>
      

    </div>
  );
}

export default LandingPage;
