import { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header.tsx';
import Canvas from '../../Components/Canvas/Canvas.tsx';
import './Landing-Page.css';
import ScrollMagic from 'scrollmagic';
import gsap from 'gsap';
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";


function LandingPage() {
  const tl : gsap.core.Timeline = gsap.timeline();

  useEffect(() => {
    const controller : ScrollMagic.Controller    = new ScrollMagic.Controller();
    tl.to("#Showcase", {y: "20%" }); //Set Position

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
          tl.to("#Showcase", { duration: 1, y: "-70%" }); //Slide when Scrolling Downwards
        } else if (event.scrollDirection == "REVERSE") { 
          tl.to("#Showcase", { duration: 1, y: "20%" }); //Slide when Scrolling Backwards
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
          <div className='text absolute text-6xl'>
              <div style={{ color: '#FFBA86' }}>CONNECTING</div>
              <div style={{ color: '#C23373' }}> CREATIVITY:</div>
              <div>LINKING ARTIST WORLDWIDE</div>
            
          </div>
          <Canvas />
        </div>
      </div>

      <div id="Showcase" className='w-screen h-auto z-20'>
        <div className="flex pt-11 gap-3 w-11/12 ml-10 flex-wrap" id="Showcase-Pictures">
          <div className='flex-grow bg-yellow-500'> </div>
          <div className='w-full  bg-red-500 '>  </div>
          <div className='w-2/3' style={{ backgroundColor: '#C23373' }}>  </div>
          <div className='flex-grow bg-red-500' >  </div>
          <div className='flex-grow  bg-yellow-500 '>  </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
