// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import store from '../../redux/store';
// import { userLogin } from '../../redux/auth/authAction';
// import './login.css';
// import { useSelector } from 'react-redux';

// function Login() {
//   const navigate = useNavigate();
//   const [rememberMe, setRememberMe] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [error,setError] = useState("");
//   const stateError = useSelector((state)=>state.auth.error)
//   console.log("user",stateError)

  
//   const loginHandler =(e) => {
//     e.preventDefault()
   
//       console.log(role + " " + email + "" + password )
//       if (!role || !email || !password) {
//         setError("Fill all the field and try again!");
//         return;
//       }
//        store.dispatch(userLogin({email, password, role}))
//       if(stateError)
//       {
//         setError(stateError)
//         return;
//       }else 
//       {
//         // console.log("login", e, email, password, role);
//         console.log("there is a bug")
//         navigate('/');
//       }
         
//   };
//   const handleRememberMe = () => {
//     setRememberMe(!rememberMe);
//   };

//   const handleForgotPassword = () => {
//     // Handle forgot password logic here
//     console.log('Forgot password clicked');
//   };

//   return (
//     <div className='login__container'>
//       <div className='login__body'>
//         <div className='register__title'>
//           <h3>Login To Your Account</h3>
//           <h3>Welcome Back</h3>
//         </div>

//         <div className='register__wrap'>
//           <div className='register__btn'>
//             <div className='navbar__button'>WITH FACEBOOK</div>
//             <div className='navbar__button'>WITH GOOGLE</div>
//           </div>
//           <div className='login__form'>
//            {error && <p className='error-msg'>{error}</p>}
//             <form action=''>
//               <input type='text' placeholder='Enter Your Email' onChange={(e)=>{setEmail(e.target.value); setError("")}} required/>
//               <br />
//               <input type='password' placeholder='Enter Your Password' onChange={(e)=>{setPassword(e.target.value); setError("")}} />
//               <div className="role">
//                 <div className="customer__role">
//                   <input type="radio" name='role' value={"Customer"} id='customer' onChange={(e)=>{setRole(e.target.value); setError("")}}/>
//                   <label htmlFor="customer">Customer</label>
//                 </div>
//                 <div className="provider__role">
//                   <input type="radio"  name='role' value={"Provider"} id='provider' onChange={(e)=>{setRole(e.target.value); setError("")}}/>
//                   <label htmlFor="provider">Provider</label>
//                 </div>
//               </div>
//               <div className='remember-forgot'>
//                 <div><label htmlFor='rememberMe'>
//                   <input
//                     type='checkbox'
//                     id='rememberMe'
//                     checked={rememberMe}
//                     onChange={handleRememberMe}
//                   />
//                   Remember Me
//                 </label></div>
//                 <div><span className='forgot-password' onClick={handleForgotPassword}>
//                   Forgot Password?
//                 </span></div>
                
                
//               </div>
//               <div className='navbar__button create_btn' onClick={loginHandler}>
//                 CREATE ACCOUNT
//               </div>
//               <div className="join">
//               <p >Don’t have an account? Join</p>

//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div className='bottom_rect'></div>
      
//     </div>
//   );
// }

// export default Login;


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../redux/store';
import { userLogin } from '../../redux/auth/authAction';
import './login.css';
import { useSelector } from 'react-redux';

function Login() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const stateError = useSelector((state) => state.auth.error);
  console.log("user", stateError);

  const validateForm = () => {
    if (!email || !password || !role) {
      setError("All fields are required.");
      return false;
    }

    // You can add more specific validation logic here, such as checking email format.

    return true;
  };

  const loginHandler = (e) => {
    e.preventDefault();

    if (validateForm()) {
      store.dispatch(userLogin({ email, password, role })).then((result) => {
        if (userLogin.fulfilled.match(result)) {
          navigate('/');
        }
        setError(stateError)
       
      }).catch((e)=>
      {
        console.log(e)
      })
      
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot password clicked');
  };

  return (
    <div className='login__container'>
      <div className='login__body'>
        <div className='register__title'>
          <h3>Login To Your Account</h3>
          <h3>Welcome Back</h3>
        </div>

        <div className='register__wrap'>
          <div className='register__btn'>
            <div className='navbar__button'>WITH FACEBOOK</div>
            <div className='navbar__button'>WITH GOOGLE</div>
          </div>
          <div className='login__form'>
            {error && <p className='error-msg'>{error}</p>}
            <form action=''>
              <input type='text' placeholder='Enter Your Email' onChange={(e) => { setEmail(e.target.value); setError("") }} />
              <br />
              <input type='password' placeholder='Enter Your Password' onChange={(e) => { setPassword(e.target.value); setError("") }} />
              <div className="role">
                <div className="customer__role">
                  <input type="radio" name='role' value={"Customer"} id='customer' onChange={(e) => { setRole(e.target.value); setError("") }} />
                  <label htmlFor="customer">Customer</label>
                </div>
                <div className="provider__role">
                  <input type="radio" name='role' value={"Provider"} id='provider' onChange={(e) => { setRole(e.target.value); setError("") }} />
                  <label htmlFor="provider">Provider</label>
                </div>
              </div>
              <div className='remember-forgot'>
                <div>
                  <label htmlFor='rememberMe'>
                    <input
                      type='checkbox'
                      id='rememberMe'
                      checked={rememberMe}
                      onChange={handleRememberMe}
                    />
                    Remember Me
                  </label>
                </div>
                <div>
                  <span className='forgot-password' onClick={handleForgotPassword}>
                    Forgot Password?
                  </span>
                </div>
              </div>
              <div className='navbar__button create_btn' onClick={loginHandler} style={{textAlign: "center"}}>
                LOGIN
              </div>
              <div className="join">
                <p>Don’t have an account? Join</p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='bottom_rect'></div>
    </div>
  );
}

export default Login;
