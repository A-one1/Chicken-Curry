import React from 'react';
import'../../App.css';
import './ContactForm.css';
import 'semantic-ui-css/semantic.min.css'

function ContactForm(){
    return(
       <div>
            <section className='contact'>
                <div className='content'>
                    <h2>Contact Us</h2>
                  
                </div>
                <div className='container'>
                    <div className='contactInfo'>
                        <div className='box'>
                            <div className='icon'><i class="location arrow icon"></i></div>
                            <div className='text'>
                                <h3>Address</h3>
                                <p>1300 Hooks Dr, Apt 7 <br /> Hammond, Louisiana-70401
                                </p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='icon'><i class="envelope icon"></i></div>
                            <div className='text'>
                                <h3>Email</h3>
                                <p>ChickenCurry@gmail.com
                                </p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='icon'><i class="phone icon"></i></div>
                            <div className='text'>
                                <h3>Phone</h3>
                                <p> 985-222-5131
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <form action='#'>
                            <h2>Send Message</h2>
                            <div className='inputBox'>
                                <input type='text' name='' required='required'>
                                    <span>Full Name</span></input>
                            </div>
                            <div className='inputBox'>
                                <input type='text' name='' required='required'>
                                    <span>Email</span></input>
                            </div>
                            <div className='inputBox'>
                                <textarea required='required'> </textarea>
                                    <span>Type your Message...</span>
                            </div>
                            <div className='inputbox'>
                                <input type='submit' name='' value='send'></input>                            </div>
                        </form>
                    </div>
                </div>
            </section>
       </div>
    )

}

export default ContactForm;
