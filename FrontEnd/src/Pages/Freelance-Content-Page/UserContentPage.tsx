import LoggedInHeader from '../../Components/Header/LoggedInHeader.tsx';
import React,{ useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Masonry from 'react-layout-masonry';
import {useParams, useNavigate} from 'react-router-dom';
import './UserContentPage.css';
import '../Freelance-Lists/Freelance.css';


function PhotoComp({ src }:{src : any}) {

  const imageRef = useRef(document.createElement("img"));
  //console.log(src.image_picture)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
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


  const handleIntersection = (entries : any, observer : any) => {
    entries.forEach((entry : any) => {
      if (entry.isIntersecting) {
        const img = new Image();
        img.src =  `http://127.0.0.1:8000/${src.image_picture}`;
        console.log(img.src);
        img.onload = () => {
          imageRef.current.src = img.src!;
        };
        observer.unobserve(imageRef.current);
      }
    });
  };

  const navigate = useNavigate();
  const SwitchPage = (id : any) => {
    navigate(`/UserPost/${id}`)
    location.reload();
    
  }

  return( 
    <div className='img-card-container' onClick={() => {SwitchPage(src.id)}}>
        <div className='card-img'>
          <img ref={imageRef} src={"./gir.jpg"} className='rounded-3xl' alt="Picture"/>
        </div>
        <div className='text-card'>
            <div className='m-0 text-container'>
              <h1 className='font-semibold mb-2'>{src.title}</h1>
              <div className="absolute rounded-full bg-red-500 h-6 w-6" />
              <h2 className='ml-8'>{src.user}</h2>
            </div>
        </div>
    </div>
  
  
  
  );
};


function Comment(item : any) {

    return( 
      <div>

      </div>


    );
}

function PostPhoto(props : any) {
  const [image, setImage] = useState<string>();
  console.log(props.img);

  if (image != props.img)
    setImage(props.img);

  return(
    <div className='aboslute top-1/2 left-1/2'>
      <img className='object-fill min-w-[10vw] min-h-[30vh] max-w-[60vw] max-h-[100vh] w-full h-full' src={`http://127.0.0.1:8000/${image}`}></img>
    </div>
  )
}


function FreelancePage(){
  window.scrollTo(0, 0);

  const params = useParams();
  const curID = params.PostsID;
  console.log(params.PostsID); 
  const [images, setImages] = useState<{ encodedString: string }[]>([]);


  const [postValues, setPostValues] = useState<any>();

  const getPost = async () => {
    try {
      let response = await fetch(`/api/post/${curID}/`);
      if (response.ok) {
        let data = await response.json();
        setPostValues(data[0]);
        console.log(postValues);
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
      console.log("worked")
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log(data);
        const images = data.Posts.map((d: any) => ({
          encodedString: d.image_picture
        }));

        setImages(data.Posts);
        console.log(images);
      }
    })
  }


  //Set Values On Click
  useEffect(() => {
    getPost();
    getAllPost();
    
  }, []);


  useEffect(() => {
    console.log('Post values:', postValues);

  }, [postValues]);


    return(
        <>

            <div id="Post-Page" className='flex flex-wrap w-screen h-auto mt-20 '> 
              
              <div id="Post-Container" className='flex flex-wrap'> 
                <div className='w-full h-full  relative'> 
                  <div id="Post-Img" className='w-auto h-auto bg-red-200'> 
                      { postValues != null ? <PostPhoto img={postValues.image_picture}></PostPhoto> : null}
                  </div>
                </div>
                
                
                <div id="Post-Recommend" className='w-full mx-5 shadow '> 
                    <div className='w-[40%] mx-10 mt-10 text-white'> 
                        <h1 className='txt-white'> RECOMMENDED </h1>
                        <Masonry className='mt-10' columns={{ 600: 2, 1300: 3, 1301: 4, 1628: 5 }} gap={16}    >
                          {images.map((base64 : any, index : number) => {
                            return (
                              <div key={index}>
                                  <PhotoComp src={base64}/>
                              </div>
                            )
                          })}
                      </Masonry>

                    </div>
                  </div>
              </div>

              <div id="Post-Description" className='flex-wrap flexgrow rounded-3xl shadow m-5 mr-6'>
                <div id="Post-UserValues" className='text-white'> 
                  <div className='Design bg-red-700'></div>
                  <div className='ProfilePic relative bottom-[2rem] left-[1rem] flex text-xl '>
                    <div className='bg-red-500 h-[4.4rem] w-[4.5rem] '></div>
                    <p className='mt-9 ml-3'>{ postValues != null ? postValues.user : "Name Description"}</p>
                  </div>

                  <div className='ProfileVals'>
                    <h1 className='text-gray-200 text-2xl'> { postValues != null ? postValues.title : "Placeholder" } </h1>
                    <h2  className='text-gray-500'> { postValues != null ? postValues.description : "Description"} </h2>
                  </div>
                </div>
                <div id="Post-Comments" className=''>
                  <div id="Comment-List">
                    <h1 className='text-white ml-5 pb-4 pt-5 text-xl'>COMMENTS</h1>

                    <div className='Comment-Item text-gray-500'>
                      <div className='flex'>
                        <div className='rounded-xl bg-red-400 w-[25px] h-[25px]' />
                        <h1 className='ml-2'>name name</h1>
                      </div>
                        <p className='ml-12'>Comment Comment Comment Comment Comment Comment Comment Comment</p>
                    </div>
                    <div className='Comment-Item Inner-Item text-gray-600'>
                      <div className='flex'>
                        <div className='rounded-xl bg-red-400 w-[25px] h-[25px]' />
                        <h1 className='ml-2'>name name</h1>
                      </div>
                        <p className='ml-12'>Comment Comment Comment Comment Comment Comment Comment Comment</p>
                    </div>
                  </div>
                  <h1 className='text-gray-400 p-5'> 2 Comments</h1>
                    <div className='Comment-Submit'> 
                      <form>
                          <textarea id="Comment-Submit-Textarea rounded-3xl" rows={2} cols={55} name="Comment">
                          </textarea>
                      </form>
                    </div>
                </div>


              </div>

              

            </div>
            
           
            
        </>
    )
}

export default FreelancePage;
