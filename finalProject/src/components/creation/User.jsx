// import React, { useContext, useState } from 'react';
// import RegisterStep from './RegisterStep';
// import { useNavigate } from 'react-router-dom';
// import './user.css'
// import { UserContext } from '../utils/Context';
// const User = () => {
//   const [userType, setUserType] = useState();
  
//   const {updateUserInput} =useContext(UserContext)

//   const handleUserTypeChange = (event) => {
//     setUserType(event.target.value);
//   };
//   const userContextHandler =() => 
//   {
//     updateUserInput(userType)
//     navigate('/register')
//     // setNextStep(true);
//   }
//   const navigate= useNavigate()



//   return (
//     <div className='user'>
//       <RegisterStep step1 step2/>

//         <h3>Join As Customer Or Professional</h3>
//       <div className='user__choice'>
//         <div className="label-container">
//           <input
//           id='radio1'
//             type="radio"
//             value="Customer"
//             checked={userType === 'Customer'}
//             onChange={handleUserTypeChange}
//             required
//           />
//         <label htmlFor='radio1'> Customer</label>
         
        

//         </div>
//         <div className="label-container">
//           <input
//           id='radio2'
//             type="radio"
//             value="Provider"
//             checked={userType === 'Provider'}
//             onChange={handleUserTypeChange}
//             required
//             />
//             <label htmlFor='radio2'> Provider </label>
         

//         </div>
//       </div>
//       <div className="user__footer">
//       <button className='navbar__button' onClick={userContextHandler}>Next Step</button>
//       <small>Already have an account? Log In</small>
//       </div>
//     </div>
//   );
// };

// export default User;


import React, { useContext, useState } from 'react';
import RegisterStep from './RegisterStep';
import { Link, useNavigate } from 'react-router-dom';
import './user.css';
import { UserContext } from '../utils/Context';

const User = () => {
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');

  const { updateUserInput } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setError('');
  };

  const userContextHandler = () => {
    if (userType) {
      console.log(userType)
      updateUserInput(userType);
      navigate('/register');
    } else {
      setError('Please select a user type');
    }
  };

  return (
    <div className="user">
      <RegisterStep step1 step2 />
      <h3>Join As Customer Or Professional</h3>
      <div className="user__choice">
        <div className="label-container">
          <input
            id="radio1"
            type="radio"
            value="Customer"
            checked={userType === 'Customer'}
            onChange={handleUserTypeChange}
            required
          />
          <label htmlFor="radio1"> Customer</label>
        </div>
        <div className="label-container">
          <input
            id="radio2"
            type="radio"
            value="Provider"
            checked={userType === 'Provider'}
            onChange={handleUserTypeChange}
            required
          />
          <label htmlFor="radio2"> Provider </label>
        </div>
      </div>
      {error && <p className="error userTypeError">{error}</p>}
      <div className="user__footer">
        <button className="navbar__button" onClick={userContextHandler}>
          Next Step
        </button>
        <small>Already have an account?<Link to="/login" className='loginLink'>Log In</Link> </small>
      </div>
    </div>
  );
};

export default User;
