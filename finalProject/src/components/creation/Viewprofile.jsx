import React, { useContext, useEffect, useState } from 'react';
import './view.css';
import { UserContext } from '../utils/Context';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { FaTimes } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { getProfileOfUser, updateProfileOfUser } from '../../redux/profile/profileAction';
import { useNavigate } from 'react-router-dom';
import { getRatingOfUser } from '../../redux/rating/ratingAction';
import { serviceCategories } from '../shared/ServiceCategories';
import { ServiceContext } from '../utils/ServContext';
function ViewProfile() {
  const [userShowImage, setUserImage] = useState(null);

  const [userLocation, setUserLocation] = useState('');
  const [skillset, setSkillset] = useState('');
  const [aboutMe, setAboutMe] = useState('');

  
  
  
  

  const user = useSelector((state) => state.auth.user);

  console.log("Current user for profile",user)
  // const userImage = user.userImage
  
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   const getData = async () =>
  //   {
  //      // Fetch profile data from the server
  //    await axios.get(`http://localhost:3001/api/v1/users/profile/${user._id}`)
  //    .then((response) => {
  //      const { userLocation, skillset,aboutMe, userImage } = response.data;
  //      setUserLocation(userLocation);
  //      setAboutMe(aboutMe);
  //      setSkillset(skillset)

  //     //  setUserImage(`/uploads/${image}`);
  //      setUserImage(`http://localhost:3001/uploads/${userImage}`);
  //      console.log("response.data",response.data,`/uploads/${userImage}`)
  //    })
  //    .catch((error) => {
  //      console.error('Error fetching profile:', error);
  //    });

  //   }
  //   getData()
  // }, [])

  const dispatch = useDispatch()
  const navigate = useNavigate()
    
  const profile = useSelector((state)=>state.users.profile)
  let id;
  let role;
  if(user)
  {
     id = user._id
     role=user.role
  }
  useEffect(() => {
    if (user) {
      dispatch(getProfileOfUser({ id }));
      if (profile) {
        setUserLocation(profile.address || 'No address available');
        setAboutMe(profile.aboutMe || 'No information available');
        setSkillset(profile.skillset || 'No skillset available');
        
        if (profile.userImage) {
          setUserImageModal(`http://localhost:3001/uploads/${profile.userImage}`)
          setUserImage(`http://localhost:3001/uploads/${profile.userImage}`);
        } else {
          setUserImageModal(`http://localhost:3001/uploads/${profile.userImage}`)
          setUserImage('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png');
        }
      } else {
        // Set default profile values
        setUserLocation('No address available');
        setAboutMe('No information available');
        setSkillset('No skillset available');
        setUserImage('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png');

        setUserImageModal('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png')
        setUserImage('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png');
      }
    }
    
  }, [])
  const [userImageModal, setUserImageModal] = useState(profile?.userImage || null);
  const [userShowImageModal, setuserShowImageModal] = useState(profile?.userImage || null);

  console.log(userShowImage,userImageModal,userShowImageModal)
  const updateUserImage = (input) => {
    const file = input.target.files[0];
    console.log(file)
    setuserShowImageModal(URL.createObjectURL(file))
    // setuserShowImageModal(file)

    setUserImageModal(file);
  };
  
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUserImage, setEditUserImage] = useState(userShowImage);
 


  const [editAboutMe, setEditAboutMe] = useState(profile?.aboutMe || '');
  const [editSkillset, setEditSkillset] = useState(profile?.skillset ||[] );
  console.log("editSkillset",editSkillset)
  const [editAddress, setEditAddress] = useState(profile?.address || '');
  const [selectedSkillsets, setSelectedSkillsets] = useState(profile?.skillset ? profile.skillset: []);
  // const [selectedSkillsets, setSelectedSkillsets] = useState([]);

  const addSkillset = (newSkillset) => {
    setSelectedSkillsets((prevSkillsets) => [...prevSkillsets, newSkillset]);
  };
  const {updateSkillSet} = useContext(ServiceContext)
  updateSkillSet(selectedSkillsets)
  // console.log(selectedSkillsets)
  // console.log(selectedSkillsets.map(skillset => [skillset]))
  // Function to handle removing a skillset
  const removeSkillset = (removedSkillset) => {
    setSelectedSkillsets((prevSkillsets) =>
      prevSkillsets.filter((skillset) => skillset !== removedSkillset)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const image =userImageModal
    const formData = new FormData();
    formData.append('aboutMe', editAboutMe);
    formData.append('skillset', selectedSkillsets);
    formData.append('address', editAddress);
    formData.append('image', image);
    formData.append('user', user._id);

   dispatch(updateProfileOfUser(formData)) 
  //  navigate('/services') 
   closeModal()
  }

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    setEditUserImage(e.target.value);
  };

  const handleAboutMeChange = (e) => {
    setEditAboutMe(e.target.value);
  };

  const handleSkillsetChange = (e) => {
    setEditSkillset(e.target.value);
  };

  const handleAddressChange = (e) => {
    setEditAddress(e.target.value);
  };
  const rate = useSelector((state)=>state.rating.totalRating)
  // const rate = useSelector((state)=>state.rating)
  // console.log("id to rate",profile.user._id)

  useEffect(() => {
    console.log("id to rate",profile)
    dispatch(getRatingOfUser({id}))
    // const id = profile.user._id
    // dispatch(getRatingOfUser({id}))


  }, [dispatch,id,profile])
  


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
  console.log("rate",rate)
  return (
    <div className={role==="Provider"?'inner__view-container': 'inner__view-container inner__view-container-cus'}>
       <div className="viewprofile__container">
      <div className="header">
        <h3 className="header__title mainprofile">Welcome! My Profile 
      {user.role==="Provider"?
      <>
      <h3 style={{display: "inline"}}>
        <br/>Let others get to know you better! </h3>
      </>
       : ""
       }  
       <BiEdit onClick={openModal} className='editIcon'/>
        </h3>
      </div>
      <div className="viewprofile__content">
        <div className="viewprofile__left mainProfileTheme">
          <div className="image-container">
              <img src={userShowImage} alt="User" />
          </div>
            <div className="viewprofile__info">
              <p>Name: {user.name}</p>
              <p>Address: {userLocation}</p>

              <p>Phone Number: {user.phonenumber}</p>
              <p> {user.role==="Provider"? `Skillset: ${skillset}` : <></>}</p>
              <p>Email: {user.email}</p>
              <p>Member Since: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
        {user.role==="Provider"?
        <div className="viewprofile__right ">
          <div className="viewprofile__card ">
           <h3>About Me</h3>
            <p>{aboutMe}</p> 
          </div>
          <div className="viewprofile__card">
            <h3>Job Completed</h3>
            <p className='completeJob'>{user.jobcount}</p>
          </div>
        </div>: <></>}
      </div>
      {/* {user.role === 'Provider'? 
       <div className="viewprofile__activity">
       <h3>TESTIMONIALS</h3>
       <div className="testimonial__container">

       {
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
     :
     <></>
    } */}
     {user.role === 'Provider' ? (
  <div className="viewprofile__activity">
    <h3>TESTIMONIALS</h3>
    <div className="testimonial__container">
      {rate.length === 0 ? (
        <p className='testMessage'>Be patient and earn points</p>
      ) : (
        rate.map((pep) => (
          <div className="testimonial__content" key={pep.id}>
            <div>
              {pep.profile && pep.profile.userImage ? (
                <img src={`http://localhost:3001/uploads/${pep.profile.userImage}`} alt="User" />
              ) : (
                <div className="name-container">
                  <p>{pep.user.name.charAt(0).toUpperCase()}</p>
                </div>
              )}
            </div>
            <div>
              <RatingComponent rating={pep.rating} />
              <p>{pep.user.name}</p>
              <p>{pep.review}</p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
) : (
  <></>
)}
    </div>
      {/* "Edit" button */}
      {/* <button onClick={openModal}>Edit</button> */}

      {/* Modal */}
      {isModalOpen && (
        <div className="profile__edit modal">
          <div className="modal-content">

          <form onSubmit={handleSubmit} >
          <div className=' row' >
            <label htmlFor="image">
              {userImageModal ? (
              <div className='image-container '>
              <img src={userShowImageModal} alt="Profile  1" className="profile__card" />

              <input type="file" id="image" onChange={updateUserImage}  style={{ display: 'none' }} />
              </div>) :(
              <div className="image-container upload">Click To <br/>Upload Image
              <input type="file" id="image" onChange={updateUserImage} style={{ display: 'none'}} />
              </div>
                  )}
              </label>
             </div>
           
              {role==="Provider"? <>
              <label className='prorow'>About Me:</label>
              <input type="text"  value={editAboutMe} onChange={handleAboutMeChange} />
  
              <label className='prorow'>Skillset:</label>
              {/* <input type="text" value={editSkillset} onChange={handleSkillsetChange} className='editSkillset'/> */}
             

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
        <p className='selectedSkill'>Selected Skillsets:</p>
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

              </>:
              <></>
              
            }

            <label className='prorow ' >Address:</label>
            <input type="text" value={editAddress} onChange={handleAddressChange} />

            <button type="submit" className='navbar__button' >Update Profile</button>

          </form>
         < FaTimes className='profile-close' onClick={closeModal}/>

          </div>

        </div>
      )}
    </div>
   
  );
}

export default ViewProfile;

// import React, { useContext, useEffect, useState } from 'react';
// import './view.css';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { BiEdit } from 'react-icons/bi';
// import { getProfileOfUser, updateProfileOfUser } from '../../redux/profile/profileAction';
// import { useNavigate } from 'react-router-dom';
// import { getRatingOfUser } from '../../redux/rating/ratingAction';
// import { serviceCategories } from '../shared/ServiceCategories';
// import { ServiceContext } from '../utils/ServContext';

// function ViewProfile() {
//   const [userShowImage, setUserImage] = useState(null);
//   const [userLocation, setUserLocation] = useState('');
//   const [skillset, setSkillset] = useState('');
//   const [aboutMe, setAboutMe] = useState('');
//   const [userImageModal, setUserImageModal] = useState(null);
//   const [userShowImageModal, setuserShowImageModal] = useState(null);

//   const user = useSelector((state) => state.auth.user);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const profile = useSelector((state) => state.users.profile);
//   let id;
//   let role;
//   if (user) {
//     id = user._id;
//     role = user.role;
//   }

//   // useEffect(() => {
//   //   if (user) {
//   //     dispatch(getProfileOfUser({ id }));
//   //     if (profile) {
//   //       setUserLocation(profile.address || 'No address available');
//   //       setAboutMe(profile.aboutMe || 'No information available');
//   //       setSkillset(profile.skillset || 'No skillset available');

//   //       if (profile.userImage) {
//   //         setUserImageModal(`http://localhost:3001/uploads/${profile.userImage}`);
//   //         setUserImage(`http://localhost:3001/uploads/${profile.userImage}`);
//   //       } else {
//   //         setUserImageModal('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png');
//   //         setUserImage('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png');
//   //       }
//   //     } else {
//   //       // Set default profile values
//   //       setUserLocation('No address available');
//   //       setAboutMe('No information available');
//   //       setSkillset('No skillset available');
//   //       setUserImage('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png');

//   //       setUserImageModal('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png');
//   //       setuserShowImageModal('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png');
//   //     }
//   //   }
//   // }, []);


//   useEffect(() => {
//     if (user) {
//       dispatch(getProfileOfUser({ id }));
//       if (profile) {
//         setUserLocation(profile.address || 'No address available');
//         setAboutMe(profile.aboutMe || 'No information available');
//         setSkillset(profile.skillset || 'No skillset available');
  
//         if (profile.userImage) {
//           setUserImageModal(`http://localhost:3001/uploads/${profile.userImage}`)
//           setUserImage(`http://localhost:3001/uploads/${profile.userImage}`);
//         } else {
//           // Handle the case when profile.userImage is not available
//           setUserImageModal('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png')
//           setUserImage('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png');
//         }
//       } else {
//         // Set default profile values
//         setUserLocation('No address available');
//         setAboutMe('No information available');
//         setSkillset('No skillset available');
//         setUserImage('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png');
  
//         setUserImageModal('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png')
//         setUserImage('https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png');
//       }
//     }
//   }, [])
//   const updateUserImage = (input) => {
//     const file = input.target.files[0];
//     console.log(file,URL.createObjectURL(file),input.target.files[0])
//     setuserShowImageModal(URL.createObjectURL(file));
//     setUserImageModal(file);
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editUserImage, setEditUserImage] = useState(userShowImage);
//   const [editAboutMe, setEditAboutMe] = useState(profile?.aboutMe || '');
//   const [editSkillset, setEditSkillset] = useState(profile?.skillset || []);
//   const [editAddress, setEditAddress] = useState(profile?.address || '');
//   const [selectedSkillsets, setSelectedSkillsets] = useState(profile?.skillset ? profile.skillset : []);

//   const addSkillset = (newSkillset) => {
//     setSelectedSkillsets((prevSkillsets) => [...prevSkillsets, newSkillset]);
//   };

//   const { updateSkillSet } = useContext(ServiceContext);
//   updateSkillSet(selectedSkillsets);

//   // Function to handle removing a skillset
//   const removeSkillset = (removedSkillset) => {
//     setSelectedSkillsets((prevSkillsets) =>
//       prevSkillsets.filter((skillset) => skillset !== removedSkillset)
//     );
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const image = userImageModal;
//     const formData = new FormData();
//     formData.append('aboutMe', editAboutMe);
//     formData.append('skillset', selectedSkillsets);
//     formData.append('address', editAddress);
//     formData.append('image', image);
//     formData.append('user', user._id);

//     dispatch(updateProfileOfUser(formData));
//     navigate('/viewprofile');
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleImageChange = (e) => {
//     setEditUserImage(e.target.value);
//   };

//   const handleAboutMeChange = (e) => {
//     setEditAboutMe(e.target.value);
//   };

//   const handleSkillsetChange = (e) => {
//     setEditSkillset(e.target.value);
//   };

//   const handleAddressChange = (e) => {
//     setEditAddress(e.target.value);
//   };
//   console.log(userShowImage,userImageModal,userShowImageModal)

//   const rate = useSelector((state) => state.rating.totalRating);

//   useEffect(() => {
//     dispatch(getRatingOfUser({ id }));
//   }, []);

//   const RatingComponent = ({ rating }) => {
//     const renderStars = () => {
//       const stars = [];

//       for (let i = 1; i <= 5; i++) {
//         stars.push(
//           <span key={i} className={`star ${i <= rating ? 'filled' : 'empty'}`}>
//             &#9733;
//           </span>
//         );
//       }

//       return stars;
//     };
//     return <div>{renderStars()}</div>;
//   };

//   return (
//     <div className={role === 'Provider' ? 'inner__view-container' : 'inner__view-container inner__view-container-cus'}>
//       <div className="viewprofile__container">
//         <div className="header">
//           <h3 className="header__title mainprofile">
//             Welcome! My Profile
//             {user.role === 'Provider' ? (
//               <>
//                 <h3 style={{ display: 'inline' }}>
//                   <br />Let others get to know you better!{' '}
//                 </h3>
//               </>
//             ) : (
//               ''
//             )}
//             <BiEdit onClick={openModal} className="editIcon" />
//           </h3>
//         </div>
//         <div className="viewprofile__content">
//           <div className="viewprofile__left mainProfileTheme">
//             <div className="image-container">
//               <img src={userShowImage} alt="User" />
//             </div>
//             <div className="viewprofile__info">
//               <p>Name: {user.name}</p>
//               <p>Address: {userLocation}</p>
//               <p>Phone Number: {user.phonenumber}</p>
//               <p> {user.role === 'Provider' ? `Skillset: ${skillset}` : <></>}</p>
//               <p>Email: {user.email}</p>
//               <p>Member Since: {new Date(user.createdAt).toLocaleDateString()}</p>
//             </div>
//           </div>
//           {user.role === 'Provider' ? (
//             <div className="viewprofile__right ">
//               <div className="viewprofile__card ">
//                 <h3>About Me</h3>
//                 <p>{aboutMe}</p>
//               </div>
//               <div className="viewprofile__card">
//                 <h3>Job Completed</h3>
//                 <p className="completeJob">{user.jobcount}</p>
//               </div>
//             </div>
//           ) : (
//             <></>
//           )}
//         </div>
//         {user.role === 'Provider' ? (
//           <div className="viewprofile__activity">
//             <h3>TESTIMONIALS</h3>
//             <div className="testimonial__container">
//               {rate.map((pep) => (
//                 <div className="testimonial__content">
//                   <div>
//                     {pep.profile && pep.profile.userImage ? (
//                       <img src={`http://localhost:3001/uploads/${pep.profile.userImage}`} alt="User" />
//                     ) : (
//                       <div className="name-container">
//                         <p>{pep.user.name.charAt(0).toUpperCase()}</p>
//                       </div>
//                     )}
//                   </div>
//                   <div>
//                     <RatingComponent rating={pep.rating} />
//                     <p>{pep.user.name}</p>
//                     <p>{pep.review}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <></>
//         )}
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="profile__edit modal">
//           <div className="modal-content">
//             <form onSubmit={handleSubmit}>
//               <div className="row">
//                 <label htmlFor="image">
//                   {userImageModal ? (
//                     <div className="image-container">
//                       <img src={userImageModal} alt="Profile  1" className="profile__card" />
//                       <input type="file" id="image" onChange={updateUserImage} style={{ display: 'none' }} />
//                     </div>
//                   ) : (
//                     <div className="image-container upload">
//                       Click To <br />Upload Image
//                       <input type="file" id="image" onChange={updateUserImage} style={{ display: 'none' }} />
//                     </div>
//                   )}
//                 </label>
//               </div>

//               {role === 'Provider' ? (
//                 <>
//                   <label>About Me:</label>
//                   <input type="text" value={editAboutMe} onChange={handleAboutMeChange} />

//                   <label>Skillset:</label>
//                   <select
//                     value={''}
//                     onChange={(e) => {
//                       const selectedOption = e.target.value;
//                       if (selectedOption) {
//                         addSkillset(selectedOption);
//                       }
//                     }}
//                     className="editSkillset"
//                   >
//                     <option value="">Select a Skillset</option>
//                     {serviceCategories.map((category) => (
//                       <option key={category.id} value={category.name} className="skillOption">
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="selected-skillsets">
//                     <p>Selected Skillsets:</p>
//                     {selectedSkillsets.map((skillset) => (
//                       <span key={skillset} className="selected-skillset">
//                         {skillset}
//                         <p onClick={() => removeSkillset(skillset)} className="remove-skillset-button">
//                           X
//                         </p>
//                       </span>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <></>
//               )}

//               <label>Address:</label>
//               <input type="text" value={editAddress} onChange={handleAddressChange} />

//               <button type="submit" className="navbar__button">
//                 Update Profile
//               </button>
//             </form>
//             <FaTimes className="profile-close" onClick={closeModal} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewProfile;
