import React from 'react';

// Custom Components
import AutenticazioneForm from './forms/AutenticazioneForm';

//Footer
import Footer from '../utils/Footer';

// Schermata Login
export default function Autenticazione() {
    let authToken = localStorage.getItem('authToken');

    if (!authToken) {
        return (
            <div>
                <AutenticazioneForm />
            </div>
        );
    } else {
        window.location.replace("/");
    }
    
}