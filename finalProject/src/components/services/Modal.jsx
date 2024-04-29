import React, { useContext, useState } from 'react';
import './service.css';
import { useSelector } from 'react-redux';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { UserContext, UserProvider } from '../utils/Context';
import CalendarTimePicker from './CalendarTimePicker';
import AddressUser from './AddressUser';
import { FaXmark} from 'react-icons/fa6';
import { ServiceContext } from '../utils/ServContext';
import ServiceSummary from './ServiceSummary';

const Modal = ({ showModal, setShowModal }) => {
  const [contactNumber, setContactNumber] = useState('');
  const [comment, setComment] = useState('');
  const [price, setPrice] = useState('');
  const [error,setError] = useState('');



  const { updateServiceContact,serviceAddress,dateofService,timeofService,
    updateServicePrice,updateServiceDetail} =useContext(ServiceContext)
  // STATE management
  
  const handleContactNumberChange = (event) => {
    updateServiceContact(event.target.value)
    setContactNumber(event.target.value);
    setError("")

  };

  const handleCommentChange = (event) => {
    updateServiceDetail(event.target.value);
    setComment(event.target.value);
    setError("")
  };

  const handlePriceChange = (event) => {
    updateServicePrice(event.target.value);
    setPrice(event.target.value);
    setError("")

  };
 
  // MODAL TOGGLE
  const [showCalendarTimePicker, setShowCalendarTimePicker] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [showSummary,setShowSummary] = useState(false);

  const addressHandler = () => {
    setShowAddressModal(true);
  };
  const addressCloseHandler = () => {
    setShowAddressModal(false);
  };
  console.log(comment,price,contactNumber,dateofService,timeofService,serviceAddress)
   const summaryHandler = () => {
   if(!comment || !price || !contactNumber ||!dateofService || !timeofService ||!serviceAddress)
   {
    console.log(!comment && !price && !contactNumber &&!dateofService && !timeofService &&!serviceAddress)
    setError("Please fill all the field to continue..")
    return;
   }else 
   {
    console.log(!comment && !price && !contactNumber &&!dateofService && !timeofService &&!serviceAddress)
     setShowSummary(true);

   }
  };
  const summaryHandlerClose = () => {
    setShowSummary(false);
  };
  // const handleAddressModalClose = () => {
  //   setShowAddressModal(false);
  // };
  const timeAndDateHandler = () => {
    setShowCalendarTimePicker(true);
  };

  const handleCalendarTimePickerClose = () => {
    setShowCalendarTimePicker(false);
  };

  const handleContinue = () => {

    setShowModal(false);
    setShowSummary(true)
  };
  return (
    showModal && (
      <div className="modal creation">
        <div className="top_rect"></div>
        <div className="modal-content">
          <h2>Enter Your Requirement</h2>
         <FaXmark className='closebtn' onClick={() => setShowModal(false)}/>

          <button onClick={timeAndDateHandler} className='calendartimepicker'>{(dateofService && timeofService) ? <>TIME AND DATE <p className='serInput'>{timeofService},{dateofService}</p></>:<>SELECT TIME AND DATE</>}</button>
          <button className='addressSelector' onClick={addressHandler}>Select Address <p className='serInput'>{serviceAddress}</p></button>
        
        <form>
        <input
        type="text"
        required
        name="contactNumber"
        placeholder="CONTACT INFORMATION"
        value={contactNumber}
        onChange={handleContactNumberChange}
      />
      <textarea
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        required
        value={comment}
        onChange={handleCommentChange}
        style={{resize: 'none'}}
        placeholder="Enter the service detail"
        
      ></textarea>
      <label htmlFor="price">Offer Your Service Pay</label>
      <input
        type="text"
        name="price"
        placeholder="Rs."
        value={price}
        required
        onChange={handlePriceChange}
      />
      {error && <p className='errorPost'>{error}</p>}
      <button className='navbar__button create_btn' type="button" onClick={summaryHandler}>CONTINUE</button>
      </form>
          

       {showCalendarTimePicker && (
          <div className="calendar-time-picker">
            <CalendarTimePicker handleCalendarTimePickerClose={handleCalendarTimePickerClose}/>
          </div>
        )}
       {showAddressModal && (
            <AddressUser addressCloseHandler={addressCloseHandler} />
        )}
       {showSummary &&<ServiceSummary summaryHandlerClose={summaryHandlerClose}/>}
        </div>
        <div className="bottom_rect"></div>
      </div>
    )
  );
};
export default Modal