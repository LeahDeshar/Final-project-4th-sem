import React, { useContext, useState } from 'react'

// import './factory.css'
import { UserContext } from '../../utils/Context'
import { Link } from 'react-router-dom'
import { BsBell } from 'react-icons/bs';
import { BiSolidBellRing } from "react-icons/bi";

function Factorymainpro() {
    const {serName}= useContext(UserContext)
    const [isNotificationClicked, setNotificationClicked] = useState(false);

    const handleNotificationClick = () => {
      setNotificationClicked(!isNotificationClicked);
    };

  return (
    <div className='factory__container'> 
    <div className="component">
        <h1 className='factory__header'>    {serName}</h1>
        <div className="factory__navbar">
            <div className="factory__navbar-left">
            <Link to={'/work-on-progress'}>Work On Progress</Link>
            <Link to={'/service-posted'}>Services Posted</Link>

            <Link to={'/service-request'}>Request</Link>

            </div>
            <div className="factory__navbar-right">
            <p onClick={handleNotificationClick}>Notification {isNotificationClicked ? <BiSolidBellRing /> : <BsBell />}</p>
            </div>
        </div>

    </div>
    </div>
  )
}

export default Factorymainpro