import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/Context';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { FaTimes } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { getProfileOfUser, updateProfileOfUser } from '../../redux/profile/profileAction';
import { useNavigate } from 'react-router-dom';
function ViewXProfile({users,closeProfileModal}) {
  console.log(users)
  
   const customer = useSelector((state)=>state.auth)
   console.log(customer)
  const closeHandler = () =>
  {
    closeProfileModal()
  }
  return (
    <div className= 'modal  profileModalViewTheme'>
       <div className="viewprofile__container profileViewforProvider">
      <div className="header">
        <div className="header__arrow" onClick={closeHandler}>←</div>
        <h3 className="header__title">Welcome! My Profile <br />
       
        </h3>
      </div>
      <div className="viewprofile__content">
        <div className="viewprofile__left ">
          <div className="image-container">
              <img src={`http://localhost:3001/uploads/${users.userImage}`} alt="User" />
          </div>
            <div className="viewprofile__info">
              <p>Name: {users.user.name}</p>
              <p>Address: {users.address}</p>

              <p>Phone Number: {users.user.phonenumber}</p>
            
              <p>Email: {users.user.email}</p>
              <p>Member Since: {new Date(users.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
       

    
     </div>
    </div>
    </div>
   
  );
}

export default ViewXProfile;
