import React from 'react';
import axios from 'axios';
// Bootstrap Components
import { Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';
import SchermataErrore from './SchermataErrore'

// Riepilogo profilo
export default function VisualizzaDati() {

    async function eliminaAccount(event) {
        event.preventDefault();

        var data = JSON.stringify({
            email: JSON.parse(localStorage.getItem("datiPersonali")).email
        });

        var config = {
            method: 'delete',
            url: '/api/autenticazione/eliminaaccount',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.clear();
                alert("Account eliminato correttamente!");
                window.location.replace("/");
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    if (localStorage.getItem('authToken') === null) {
        return(
            <SchermataErrore />
        );
    } else {
        let dataNascita = JSON.parse(localStorage.getItem("datiPersonali")).dataDiNascita;
        let sesso = JSON.parse(localStorage.getItem("datiPersonali")).sesso;
        let luogoNascita = JSON.parse(localStorage.getItem("datiPersonali")).luogoDiNascita;
        let cf = JSON.parse(localStorage.getItem("datiPersonali")).CF
        return (
            <Row className="gy-4">
                <Col xs={{ span: 6 }}>
                    <h6 className="t-bold">DATA DI NASCITA</h6>
                    <p className="t-light">{dataNascita}</p>
                </Col>
                <Col xs={{ span: 6 }}>
                    <h6 className="t-bold">SESSO</h6>
                    <p className="t-light">{sesso}</p>
                </Col>
                <Col xs={{ span: 6 }}>
                    <h6 className="t-bold">COMUNE DI NASCITA</h6>
                    <p className="t-light">{luogoNascita}</p>
                </Col>
                <Col xs={{ span: 6 }}>
                    <h6 className="t-bold">CODICE FISCALE</h6>
                    <p className="t-light">{cf}</p>
                </Col>
                 <Button variant="outline-danger" onClick={eliminaAccount}>
                    Elimina account
                </Button>
            </Row>
        );
    }
}