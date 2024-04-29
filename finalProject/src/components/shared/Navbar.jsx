import React, { useEffect, useRef, useState } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsBell, BsEnvelope } from 'react-icons/bs';
import store from '../../redux/store';
import { deleteCurrentUser, updateUserNoti } from '../../redux/auth/authAction';
import { getProfileOfUser } from '../../redux/profile/profileAction';
import { BiLogInCircle } from "react-icons/bi";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { logout } from '../../redux/auth/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth.user);

  // State for dropdown menu
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  let length = 0;
  if (userLogin && userLogin.notification.length > 0) {
    length = userLogin.notification.length;
  }

  let id;
  if (userLogin) {
    id = userLogin._id;
  }
  
  const logoutAccount = () => {
    // Dispatch the logout action to reset the user state
    dispatch(logout());
    setDropdownOpen(false)
    navigate('/')

  };
  useEffect(() => {
    if (userLogin) {
      dispatch(getProfileOfUser({ id }));
    }
  }, []);

  useEffect(() => {
    // Update root HTML element class based on theme
    document.documentElement.className = theme;

    // Save selected theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const profile = useSelector((state) => state.users.profile);
  let image = '';
  if (userLogin && profile) {
    image = `http://localhost:3001/uploads/${profile.userImage}`;
  }

  const notificationHandle = () => {
    if (userLogin && userLogin.notification.length > 0) {
      // setTimeout(() => {
      //   store.dispatch(updateUserNoti());
      // }, 3000);
        store.dispatch(updateUserNoti());
        navigate('/notification')

    }
  };
  const deleteAccount = ()=>
  {
    setDropdownOpen(false)
    const isConfirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    console.log(isConfirmed)
    if(isConfirmed)
    {
      dispatch(deleteCurrentUser())
      navigate("/register")
    }
  }
  return (
    <div className={`navbar__container ${theme}`}>
      <nav className="navbar">
        <div className="navbar__left">
          <img src={'/assets/logo2.png'} alt="Not found" className="navbar__logo" />
        </div>

        <div className="navbar__center">
          <ul className="navbar__list">
            <Link className="navbar__item" to="/">
              Home
            </Link>
            <Link className="navbar__item" to="/about">
              About
            </Link>
            <Link className="navbar__item" to="/services">
              Services
            </Link>
          </ul>
        </div>

        <div className="navbar__right">
          {userLogin ? (
            <>
              <div className="person__btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img src={image} alt="User" />
              </div>
              {dropdownOpen && (
                <div className="dropdown__menu" >
                  <Link to="/viewprofile" className="dropdown__item" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <TfiCommentsSmiley/> Profile
                  </Link>
                  <p className="dropdown__item" onClick={()=>{setTheme(theme === 'light' ? 'dark' : 'light');setDropdownOpen(!dropdownOpen)}}>
                    <BsFillBrightnessHighFill/> Theme
                  </p>
                  <p className="dropdown__item logout-account" onClick={logoutAccount}>
                    <BiLogInCircle/> Logout
                  </p>
                  <p className="dropdown__item" onClick={ deleteAccount}>
                    <AiOutlineDelete/>
                    Delete Account
                  </p>
                </div>
              )}
              <div className='welcome'>
                Welcome <br /> {userLogin.name}
              </div>
              <Link to="/notifications" onClick={notificationHandle} style={{margin: "10px"}}>
                <BsBell  style={{color: "black"}} className='notiMessage'/>
                {length > 0 ? <small className="noti__count">{length}</small> : <></>}
              </Link>
              <Link to="/messages">
                <BsEnvelope className='notiMessage' />
               
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__link login">
                Login
              </Link>
              <button className="navbar__button">
                <Link to="/user">Sign Up</Link>
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
