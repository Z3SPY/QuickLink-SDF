import { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header.tsx';
import './ProfilePage.css';



function ProfilePage() {
  return (
    <div>
      <Header></Header>
      <div id='profile' className='mt-28 mx-10 rounded-xl shadow-lg bg-white relative'>
        <div id='background' className='bg-gray-300 '> </div>
        <div id='editBut' className='bg-yellow-300 absolute'></div>
        <div className='userBorder bg-white relative'>
          <div id='userPic' className='bg-red-300 absolute'> </div>
        </div>
        <div id='userDesc' className='ml-9 relative'>
          <h1 className='text-3xl'> <span>First Name</span> <span>Last Name</span> </h1> 
          <p className='mt-2 text-gray-600 text-xl'>Description</p>
          <p className='mt-1 text-gray-400 text-sm'>Contact Info</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
