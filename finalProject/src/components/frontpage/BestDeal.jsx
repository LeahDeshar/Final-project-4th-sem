import React from 'react'
import './best.css'
function BestDeal() {
  return (
    <div className="best">
         <div className="top_rect"></div>
    <div className='best__header'>
        <div class="column">
            <h2 className='because'>BECAUSE</h2>
            <h2>WE WORK HARD-YOU<br/> GET THE BEST DEAL</h2>
            <p style={{marginTop: '9%',paddingRight: '15px'}}>Our relentless dedication and hard work ensure that you receive unparalleled benefits when using our home service platform. We understand that your time and resources are valuable, and that's why we go above and beyond to secure the best deals for you.

            </p>
        <p  style={{marginTop: '9%',paddingRight: '15px'}}>
        We believe in empowering our customers with choice and flexibility. Through our competitive bidding system, you have access to a wide range of providers who will compete for your job, offering their best prices and service proposals. This creates a dynamic marketplace where you have the freedom to compare options and select the deal that best fits your needs and budget. With our commitment to customer satisfaction and our dedication to securing the best deals, you can be confident that you're getting exceptional value for your investment.
        </p>
        </div>
        <div class="column imagePart">
            <img src={'./assets/cus-5.png'} alt="akbf"/>
        </div>

        
    </div>
    <div className='best__header best__header-two'>
    <div class="column imagePart">
    <img src={'./assets/cus-6.png'} alt="akbf"/>

        </div>
        <div class="column">
            <h2 className='serve'>BEST SERVICES AT <br/>YOUR FINGERTIPS</h2>
            <div className='serve-container'>
                <h4 className='title-best'>The best for every budget</h4>
                <p className='body-best'>Find high-quality services at every price point. No
                hourly rates, just project-based pricing. </p>
                <h4 className='title-best'>Quality work done quickly</h4>
                <p className='body-best'>Find the right professional to begin working on your
                project within minutes. </p>
                <h4 className='title-best'>Protected payments.every time</h4>
                <p className='body-best'>Select the price of your choice.Great way to bargain.
                Bargain is at your fingertips.</p>
                <h4 className='title-best'>24/7 support</h4>
                <p className='body-best'>Questions? Our round-the-clock support team is
                available to help anytime, anywhere.</p>

            </div>
      
        </div>
       

        
    </div>
        <div className="bottom_rect"></div>
    </div>
  )
}

export default BestDeal