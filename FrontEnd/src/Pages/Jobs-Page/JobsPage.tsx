import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/GeneralLoggedInHeader.tsx";
import axios from "axios";
import "./JobsPage.css";
import img from "./Design.png";

function JobArticle(props: any) {
  function switchJobPage() {}

  function Tags() {
    return (
      <div className=" flex flex-wrap">
        <div className="">
          <div className="tag-content bg-gray-400 px-10 p-1">
            <div className="p-1 rounded-r text-white">yo</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={switchJobPage}
      className="bg-gray-600 rounded-3xl text-white w-[100%] min-h-[12rem] max-h-[12rem] my-1 p-10 tag-hoverAnchor relative"
    >
      <div className="flex">
        <div>
          <h1 className="text-7xl">JOB TITLE</h1>
          <h2 className="text-2xl mt-1">Company</h2>
        </div>

        <div className="h-100% mx-auto w-6/12">
          <h1 className="text-2xl"> TAGS: </h1>
        </div>
      </div>

      <h3 className="absolute right-5 bottom-2">Date Posted</h3>
    </div>
  );
}

function JobsPage() {
  const location = useLocation();
  const [DataCont, setDataCont] = useState(location.state.recievedData);

  return (
    <div>
      <Header UserData={DataCont}> </Header>

      <div className="h-auto w-auto relative">
        <div className="Design-Jobs h-[30rem] w-[100vw] bg-red-200 p-5 relative "></div>
        <h1 className="title-job absolute bottom-[20%] left-[10%] z-10 text-white 	">
          JOBS PAGE
        </h1>
      </div>

      <div className="h-auto w-11/12 mt-5 mx-auto px-10 py-10 overflow-y-auto overflow-x-hidden max-h-[40rem]">
        <JobArticle></JobArticle>
        <JobArticle></JobArticle>
        <JobArticle></JobArticle>
        <JobArticle></JobArticle>
        <JobArticle></JobArticle>
      </div>
    </div>
  );
}

export default JobsPage;
