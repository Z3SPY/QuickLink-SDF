import Header from "../../Components/Header/GeneralLoggedInHeader.tsx";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Masonry from "react-layout-masonry";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./UserContentPage.css";
import "../Freelance-Lists/Freelance.css";

//RECOMMENDED
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
        console.log(img.src);
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

    //    navigate("/posts", { state: { recievedData: data } });
  };

  //GET PROFILE IMAGE LATOR
  return (
    <div
      className="img-card-container"
      onClick={() => {
        SwitchPage(src.post.id);
      }}
    >
      <div className="card-img rounded-3xl card-back-rec  ">
        <img
          ref={imageRef}
          src={"./gir.jpg"}
          className="rounded-3xl"
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
//RECOMMENDED END

//COMMENTS
function Comment(props: any) {
  return (
    <div className="Comment-Item text-gray-400">
      <div className="flex">
        <div className="rounded-xl bg-red-400 w-[25px] h-[25px]" />
        <h1 className="ml-2 "> {props.name} </h1>
      </div>
      <p className="ml-12 break-words	">{props.text} </p>
    </div>
  );
}

function submitComment(e: any, curUser: any, curPostID: any) {
  e.preventDefault(); // Delete Lator

  const data = {
    user: curUser,
    comment: e.target.elements.comment.value,
    post_ID: curPostID,
  };

  if (data.comment !== "") {
    try {
      //Calls Create Comments API
      fetch(`/api/createComment/`, {
        method: "POST",
        mode: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((d) => {
          location.reload();
        })
        .catch((error) => {
          alert("Error occurred while creating comment:" + error);
        });
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("Having Trouble Posting This Comment");
  }
}

//COMMENTS END

function PostPhoto(props: any) {
  const [image, setImage] = useState<string>();
  //console.log(props.img);

  if (image != props.img) setImage(props.img);

  return (
    <div className="aboslute top-1/2 left-1/2 ">
      <img
        className="max-h-[80vh] object-fill min-w-[10vw] min-h-[30vh] max-w-[60vw]  w-full h-full "
        src={`http://127.0.0.1:8000/${image}`}
      ></img>
    </div>
  );
}

function ContentPage() {
  const location = useLocation();
  const [userData, setUserData] = useState(location.state.recievedData);
  //console.log("BAM", userData);

  window.scrollTo(0, 0);

  const params = useParams();
  const curID = params.PostsID;
  console.log(params.PostsID);
  const [images, setImages] = useState<any[]>([]);

  const [postValues, setPostValues] = useState<any>();
  const [postComments, setPostComments] = useState<any>();
  const [curAccUser, setUser] = useState<any>();
  const [profilePic, setProfilePic] = useState<string>();

  const getPost = async () => {
    try {
      let response = await fetch(`/api/post/${curID}/`);
      if (response.ok) {
        let data = await response.json();
        setPostValues(data.post); // Handles Post Values
        setPostComments(data.post.comments); //Handles Post Comments
        setUser(userData.data.UserData.id);
        setProfilePic(data.profile_pic);
      } else {
        console.log("NO");
        // Handle the case when the response is not ok (e.g., show an error message).
      }
    } catch (error) {
      // Handle errors from the fetch request.
      console.log(error);
    }
  };

  const getAllPost = () => {
    fetch(`/api/obtainPostList`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("worked");
        return response.json();
      })
      .then((data) => {
        if (data) {
          //console.log(data);
          /*const images = data.Posts.map((d: any) => ({
            encodedString: d.image_picture,
          }));*/

          setImages(data.Posts);
          //console.log(images);
        }
      });
  };

  //Set Values On Click
  useEffect(() => {
    setUserData(location.state.recievedData);
    getPost();
    getAllPost();
  }, [location]);

  useEffect(() => {
    //console.log("Post values:", postValues);
    //console.log("Post comments:", postComments);
  }, [postValues]);

  return (
    <>
      <Header UserData={userData}></Header>
      <div id="Post-Page" className="flex flex-wrap w-screen h-auto mt-20 ">
        <div id="Post-Container" className="flex flex-wrap">
          <div className="w-full h-full relative">
            <div className="Img-Back" />
            <div id="Post-Img">
              {postValues != null ? (
                <PostPhoto img={postValues.image_picture}></PostPhoto>
              ) : null}
            </div>
          </div>
        </div>

        <div
          id="Post-Description"
          className="flex-wrap flexgrow rounded-3xl shadow m-5 mr-6 "
        >
          <div id="Post-UserValues" className="text-white">
            <div className="Design bg-red-700"></div>
            <div className="ProfilePic relative bottom-[2rem] left-[1rem] flex text-xl ">
              <div
                className="bg-red-500 h-[4.4rem] w-[4.5rem] "
                style={{
                  backgroundImage: `url(http://127.0.0.1:8000/${profilePic})`,
                  backgroundSize: "cover", // Adjust as needed
                  backgroundPosition: "center", // Adjust as needed
                }}
              ></div>
              <p className="mt-9 ml-3">
                {postValues != null ? postValues.user : "Name Description"}
              </p>
            </div>

            <div className="ProfileVals max-w-[391.5px]">
              <h1 className="text-gray-200 text-2xl">
                {postValues != null ? postValues.title : "Placeholder"}{" "}
              </h1>
              <h2 className="text-gray-500 min-h-[5.5rem] ">
                {postValues != null ? postValues.description : "Description"}{" "}
              </h2>

              <div className="flex flex-wrap w-[100%] mt-6 profile-tag-box">
                {postValues != null ? (
                  postValues.tags.map((tag: any, index: any) => {
                    return (
                      <div key={index} className="">
                        <div className="tag-content bg-gray-500">
                          <div className="p-1 rounded-r text-white">{tag}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div id="Post-Comments" className="">
            <h1 className="text-white ml-5 pb-4 pt-5 text-xl ">COMMENTS</h1>

            <div
              id="Comment-List"
              className="max-h-[10rem] overflow-y-auto overflow-x-hidden		"
            >
              {postComments != null
                ? postComments.map((e: any) => {
                    return (
                      <Comment text={e.text} name={e.profileName}></Comment>
                    );
                  })
                : null}
            </div>
            <h1 className="text-gray-400 p-5">
              {postComments != null ? postComments.length : 0} Comments
            </h1>
            <div className="Comment-Submit pb-5">
              <form
                onSubmit={(e) => submitComment(e, curAccUser, postValues.id)}
              >
                <textarea
                  id="comment"
                  rows={4}
                  cols={55}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
                <input
                  type="submit"
                  value="Submit"
                  className="bg-red-700 hover:opacity-40 cursor-pointer	 text-white my-2 w-full p-2 h-[100%]"
                />
              </form>
            </div>
          </div>
        </div>
        <div id="Post-Recommend" className="w-full mx-5 shadow">
          <div className=" mx-0 mt-10 text-white">
            <h1 className="txt-white mx-5"> RECOMMENDED </h1>
            <Masonry
              className="mt-10 mx-10"
              columns={{ 1200: 3, 1532: 4, 1628: 5 }}
              gap={16}
            >
              {images.map((base64: any, index: number) => {
                return (
                  <div key={index}>
                    <PhotoComp src={base64} userdata={userData} />
                  </div>
                );
              })}
            </Masonry>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContentPage;
