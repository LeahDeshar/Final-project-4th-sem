import React, { useContext, useEffect, useState } from 'react';
import Factorystep from './Factorystep';
import store from '../../redux/store';
import { getAllService, getAllServiceByCategory, getServiceOfUser } from '../../redux/service/serviceAction';
import { useSelector, useDispatch } from 'react-redux';
import SummaryModal from './SummaryModal';
import { FaPen } from "react-icons/fa";
import { UserContext } from '../utils/Context';
import { getAllProfileOfUser, getProfileOfUser } from '../../redux/profile/profileAction';
import ViewXProfile from './ViewXprofile';

function Postedfactory() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.role);
  const { serName } = useContext(UserContext);
  const category = serName.toLowerCase();
  const response = useSelector((state) => state.service.servicePosts);;
  const request = useSelector((state)=>
  state.request.requestPosts)

    

  const extraprofile =useSelector((state)=>state.users.extraprofile)

  let findProfile = [];
  try {
    if(response && extraprofile )
    {
      
      findProfile = extraprofile.filter((post) =>
      {if(post.user)
      {
        
       if( response.some((profileItem) => profileItem.user === post.user._id))
       {
         return post

       }
      }}
  );

      console.log("profile found",findProfile)
    }
  } catch (error) {
    console.log(error)
  }
  useEffect(() => {
   dispatch(getAllProfileOfUser())
    
  }, [])
  
  let filteredServicePosts =[]
  try {
      if(request.length>0 && response.length > 0)
      {
       
        
      filteredServicePosts = response.filter((post) =>
      request.some((request) => request.post === post._id && request.req_accepted === true )
      );
    console.log("filter",filteredServicePosts)

  }  
  
} catch (error) {
  console.log(error)
}

  const [isModalOpen, setModalOpen] = useState(false);

  const [isProfileOpen, setProfileOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);


  const [selectedPostId, setSelectedPostId] = useState(null);
  const [reqOut, setReqOut] = useState(false);

  const openProfileModal = (profileId) => {
    setSelectedProfileId(profileId);
    setProfileOpen(true);
  };
  const openModal = (post) => {
    setSelectedPostId(post);
    setModalOpen(true);
  };
  const closeProfileModal = () => {
    setProfileOpen(false);
  };

  const closeModal = () => {
    if (user === "Customer") {
      dispatch(getServiceOfUser());
    } else {
      dispatch(getAllServiceByCategory({ category }));
    }
    setModalOpen(false);
  };

  

  useEffect(() => {
    if(user==="Provider")
    {
      if(response)
      {
        console.log("response",response)
        // const totalCategoryPosts = response.filter((post) => post.category.toLowerCase() === category).length;
        // console.log("Total number of posts in category", totalCategoryPosts);
      }

      dispatch(getAllServiceByCategory({ category }));
      const storedReqOut = localStorage.getItem('reqOut');
      if (storedReqOut) {
        setReqOut(JSON.parse(storedReqOut));
      }

    }else 
    {
      dispatch(getServiceOfUser());
    }
  }, []);

 
  return (
    <div className='factory__container'>
      <Factorystep step2 />
      {user === 'Provider' ? (
        <div className="post-cards-container">
          {Array.isArray(response) && response.map((post) => (
           (!post.seen) ? 
            <div key={post._id} className="post-card post-card-grid">
              <div>
              {
                findProfile.map((profile)=>
                {
                  if(profile.user._id === post.user)
                  {
                    if(profile.userImage)
                    {
                    return <div className='postImage'
                    onClick={(e) => openProfileModal(profile)}
                    >
                      <img src={`http://localhost:3001/uploads/${profile.userImage}`} alt="" srcSet="" />
                      </div>

                    }
                    else 
                    {
                      return <div className='postImage'>
                        No image
                        </div>
                    }
                  }
                })
                }
              </div>
             
            <div>
              <p>Description {post.details}</p>
              <p>Date: {post.date}</p>
              <p>Address: {post.address}</p>
              <p>Contact {post.contactInfo}</p>
                  <p>
                    <button className='viewBtn' onClick={(e) => openModal(post)}>View more</button>
                  </p>
            </div>
             
              
              
            </div>:
            <></>
          )
          )}
        </div>
      ) : (
        // <div className="post-cards-container">
        //   {Array.isArray(response) && response.map((post) => 
        //     (
          
        //     <div key={post._id} className="post-card">
        //       <p>Description: {post.details}</p>
        //       <p>Date: {post.date}</p>
        //       <p>Address: {post.address}</p>
        //       <p>Contact: {post.contactInfo}</p>
        //       <p style={{fontSize: "20px"}}> {(post.seen)? "EXPIRED" : "New"}</p>

        //        {
        //         filteredServicePosts.map((workpost)=>
        //         {  
        //           console.log("filteredServicePosts",workpost._id , post._id,post.seen)
        //           if(workpost._id === post._id)
        //           {
        //           return "Work in progress.."

        //           }
        //           else 
        //           {
        //             return " "
        //           }
                
        //         }) 
        //        }
        //       <p>
        //         <button className='viewBtn' onClick={(e) => openModal(post)}>View more</button>
        //       </p>
        //     </div>
        //   )
         
        //   )}
         
        // </div>
        <div className="post-cards-container">
  {Array.isArray(response) && response.length > 0 ? (
    response.map((post) => (
      (!post.seen )? 
      <div key={post._id} className="post-card">
        <p>Description: {post.details}</p>
        <p>Date: {post.date}</p>
        <p>Address: {post.address}</p>
        <p>Contact: {post.contactInfo}</p>
        <p style={{ fontSize: "10px" }}>
          {post.seen ? "EXPIRED" : "New"}
        </p>
        {filteredServicePosts.map((workpost) => {
          console.log(
            "filteredServicePosts",
            workpost._id,
            post._id,
            post.seen
          );
          if (workpost._id === post._id) {
            return "Work in progress..";
          } else {
            return " ";
          }
        })}
        <p>
          <button className="viewBtn" onClick={(e) => openModal(post)}>
            View more
          </button>
        </p>
      </div>
      :
      <></>
    ))
  ) : (
    <p>No post yet</p>
  )}
</div>

      )}

      <div className="bottom_rect"></div>

      {isModalOpen && <SummaryModal post={selectedPostId} closeModal={closeModal}  />}

      {isProfileOpen && <ViewXProfile  users={selectedProfileId} closeProfileModal={closeProfileModal}  />}
    </div>
  );
}

export default Postedfactory;




