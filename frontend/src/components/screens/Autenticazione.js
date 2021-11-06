import React from 'react';

// Custom Components
import AutenticazioneForm from './forms/AutenticazioneForm';

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