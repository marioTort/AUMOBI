import React from 'react';

// Custom Components
import AutenticazioneForm from './forms/AutenticazioneForm';

//Footer
import Footer from '../utils/Footer';

// Schermata Login
export default function Autenticazione() {

    return (
        <div>      
            <AutenticazioneForm />                
            <Footer/>         
        </div>
    );
}