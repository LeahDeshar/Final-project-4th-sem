import React from 'react';
import './content.css';
import {Link} from "react-router-dom"
const ContentPage = () => {
  return (
    <div className="content_container">
        <div className="content-page">
        <div className="content-page__left">
            <h1 className="content-page__title">Home Service Platform</h1>
            <p className="content-page__description">
            we connect customers with trusted service providers for all their home service needs. Whether you're looking for plumbing repairs, electrical installations, cleaning services, or any other home maintenance tasks, we've got you covered.


            </p>
            <button className="navbar__button content-page__button">
              <Link to={'/about'}>Learn More</Link>
              </button>
        </div>
        <div className="content-page__right">
            <img src="/assets/main.png" alt="not found" className="content-page__image" />
            <div className="ellipse"></div>
        </div>
        </div>

    </div>
  );
};

export default ContentPage;
