import { useState, useEffect } from "react";
import Header from "../../Components/Header/Header.tsx";
import Canvas from "../../Components/Canvas/Canvas.tsx";
import Login from "../../Components/User-Authentication/Login.tsx";
import Register from "../../Components/User-Authentication/Register.tsx";
import "./Landing-Page.css";
import ScrollMagic from "scrollmagic";
import gsap from "gsap";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

import tree from "./Tree.jpg";
import banana from "./Banana.jpg";
import birb from "./Birb.jpg";
import peeps from "./Peeps.jpg";
import paint from "./Paint.jpg";

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
          // console.log("enter");

          if (window.innerHeight <= 685) {
            tl.to("#Showcase", { duration: 0.5, y: "-110vh" }); //Slide when Scrolling Downwards
          } else tl.to("#Showcase", { duration: 0.5, y: "-85vh" });
        } else if (event.scrollDirection == "REVERSE") {
          tl.to("#Showcase", { duration: 1, y: "20vh" }); //Slide when Scrolling Backwards
        }
      })
      
      //.addIndicators!();

    let blogRef = document.getElementById("Blog")!;

    /**THIS IS A DIVIDER */

    const Sidetl: gsap.core.Timeline = gsap.timeline({
      paused: true,
    });

    Sidetl.to("#Pic1", {
      y: 5 * 50,
      x: 1 * 50,
      scale: 1.1,
      rotation: -25,
      duration: 1,
    }); //Set Position

    Sidetl.to(
      "#Pic2",
      {
        y: -4 * 50,
        x: -1 * 30,
        scale: 1.1,
        rotation: -25,
        duration: 1,
        delay: 0.5,
      },
      "<"
    ); //Set Position

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
        const progress = event.progress;
        // console.log("Scroll Progress:", progress);

        // Reverse the timeline if scrolling up
        if (event.scrollDirection === "REVERSE" && progress <= 0.1) {
          Sidetl.reverse();
        } else if (progress > 0.1) {
          Sidetl.play();
        }
        //Set Position
      })
      
      //addIndicators!();

    /**THIS IS A DIVIDER */

    new ScrollMagic.Scene({
      triggerElement: "#Bboglog",
      triggerHook: 0.5,
      duration: "200%",
      offset: 100,
    })
      .addTo(BboglogController)
      .on("progress", (event: any) => {})
      //.addIndicators!();

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
        className="w-screen h-auto  absolute bottom-96 bg-black"
      />

      <div id="Showcase" className="w-screen h-full">
        <h1 className="text-7xl absolute top-40 text-white mx-auto showcase-shadow">
          FIND TALENTED ARTISTS
        </h1>
        <h2 className="text-xl absolute text-orange-400 top-[15rem]  mx-auto">
          browse through the webpage
        </h2>
        <h2></h2>
        <div className="images_box">
          <img src={tree} />
          <img src={birb} />
          <img src={banana} />
          <img src={peeps} />
          <img src={paint} />
        
        </div>
      </div>

      <div
        id="Blog"
        className="w-screen h-screen z-20 bg-yellow-300 relative  "
      >
        <div
          id="Bboglog"
          className="Image-Content [&>*]:relative drop-shadow-2xl	"
        >
          <h1 className="ml-5 pr-[6vw] relative text-White Blog-Text left-[2vw] top-10 flex flex-col font-custom word-holder">
            <span>
              INSP IRING <span className="text-white">STOR IES</span>
            </span>
          </h1>

          <img
            src="/Showcase1.jpg"
            className="bottom-[5vh] "
            id="Pic1"
            alt=""
          />
          <img src="/Showcase2.jpg" className="bottom-[5vh]" id="Pic2" alt="" />
          <img src="/Showcase3.jpg" className="bottom-[5vh] ml-10" id="Pic3" />
          <h1 className="ml-5 pr-[6vw] relative text-White Blog-Text left-[2vw] top-10 flex flex-col font-custom word-holder2">
            <span>
              Keep Updated With Our{" "}
              <span className="text-white myspan">Website Blog</span>
            </span>
          </h1>
        </div>
      </div>
      <div id="Support" className="w-screen h-screen z-20  relative">
        <h1 className="text-7xl text-orange-400">DO YOU HAVE A QUESTION?</h1>
        <h1 className="text-2xl text-white">contact us</h1>

        <form className="cf rounded-3xl">
          <div className="half left cf">
            <input type="text" id="input-name" placeholder="Name" />
            <input type="email" id="input-email" placeholder="Email address" />
            <input type="text" id="input-subject" placeholder="Subject" />
          </div>
          <div className="half right cf">
            <textarea
              name="message"
              id="input-message"
              placeholder="Message"
            ></textarea>
          </div>
          <input
            type="submit"
            value="SUBMIT"
            id="input-submit"
            className="bg-orange-400"
          />
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
