import "./Upload.css";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "flowbite";
import "flowbite/dist/flowbite.js";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [curProfile, setCurProfile] = useState<string>("");
  const [returnedObj, setReturnedObj] = useState<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const location = useLocation(); // For getting values from navigate

  const DataCont = location.state.recievedData; //gets Data from previous Location after change page
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
              user_tags: tags,
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

  const AddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const RemoveTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

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
      <div className="m-auto rounded-xl lg:w-[40vw] h-[80vh] md:w-[50vw] shadow-2xl">
        <form
          action="POST"
          onSubmit={submit}
          className="relative flex flex-col [&>*]:p-2 text-white"
        >
          <label htmlFor="details" className="txtFile">
            FILE UPLOAD
          </label>
          <input
            type="file"
            id="file"
            accept=".png, .jpg"
            className="chooseFile"
          />
          <label htmlFor="details" className="txtUpload">
            UPLOAD DETAILS
          </label>
          <label htmlFor="title" className="mt-3">
            <b>TITLE</b>
          </label>
          <input
            type="text"
            id="title"
            placeholder="Insert Title Here"
            className="txtBox"
          ></input>
          <label htmlFor="desc" className="mt-3">
            <b>DESCRIPTION</b>
          </label>
          <input
            type="text"
            id="desc"
            placeholder="Insert Description Here"
            className="txtBox"
          ></input>
          <label htmlFor="tg" className="mt-5">
            <b>TAGS</b>
          </label>
          <div className="w-[90%] mx-[5%] mt-2">
            <input
              type="text"
              id="tag"
              placeholder="Type Tags Here"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="tagInput"
            />
            <button type="button" onClick={AddTag} className="ml-2 addTagBtn">
              <b>Add Tag</b>
            </button>
          </div>
          <div className="flex flex-wrap w-[50%]  mx-[5%] mt-2 tag-box">
            {tags.map((tag, index) => (
              <div key={index} className="tag-container">
                <div className="tag-content bg-gray-500">
                  <div className="p-1 rounded-r text-white">{tag}</div>
                  <button
                    type="button"
                    onClick={() => RemoveTag(index)}
                    className="rounded-l p-1 text-white"
                  >
                    <b>×</b>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            ref={uploadDivRef}
            type="submit"
            className=" w-[90%] mx-[5%] bU"
          >
            UPLOAD FILE
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
