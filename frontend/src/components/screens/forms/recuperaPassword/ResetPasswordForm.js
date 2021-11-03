import React from 'react';
import axios from 'axios';
// Bootstrap Components
import { Form, Container, Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button'
import CampoPassword from '../../../utils/CampoPassword';

// Recupero Password Form
export default function ResetPasswordForm() {
    let authToken = localStorage.getItem('authToken');

    async function resetPassword(event) {

        event.preventDefault();

        if (document.querySelector("#password").value !== document.querySelector("#confermaPassword").value) {
            document.querySelector("#erroreMatchPassword").classList.remove("d-none");
            return
        } else {

            var data = JSON.stringify({
                password: localStorage.getItem('password')
            });

            var config = {
                method: 'put',
                url: `/api/autenticazione/resetpassword/${localStorage.getItem('resetToken')}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    window.location.replace("/resetpasswordcompletato");
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

    }

    if (!authToken) {
        return (
            <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
                <Row className="align-items-center gy-4">
                    <Col fluid className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 12, offset: 1 }}>
                        <br></br>
                        <h1 className="h1 text-center t-bold">Reset password</h1>
                        <p className="h4 text-center t-extralight">Inserisci una nuova password</p>
                        <br></br>
                        <Form onSubmit={resetPassword} >
                            <Row className="gy-4">
                                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                    <CampoPassword tooltip controlId={"password"} placeholder={"Inserisci la password"}>
                                        Password
                                    </CampoPassword>
                                </Col>

                                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                    <CampoPassword controlId={"confermaPassword"} placeholder={"Conferma la tua password"}>
                                        Conferma password
                                    </CampoPassword>
                                    <Form.Text id="erroreMatchPassword" className="d-none text-danger">Le password non coincidono!</Form.Text>                            </Col>
                                <div className="d-flex justify-content-center">
                                    <Button variant="outline-success" submit>Prosegui</Button>
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