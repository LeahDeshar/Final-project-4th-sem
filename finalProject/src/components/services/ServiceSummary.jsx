import React, { useContext } from 'react';
import { ServiceContext } from '../utils/ServContext';
import { handleCreateService } from '../../services/serviceReducer';
import { useNavigate } from 'react-router-dom';
import store from '../../redux/store';
import { createServicePost, getAllService, getServiceOfUser } from '../../redux/service/serviceAction';
import { UserContext } from '../utils/Context';

function ServiceSummary({summaryHandlerClose}) {
  const { serviceAddress,
    dateofService,
    timeofService,
    contactofService,
    priceofService,
    detailofService, } = useContext(ServiceContext);
    const {serName}=useContext(UserContext)
    const navigate = useNavigate()
    const cancleSubmit = () =>
    {
      summaryHandlerClose()
    }
const serviceCreatehandler = () =>
{
    const date =dateofService
    const time = timeofService
    const address = serviceAddress.join(',')
    const contactInfo = contactofService
    const details = detailofService
    const servicePrice = priceofService
    const category = serName.toLowerCase()
    // handleCreateService(date, time, address, contactInfo, details, servicePrice,category)
    store.dispatch(createServicePost({date, time, address, contactInfo, details, servicePrice,category}))
    store.dispatch(getServiceOfUser())

    navigate('/service-posted')
}
  return (
    <div className="modal serviceTheme calenModal">
    <div className="top_rect"></div>
    <div className="modal-content service__detail__summary">
      <h2>SUMMARY</h2>
      <p>Contact Information: {contactofService}</p>
      <p>Service Detail: {detailofService}</p>
      <p>Service Price: {priceofService}</p>
      <p>Address: {serviceAddress}</p>
      <p>Date:{dateofService}</p>
      <p>Time:{timeofService}</p>
      <button onClick={serviceCreatehandler} className='viewBtn'>Submit</button>
      <button onClick={cancleSubmit} className='viewBtn'>Cancel</button>
      
     
    </div>
   </div>
  );
}

export default ServiceSummary;