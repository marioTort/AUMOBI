import React from 'react';
import { useHistory } from 'react-router-dom';

// Custom Components
import RegistrazioneClienteForm from './forms/registrazione/RegistrazioneClienteForm';
//import DatiBancariForm from './forms/registrazione/DatiBancariForm';
//import DatiPatenteForm from './forms/registrazione/DatiPatenteForm';
//import CredenzialiForm from './forms/registrazione/CredenzialiForm.js';
//import RegistrazioneCompletata from './forms/registrazione/RegistrazioneCompletata';

import Footer from '../utils/Footer';

// Dynamic SchermataRegistrazione
export default function RegistrazioneCliente() {
    /*const history = useHistory();

    if (history.location.state) {
        switch (history.location.state.type) {
            case "RICHIESTA_PATENTE":
                return (
                        <RichiestaPatenteForm />
                );
            case "PATENTE":
                return (
                        <DatiPatenteForm />
                );
            case "CREDENZIALI":
                return (
                        <CredenzialiForm />
                );
            case "COMPLETATO":
                return (
                        <RegistrazioneCompletata />
                );
        }
    } else { */
        return (
            <div>
                <RegistrazioneClienteForm />
                
            </div>
        );
    //}
}
