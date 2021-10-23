import React from 'react';

// Custom Components
import ResetPasswordForm from './forms/recuperaPassword/ResetPasswordForm';
import Footer from '../utils/Footer';

// Schermata Recupero Password
export default function ResetPassword() {

    return (
        <div>
            <ResetPasswordForm />
            <Footer/>
        </div>
    );
}