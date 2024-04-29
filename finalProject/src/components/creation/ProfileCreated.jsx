import React, { useContext } from 'react'
import { UserContext } from '../utils/Context'

function ProfileCreated() {
  const {userInput}=  useContext(UserContext)
  return (
    <div className='account'>
        Your profile is created!!
    </div>
  )
}

export default ProfileCreated