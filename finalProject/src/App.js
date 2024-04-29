import React from 'react'
import MainPage from '../src/components/frontpage/MainPage'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import Navbar from './components/shared/Navbar'
import Services from './components/services/Services'
import About from './components/Additional/About'
import User from './components/creation/User'
import Login from './components/creation/Login'
import Register from './components/creation/Register'
import Profile from './components/creation/Profile'
import { UserProvider } from './components/utils/Context'
import ProfileCreated from './components/creation/ProfileCreated'
import AccountCreated from './components/creation/AccountCreated'

import PublicRoutes from './Routes/PublicRoutes'
import PrivateRoutes from './Routes/PrivateRoutes'
import Testpage from './components/factory/Testpage'
import Factorymainpro from './components/factory/providerFactory/Factorymainpro'
import Workinprogress from './components/factory/Workinprogress'
import Postedfactory from './components/factory/Postedfactory'
import Requestfactory from './components/factory/Requestfactory'
import Createpost from './components/factory/customerFactory/Createpost'
import CalendarTimePicker from './components/services/CalendarTimePicker'
import { ServiceProvider } from './components/utils/ServContext'
import Notification from './components/Additional/Notification'
import ViewProfile from './components/creation/Viewprofile'
import Allpost from './components/factory/Allpost'
function App() {
  return (
    <div>
       <Router>
          <ServiceProvider>
        <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/"  element={
       
          <MainPage/>
     
        }/>
        <Route path="/services" element={
        <PrivateRoutes>
          <Services />
          </PrivateRoutes>
        } />
        <Route path="/notifications" element={
        <PrivateRoutes>
          <Notification />
          </PrivateRoutes>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={
          <PublicRoutes><Login /></PublicRoutes>
        } />
        <Route path="/register" element={
        <PublicRoutes> <Register /></PublicRoutes>
       } />
        <Route path="/profile" element={<PublicRoutes>
           <Profile />
        </PublicRoutes>
         } />
          <Route path='/viewprofile' element={<PrivateRoutes>
            <ViewProfile/>
          </PrivateRoutes> }/>

        <Route path="/accCreated" element={<AccountCreated />} />
        <Route path="/proCreated" element={<ProfileCreated />} />

          {/* FACTORY ROUTES */}
          <Route path='/testpage' element={<PrivateRoutes>
            <Testpage/>
          </PrivateRoutes> }/>

          <Route path='/testpagepro' element={
          <PrivateRoutes>
             <Factorymainpro/>
          </PrivateRoutes>
          }/>

          {/* <Route path='/mainfactory' element={
          <PrivateRoutes>
             <Postedfactory/>
          </PrivateRoutes>
          }/> */}

          <Route path='/work-on-progress' element={
          <PrivateRoutes>
            {/* <Workinprogress/> */}
             <Workinprogress/>
          </PrivateRoutes>
          }/>
            <Route path='/service-posted' element={
          <PrivateRoutes>
             <Postedfactory/>
          </PrivateRoutes>
          }/>
           <Route path='/service-request' element={
          <PrivateRoutes>
             <Requestfactory/>
          </PrivateRoutes>
          }/>
          <Route path='/all-post' element={
          <PrivateRoutes>
             <Allpost/>
          </PrivateRoutes>
          }/>
           <Route path='/createpost' element={
          <PrivateRoutes>
             <Createpost/>
          </PrivateRoutes>
          }/>
            <Route path='/calendar-time' element={
          <PrivateRoutes>
             <CalendarTimePicker/>
          </PrivateRoutes>
          }/>
         </Routes>
        </UserProvider>
         </ServiceProvider>
    </Router>
        
    </div>
  )
}

export default App