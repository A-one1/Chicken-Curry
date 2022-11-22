import '../../App.css'
import React from 'react';
import Map from '../../components/Maps/Map';
import ContactForm from '../../components/ContactForm/ContactForm';

function ContactUs(){
    return(
        <>
            <ContactForm />
            <Map />
        </>
    );
}

export default ContactUs;