import React from 'react'
import './community.css'
function Community() {
  return (
    <div className="community">
    <div className="top_rect"></div>
    <div className="community__body">
        <h2>JOIN THE COMMUNITY.<br/>
JOIN US ON</h2>

<div className="btn__community">
    <div className="navbar__button">TWITTER</div>
    <div className="navbar__button">FACEBOOK</div>

</div>
<div className="footer__logo">
    <img src={'/assets/logo2.png'} alt='Not found' className="navbar__logo" />
</div>
<div className="footer__note">
<h3>Feel free to reach out to us, and let us enhance your home service experience.</h3>
<p>Join our platform today and experience the convenience, reliability, and cost-effectiveness that sets us apart. We are here to make your home service journey seamless and rewarding, ensuring that you always receive the best deal available.</p>

</div>
    </div>
   <div className="bottom_rect"></div>
    </div>
  )
}

export default Community