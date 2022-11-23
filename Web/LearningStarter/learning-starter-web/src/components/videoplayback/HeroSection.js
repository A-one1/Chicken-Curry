import React from 'react';
import'../../App.css';
import { Button } from '../navigation/button';
import './HeroSection.css';

function HeroSection(){
    return(
        <div className='hero-container'>
            <video  src="/videos/video-1.mp4" autoPlay loop muted />
            <h1> FOOD AWAITS</h1>
            <p> What are you waiting for? </p>
            <div className='hero-btns'>
                {/* <Button
                 className='btns' 
                 buttonStyle='btn--outline'
                  buttonSize='btn--large'> 
                BOOK NOW
                </Button> */}

                <Button
                 className='btns' 
                 buttonStyle='btn--primary'
                  buttonSize='btn--large'
                  > 
                  ORDER NOW
                </Button>

            </div>
        </div>
    )

}

export default HeroSection;
