import React, { useContext, useEffect, useState } from 'react';
import { FaPen, FaCheck } from 'react-icons/fa';
import { deleteServiceOfUser, getAllServiceByCategory, getServiceOfUser, updateServiceOfUser } from '../../redux/service/serviceAction';
import store from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../utils/Context';
import { createRequestPost, getRequestOfUser } from '../../redux/request/requestAction';

function SummaryModal({ closeModal, post,inComeReq }) {
  const [editable, setEditable] = useState(false);
  const [contactInfo, setContactInfo] = useState(post.contactInfo);
  const [details, setDetails] = useState(post.details);
  const [servicePrice, setServicePrice] = useState(post.servicePrice);
  const [address, setAddress] = useState(post.address);
  const [date, setDate] = useState(post.date);
  const [time, setTime] = useState(post.time);


  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState('');
  const [reqPay, setReqPay] = useState('');
  const [reqContact, setReqContact] = useState('');
  const [reqComment, setReqComment] = useState('');
  const [error,setError] = useState('')
  const dispatch = useDispatch();
 
 console.log("debug post",post)
  const handleRequest = () => {
    console.log( startDate,
         endDate,
        reqPay,
        reqContact,
        reqComment)

        if(!startDate ||
          !endDate ||
         !reqPay ||
         !reqContact ||
         !reqComment)
         {
          setError("Complete information is required!");
          return;
         }

         const selectedStartDate = new Date(startDate);
         const currentDate = new Date();
       
         if (selectedStartDate < currentDate) {
           // The selected date is older than the current date
           setError("Start date cannot be in the past");
           return;
         } 

         const selectedEndDate = new Date(endDate);
       
         if (selectedEndDate < currentDate) {
           // The selected date is older than the current date
           setError("End date cannot be in the past");
           return;
         } 
         if (selectedStartDate > selectedEndDate) {
          // The selected date is older than the current date
          setError("Invalid Date");
          return;
        } 

    dispatch(
      createRequestPost({
        start_date: startDate,
        end_date: endDate,
        req_pay: reqPay,
        req_contact: reqContact,
        req_comment: reqComment,
        post: post._id,
        user: post.user
      })
      );
      
      navigate('/service-request')
      closeModal()

  };

  const user = useSelector((state) => state.auth.user);
  const request = useSelector((state)=>
  state.request.requestPosts)
  // console.log("service request",request[0].post,post._id)



  let filteredServicePosts =[]
  let filterSerReqUser =[]
  if(request.length>0 )
  {
    
      filteredServicePosts = request.filter((reqpost) =>
      reqpost.post === post._id && reqpost.req_pending
      );
      console.log("post filter",filteredServicePosts)

      filterSerReqUser = filteredServicePosts.filter((req)=>
      {
        if(req.prouser === user._id)
        {
          return req
        }
      })
      
    }  
  const navigate = useNavigate()
  const handleEdit = () => {
    if(!post.seen)
    {
      setEditable(true);
    }
  };

  const handleSave = () => {
    setEditable(false);
    store.dispatch(
      updateServiceOfUser({
        postId: post._id,
        date,
        time,
        address,
        contactInfo,
        details,
        servicePrice
      })
    );
  };
  // const user = useSelector((state)=>state.auth.user.role)
  const {serName}= useContext(UserContext)
  const category = serName.toLowerCase();


  useEffect(() => {
    if(user==="Customer")
    {
        store.dispatch(getServiceOfUser());
    }else 
    {
        store.dispatch(getAllServiceByCategory({category}))
    }
  }, [date, time, address, contactInfo, details, servicePrice,category,user]);

  const handleContactInfoChange = (e) => {
    setContactInfo(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);

  };

  const handleServicePriceChange = (e) => {
    setServicePrice(e.target.value);

  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);

  };

  const handleDateChange = (e) => {
    setDate(e.target.value);

  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);

  };
  const deleteHandler =()=>
  {
    store.dispatch(deleteServiceOfUser({ postId: post._id }));
    store.dispatch(getServiceOfUser());
    closeModal()
          
  }


  return (
    <div className="modal-overlay summary">
      <div className="modal-content summary">
        {user.role === "Customer"? (
        <h2 className="summary">
          Service Content 
          {editable ? <FaCheck className='editUpdate' onClick={handleSave} /> : <FaPen onClick={handleEdit} className={`editUpdate ${post.seen ? "disabled": ""}`}/>
          }
        </h2>

        ):
        (
         <h2 className="summary">
          Service Content
        </h2>
        )}
        <p>
          Contact Information:{' '}
          {editable ? (
            <input type="text" className="editInput inputWidth"  value={contactInfo} onChange={handleContactInfoChange} placeholder="contactInfo" />
          ) : (
            contactInfo
          )}
        </p>
        <p>
          Service Detail:{' '}
          {editable ? (
            <input className="editInput inputWidth" type="text" value={details} onChange={handleDetailsChange} />
          ) : (
            details
          )}
        </p>
        <p>
          Service Price:{' '}
          {editable ? (
            <input className="editInput inputWidth" type="text" value={servicePrice} onChange={handleServicePriceChange} />
          ) : (
            servicePrice
          )}
        </p>
        <p>
          Address:{' '}
          {editable ? (
            <input className="editInput inputWidth" type="text" value={address} onChange={handleAddressChange} />
          ) : 
          
          (
            address
            
          )
          
          
          }
        </p>
        <p>
          Date:{' '}
          {editable ? (
            <input className="editInput inputWidth" type="text" value={date} onChange={handleDateChange} />
          ) : (
            date
          )}
        </p>
        <p>
          Time:{' '}
          {editable ? (
            <input className="editInput inputWidth" type="text" value={time} onChange={handleTimeChange} />
          ) : (
            time
          )}
        </p>
        {/* <p>{(post.seen)? "True": "False"}</p> */}
        {/* <button onClick={handleClick} disabled={isDisabled}>
        Click me
      </button> */}
        {/* <p>{post._id}</p> */}
        {
                user.role==="Provider"?(<>
                <div className="request__container">
        <h3 className='provideTheme'>PROVIDE YOUR OFFER</h3>
      <div className="req__btn">
        <div className='start_container'>
        <label htmlFor="">Start Date</label>
        <input className="startEnd " type="date" value={startDate} 
        onChange={(e) => {setStartDate(e.target.value);setError("")}} />
 

        </div>
        <div className='start_container'>

        <label htmlFor="">End Date</label>

        <input className="startEnd" type="date" value={endDate} onChange={(e) => {setEndDate(e.target.value);setError("")}} />

        </div>
      </div>
      <div className="req__price">
        <h3>Offer Your Service Pay</h3>
        <small style={{color: "grey"}}>Recommended price is Rs.{servicePrice}</small>
        <input className="editInput" 
        placeholder='Rs'
        type="text" value={reqPay} onChange={(e) => {setReqPay(e.target.value);setError("")}} />
      </div>
      <div className="req__contact">
        <h3>Contact Details</h3>
        <input className="editInput" 
        placeholder='Enter Your Phone Number'
        type="text" value={reqContact} onChange={(e) => {setReqContact(e.target.value);setError("")}} />
      </div>
      <div className="req__desc">
        <h3>Comment</h3>
        <textarea
          value={reqComment}
        placeholder='Comment'

          onChange={(e) => {setReqComment(e.target.value);setError("")}}
          cols="30"
          rows="10"
          className="editInput"
          style={{resize: "none"}}
        ></textarea>
      </div>
      {error && error}
                </div>
                </>):(<></>)
          }
        <div className="btn-summary">
            {user.role==="Customer"?
            (
            <>
              <button type="button" className={`navbar__button close-button summary ${post.seen ? "disabled": ""}`}  onClick={deleteHandler} disabled={post.seen? true: false}>
                DELETE
              </button>
            <button className="navbar__button close-button summary" onClick={closeModal}>
            CONTINUE
            </button>
           </>

            ):
            <>
           
            {

            filterSerReqUser.length > 0 ?
            <>
                <button type="button" className="navbar__button close-button summary">
                  {post.seen ? "Expired": " work in progress"}
               
                </button>
            </>: <>
           
                 <button type="button" className={`navbar__button close-button summary ${post.seen ? "disabled": ""}`} onClick={handleRequest} disabled={post.seen ? true: false}>
                   REQUEST
                 </button>
            </>

            }
            <button className="navbar__button close-button summary" onClick={closeModal}>
            CONTINUE
            </button>
            </>
            }
            </div>
            
       
      </div>
    </div>
  );
}

export default SummaryModal;
