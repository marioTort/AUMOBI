import React from 'react';

// Custom Components
import RecuperaPasswordForm from './forms/recuperaPassword/RecuperaPasswordForm';
import Footer from '../utils/Footer';

// Schermata Recupero Password
export default function RecuperaPassword() {

    return (
        <div>
            <RecuperaPasswordForm />
            <Footer/>
        </div>
    );
}