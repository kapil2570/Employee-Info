import React from 'react'
import '/src/Logo.css'
import { useState } from 'react'

function Logo({logoSrc, setLogoClick}) {
    const[click, setClick] = useState(false);

    const handleClick = () => {
        const image = document.querySelector('.logo-popup-overlay');
        image.style.display = "none"
        setLogoClick(false);
        setClick(true);
    }

  return (
    <div>
        <div className={`logo-popup-overlay ${logoSrc ? 'active' : ''}`} style={{zIndex:"100"}} onClick={handleClick}>
            <div className="logo-popup-content">
                <img className='rounded-full' style={{width:"250px", height:"250px"}} src={logoSrc} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Logo