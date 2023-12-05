import Header from "../../Components/Header/LoggedInHeader.tsx";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, generatePath } from "react-router-dom";
import React from "react";
import { Suspense, lazy } from "react";

import random from "lodash/random";
//import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"; Dont know if I should Uninstall this dependency
import Masonry from "react-layout-masonry";
import "./Freelance.css";

function PhotoComp({ src, userdata }: { src: any; userdata: any }) {
  const imageRef = useRef(document.createElement("img"));
  //console.log(src.image_picture)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Adjust this value as needed
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  //For Base64 `data:image/png;base64,${src.image_picture}`

  const handleIntersection = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        // Load the image when it enters the viewport
        //NOT LOADING BECAUSE NOT ENOUGH
        const img = new Image();
        img.src = `http://127.0.0.1:8000/${src.post.image_picture}`;
        //console.log(img.src);
        img.onload = () => {
          imageRef.current.src = img.src!;
        };

        // Stop observing the image once it's loaded
        observer.unobserve(imageRef.current);
      }
    });
  };

  const navigate = useNavigate();
  const SwitchPage = (id: any) => {
    console.log("USERDATA", userdata);
    navigate(`/UserPost/${id}`, { state: { recievedData: userdata } });

    // /const userData = location.state.recievedData;
  };

  //GET PROFILE IMAGE LATOR
  return (
    <div
      className="img-card-container"
      onClick={() => {
        SwitchPage(src.post.id);
      }}
    >
      <div className="card-img rounded-3xl card-back">
        <img
          ref={imageRef}
          src={"./gir.jpg"}
          className="rounded-3xl"
          style={{ minHeight: "200px", minWidth: "236px" }}
          alt="Picture"
        />
      </div>
      <div className="text-card">
        <div className="m-0 pb-4 text-container">
          <h1 className="font-semibold ">{src.post.title}</h1>
          <div
            className="absolute rounded-full bg-red-500 h-10 w-10"
            style={{
              backgroundImage: `url(http://127.0.0.1:8000/${src.profile_picture})`,
              backgroundSize: "cover", // Adjust as needed
              backgroundPosition: "center", // Adjust as needed
            }}
          ></div>
          <h2 className="ml-12 mt-2">{src.display_name}</h2>
        </div>
      </div>
    </div>
  );
}

function FreelanceSelector() {
  //Might Use USESTATE if problematic
  const location = useLocation();
  const [userData, setUserData] = useState(location.state.recievedData);

  const [searchedValues, setSearchVal] = useState<any[]>([]);

  /**CREATE A TOKEN SYSTEM */
  //If Token Available
  // Check if token valid
  // If token Valid Call a serializer to populate data

  // console.log("YO", userData);

  const [images, setImages] = useState<any[]>([]);

  const fetchImages = () => {
    fetch(`/api/obtainPostList`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setImages(data.Posts);
        }
      });
  };

  //GET SEARCH QUERY FUNCTION
  const getSearch = (val: any) => {
    setSearchVal(val);
    fetchImages();
  };

  useEffect(() => {
    console.log("SEARCHED USE STATE", searchedValues);
  }, [searchedValues]);

  useEffect(() => {
    fetchImages();
  }, [searchedValues, images]);

  return (
    <div>
      <Header UserData={userData} searchFunc={getSearch} />
      <div id="User-Tags"></div>
      <div id="User-Container" className="w-auto mx-40 mt-28">
        <Masonry columns={{ 640: 2, 768: 3, 1024: 4, 1280: 6 }} gap={16}>
          {searchedValues.map((base64: any) => {
            return (
              <div key={base64.post.id}>
                <PhotoComp src={base64} userdata={userData} />
              </div>
            );
          })}

          {images
            .filter(
              (image) =>
                !searchedValues.some(
                  (searchedValue) => searchedValue.post.id === image.post.id
                )
            )
            .map((base64: any) => (
              <div key={base64.post.id}>
                <PhotoComp src={base64} userdata={userData} />
              </div>
            ))}
        </Masonry>
      </div>
    </div>
  );
}
//<div className='w-10/12 h-10 rounded-3xl mt-28 mx-40 bg-white'> Search Bar </div>

export default FreelanceSelector;
