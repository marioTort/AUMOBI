import React from 'react';


// Bootstrap Components
import { ProgressBar, Form, Container, Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';
import Footer from '../../../utils/Footer';
import InsertEmail from '../../../utils/InsertEmail';
import InsertPassword from '../../../utils/InsertPassword';
//import AlertMessage from '../../Utility/AlertMessage';


// Form credenziali di accesso
export default function CredenzialiForm() {

    function registrazioneCliente(e) {
        }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row className="gy-5">
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar variant="secondary" now={40} className="mb-4" />
                    <Form onSubmit={registrazioneCliente}>
                        <Row className="gy-4" >

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <InsertEmail controlId={"signupEmail"} placeholder={"Inserisci la tua email"} required>
                                    Email
                                </InsertEmail>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <InsertEmail controlId={"confermaEmail"} placeholder={"Conferma la tua email"} required>
                                    Conferma email
                                </InsertEmail>
                                <Form.Text id="confermaEmailError" className="d-none text-danger">Le email non coincidono!</Form.Text>
                            </Col>
                            
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <InsertPassword tooltip controlId={"signupPassword"} placeholder={"Inserisci la password"}>
                                    Password
                                </InsertPassword>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <InsertPassword controlId={"confermaPassword"} placeholder={"Conferma la tua password"}>
                                    Conferma password
                                </InsertPassword>
                                <Form.Text id="confermaPasswordError" className="d-none text-danger">Le password non coincidono!</Form.Text>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="cellulare">
                                    <Form.Label>Cellulare</Form.Label>
                                    <Form.Control type="tel" placeholder="Inserisci il numero di cellulare" pattern="^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$" required />
                                </Form.Group>
                            </Col>

                            <div className="d-flex justify-content-end">
                                <Button to="/registrazionecliente" variant="outline-secondary" submit>Indietro</Button>
                                <Button to="/datipatente" variant="outline-secondary" submit>Prosegui</Button>
                            </div>
                        </Row>
                        <br></br>
                    </Form>
                </Col>
            </Row>
        </Container >
        
    );
}