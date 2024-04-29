// import React, { useContext } from 'react'
// import './register.css'
// import RegisterStep from './RegisterStep'
// import { useNavigate } from 'react-router-dom'
// import { UserContext } from '../utils/Context'
// import store from '../../redux/store'
// import { userRegister } from '../../redux/auth/authAction'
// function Register() {
//     const {userInput,updateUserEmail,updateUserName,updateUserPhone,updateUserPassword,
//         name,email,phonenumber,password
    
//     } = useContext(UserContext)
//     const role = userInput
//     console.log(role)
//    const navigate= useNavigate()
//    const emailHandler =(e)=>
//    {
//     updateUserEmail(e.target.value);
//    }
//    const phoneHandler = (e)=>
//    {
//     updateUserPhone(e.target.value);
//    }
//    const nameHandler = (e)=>
//    {
//     updateUserName(e.target.value);
//    }
//    const passwordHandler = (e)=>
//    {
//     updateUserPassword(e.target.value);
//    }
//     const accounthandler = ()=>{
       
//             store.dispatch(userRegister({name,email,role,phonenumber,password}))
//             navigate('/profile')
       
//     }
//   return (
//     <div className='register__container'>

//         <div className="register__body">
//                 <RegisterStep step1 step2 step3/>
//             <div className="register__title">
//                 <h3>Create Your Account</h3>
//                 <h3>Account For {userInput}</h3>
//             </div>

//             <div className="register__wrap">
//             <div className="register__btn">
//             <div className="navbar__button">WITH FACEBOOK</div>
//             <div className="navbar__button">WITH GOOGLE</div>
            

//             </div>
//             <div className="register__form">
//                 <form action="">
//                     <div className="name__number">
//                     <input type="text"  placeholder='User Name' onChange={nameHandler}/>
//                     <input type="text"  placeholder='Enter Your Phone Number' onChange={phoneHandler}/>

//                     </div>
//                     <input type="text"  placeholder='Enter Your Email' onChange={emailHandler}/>
//                     <br/>
//                     <input type="password" placeholder='Enter Your Password' onChange={passwordHandler} />
//                     <div className='navbar__button create_btn' onClick={accounthandler}>CREATE ACCOUNT</div>
//                     <p>Already have an account? Log In</p>
//                 </form>
//             </div>

//             </div>
//         </div>
//     <div className="bottom_rect"></div>

//     </div>
//   )
// }

// export default Register


import React, { useContext, useState } from 'react';
import './register.css';
import RegisterStep from './RegisterStep';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/Context';
import store from '../../redux/store';
import { userRegister } from '../../redux/auth/authAction';

function Register() {
  const { userInput, updateUserEmail, updateUserName, updateUserPhone, updateUserPassword } = useContext(UserContext);
  const role = userInput;
  const navigate = useNavigate();

  // Form state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Error state variables
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const emailHandler = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const phoneHandler = (e) => {
    setPhone(e.target.value);
    setPhoneError('');
  };

  const nameHandler = (e) => {
    setName(e.target.value);
    setNameError('');
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const accountHandler = () => {
    // Validate name
    if (name.trim() === '') {
      setNameError('Please enter your name');
      return;
    }

    // Validate email
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email');
      return;
    }

    // Validate phone number
    if (phone.trim() === '') {
      setPhoneError('Please enter your phone number');
      return;
    }
    const validateNumber = /[0-9]/.test(phone);
    if(!validateNumber && phone.length > 11)
      {
        setPhoneError("Please enter the nu,valid number")
        return;
      }

    // Validate password
    if (password.trim() === '') {
      setPasswordError('Please enter your password');
      return;
    }
      const charaterINName = /[A-Za-z]/.test(name)

      
      if(!charaterINName)
      {
        setPasswordError('Please enter valid name');
        return;
      }
      const minLength = 8; // Minimum length
      const hasUppercase = /[A-Z]/.test(password); // At least one uppercase letter
      const hasLowercase = /[a-z]/.test(password); // At least one lowercase letter
      const hasNumber = /\d/.test(password); // At least one digit
      const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password); // At least one special character
    
      // Check if the password meets all criteria
      if (password.length < minLength) {
        setPasswordError('Password must be at least 8 characters long');
        return;
      } else if (!hasUppercase) {
        setPasswordError('Password must contain at least one uppercase letter');
        return;

      } else if (!hasLowercase) {
        setPasswordError('Password must contain at least one lowercase letter');
        return;

      } else if (!hasNumber) {
        setPasswordError('Password must contain at least one digit');
        return;

      } else if (!hasSpecialChar) {
        setPasswordError('Password must contain at least one special character');
        return;

      } else {
        // If the password meets all validation criteria, clear the error
        setPasswordError('');
        // Proceed with further actions, such as submitting the form or updating the state
      }
    console.log({ name, email, role, phonenumber: phone, password })
    store.dispatch(userRegister({ name, email, role, phonenumber: phone, password }));
    navigate('/profile');
  };

  return (
    <div className="register__container">
      <div className="register__body">
        <RegisterStep step1 step2 step3 />
        <div className="register__title">
          <h3>Create Your Account</h3>
          <h3>Account For {userInput}</h3>
        </div>
        <div className="register__wrap">
          <div className="register__btn">
            <div className="navbar__button">WITH FACEBOOK</div>
            <div className="navbar__button">WITH GOOGLE</div>
          </div>
          <div className="register__form">
            <form>
                {nameError && <span className="error-message ">{nameError}</span>}
                {phoneError && <span className="error-message">{phoneError}</span>}
                {emailError && <span className="error-message">{emailError}</span>}
                {passwordError && <span className="error-message">{passwordError}</span>}
              <div className="name__number">
                <input type="text" placeholder="User Name" onChange={nameHandler} value={name} />
                <input type="text" placeholder="Enter Your Phone Number" onChange={phoneHandler} value={phone} />
              </div>
              <input type="text" placeholder="Enter Your Email" onChange={emailHandler} value={email} />
              
              <input type="password" placeholder="Enter Your Password" onChange={passwordHandler} value={password} />
              
              <div className="navbar__button create_btn" onClick={accountHandler}>
                CREATE ACCOUNT
              </div>
              <p>Already have an account? Log In</p>
            </form>
          </div>
        </div>
      </div>
      <div className="bottom_rect"></div>
    </div>
  );
}

export default Register;
