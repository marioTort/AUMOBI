import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Bootstrap Components
import {Container, Row, Col, Form} from "react-bootstrap";

// Custom Components
import Button from "../../utils/Button";
import CampoEmail from '../../utils/CampoEmail';
import CampoPassword from '../../utils/CampoPassword';

export default function AutenticazioneForm() {

    async function effettuaLogin(event) {
        event.preventDefault();

        var data = JSON.stringify({
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password')
        });

        var config = {
            method: 'post',
            url: '/api/autenticazione/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.clear();
                localStorage.setItem("authToken", response.data.token);
                localStorage.setItem("datiPersonali", JSON.stringify(response.data.utente));
                localStorage.setItem("datiCarta", JSON.stringify(response.data.datiCarta));
                localStorage.setItem("datiPatente", JSON.stringify(response.data.datiPatente));
                localStorage.setItem("cifre", JSON.stringify(response.data.quattroCifre));
                
                if (response.data.utente.tipoUtente === "Parcheggiatore") {
                    localStorage.setItem("tipoUtente", "Parcheggiatore");
                    window.location.replace("/schermataparcheggiatore");
                }
                
                if (response.data.utente.tipoUtente === "Autista") {
                    localStorage.setItem("tipoUtente", "Autista");
                    window.location.replace("/schermataautista");
                }
                
                if (response.data.utente.tipoUtente === "Admin") {
                    localStorage.setItem("tipoUtente", "Admin");
                    window.location.replace("/schermataadmin");
                }
                
                if (response.data.utente.tipoUtente !== "Admin" && response.data.utente.tipoUtente !== "Autista" && response.data.utente.tipoUtente !== "Parcheggiatore") {
                    //Cliente...
                    localStorage.setItem("tipoUtente", "Cliente");
                    window.location.replace("/schermatacliente");
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    if (localStorage.getItem('authToken')) {
        window.location.replace("/");
    } else {
        return (
            <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">

                <Row className="align-items-center gy-4">

                    <Col fluid className="form" xs={{ span: 15, offset: 0 }} lg={{ span: 20, offset: 0 }}>
                        <br></br>
                        <h1 className="h1 text-center t-bold mb-4">Login</h1>
                        <Form onSubmit={effettuaLogin}>
                            <Row className="gy-4">
                                <CampoEmail controlId={"email"} placeholder={"Inserisci la tua email"} required>
                                    Email
                                </CampoEmail>
                                <CampoPassword controlId={"password"} placeholder={"Inserisci la tua password"}>
                                    Password
                                </CampoPassword>


                                <Link to="/recuperapassword" className="link-secondary">Hai dimenticato la password?</Link>


                                <Link to="/registrazionecliente" className="link-secondary">Non hai ancora un account? Registrati?</Link>

                                <Button variant="outline-success" submit>Accedi</Button>

                            </Row>
                            <br></br>
                        </Form>
                    </Col>

                </Row>
            </Container >
        );
    } 
}