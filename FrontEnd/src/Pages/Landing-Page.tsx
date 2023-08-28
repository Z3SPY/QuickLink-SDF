import { useState, useEffect } from 'react';
import Header from '../Components/Header/Header.tsx';
import Canvas from '../Components/Canvas/Canvas.tsx';
import './Landing-Page.css';
import ScrollMagic from 'scrollmagic';
import gsap from 'gsap';
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";


function LandingPage() {
  const tl = gsap.timeline();

  useEffect(() => {
    const controller = new ScrollMagic.Controller();
    tl.to("#Showcase", {y: "20%" }); //Set Position

    // Scene 1: Animation when entering the "Showcase" section
    new ScrollMagic.Scene({
      triggerElement: '#Graphic',
      triggerHook: 0.4,
      duration: '50%',
      offset: 100,
    })
      .addTo(controller)
      .on('end', (event : any) => {
        if (event.scrollDirection == "FORWARD") {
          console.log("enter");
          tl.to("#Showcase", { duration: 1, y: "-31%" }); //Slide when Scrolling Downwards
        } else if (event.scrollDirection == "REVERSE") { 
          tl.to("#Showcase", { duration: 1, y: "0%" }); //Slide when Scrolling Backwards
        }
      }).addIndicators!();

    return () => controller.destroy(true);
  }, []);

  return (
    <div id="landing-page">
      <Header />
      <div className='App file:w-full h-screen z-1'>
        <div id="Graphic">
          <div className='text absolute'>
            <h1 className="text-6xl ">
              <span style={{ color: '#FFBA86' }}>CRAFTING</span>
              <span style={{ color: '#C23373' }}>DREAMS</span> ONE FREELANCE GIG AT A TIME
            </h1>
          </div>
          <Canvas />
        </div>
      </div>

      <div id="Showcase" className='w-screen h-auto bg-black z-20'>
        <div className="grid grid-cols-4 gap-4">
          <div className='bg-yellow-500'> </div>
          <div className='bg-yellow-500'> a </div>
          <div className='bg-yellow-500'> a </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
