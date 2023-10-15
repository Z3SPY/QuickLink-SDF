import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../../Components/Header/LoggedInHeader.tsx';
import './ProfilePage.css';
import axios from 'axios';
import { error } from 'jquery';


//Take User
//Get User Profile Values

const ExperienceCont = (p : any) => {
  return(
    <div className='h-auto mx-10 mt-2 bg-gray-300 rounded-xl ExpCard'>
      
    </div>
  )
}

function ProfilePage() {
  
  const [curAccountName, setAccountName] = useState(null);
  const [profile, setProfile] = useState<any>(null);
  const location = useLocation(); // For getting values from navigate



  //This IS A PROBLEM WITH RE RENDERING, ONLY RENDER WITH USE STATE
  const DataCont = location.state.recievedData;
  const userContainer = DataCont.data.UserData;
 //REMEMBER 





  //console.log(userContainer);

  //I NOW HAVE USERNAME AND TOKEN
  // CHECK IF TOKEN VALID
  // THEN PROCEED WITH USEEFFECT




  useEffect(() => {
    if (userContainer.username) {
      axios.get(`/api/profile/${userContainer.username}/`)
        .then(response => {
          setProfile(response.data);
          console.log("Set Successful");
          //console.log(response.data); // Log the updated profile data
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [userContainer.username]);

  if (profile === null) {
    return <div>Loading...</div>;
  }


  return (
    <div className='backGround'>
        <Header UserData={DataCont}> </Header>
        <div id="profileContent-Container" className='flex'>
          <div id='portfolio' className='mt-10 rounded-xl p-5 '>
              <div id="Upload-Btn" className='w-full h-[6rem] rounded-xl text-center p-8'>
                  <h1 className='text-gray-200 text-xl '> Start your journey by uploading your work. <button className='text-base p-2 ml-2 rounded-lg bg-gray-600'> Upload Content </button> </h1>
              </div>
              <div id="Selector">
                <div> ADD MINI SEARCH BAR</div>
                <h1 className='text-gray-200 text-2xl mt-10'>Portfolio</h1>
              </div>
              <div id="Photo-List" className='flex flex-wrap'>
                <div className='bg-gray-300 min-w-[15rem] mx-3 min-h-[15rem] mt-5'></div>
                <div className='bg-gray-300 min-w-[15rem] mx-3 min-h-[15rem] mt-5'></div>
                <div className='bg-gray-300 min-w-[15rem] mx-3 min-h-[15rem] mt-5'></div>
                <div className='bg-gray-300 min-w-[15rem] mx-3 min-h-[15rem] mt-5'></div>
                <div className='bg-gray-300 min-w-[15rem] mx-3 min-h-[15rem] mt-5'></div>
                <div className='bg-gray-300 min-w-[15rem] mx-3 min-h-[15rem] mt-5'></div>
                <div className='bg-gray-300 min-w-[15rem] mx-3 min-h-[15rem] mt-5'></div>
                <div className='bg-gray-300 min-w-[15rem] mx-3 min-h-[15rem] mt-5'></div>

                
                

              </div>
          </div>

          <div id='profile' className='mt-10 ml-10 rounded-xl  relative'>
            <div id='background' className='bg-gray-300 '> </div>
            <div id='editBut' className='bg-yellow-300 absolute hover:bg-orange-100'></div>
            <div className='userBorder relative'>
              <div id='userPic' className='bg-red-300 absolute'> </div>
            </div>
            <div id='userDesc' className='ml-9 relative'>
              <h1 className='text-gray-50 text-3xl'> <span> {profile[0].displayName != null? profile[0].displayName : userContainer.username} </span> </h1> 
              <p className='mt-2 text-gray-400 text-xl'>{profile[0].bio}</p>
              <p className='mt-1 text-gray-600 text-sm'>Contact Info</p>
            </div>

            <div  className='mt-5 mb-10 pt-3 rounded-xl relative' id="Experience">
              <h1 className='text-gray-50 text-xl ml-5 mb-5'>Relevant Experiences</h1>
              <div id="Experience-Cont" className='relative'>
                <ExperienceCont />
                <ExperienceCont />
              </div>
              

            </div>
          </div>

          
      </div>

      
    </div>
  );
}

export default ProfilePage;
