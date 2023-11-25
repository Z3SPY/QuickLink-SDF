import "./Upload.css";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "flowbite";
import "flowbite/dist/flowbite.js";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [curProfile, setCurProfile] = useState<string>("");
  const [returnedObj, setReturnedObj] = useState<any>(null);

  const location = useLocation(); // For getting values from navigate
  const [DataCont, setDatCont] = useState(location.state.recievedData);
  const userReturnedObj = location.state.returnObj; // IMPORTANT FOR RETURNING USER VALUE

  console.log(userReturnedObj);

  const navigate = useNavigate();

  const PostNavigate = () => {
    navigate("/Posts", { state: { recievedData: userReturnedObj } });
  };

  //<LandingPage/>

  const uploadDivRef = useRef<HTMLButtonElement>(null);

  function submit(event: any) {
    event.preventDefault();

    const fileInput = document.getElementById("file") as HTMLInputElement;
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const descInput = document.getElementById("desc") as HTMLInputElement;
    let base64String: any = ""; // For image

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const userFile: File = fileInput.files[0];
      if (userFile) {
        const reader = new FileReader();

        reader.onload = async function (e) {
          try {
            document.getElementById("loading-screen")!.style.display = "flex";
            const base64String = e.target?.result;

            const data: any = {
              user_file: base64String,
              user_title: titleInput.value,
              user_description: descInput.value,
              user_auth: DataCont,
            };

            const response = await fetch(`/api/createNewPost/`, {
              method: "POST",
              mode: "same-origin",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((resp) => {
                if (!resp.ok) {
                  throw new Error("Network response was not ok");
                }
                return resp.json();
              })
              .then((d) => {
                console.log(d);
                setTimeout(() => {
                  PostNavigate();
                }, 2000); // 2000 milliseconds (adjust as needed)
              })
              .catch((error) => {
                alert("Error occured while creating post: " + error);
              });
          } catch (error) {
            console.error("An error occurred:", error);
          }
        };

        reader.readAsDataURL(userFile);
      }
    } else {
      alert("Please select a file before uploading.");
    }
  }

  useEffect(() => {}, []);

  return (
    <div className="background p-0 m-0 pt-32">
      <div id="loading-screen">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className="m-auto bg-gray-600 rounded-xl lg:w-[40vw] h-[70vh] md:w-[50vw] shadow-2xl">
        <form
          action="POST"
          onSubmit={submit}
          className="flex flex-col [&>*]:p-2 text-white"
        >
          <input
            type="file"
            id="file"
            accept=".png, .jpg"
            className="w-[90%] mx-[5%]"
          />
          <label htmlFor="title"> TITLE </label>
          <input
            type="text"
            id="title"
            className="w-[90%] mx-[5%] text-black"
          ></input>
          <label htmlFor="desc"> DESCRIPTION</label>
          <input
            type="text"
            id="desc"
            className="w-[90%] mx-[5%] text-black"
          ></input>
          <button
            ref={uploadDivRef}
            type="submit"
            className="w-[90%] mx-[5%] mt-4 bU"
          >
            {" "}
            Upload File
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
