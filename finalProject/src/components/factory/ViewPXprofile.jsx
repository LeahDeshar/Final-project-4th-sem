import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/Context';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { FaTimes } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { getProfileOfUser, updateProfileOfUser } from '../../redux/profile/profileAction';
import { useNavigate } from 'react-router-dom';
import { getRatingOfUser } from '../../redux/rating/ratingAction';
import store from '../../redux/store';
function ViewPXProfile({users,closeProfileModal}) {

  const navigate = useNavigate();
  const rate = useSelector((state)=>state.rating.totalRating)
  // const rate = useSelector((state)=>state.rating)

console.log("rate",rate)
   const customer = useSelector((state)=>state.auth)
   console.log(customer)
  //  console.log("user",users[0].skillset.map((set)=> {return <p>{set}</p> }))

  console.log("users",users)
   let id;
   if(users)
   {
     id =users._id

   }
   console.log("users id check",users.user._id)
   useEffect(() => {
     const id = users.user._id
     console.log("id to rate",id)
    store.dispatch(getRatingOfUser({id}))
    navigate('/service-request')

  }, [id,users,navigate])
  const closeHandler = () =>
  {
    navigate('/service-request')
    closeProfileModal()
  }
  const RatingComponent = ({ rating }) => {
    const renderStars = () => {
      const stars = [];
  
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <span key={i} className={`star ${i <= rating ? 'filled' : 'empty'}`}>
            &#9733;
          </span>
        );
      }
  
      return stars;
    };
    return <div>{renderStars()}</div>;
  };
  return (
    <div className={'modal profileModalViewTheme'}>
    <div className="viewprofile__container profileViewforCustomer">
   <div className="header">
     <div className="header__arrow" onClick={closeHandler}>←</div>
     <h3 className="header__title">Welcome! My Profile 
     </h3>
   </div>
   <div className="viewprofile__content" >
     <div className="viewprofile__left " style={{border: ' 2px solid white'}}>
       <div className="image-container">
           <img src={`http://localhost:3001/uploads/${users.userImage}`} alt="User" />
       </div>
         <div className="viewprofile__info">
           <p>Name: {users.user.name}</p>
           <p>Address: {users.address}</p>

           <p>Phone Number: {users.user.phonenumber}</p>
           <p>Skillset: {users.skillset.map((set)=>set)}</p>
           <p>Email: {users.user.email}</p>
           <p>Member Since: {new Date(users.user.createdAt).toLocaleDateString()}</p>
         </div>
     </div>
    
     <div className="viewprofile__right ">
       <div className="viewprofile__card ">
        <h3>About Me</h3>
         <p>{users.aboutMe}</p> 
         
        
       </div>
       <div className="viewprofile__card">
         <h3>Job Completed</h3>
         <p> {users.user.jobcount}</p>
       </div>
     </div>
   </div>
    
     <div className="viewprofile__activity">
       <h3>TESTIMONIALS</h3>
       <div className="testimonial__container">

       {rate &&
        rate.map((pep)=>
        {
          return <div className='testimonial__content'>
            <div className="">
              {pep.profile && pep.profile.userImage ?
              <img src={`http://localhost:3001/uploads/${pep.profile.userImage}`} alt="User" /> 
              :
              <div className="name-container">
                <p>
                {pep.user.name.charAt(0).toUpperCase()}</p>
                </div>
            }
          </div>
          <div>
          <RatingComponent rating={pep.rating} />
          <p>{pep.user.name}</p>
          <p>{pep.review}</p> 
          </div>

          </div>
        })
       }
       </div>
       
     
     </div>
  
  
 </div>
 
 </div>
   
  );
}

export default ViewPXProfile;
