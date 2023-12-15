import React from "react";
import { Route, Link, Routes, useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "../../Components/Header/GeneralLoggedInHeader.tsx";

function JobsContentPage() {
  const location = useLocation();
  const [DataCont, setDataCont] = useState(location.state.receivedData);
  const [articleCont, setArticleCont] = useState(location.state.articleData);

  // console.log(params); // 👉️ {userId: '4200'}

  return (
    <>
      <Header UserData={DataCont}></Header>
      <div className="relative border-b-8 border-black	 mx-auto mt-[76.8px] flex flex-col justify-center h-[60vh] w-[65%] [&>*]:p-2 ">
        <h1 className="text-5xl text-red-700 italic">{articleCont.jobTitle}</h1>
        <h2 className="text-2xl text-gray-500">{articleCont.companyName}</h2>

        <p className="text-xl border-l-4 border-red-700 p-2	">
          {articleCont.description}
        </p>
        <p className="text-xl mt-10 rounded-3xl [word-spacing:10px] text-justify		">
          {articleCont.content}
        </p>

        <h1 className="absolute bottom-7 text-2xl">Contact Us</h1>
        <div className="flex gap-11 text-red-700 absolute bottom-0">
          <p>{articleCont.contacts.email}</p>
          <p>{articleCont.contacts.phone}</p>
        </div>
      </div>
    </>
  );
}

export default JobsContentPage;
