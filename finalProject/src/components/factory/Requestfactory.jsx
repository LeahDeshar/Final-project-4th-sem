// import React, { useEffect, useState } from 'react';
// import Factorystep from './Factorystep';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRequestOfUser } from '../../redux/request/requestAction';
// import RequestModal from './RequestModal';

// function Requestfactory() {
//   const dispatch = useDispatch();
//   const [selectedRequestId, setSelectedRequestId] = useState(null);
//   const [isRequestModalOpen, setRequestModalOpen] = useState(false);
//   const user = useSelector((state) => state.auth.user.role);
//   const requestPosts = useSelector((state) => state.request.requestPosts);

//   useEffect(() => {
//     dispatch(getRequestOfUser());
//   }, []);

//   const openRequestModal = (requestId) => {
//     setSelectedRequestId(requestId);
//     setRequestModalOpen(true);
//   };

//   const closeRequestModal = () => {
//     setSelectedRequestId(null);
//     setRequestModalOpen(false);
//   };

//   return (
//     <div className="factory__container">
//       <Factorystep step3 />
      
//       {user==="Provider"? 
//       <div className="request-container">
//         {requestPosts && requestPosts.length > 0 ? (
//           requestPosts.map((request) => (
//             <div key={request.id} className="request-card" onClick={() => openRequestModal(request)}>
//               <p>Start Date: {request.start_date}</p>
//               <p>End Date: {request.end_date}</p>
//               <p>Payment: {request.req_pay}</p>
//               <p>Contact: {request.req_contact}</p>
//               <p>Comment: {request.req_comment}</p>
//             </div>
//           ))
//         ) : (
//           <p>No requests found</p>
//         )}
//       </div>:
//       <>
//        <div className="request-container">
//         <h1>Customer</h1>
//         {requestPosts && requestPosts.length > 0 ? (
//           requestPosts.map((request) => (
//             <div key={request.id} className="request-card" onClick={() => openRequestModal(request)}>
//               <p>Start Date: {request.start_date}</p>
//               <p>End Date: {request.end_date}</p>
//               <p>Payment: {request.req_pay}</p>
//               <p>Contact: {request.req_contact}</p>
//               <p>Comment: {request.req_comment}</p>
//             </div>
//           ))
//         ) : (
//           <p>No requests found</p>
//         )}
//       </div>
//       </>
      
    
//     }

//       {isRequestModalOpen && (
//         <RequestModal requestId={selectedRequestId} closeModal={closeRequestModal} />
//       )}
//       <div className="bottom_rect"></div>
//     </div>
//   );
// }

// export default Requestfactory;


import React, { useContext, useEffect, useState } from 'react';
import Factorystep from './Factorystep';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRequestByCategory, getAllRequestByPost, getRequestOfCustomer, getRequestOfUser } from '../../redux/request/requestAction';
import RequestModal from './RequestModal';
import { UserContext } from '../utils/Context';
import { getAllProfileOfUser } from '../../redux/profile/profileAction';
import ViewXProfile from './ViewXprofile';
import ViewPXProfile from './ViewPXprofile';

