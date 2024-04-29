import React, { createContext, useState } from 'react';

// Create the user context
const UserContext = createContext();

// Create a provider component to provide the user input value to consuming components
const UserProvider = ({ children }) => {
  const [userInput, setUserInput] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phonenumber, setPhone] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [skillset, setSkillset] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [serName, setserName] = useState('');

  const [categoryList,setCategoryList] = useState({
  laundary: false,
  painter:  false ,
  chef: false ,
  carService:  false ,
  plumber: false ,
  electrician:false ,
  category7: false ,
  category8:  false ,
  furniture:  false ,
  cleaning: false ,
  petcare1:  false ,
  petcare2: false 
  })
  const updateCategoryList = (input) => {
    if (categoryList.hasOwnProperty(input)) {
      setCategoryList((prevCategoryList) => ({
        ...prevCategoryList,
        [input]: !prevCategoryList[input],
      }));
    }
  };
  // Function to update the user role
  const updateUserInput = (input) => {
    setUserInput(input);
  };
  const updateUserEmail= (input) => {
    setEmail(input);
  };
  const updateUserPassword = (input) => {
    setPassword(input);
  };
  const updateUserName= (input) => {
    setName(input);
  };
  const updateUserPhone= (input) => {
    setPhone(input);
  };
  const updateUserLocation= (input) => {
    setUserLocation(input);
  };
  const updateUserSkill = (input) => {
    setSkillset(input);
  };
  const updateUserAbout = (input) => {
    setAboutMe(input);
  };
   const updateUserImage = (input) => {
    setUserImage(input);
  };

  const updateSerName =(input)=>
  {
    setserName(input)
  }
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <UserContext.Provider value={{ 
      categoryList,updateCategoryList,
      darkMode, toggleDarkMode,
      userInput, updateUserInput ,
    updateUserImage,userImage,
    name,updateUserName,
    email,updateUserEmail,
    password,updateUserPassword,
    aboutMe,updateUserAbout,
    skillset,updateUserSkill,
    userLocation,updateUserLocation,
    phonenumber,updateUserPhone,
    serName,updateSerName
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
