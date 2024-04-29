import React, { useState } from 'react';
import './service.css';
import Calendar from './Calendar';
import TimePicker from './TimePicker';
import { FaTimes } from 'react-icons/fa';

const CalendarTimePicker = ({ handleCalendarTimePickerClose }) => {

  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCalendarTimePickerClose()
    console.log("submit");
  };

  return (
    <div className="modal calenModal">
      <div className="modal-content calendarTheme">
        <h2>Select Date and Time</h2>
        <FaTimes className='closebtn' onClick={() => handleCalendarTimePickerClose(false)} />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
           
            <Calendar onClose={handleCalendarTimePickerClose} />
          </div>
          <div className="timeTheme">
            <p className='selectTheme'>
            <p >Select Time:</p>

            </p>
            <TimePicker />
          </div>
          <button type="submit" className='navbar__button'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CalendarTimePicker;
