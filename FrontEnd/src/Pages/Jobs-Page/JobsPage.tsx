import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/GeneralLoggedInHeader.tsx";
import axios from "axios";
import "./JobsPage.css";
import img from "./Design.png";

function JobArticle(props: any) {
  const jobValue = props.val;
  const navigate = useNavigate();
  const switchJobPage = () => {
    // console.log("USERDATA", userdata);
    navigate(`/JobsPAge`, {
      state: { receivedData: props.dataCont, articleData: jobValue },
    });

    // /const userData = location.state.receivedData;
  };

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
      content: `As a Photography Specialist at Artistic Images Studio, you'll play a crucial role in our dynamic creative team based in the vibrant city of New York. In this full-time position, offering the flexibility of remote work, you will have the unique opportunity to bring your creative vision to life through the lens of Adobe Creative Suite. Join us in capturing the essence of unforgettable moments and contribute to the vibrant visual storytelling landscape. We value innovation, collaboration, and a passion for visual excellence.`,
      contacts: {
        email: "hr@artisticimagesstudio.com",
        phone: "+1 (555) 123-4567",
      },
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
      content: `Visual Magic Creations invites you to join our team as a part-time Photo Editing Wizard in the bustling city of Los Angeles. In this role, you'll play a key part in bringing photos to life through your expertise in Lightroom. Join us in creating visually stunning content and making magic through photo editing. We prioritize a collaborative and fun working environment, where your creative input is valued.`,
      contacts: {
        email: "careers@visualmagiccreations.com",
        phone: "+1 (555) 987-6543",
      },
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
      content: `Join Expressive Portraits Co. as a Full-time Creative Portrait Photographer in the picturesque city of San Francisco. In this role, you'll have the opportunity to embrace remote work while bringing a unique creative direction to portrait photography projects. Join us in capturing and expressing the essence of individuals through your artistic lens. Our collaborative team values diversity and creativity, making us a perfect fit for passionate photographers.`,
      contacts: {
        email: "info@expressiveportraitsco.com",
        phone: "+1 (555) 876-5432",
      },
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
      content: `Immerse yourself in the world of storytelling as a Full-time Visual Storyteller at Imaginary Worlds Productions in the vibrant city of Austin. In this role, you'll have the opportunity to contribute to visual storytelling through the art of cinematography. Join our team and bring your creative vision to life on the screen. At Imaginary Worlds Productions, we believe in the power of visual storytelling to inspire and captivate audiences.`,
      contacts: {
        email: "careers@imaginaryworldsproductions.com",
        phone: "+1 (555) 234-5678",
      },
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
      content: `Become a key player in the world of events as a Full-time Artistic Event Photographer at Event Impressions Studio in the beautiful city of Seattle. In this role, you'll have the opportunity to work remotely and capture the essence of events through your artistic lens, including post-processing work. Join us in creating memorable visual impressions. Event Impressions Studio is dedicated to fostering a positive and inclusive work environment for all our team members.`,
      contacts: {
        email: "hr@eventimpressionsstudio.com",
        phone: "+1 (555) 765-4321",
      },
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
      content: `Elevate the world of visual arts as a Full-time Visual Arts Curator at Modern Gallery Collective in the vibrant city of Chicago. In this role, you'll have the opportunity to showcase your curatorial expertise and contribute to the ever-evolving landscape of visual arts. Join us in shaping the narrative of artistic expression. At Modern Gallery Collective, we believe in the power of art to inspire, challenge, and connect communities.`,
      contacts: {
        email: "jobs@moderngallerycollective.com",
        phone: "+1 (555) 876-5432",
      },
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
      content: `Embark on a freelance journey as a Photography Consultant with Art Freelancers Network in the vibrant city of Miami. In this role, you'll enjoy the flexibility of freelance work while collaborating with clients to provide expert photography consulting services. Join our network and contribute to the dynamic intersection of art and business. Art Freelancers Network values creativity, professionalism, and the ability to forge meaningful collaborations with clients.`,
      contacts: {
        email: "info@artfreelancersnetwork.com",
        phone: "+1 (555) 987-6543",
      },
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
      content: `Unleash your creative flair as a Full-time Graphic Designer at Creative Designs Co. in the picturesque city of San Diego. In this role, you'll have the opportunity to work remotely and bring your unique vision to graphic design projects using Adobe Creative Suite. Join our team and be a driving force in visual communication. Creative Designs Co. values innovation, collaboration, and a passion for pushing the boundaries of graphic design.`,
      contacts: {
        email: "careers@creativedesignsco.com",
        phone: "+1 (555) 234-5678",
      },
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
      content: `Dive into the world of motion as a Full-time Motion Graphics Animator at Dynamic Animations Studio in the eclectic city of Portland. In this role, you'll have the opportunity to contribute to exciting projects using your skills in motion graphics and After Effects. Join our dynamic team and bring your animations to life. Dynamic Animations Studio values creativity, collaboration, and a commitment to pushing the boundaries of motion graphics.`,
      contacts: {
        email: "info@dynamicanimationsstudio.com",
        phone: "+1 (555) 876-5432",
      },
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
          return <JobArticle val={job} dataCont={DataCont}></JobArticle>;
        })}
      </div>
    </div>
  );
}

export default JobsPage;
