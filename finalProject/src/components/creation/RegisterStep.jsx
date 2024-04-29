import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './registerstep.css'
import { UserContext } from "../utils/Context";
const RegisterStep = ({ step1, step2, step3,step4}) => {
  const {userInput}=useContext(UserContext)
  return (
    <div className="register-step">
      <div className="register-step__nav">
        <div className="register-step__item">
          {step1 ? (
            <Link to="/login">Login</Link>
          ) : (
            <span className="register-step__item--disabled">Login</span>
          )}
        </div>
        <div className="register-step__item">
          {step2 ? (
            <Link to="/user">User</Link>
          ) : (
            <span className="register-step__item--disabled">User</span>
          )}
        </div>
        <div className="register-step__item">
          {step3 ? (
            <Link to="/register">Register</Link>
            ) : (
              <span className="register-step__item--disabled">Register</span>
              )}
        </div>
              <div className="register-step__item">
          {step4 ? (
            <Link to="/profile">Create Profile</Link>
          ) : (
            <span className="register-step__item--disabled">Create Profile</span>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default RegisterStep;
