import React, { useContext, useState } from 'react';
import { ServiceContext } from '../utils/ServContext';

const TimePicker = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [isAM, setIsAM] = useState(true);

  const { 
    updateServiceTime} = useContext(ServiceContext)

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const handleAMPMChange = (event) => {
    setIsAM(event.target.value === 'AM');
  };

  const getFormattedTime = () => {
    const formattedHours = hours || '00';
    const formattedMinutes = minutes || '00';
    return `${formattedHours}:${formattedMinutes} ${isAM ? 'AM' : 'PM'}`;
  };

  const timeOfService =getFormattedTime()
  updateServiceTime(timeOfService)
  // TEST
  console.log(timeOfService)


  return (
    <div className='timepicker'>
      <div>
        <select value={hours} onChange={handleHoursChange} className="custom-dropdown">
          <option value="">-- Hours --</option>
          {Array.from(Array(12), (_, i) => i + 1).map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>

        <select value={minutes} onChange={handleMinutesChange} className="custom-dropdown">
          <option value="">-- Minutes --</option>
          {Array.from(Array(60), (_, i) => i).map((minute) => (
            <option key={minute} value={minute}>
              {minute < 10 ? `0${minute}` : minute}
            </option>
          ))}
        </select>

        <select  value={isAM ? 'AM' : 'PM'} onChange={handleAMPMChange} className=" custom-dropdown">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

  <p className=" selectTheme">
  {hours || minutes ? <p >Selected time: {getFormattedTime()}</p> : null}
     

  </p>
   
    </div>
  );
};

export default TimePicker;
