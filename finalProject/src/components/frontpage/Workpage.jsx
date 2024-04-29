import React from 'react'
import './workpage.css';
import '../../index.css';

function Workpage() {
  return (
    <div className='workpage'>
        <div className="workpage__header">
          <div className="top_rect"></div>
          <div className="workpage__title">
           <h2>HOW IT WORKS</h2> 
           <h3>Whether you're a homeowner in need of reliable professionals or a skilled service provider looking for new opportunities, we've got you covered</h3>
          </div>
        </div>
        <div className="workpage__body">
            <h2  className='start'>FOR CUSTOMER</h2>
        <div class="workpage__container">
            <div class="workpage__item">
                <div className="item__image">
                  <img src={"./assets/cus-1.png"} alt="" />
                </div>
                <h4>Step 1</h4>
            </div>
            <div class="workpage__item">
                  <div className="item__image">
                  <img src={"./assets/cus-2.png"} alt="" />
                  </div>
                <h4>Step 2</h4>
            </div>
            <div class="workpage__item">
                  <div className="item__image">
                  <img src={"./assets/cus-3.png"} alt="" />
                  </div>
                <h4>Step 3</h4>
            </div>
            <div class="workpage__item">
                  <div className="item__image">
                  <img src={"./assets/cus-4.png"} alt="" />
                  </div>
                <h4>Step 5</h4>
            </div>
        </div>

        </div>
        <div className="workpage__body">
            <h2  className='start'>FOR PROFESSIONAL</h2>
        <div class="workpage__container">
            <div class="workpage__item">
              
                <div className="item__image"> <img src={"./assets/cus-1.png"} alt="" /></div>
                <h4>Step 1</h4>
            </div>
            <div class="workpage__item">
                  <div className="item__image">
                  <img src={"./assets/cus-2.png"} alt="" />
                  </div>
                <h4>Step 2</h4>
            </div>
            <div class="workpage__item">
                  <div className="item__image">
                  <img src={"./assets/cus-3.png"} alt="" />
                  </div>
                <h4>Step 3</h4>
            </div>
            <div class="workpage__item">
                  <div className="item__image">
                  <img src={"./assets/cus-4.png"} alt="" />
                  </div>
                <h4>Step 4</h4>
            </div>
        </div>

        </div>
       
        <div className="bottom_rect"></div>
    </div>
  )
}

export default Workpage