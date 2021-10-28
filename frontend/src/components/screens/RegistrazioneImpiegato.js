import React from 'react';

// Custom Components
import RegistrazioneImpiegatoForm from './forms/registrazioneImpiegato/RegistrazioneImpiegatoForm';

export default function RegistrazioneImpiegato() {  
    
    let authToken = localStorage.getItem('authToken');

    if (!authToken) {
        window.location.replace("/login");
    } else {

        let tipoUtente = localStorage.getItem("tipoUtente");

        if(tipoUtente !== "Admin") {
            window.location.replace("/login");
        } else {
            return (
                <div>
                    <RegistrazioneImpiegatoForm />
                </div>
            );
        }

        }
}