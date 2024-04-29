import axios from 'axios';
import './profile.css'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterStep from './RegisterStep';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/auth/authAction';
import { createProfile } from '../../redux/profile/profileAction';
import { serviceCategories } from '../shared/ServiceCategories';

function Profile  ()  {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getCurrentUser())
   
  }, [dispatch])
  
  const user = useSelector((state)=>state.auth.user)
    console.log('user', user);

  let role
  let userId; // Initialize userId
  if (user) {
    role = user.role;
    userId = user._id; // Assign userId if user exists
  }

  const [userImage, setUserImage] = useState(null);
  const [userShowImage, setuserShowImage] = useState(null);

  const [userLocation, setUserLocation] = useState('');
  const [skillset, setSkillset] = useState('');
  const [selectedSkillsets, setSelectedSkillsets] = useState(skillset ? skillset.split(',') : []);


  console.log(selectedSkillsets)
  const addSkillset = (newSkillset) => {
    setSelectedSkillsets((prevSkillsets) => [...prevSkillsets, newSkillset]);
  };
  const removeSkillset = (removedSkillset) => {
    setSelectedSkillsets((prevSkillsets) =>
      prevSkillsets.filter((skillset) => skillset !== removedSkillset)
    );
  };
  const [aboutMe, setAboutMe] = useState('');


  const updateUserLocation= (input) => {
    setUserLocation(input.target.value);
  };
  const updateUserSkill = (input) => {
    setSkillset(input.target.value);
  };
  const updateUserAbout = (input) => {
    setAboutMe(input.target.value);
    
  };
   const updateUserImage = (input) => {
    const file = input.target.files[0];
    setuserShowImage(URL.createObjectURL(file))
    setUserImage(file);
  };
  

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (userId) {
      const image =userImage
      const formData = new FormData();
      formData.append('aboutMe', aboutMe);
      formData.append('skillset', selectedSkillsets);
      formData.append('address', userLocation);
      formData.append('image', image);
      formData.append('user', userId);

    dispatch(createProfile(formData)) 
    navigate('/viewprofile') 
    }
  }

 
  const skipHandler = ()=>
  {
    navigate('/');

  }
  return (
    <div className="profile">
      <RegisterStep step1 step2 step3 step4/>


      <button className='navbar__button skipbutton' onClick={skipHandler}>Skip</button>
{/* ------Headers------------- */}
      {
        role === "Provider"?
        <>
          <div className="profile__title">
            <h3>Welcome! Let’s Create Your Profile </h3>
            <h4>Let others get to know you better!</h4>
          </div> 
        </>:
        <>
        <div className="profile__title">
            <h3>Welcome! Let’s Create Your Profile </h3>
            
          </div> 
        </>
      }
    
   
    {role === "Provider"?
      <form onSubmit={handleSubmit} className="profile__container">
    

      <div className='card row' >
        <label htmlFor="image">
        {userImage ? (
         <div className='image-container '>
        <img src={userShowImage} alt="Profile  1" className="profile__card"/>
        <input type="file" id="image" onChange={updateUserImage} hidden />
      </div>) :(
      <div className="image-container upload">Click To <br/>Upload Image
      <input type="file" id="image" onChange={updateUserImage} hidden /></div>
                )}
    </label>
      </div>
      <div className="profile__form register__form row">
        <div className="profile__input">
          <label htmlFor="skillset">skillset:</label>
          {/* <input type="skillset" id="skillset" value={skillset} onChange={updateUserSkill} /> */}

          <select
              value={''} // Clear the selected value so that the dropdown is reset after each selection
              onChange={(e) => {
                const selectedOption = e.target.value;
                if (selectedOption) {
                  addSkillset(selectedOption);
                }
              }}
              className='editSkillset'
            >
        <option value="">Select a Skillset</option>
        {serviceCategories.map((category) => (
          <option key={category.id} value={category.name} className='skillOption'>
            {category.name}
          </option>
        ))}
      </select>
      <div className='selected-skillsets'>
        <p>Selected Skillsets:</p>
        <div className='skill__container'>
        {selectedSkillsets.map((skillset) => (
          <span key={skillset} className='selected-skillset'>
            {skillset}
            <p
              onClick={() => removeSkillset(skillset)}
              className='remove-skillset-button'
            >
              X
            </p>
          </span>
        ))}

        </div>
      </div>
        </div>
        <div className="profile__input">
          <label htmlFor="location">Location:</label>
          <input type="location" id="location" value={userLocation} onChange={updateUserLocation} />
        </div>
        <div className="profile__input">
          <label htmlFor="about">About Me:</label>
          <textarea style={{ resize: 'none' }} onChange={updateUserAbout} rows="10"></textarea>
        </div>
        
      <button type="submit" className='navbar__button btnCreateProfile' >Create Profile</button>
        </div>
      </form> :
      <>
      {/* --------For Customer------- */}
      <form onSubmit={handleSubmit} className=" container-cus " >
    

    <div className='customer__profile card row' >
      <label htmlFor="image">
      {userImage ? (
       <div className='image-container '>
      <img src={userShowImage} alt="Profile  1" className="profile__card"/>
      <input type="file" id="image" onChange={updateUserImage} hidden />
    </div>) :(
    <div className="image-container upload">Click To <br/>Upload Image
    <input type="file" id="image" onChange={updateUserImage} hidden /></div>
              )}
      </label>

    <div className="customer__input-profile row">
     
      <div className="profile__input">
        <p style={{textAlign: "center",fontSize: "20px"}}>User Name</p>
        <input type="location" id="location" value={userLocation} onChange={updateUserLocation} placeholder='Enter your Address'/>
      </div>
      
      
    <button type="submit" className='navbar__button' >Create Profile</button>
      </div>
    </div>
    </form>
      </>
      }
      <div className="bottom_rect"></div>
    </div>
  );
};

export default Profile;
