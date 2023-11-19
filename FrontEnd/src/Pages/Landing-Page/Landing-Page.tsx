import { useState, useEffect } from "react";
import Header from "../../Components/Header/Header.tsx";
import Canvas from "../../Components/Canvas/Canvas.tsx";
import Login from "../../Components/User-Authentication/Login.tsx";
import Register from "../../Components/User-Authentication/Register.tsx";
import "./Landing-Page.css";
import ScrollMagic from "scrollmagic";
import gsap from "gsap";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

function LandingPage() {
  const tl: gsap.core.Timeline = gsap.timeline();

  useEffect(() => {
    const controller: ScrollMagic.Controller = new ScrollMagic.Controller();
    const BboglogController: ScrollMagic.Controller =
      new ScrollMagic.Controller({ container: "#Blog", vertical: false });

    tl.to("#Showcase", { y: "20vh" }); //Set Position

    // Scene 1: Animation when entering the "Showcase" section
    new ScrollMagic.Scene({
      triggerElement: "#Graphic",
      triggerHook: 0.5,
      duration: "50%",
      offset: 100,
    })
      .addTo(controller)
      .on("end", (event: any) => {
        if (event.scrollDirection == "FORWARD") {
          console.log("enter");

          if (window.innerHeight <= 685) {
            tl.to("#Showcase", { duration: 0.5, y: "-110vh" }); //Slide when Scrolling Downwards
          } else tl.to("#Showcase", { duration: 0.5, y: "-85vh" });
        } else if (event.scrollDirection == "REVERSE") {
          tl.to("#Showcase", { duration: 1, y: "20vh" }); //Slide when Scrolling Backwards
        }
      }).addIndicators!();

    let blogRef = document.getElementById("Blog")!;

    /**THIS IS A DIVIDER */
    new ScrollMagic.Scene({
      triggerElement: "#Blog",
      triggerHook: 0.5,
      duration: "1000%",
      offset: 300,
    })
      .addTo(controller)
      .setPin("#Blog")
      .on("progress", (event: any) => {
        blogRef.scrollLeft = event.progress * 2000;
      }).addIndicators!();

    /**THIS IS A DIVIDER */

    new ScrollMagic.Scene({
      triggerElement: "#Bboglog",
      triggerHook: 0.5,
      duration: "200%",
      offset: 100,
    })
      .addTo(BboglogController)
      .on("progress", (event: any) => {
        //console.log(event.progress);
      }).addIndicators!();

    return () => {
      controller.destroy(true);
      BboglogController.destroy(true);
    };
  }, []);

  /* NOTE TO SELF 

    Change How The Text Appears On Load.
    Add Description Text at the bottom.
    Font Could look cleaner.

  
  
  */

  return (
    <div id="landing-page">
      <Header />
      <div className="App file:w-full h-screen z-1">
        <div id="Graphic">
          <div className="z-20 text absolute left-32 top-64 text-7xl sm:text-7xl md:text-8xl md:w-auto lg:text-6xl ">
            <div style={{ color: "#FFBA86" }}>CONNECTING</div>
            <div style={{ color: "#C23373" }}> CREATIVITY:</div>
            <div>LINKING ARTIST </div>
            <div>WORLDWIDE</div>
          </div>
          <Canvas />
        </div>
      </div>

      <Login />
      <Register />
      <div
        id="ShowcaseAnchor"
        className="w-screen h-auto bg-transparent absolute bottom-96"
      />

      <div id="Showcase" className="w-screen h-full"></div>

      <div
        id="Blog"
        className="w-screen h-screen z-20 bg-yellow-300 relative  "
      >
        <div id="Bboglog" className="Image-Content">
          <div className="bg-blue-800 w-[20vw] h-[20rem]"></div>
        </div>
      </div>
      <div id="Support" className="w-screen h-screen z-20  relative">
        a
      </div>
    </div>
  );
}

export default LandingPage;
