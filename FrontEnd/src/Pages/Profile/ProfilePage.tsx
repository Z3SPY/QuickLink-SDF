  import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/GeneralLoggedInHeader.tsx";
import "./ProfilePage.css";
import axios from "axios";
import "flowbite";
import "flowbite/dist/flowbite.js";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Navbar,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import noneImage from "./none.png";

//Take User
//Get User Profile Values

const ExperienceCont = (p: any) => {
  return (
    <div className="h-auto mx-10 mt-2 bg-gray-300 rounded-xl ExpCard"></div>
  );
};

//THIS IS IMPORTANT REVIEW TOMORROW AND UPDATE UPLOAD
const EditProfileView = (p: any) => {
  //Should Change the value of profile and edit
  const [curUserID, setUserID] = useState(p.userID);

  function EditProfile(e: any) {
    e.preventDefault();

    const fileInput = document.getElementById("ProfilePic") as HTMLInputElement;
    const dispNameInput = document.getElementById(
      "DisplayName"
    ) as HTMLInputElement;
    const descInput = document.getElementById(
      "ProfileDescription"
    ) as HTMLInputElement;
    const contInput = document.getElementById(
      "ProfileContacts"
    ) as HTMLInputElement;

    let base64String: any = ""; // For image

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const userFile: File = fileInput.files[0];
      if (userFile) {
        const reader = new FileReader();

        reader.onload = async function (e) {
          try {
            const base64String = e.target?.result;

            const data: any = {
              picFile: base64String,
              name: dispNameInput.value,
              desc: descInput.value,
              cont: contInput.value,
              id: curUserID,
            };

            const response = await fetch("/api/editProfile/", {
              method: "POST",
              mode: "same-origin",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((resp) => {
                // console.log(resp.json());
                location.reload(); // Refresh Page
              })
              .catch((error) => {
                alert("Error occurred while creating user:" + error);
              });
          } catch (error) {
            console.error("An error occurred:", error);
          }
        };

        reader.readAsDataURL(userFile);
      }
    } else {
      const data: any = {
        id: curUserID,
        name: dispNameInput.value.trim() !== "" ? dispNameInput.value : null,
        desc: descInput.value.trim() !== "" ? descInput.value : null,
        cont: contInput.value.trim() !== "" ? contInput.value : null,
        picFile: null, // Assuming this property is set later based on conditions
      };

      if (data) {
        try {
          const response = fetch("/api/editProfile/", {
            method: "POST",
            mode: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((resp) => {
              // console.log(resp.json());
              location.reload(); // Refresh Page
            })
            .catch((error) => {
              alert("Error occurred while creating user:" + error);
            });
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    }
  }

  return (
    <Modal
      dismissible
      show={p.propsOpenModal === "form-edit-profile"}
      popup
      onClose={() => p.OpenModalFunc(undefined)}
      className="p-[5rem] "
    >
      <Modal.Body className="shadow-3xl pt-1 edit-design">
        <Modal.Header className="closeModal ">
          <h1 className="text-3xl text-white m-0 p-0">EDIT PROFILE</h1>
        </Modal.Header>

        <div className="m-auto rounded-xl w-[full] h-auto ">
          <form
            action="POST"
            onSubmit={EditProfile}
            className="flex flex-col [&>*]:p-2 text-white relative h-full"
          >
            <label htmlFor="file"> PROFILE PICTURE </label>

            <input
              type="file"
              id="ProfilePic"
              accept=".png, .jpg"
              className="w-[90%] mx-[5%]"
            />
            <label htmlFor="DisplayName"> DISPLAY NAME </label>
            <input
              type="text"
              id="DisplayName"
              className="w-[90%] mx-[5%] text-black"
            ></input>
            <label htmlFor="ProfileDescription"> DESCRIPTION</label>
            <input
              type="text"
              id="ProfileDescription"
              className="w-[90%] mx-[5%] text-black"
            ></input>
            <label htmlFor="ProfileContacts"> CONTACTS </label>
            <input
              type="text"
              id="ProfileContacts"
              className="w-[90%] mx-[5%] text-black"
            ></input>

            <input
              type="submit"
              className="w-[100%] relative mt-3 rounded-xl bg-white text-black hover:text-white hover:bg-red-700"
              value={"SUBMIT"}
            ></input>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

//**FOR USER POSTS LIST */
const UserPostsStruct = (p: any) => {
  const userPostValCont = p.val;
  const navRef = p.navRef;
  const userData = p.userData;

  // /console.log(userPostValCont);

  const SwitchPage = () => {
    navRef(`/UserPost/${userPostValCont.id}`, {
      state: { receivedData: userData },
    });
  };
  return (
    <div
      className="bg-gray-300 mx-3 mt-5 h-auto w-auto cursor-pointer"
      onClick={SwitchPage}
    >
      <img
        className="object-cover sm:min-w-[14rem] sm:max-w-[14rem]  md:min-w-[12rem] md:max-w-[12rem]  min-h-[12rem] max-h-[12rem]  user-posts"
        src={`http://127.0.0.1:8000/${userPostValCont.image_picture}`}
        alt=""
      />
    </div>
  );
};

function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [allUserPosts, setAllUserPosts] = useState<any>([]); // List of all user posts
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  //Get Variable from useLocation function REACT DOM
  const location = useLocation();
  const [DataCont, setDataCont] = useState(location.state.userProfileData);
  const [newData, setNewData] = useState(
    location.state.receivedData ?? JSON.parse(JSON.stringify(DataCont))
  );

  const navigate = useNavigate();

  const UploadNavigate = (data: any) => {
    // console.log(data.userAuth);
    navigate("/profile/Upload", {
      state: { receivedData: data.userAuth, returnObj: DataCont },
    });
  };

  const userContainer = newData.data.UserData;
  // console.log("CUR USER CONTAINER", userContainer);

  useEffect(() => {
    if (userContainer.username) {
      // console.log("PRINTED USER CONTAINER", userContainer);

      axios
        .get(`/api/profile/${userContainer.username}/`)
        .then((response) => {
          setProfile(response.data);
          // console.log("Set Successful");

          //console.log(response.data); // Log the updated profile data
        })
        .catch((err) => {
          console.error(err);
        });

      axios
        .get(`/api/getUserPostsList/${userContainer.id}/`)
        .then((response) => {
          setAllUserPosts(response.data.posts);
          return response.data.message;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userContainer]);

  if (profile === null) {
    return <div>Loading...</div>;
  }


  return (
    <div className="backGround">
      <Header UserData={DataCont}> </Header>
      <div id="profileContent-Container" className="flex">
        <div id="portfolio" className="mt-10 rounded-xl p-5 ">
          <div
            id="Upload-Btn"
            className="w-full h-[6rem] rounded-xl text-center lg:p-8 text-gray-200 md:p-[1rem] sm:md:p-[4rem]"
            style={userContainer.username === DataCont.data.UserData.username ? { display:'block'} : {display : 'none'}}
          >
            <h1 className="text-gray-200 text-xl " >
              
            </h1>
            Start your journey by uploading your work.
            <button
                onClick={() => {
                  UploadNavigate(profile[0]);
                }}
                className="text-base p-2 ml-2 rounded-lg bg-gray-600"
                
              >
                Upload Content
              </button>
          </div>
          <div id="Selector">
            <h1 className="text-gray-200 text-2xl mt-5">Portfolio</h1>
          </div>
          <div id="Photo-List" className="flex flex-wrap">
            {allUserPosts.map((posts: any) => {
              return (
                <UserPostsStruct
                  val={posts}
                  navRef={navigate}
                  userData={DataCont}
                />
              );
            })}
          </div>
        </div>

        <div id="profile" className="mt-10 ml-10 rounded-xl relative">
          <div id="background" className="bg-gray-300 "></div>
          <Button
            id="editBut"
            onClick={() => props.setOpenModal("form-edit-profile")}
            className="bg-yellow-300 absolute hover:bg-orange-100 "
            style={userContainer.username === DataCont.data.UserData.username ? { display:'block'} : {display : 'none'}}  
          >
            <img src="/edit.png" alt="" className="object-cover absolute" />
          </Button>
          <div className="userBorder relative">
            <div id="userPic" className="bg-red-300 absolute">
              <img
                src={
                  profile[0].profile_picture !== null
                    ? `http://127.0.0.1:8000/${profile[0].profile_picture}`
                    : noneImage
                }
                alt=""
                className=""
              />
            </div>
          </div>
          <div id="userDesc" className="ml-9 relative">
            <h1 className="text-gray-50 text-3xl">
              <span>
                {profile[0].displayName != null
                  ? profile[0].displayName
                  : userContainer.username}
              </span>
            </h1>
            <p className="mt-2 text-gray-400 text-xl">{profile[0].bio}</p>
            <p className="mt-1 text-gray-600 text-sm">{profile[0].contacts}</p>
          </div>

          <div className="mt-5 mb-10 pt-3 rounded-xl relative" id="Experience">
            <h1 className="text-gray-50 text-xl ml-5 mb-5">
              Relevant Experiences
            </h1>
            <div id="Experience-Cont" className="relative">
              <ExperienceCont />
              <ExperienceCont />
            </div>
          </div>
        </div>
      </div>
      <EditProfileView
        propsOpenModal={props.openModal}
        OpenModalFunc={props.setOpenModal}
        userID={userContainer.id}
      />
    </div>
  );
}

export default ProfilePage;
