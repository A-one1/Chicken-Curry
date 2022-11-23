import '../../App.css'
import React from 'react';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { Map } from '../../components/Maps/Map';

export const ContactUs = () => {
    return(
        <>
            <ContactForm />
            <Map />
        </>
    );
}

