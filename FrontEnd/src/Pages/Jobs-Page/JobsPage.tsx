import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/GeneralLoggedInHeader.tsx";
import axios from "axios";
import "./JobsPage.css";
import img from "./Design.png";

function JobArticle(props: any) {
  const jobValue = props.val;

  function switchJobPage() {}

  function Tags(Props: any) {
    return (
      <div className="">
        <div className="tag-content bg-gray-400 px-10 p-1">
          <div className="p-1 rounded-r text-white">{Props.value}</div>
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
          <h1 className="text-4xl	max-w-[20rem]  truncate">
            {jobValue.jobTitle}
          </h1>
          <h2 className="text-2xl mt-1 	max-w-[20rem] text-gray-400">
            {jobValue.companyName}
          </h2>
        </div>

        <div className="h-100% mx-auto w-6/12">
          <h1 className="text-2xl"> TAGS: </h1>
          <div className=" flex flex-wrap">
            {jobValue.tags.map((tag: string) => {
              return <Tags value={tag} />;
            })}
          </div>
        </div>
      </div>

      <h3 className="absolute right-5 bottom-2">
        Date Posted {jobValue.datePosted}
      </h3>
    </div>
  );
}

function JobsPage() {
  const jobListings = [
    {
      jobTitle: "Photography Specialist",
      companyName: "Artistic Images Studio",
      datePosted: "2023-01-15",
      tags: [
        "Full-time",
        "Location: New York",
        "Remote: Yes",
        "Photography",
        "Adobe Creative Suite",
      ],
      description:
        "Exciting opportunity for a Photography Specialist to join Artistic Images Studio in New York. Work remotely and showcase your creativity through stunning photography using Adobe Creative Suite.",
    },
    {
      jobTitle: "Photo Editing Wizard",
      companyName: "Visual Magic Creations",
      datePosted: "2023-01-10",
      tags: [
        "Part-time",
        "Location: Los Angeles",
        "Remote: No",
        "Photo Editing",
        "Lightroom",
      ],
      description:
        "Visual Magic Creations is hiring a part-time Photo Editing Wizard in Los Angeles. Join our team and bring photos to life with your editing skills using Lightroom.",
    },
    {
      jobTitle: "Creative Portrait Photographer",
      companyName: "Expressive Portraits Co.",
      datePosted: "2023-01-08",
      tags: [
        "Full-time",
        "Location: San Francisco",
        "Remote: Yes",
        "Portrait Photography",
        "Creative Direction",
      ],
      description:
        "Expressive Portraits Co. is seeking a Full-time Creative Portrait Photographer based in San Francisco. Embrace remote work and bring a unique creative direction to portrait photography projects.",
    },
    {
      jobTitle: "Visual Storyteller",
      companyName: "Imaginary Worlds Productions",
      datePosted: "2023-01-05",
      tags: [
        "Full-time",
        "Location: Austin",
        "Remote: No",
        "Visual Storytelling",
        "Cinematography",
      ],
      description:
        "Imaginary Worlds Productions is looking for a Full-time Visual Storyteller in Austin. Join our team and contribute to visual storytelling through the art of cinematography.",
    },
    {
      jobTitle: "Artistic Event Photographer",
      companyName: "Event Impressions Studio",
      datePosted: "2023-01-03",
      tags: [
        "Full-time",
        "Location: Seattle",
        "Remote: Yes",
        "Event Photography",
        "Post-Processing",
      ],
      description:
        "Join Event Impressions Studio in Seattle as a Full-time Artistic Event Photographer. Work remotely and capture the essence of events through your artistic lens, including post-processing work.",
    },
    {
      jobTitle: "Visual Arts Curator",
      companyName: "Modern Gallery Collective",
      datePosted: "2022-12-28",
      tags: [
        "Full-time",
        "Location: Chicago",
        "Remote: No",
        "Visual Arts",
        "Curatorial Expertise",
      ],
      description:
        "Modern Gallery Collective is seeking a Full-time Visual Arts Curator in Chicago. Showcase your curatorial expertise and contribute to the world of visual arts.",
    },
    {
      jobTitle: "Freelance Photography Consultant",
      companyName: "Art Freelancers Network",
      datePosted: "2022-12-25",
      tags: [
        "Freelance",
        "Location: Miami",
        "Remote: Yes",
        "Photography Consulting",
        "Client Collaboration",
      ],
      description:
        "Art Freelancers Network is hiring a Freelance Photography Consultant. Enjoy the flexibility of freelance work and collaborate with clients to provide expert photography consulting services.",
    },
    {
      jobTitle: "Graphic Designer",
      companyName: "Creative Designs Co.",
      datePosted: "2023-02-01",
      tags: [
        "Full-time",
        "Location: San Diego",
        "Remote: Yes",
        "Graphic Design",
        "Adobe Creative Suite",
      ],
      description:
        "Join Creative Designs Co. as a Full-time Graphic Designer in San Diego. Work remotely and bring your creative flair to graphic design projects using Adobe Creative Suite.",
    },
    {
      jobTitle: "Motion Graphics Animator",
      companyName: "Dynamic Animations Studio",
      datePosted: "2023-02-05",
      tags: [
        "Full-time",
        "Location: Portland",
        "Remote: No",
        "Motion Graphics",
        "After Effects",
      ],
      description:
        "Dynamic Animations Studio is looking for a Full-time Motion Graphics Animator in Portland. Contribute to exciting projects using your skills in motion graphics and After Effects.",
    },
  ];

  const location = useLocation();
  const [DataCont, setDataCont] = useState(location.state.receivedData);

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
        {jobListings.map((job: any) => {
          return <JobArticle val={job}></JobArticle>;
        })}
      </div>
    </div>
  );
}

export default JobsPage;
