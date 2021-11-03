import React from 'react';
import axios from 'axios';
// Bootstrap Components
import { Form, Container, Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button'
import CampoEmail from '../../../utils/CampoEmail';

// Recupero Password Form
export default function RecuperaPasswordForm() {
    let authToken = localStorage.getItem('authToken');

    async function recuperaPassword(event) {

        event.preventDefault();

        var data = JSON.stringify({
            email: localStorage.getItem('email')
        });

        var config = {
            method: 'post',
            url: '/api/autenticazione/recuperapassword',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem('resetToken', response.data.resetToken);
                window.location.replace("/recuperapasswordcompletato");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    if (!authToken) {
        return (
            <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
                <Row className="align-items-center gy-4">
                    <Col fluid className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                        <br></br>
                        <h1 className="h1 text-center t-bold">Recupera password</h1>
                        <p className="h4 text-center t-extralight">Inserisci l'email utilizzata in fase di registrazione per proseguire</p>
                        <Form>
                            <Row className="gy-4">
                                <CampoEmail controlId={"loginEmail"} placeholder={"Inserisci la tua email"} required>
                                    Email
                                </CampoEmail>
                                <div className="d-flex justify-content-center">
                                    <Button variant="outline-success" onClick={recuperaPassword}>Prosegui</Button>
                                </div>
                            </Row>
                            <br></br>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    } else {
        window.location.replace("/");
    }
}