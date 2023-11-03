import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../../Components/Header/LoggedInHeader.tsx';
import './ProfilePage.css';
import axios from 'axios';
import 'flowbite';
import 'flowbite/dist/flowbite.js';
import { Button, Checkbox, Label, Modal, TextInput, Navbar} from 'flowbite-react';
import { useNavigate } from "react-router-dom";


//Take User
//Get User Profile Values

const ExperienceCont = (p : any) => {
  return(
    <div className='h-auto mx-10 mt-2 bg-gray-300 rounded-xl ExpCard'>
      
    </div>
  )
}


const EditProfileView = (p: any) => {
  //Should Change the value of profile and edit


  return (
    <Modal dismissible show={p.propsOpenModal === 'form-edit-profile'}  popup onClose={() => p.OpenModalFunc(undefined)}>
        <Modal.Body className='auth-Container'>
          <Modal.Header className='closeModal'/>
          
        </Modal.Body>
      </Modal>
  )
}





function ProfilePage() {
  
  const [curAccData, setAccData] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal};
  const location = useLocation(); // For getting values from navigate



  //This IS A PROBLEM WITH RE RENDERING, ONLY RENDER WITH USE STATE
  //Might be smart to use a useState or smthn
  const DataCont = location.state.recievedData; //gets Data from previous Location after change page
  const userContainer = DataCont.data.UserData;
  
 //REMEMBER 





  //console.log(userContainer);

  //I NOW HAVE USERNAME AND TOKEN
  // CHECK IF TOKEN VALID
  // THEN PROCEED WITH USEEFFECT
  const navigate = useNavigate();

  const UploadNavigate = (data : any) => {
    console.log(data.userAuth);
    navigate("/profile/Upload", {state:{recievedData: data.userAuth, returnObj: DataCont }});
  }


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
                  <h1 className='text-gray-200 text-xl '> Start your journey by uploading your work. <button onClick={() => {UploadNavigate(profile[0])}} className='text-base p-2 ml-2 rounded-lg bg-gray-600'> Upload Content </button> </h1>
              </div>
              <div id="Selector">
                <div className='Search mt-5'> 
                  <input type="text" placeholder='search' />    
                </div>
                <h1 className='text-gray-200 text-2xl mt-5'>Portfolio</h1>
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
            <Button id='editBut' onClick={() => props.setOpenModal('form-edit-profile')} className='bg-yellow-300 absolute hover:bg-orange-100'></Button>
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
      <EditProfileView propsOpenModal={props.openModal} OpenModalFunc={props.setOpenModal} />
      
    </div>
  );
}

export default ProfilePage;
