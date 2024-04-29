import React, {  useEffect, useState } from 'react'
import './factory.css'
import Factorystep from './Factorystep'
import store from '../../redux/store'
import { getAllRequestByCategory, getRequestOfCustomer } from '../../redux/request/requestAction'
import { useSelector } from 'react-redux'
import { getServiceOfUser } from '../../redux/service/serviceAction'
function Allpost() {
  const user = useSelector((state) => state.auth.user);


  useEffect(() => {
    if(user.role==="Customer")
    {
      store.dispatch(getServiceOfUser());
    }
   
  }, [user.role])
  const requestPosts = useSelector((state) => state.service.servicePosts)
console.log("debug line" ,requestPosts)
  
  

  let acceptedRequestPosts=[]
  if(requestPosts.length > 0)
  {
    acceptedRequestPosts = requestPosts.filter((post) => post.isCompleted === true)
  }
 
  return (
    <div className='factory__container' >
      <Factorystep step4 />
      <div className="progress__container">
        
      <div className="request-container">
      {acceptedRequestPosts && acceptedRequestPosts.length > 0 ? (
              acceptedRequestPosts.map((request) => (
                <div key={request.id} className="request-card" >
                 <h1>{(request.category).toUpperCase()}</h1>
                  <p>Work: {request.details}</p>
                  <p>Service Pay: {request.servicePrice}</p>
                 
                  
                </div>
              ))
            ) : (
              <p>No Progress...</p>
            )}

      </div>
      
      </div>

      <div className="bottom_rect"></div>
      </div>
  )
}

export default Allpost