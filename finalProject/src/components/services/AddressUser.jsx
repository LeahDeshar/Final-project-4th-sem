import React, { useContext } from 'react'
import AddressAutocomplete from './AddressAutocomplete'
import { ServiceContext } from '../utils/ServContext'
function AddressUser({addressCloseHandler}) {
  const handleCloseAddress = () =>
  {
    addressCloseHandler()
  }
  const {serviceAddress} = useContext(ServiceContext)
  return (
    <div className="modal calenModal">
    <div className="top_rect"></div>
    <div className="modal-content address">
    <div className="addressTheme">
    <h2>Your GPS Location</h2>
    <AddressAutocomplete />
      <p className='selectedAddress'>Your Address: {serviceAddress}</p>
      <button type='submit' className='viewBtn' onClick={handleCloseAddress}>Submit</button>
    </div>
        </div>
        </div>
  )
}

export default AddressUser