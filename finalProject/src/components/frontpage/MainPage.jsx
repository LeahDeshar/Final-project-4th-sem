import React, { useContext } from 'react'
import Navbar from '../shared/Navbar'
import ContentPage from './ContentPage'
import Workpage from './Workpage'
import Topoftheweek from './Topoftheweek'
import BestDeal from './BestDeal'
import Community from './Community'
// import FaqQuestion from './FaqQuestion'
import FaqPage from './FaqQuestion'
import { UserContext } from '../utils/Context'


function MainPage() {
  // const {darkMode, toggleDarkMode} = useContext(UserContext)
  // const containerStyle = {
  //   background: darkMode ? '#333' : '#fff',
  //   color: darkMode ? '#fff' : '#333',
  // };

  return (
    // <div className='mainPage' style={containerStyle}>
    <div className='mainPage'>

       {/* <button onClick={toggleDarkMode}>
        {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
      </button> */}
       
        {/* <Navbar/> */}
        <ContentPage/>
        <Workpage/>
        <Topoftheweek/>
        <BestDeal/>
        <FaqPage/>
        {/* <FaqQuestion/> */}
        <Community/>
    </div>
  )
}

export default MainPage