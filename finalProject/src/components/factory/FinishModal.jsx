import React, { useState } from 'react'
import './factory.css'
import store from '../../redux/store';
import { createRatingPost } from '../../redux/rating/ratingAction';
import { useSelector } from 'react-redux';
function FinishModal({selectRequest,closeFinishModal}) {
  const userId = useSelector((state)=>state.auth.user)
  console.log("selectRequest",selectRequest,"id", selectRequest._id)
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    let reqId 
    let prouser 
    let user
    try {
      if(selectRequest)
      {
        reqId = selectRequest._id
        prouser = selectRequest.prouser
        user = userId._id
      }
    } catch (error) {
      console.log(error)
    }
    

  console.log("rating",rating,reqId,prouser)
  const handleRatingChange = (value) => {
  console.log("rating value",value)
    
    setRating(value);
  };

  const handleReviewChange = (event) => {

    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
console.log("submit")
    // try {
     

    //   if (response.ok) {
    //     // Rating submitted successfully
    //     // Handle any necessary actions (e.g., display success message, update UI)
    //     // ...
    //   } else {
    //     console.error('Error submitting rating:', response.statusText);
    //     // Handle rating submission error
    //     // ...
    //   }
    // } catch (error) {
    //   console.error('Error submitting rating:', error.message);
    //   // Handle rating submission error
    //   // ...
    // }
  store.dispatch(createRatingPost({rating,review,reqId,prouser,user}))
  closeFinishModal()

  };
  const closeHandler = ()=>
  {
    closeFinishModal()
  }
  return (
    <div className='modal'>
        <div className="modal-content">
        <div className='finishModalTheme'>
          <h3 className='finishClose' onClick={closeHandler}>×</h3>
      <h3>Leave a Rating</h3>
      <div className="rating-container">
        <span className={`star ${rating >= 1 ? 'active' : ''}`} onClick={() => handleRatingChange(1)}>&#9733;</span>
        <span className={`star ${rating >= 2 ? 'active' : ''}`} onClick={() => handleRatingChange(2)}>&#9733;</span>
        <span className={`star ${rating >= 3 ? 'active' : ''}`} onClick={() => handleRatingChange(3)}>&#9733;</span>
        <span className={`star ${rating >= 4 ? 'active' : ''}`} onClick={() => handleRatingChange(4)}>&#9733;</span>
        <span className={`star ${rating >= 5 ? 'active' : ''}`} onClick={() => handleRatingChange(5)}>&#9733;</span>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea className="review-input" placeholder="Write a review" value={review} onChange={handleReviewChange}required></textarea>
        <button type="submit" className="submit-rating navbar__button">Submit Rating</button>
      </form>
    </div>
        </div>

        </div>
  )
}

export default FinishModal