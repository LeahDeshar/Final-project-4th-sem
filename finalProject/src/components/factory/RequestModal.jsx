import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './factory.css';
import store from '../../redux/store';
import { deleteRequestOfUser, updateRequestOfCustomer, updateRequestOfUser } from '../../redux/request/requestAction';
import { updateServiceOfUser } from '../../redux/service/serviceAction';

function RequestModal({ requestId, closeModal }) {
  const serviceResponse = useSelector((state) => state.service.servicePosts);

  const serviceFound = serviceResponse.filter((post) => post._id === requestId.post);
  console.log("serviceFound",serviceFound)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const user = useSelector((state) => state.auth.user.role);
  const handleCancelRequest = () => {
    setShowConfirmation(true);
  };


  const handleConfirmation = () => {
    if(user==="Provider")
    {
      store.dispatch(deleteRequestOfUser({reqId:requestId._id}));
    }
    else
    {
      store.dispatch(updateRequestOfCustomer({reqId:requestId._id,
        req_pending:false,req_rejected:true,req_accepted:false}))
      console.log("rejected")
    }
    closeModal();
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };
  const handleAcceptRequest=()=> 
  {
    store.dispatch(updateRequestOfCustomer({reqId:requestId._id,
      req_pending:false,req_accepted:true,req_rejected:false}))

      const id = serviceFound.find((post) => post._id===requestId.post)
      console.log(requestId.post ,id)
      store.dispatch(updateServiceOfUser({postId:id._id,seen: true}))
    console.log("accepted")
    closeModal()
  }

  return (
    <div className="modal-overlay request">
      <div className="modal-content request">
        <div className="service__detail">
          <h2 className="Service">Service Details</h2>
          {serviceFound.length > 0 ? (
            serviceFound.map((post) => (
              <div key={post._id}>
                <p>Requirement: {post.details}</p>
                <p>Date: {post.date}</p>
                <p>Address: {post.address}</p>
                <p>Phone Number: {post.contactInfo}</p>
                <p>Price: {post.servicePrice}</p>
              </div>
            ))
          ) : (
            <p>No service details found</p>
          )}
        </div>
        <div className="request__detail">
          <h2 className="request">Request Details</h2>
          <p>Start Date: {requestId.start_date}</p>
          <p>End Date: {requestId.end_date}</p>
          <p>Payment: {requestId.req_pay}</p>
          <p>Contact: {requestId.req_contact}</p>
          <p>Comment: {requestId.req_comment}</p>
        </div>

        <div className="btn-request btn-summary ">
          <button
            type="button"
            className="cancel-button navbar__button request requestTheme"
            onClick={handleCancelRequest}
          >
           {user==="Provider"? "Cancel ":  "Reject "
          }the request
          </button>
          {user==="Customer"?<>
          <button
            type="button"
            className="cancel-button navbar__button request"
            onClick={handleAcceptRequest}
          >
           Accept the request
          </button>
          </>:<></>}

          
          
          <button className="close-button navbar__button request" onClick={closeModal}>
            Close
          </button>
        </div>

        {showConfirmation && (
          <div className="modal-overlay confirmation">
            <div className="modal-content confirmation">
              <h2>Confirmation</h2>
              <p>Are you sure you want to {user==="Provider"?"cancel":"reject"} this request?</p>
              <div className="btn-request requestModalTheme">
                <button
                  type="button"
                  className="cancel-button navbar__button confirmation"
                  onClick={handleCancelConfirmation}
                >
                  No, keep the request
                </button>
                <button
                  className="close-button navbar__button confirmation"
                  onClick={handleConfirmation}
                >
                  Yes,{user==="Provider"?"cancel":"reject"}  the request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestModal;
