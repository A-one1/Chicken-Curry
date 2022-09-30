import { click } from '@testing-library/user-event/dist/click';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import './Navbar.css'


function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const [button,setButton] = useState(true);

  const showButton = () => {
    if(window.innerWidth <=960) {
      setButton(false);
    }else{
      setButton(true);
    }
  };
  window.addEventListener('resize',showButton);
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container">
            <Link to='/' className="navbar-logo">
              CURRY <i className="fab fa-typo3"></i>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}> 

            <li className='nav-items'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className='nav-items'>
              <Link to='/menu' className='nav-links' onClick={closeMobileMenu}>
                Menu
              </Link>
            </li>
            
            <li className='nav-items'>
              <Link to='/order-now' className='nav-links' onClick={closeMobileMenu}>
                ORDER NOW
              </Link>
            </li>
            <li className='nav-items'>
              <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li>
            </ul>
            {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}

          </div>
        </nav>
      </>
  )
}

export default Navbar