function Requestfactory() {
  const dispatch = useDispatch();
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
 
    const requestPosts = useSelector((state) => state.request.requestPosts);
   console.log("checking pending requestPosts",requestPosts)

   let pendingRequestPosts =[]
if(requestPosts.length > 0)
{
 pendingRequestPosts = requestPosts.filter(
    (post) => post.req_pending && !post.req_rejected && !post.req_accepted
  );
}
const pendingRequestUser=pendingRequestPosts.filter((request)=>
{
  if(request.prouser === user._id)
  {
    return request
  }
})
console.log("pendingRequestUser",pendingRequestUser)

const { serName } = useContext(UserContext);
const category = serName.toLowerCase();

  useEffect(() => {
    if(user.role === "Provider")
    {
      dispatch(getAllRequestByCategory({category}))
    }
    else 
    {
      dispatch(getRequestOfCustomer())
    }
  },[category, dispatch, user.role]);

  const openRequestModal = (requestId) => {
    setSelectedRequestId(requestId);
    setRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setSelectedRequestId(null);
    setRequestModalOpen(false);
  };
 
  const extraprofile =useSelector((state)=>state.users.extraprofile)

  let findProfile = [];
  try {
    if(pendingRequestUser && extraprofile )
    {
      
      findProfile = extraprofile.filter((post) =>
      {if(post.user)
      {
        
       if( pendingRequestPosts.some((profileItem) => profileItem.prouser === post.user._id))
       {
         return post

       }
      }
    }
  );

      console.log("profile found for request",findProfile)
    }
  } catch (error) {
    console.log(error)
  }
  useEffect(() => {
   dispatch(getAllProfileOfUser())
    
  }, [dispatch])


  // profile view of the provider that created the request post
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  // sorting 
  const [sortedRequestPosts, setSortedRequestPosts] = useState([]);
  
  useEffect(() => {
    if (pendingRequestPosts && pendingRequestPosts.length > 0) {
      const sortedPosts = [...pendingRequestPosts].sort((a, b) => a.req_pay - b.req_pay);
      setSortedRequestPosts(sortedPosts);
    }
  }, []);
  const openProfileModal = (profileId) => {
    console.log("profile clicked",profileId)
    setSelectedProfileId(profileId);
    setProfileOpen(true);
  };
  const closeProfileModal = () => {
    setProfileOpen(false);
  };
  function calculateDuration(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
  
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // Calculate days
  
    return `${daysDifference} days`;
  }

  return (
    <div className="factory__container">
      <Factorystep step3 />

      {user.role === 'Provider' ? (
        <div className="request-container">
          {pendingRequestUser && pendingRequestUser.length > 0 ? (
            pendingRequestUser.map((request) => (
              <div key={request.id} className="request-card" onClick={() => openRequestModal(request)}>
                <p>Start Date: {request.start_date}</p>
                <p>End Date: {request.end_date}</p>
                <p>Payment: {request.req_pay}</p>
                <p>Contact: {request.req_contact}</p>
                <p>Comment: {request.req_comment}</p>
              </div>
            ))
          ) : (
            <p>No requests found</p>
          )}
        </div>
      ) : (
        <>
          <div className="request-container">
            {/* {pendingRequestPosts && pendingRequestPosts.length > 0 ? (
              pendingRequestPosts.map((request) => (
                <div key={request.id} className="request-card post-card-grid" >
                {/* <div>
                  {
                    findProfile.length === 1 ?
                    <>
                    {
                    (findProfile[0].user._id)?
                      <>
                          <div className='postImage'
                                   onClick={(e) => openProfileModal(findProfile)}>
                            <img src={`http://localhost:3001/uploads/${findProfile[0].userImage}`} alt="" srcSet="" />
                            </div>
                              </>
                              :
                              <></>
                            }
                          </>
                          :
                    <>
                    {(findProfile[findProfile.length-1].user._id)?
                        <>
                            <div className='postImage'
                            onClick={(e) => openProfileModal(findProfile)}
                          >
                      <img src={`http://localhost:3001/uploads/${findProfile[0].userImage}`} alt="" srcSet="" />
                      </div>
                        </>
                        :
                        <></>
                      }
                    
                    </>
                   
                  }

                </div> */}
                
                {/* <div>
                  {
                    findProfile ?
                    <>
                    {(findProfile.map((pro) => {
                      return <>
                      { (pro.user._id === request.prouser) ? <>
                        <div className='postImage'
                            onClick={(e) => openProfileModal(pro)}
                          >
                      <img src={`http://localhost:3001/uploads/${pro.userImage}`} alt="" srcSet="" />
                        </div>
                       </>:<></>}
                      </>
                    }))} </> 
                    :
                    <></>
                  }
                </div>
                <div>
                  <p>Start Date: {request.start_date}</p>
                  <p>End Date: {request.end_date}</p>
                  <p>Payment: {request.req_pay}</p>
                  <p>Contact: {request.req_contact}</p>
                  <p>Comment: {request.req_comment}</p>
                  <button onClick={() => openRequestModal(request)} className='viewBtn'>View More</button>
                </div>
                </div>
              ))
            ) : (
              <p>No requests found</p>
            )} */ }
            


            {sortedRequestPosts && sortedRequestPosts.length > 0 ? (
              sortedRequestPosts.map((request) => (
           <div key={request.id} className="request-card post-card-grid">
              <div>
                  {
                    findProfile ?
                    <>
                    {(findProfile.map((pro) => {
                      return <>
                      { (pro.user._id === request.prouser) ? <>
                        <div className='postImage'
                            onClick={(e) => openProfileModal(pro)}
                          >
                      <img src={`http://localhost:3001/uploads/${pro.userImage}`} alt="" srcSet="" />
                        </div>
                       </>:<></>}
                      </>
                    }))} </> 
                    :
                    <></>
                  }
                </div>
                <div className='reqBtn'>
                {request === sortedRequestPosts[0] && (
                     <span className="green-dot"></span>
                  )}
                  <p>Start Date: {request.start_date}</p>
                  <p>End Date: {request.end_date}</p>
                  <p>Duration: {calculateDuration(request.start_date, request.end_date)}</p>
                  <p>Payment: {request.req_pay}</p>
                  <p>Contact: {request.req_contact}</p>
                  <p>Comment: {request.req_comment}</p>
                  <button onClick={() => openRequestModal(request)} className='viewBtn '>View More </button>
                </div>
                {/* <p>{(!request.req_accepted || !request.req_rejected || !request.req_pending) ? "false": "True" }</p> */}
    </div>
  ))
            ) : (
            <p>No requests found</p>
              )}
           
          </div>
        </>
      )}

      {isRequestModalOpen && <RequestModal requestId={selectedRequestId} closeModal={closeRequestModal} />}

      {isProfileOpen && <ViewPXProfile users={selectedProfileId} closeProfileModal={closeProfileModal}  />}
      <div className="bottom_rect"></div>
    </div>
  );
}

export default Requestfactory;
