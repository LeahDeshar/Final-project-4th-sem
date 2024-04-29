import React, { useContext, useEffect, useState } from 'react'
import './factory.css'
import MainFactory from './MainFactory'
import Factorystep from './Factorystep'
import store from '../../redux/store'
import { getAllRequestByCategory, getRequestOfCustomer } from '../../redux/request/requestAction'
import { useSelector } from 'react-redux'
import { UserContext } from '../utils/Context'
import FinishModal from './FinishModal'
function Workinprogress() {
  const user = useSelector((state) => state.auth.user);
  const { serName } = useContext(UserContext);
const category = serName.toLowerCase();
const [isFinishModalOpen, setFinishModalOpen] = useState(false);
const [selectRequest,setSelectRequest] = useState(null);

const openFinishModal = (request) => {
  setSelectRequest(request)
  setFinishModalOpen(true);
};
const closeFinishModal = () => {
  setFinishModalOpen(false);
};
  useEffect(() => {
    if(user.role==="Customer")
    {
      store.dispatch(getRequestOfCustomer())
    }else 
    {
      store.dispatch(getAllRequestByCategory({category}))
    }
   
  }, [])
  const requestPosts = useSelector((state) => state.request.requestPosts);

  console.log("requestPosts debug",requestPosts)

  
  // console.log("provider",user._id,requestPosts.map((req)=>{return req.prouser}))

  let acceptReqPro = []
  let acceptedRequestPosts=[]
  if(requestPosts.length > 0)
  {
    acceptedRequestPosts = requestPosts.filter((post) => post.req_accepted === true)
    acceptReqPro = acceptedRequestPosts.filter((Requser)=>
    {
      if(Requser.prouser ===user._id)
      {
        return Requser
      }
    })
    
    
   console.log("customer work in progress",requestPosts)
   console.log("test for timer",acceptedRequestPosts,acceptReqPro)

  }
  const countDownHandle = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    
    const differenceInMilliseconds = endDate - startDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / 86400000);
    console.log(`Countdown: ${differenceInDays} days`);
    return differenceInDays
  }
  return (
    <div className='factory__container' >
      <Factorystep step1 />
      <div className="progress__container">
        {user.role==="Customer"?
      <div className="request-container">
      {acceptedRequestPosts && acceptedRequestPosts.length > 0 ? (
              acceptedRequestPosts.map((request) => (
                <div key={request.id} className="request-card" >
                 
                  <p>Start Date: {request.start_date}</p>
                  <p>End Date: {request.end_date}</p>
                  <p>Payment: {request.req_pay}</p>
                  <p>Contact: {request.req_contact}</p>
                  <p>Comment: {request.req_comment}</p>
                  <p>---{countDownHandle(request.start_date,request.end_date)} Days To Go---</p>
                  <button className='viewBtn' onClick={()=>openFinishModal(request)}>Finished</button>
                </div>
              ))
            ) : (
              <p>No Progress...</p>
            )}

      </div>:
      
      <div className="request-container">
      {acceptReqPro && acceptReqPro.length > 0 ? (
              acceptReqPro.map((request) => (
                <div key={request.id} className="request-card" >
                  <p>Start Date: {request.start_date}</p>
                  <p>End Date: {request.end_date}</p>
                  <p>Payment: {request.req_pay}</p>
                  <p>Contact: {request.req_contact}</p>
                  <p>Comment: {request.req_comment}</p>
                  <p>---{countDownHandle(request.start_date,request.end_date)} Days To Go---</p>
                </div>
              ))
            ) : (
              <p>No Progress...</p>
            )}

      </div>
      }
      </div>

      {isFinishModalOpen && <FinishModal selectRequest={selectRequest}  closeFinishModal={closeFinishModal} />}

      <div className="bottom_rect"></div>
      </div>
  )
}

export default Workinprogress