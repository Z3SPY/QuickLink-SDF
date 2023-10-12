import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../../Components/Header/LoggedInHeader.tsx';
import './ProfilePage.css';
import axios from 'axios';
import { error } from 'jquery';


//Take User
//Get User Profile Values


class expBox {
}

function ProfilePage() {
  const location = useLocation(); // For getting values from navigate 

  const [curAccountName, setAccountName] = useState(null);


  const userContainer = location.state.recievedData.data.UserData;



  const [profile, setProfile] = useState(null); 
  const username = "Jovan";

  useEffect(()=> {
      axios.get(`/api/profile/${username}/`)
        .then(response => {
          setProfile(response.data);
          console.log(profile);
        })
        .catch(error => {
          console.error(error);
        })
  }, [username])

  if (!profile) {
    return <div>Loading...</div>;
  }

  console.log(location.state);

  return (
    <div>
      <Header></Header>
      <div id='profile' className='mt-28 mx-10 rounded-xl  relative'>
        <div id='background' className='bg-gray-300 '> </div>
        <div id='editBut' className='bg-yellow-300 absolute'></div>
        <div className='userBorder bg-white relative'>
          <div id='userPic' className='bg-red-300 absolute'> </div>
        </div>
        <div id='userDesc' className='ml-9 relative'>
          <h1 className='text-gray-50 text-3xl'> <span> {userContainer.username} </span><span>Last Name</span> </h1> 
          <p className='mt-2 text-gray-400 text-xl'>Description</p>
          <p className='mt-1 text-gray-600 text-sm'>Contact Info</p>
        </div>
      </div>

      <div id='portfolio' className='mt-20 mb-10 mx-10 rounded-xl'>
        
      </div>
    </div>
  );
}

export default ProfilePage;
