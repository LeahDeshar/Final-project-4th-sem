import React, { createContext, useState } from 'react';

// Create the service context
const ServiceContext = createContext();

// Create a provider component to provide the service data to consuming components
const ServiceProvider = ({ children }) => {
  const [serviceAddress, setServiceAddress] = useState('');
  const [dateofService, setDateofService] = useState('');
  const [timeofService, setTimeofService] = useState('');
  const [contactofService, setContactofService] = useState('');
  const [priceofService, setPriceofService] = useState('');
  const [detailofService, setDetailofService] = useState('');



const [skillSetPro , setSkillset] = useState([]);

const updateSkillSet = (skill)=>
{
  setSkillset(skill)
}
  // Function to update the service address
  const updateServiceAddress = (address) => {
    setServiceAddress(address);
  };
  const updateServiceTime = (time) => {
    setTimeofService(time);
  };
  const updateServiceDate = (date) => {
    setDateofService(date);
  };
  const updateServiceContact= (contact) => {
    setContactofService(contact);
  };
  const updateServicePrice= (price) => {
    setPriceofService(price);
  };
  const updateServiceDetail= (detail) => {
    setDetailofService(detail);
  };


  return (
    <ServiceContext.Provider
      value={{
        serviceAddress,
        updateServiceAddress,
        dateofService, updateServiceDate,
        timeofService,updateServiceTime,
        contactofService,updateServiceContact,
        priceofService,updateServicePrice,
        detailofService,updateServiceDetail,
        skillSetPro,updateSkillSet


      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export { ServiceContext, ServiceProvider };
