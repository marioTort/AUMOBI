import React, { useEffect } from 'react';


// Bootstrap Components
import { Container, Row, Col, Form } from 'react-bootstrap';

// Custom Components
import InputDataNascita from '../../../utils/InputDataNascita';
import InputLuogoNascita from '../../../utils/InputLuogoNascita';
import Button from '../../../utils/Button';
import InsertEmail from '../../../utils/InsertEmail';
import InsertPassword from '../../../utils/InsertPassword';

// Form Registrazione dati anagrafici
export default function RegistrazioneClienteForm() {
    

    useEffect(() => {
    

        })
    

    function onSubmit(e) {
        
        }
    

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione impiegato</h1>
                    <Form onSubmit={onSubmit}>
                        <Row className="gy-4">
                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="nome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci nome" checked pattern="[A-z]+\ [A-z]+"  required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="cognome">
                                    <Form.Label>Cognome</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci cognome" pattern="[A-z]+\ [A-z]+"  required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <InputDataNascita />
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="sesso">
                                    <Form.Label>Sesso </Form.Label>
                                    <Form.Control className="form-select" as="select"  required>
                                        <option value="" disabled selected>Seleziona...</option>
                                        <option value="M">M</option>
                                        <option value="F">F</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <InputLuogoNascita />

                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <InsertEmail controlId={"signupEmail"} placeholder={"Inserisci email"} required>
                                    Email
                                </InsertEmail>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <InsertEmail controlId={"confermaEmail"} placeholder={"Conferma email"} required>
                                    Conferma email
                                </InsertEmail>
                                <Form.Text id="confermaEmailError" className="d-none text-danger">Le email non coincidono!</Form.Text>
                            </Col>
                            
                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <InsertPassword tooltip controlId={"signupPassword"} placeholder={"Inserisci password"}>
                                    Password
                                </InsertPassword>
                            </Col>

                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <InsertPassword controlId={"confermaPassword"} placeholder={"Conferma password"}>
                                    Conferma password
                                </InsertPassword>
                                <Form.Text id="confermaPasswordError" className="d-none text-danger">Le password non coincidono!</Form.Text>
                            </Col>

                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="CF">
                                    <Form.Label className="me-2">Codice fiscale</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci codice fiscale"  required />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="cellulare">
                                    <Form.Label>Cellulare</Form.Label>
                                    <Form.Control type="tel" placeholder="Inserisci numero di cellulare" pattern="^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$" required />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="numeroPatente">
                                    <Form.Label>Numero patente</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci numero di patente" pattern="[a-zA-Z]{2}\d{7}[a-zA-Z]{1}" required/>
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="dataScadenza">
                                    <Form.Label>Data di scadenza</Form.Label>
                                    <Form.Control type="month" placeholder="Inserisci data di scadenza" required/>
                                </Form.Group>                             
                            </Col>

                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="tipologiaPatente">
                                    <Form.Label>Tipologia patente</Form.Label>
                                    <Form.Control  className="form-select" as="select" required>
                                        <option value="" disabled selected>Seleziona...</option>
                                        <option value="B">B</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="tipologiaImpiegato">
                                    <Form.Label>Tipologia impiegato </Form.Label>
                                    <Form.Control className="form-select" as="select"  required>
                                        <option value="" disabled selected>Seleziona...</option>
                                        <option value="A">Autista</option>
                                        <option value="P">Parcheggiatore</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            
                            <div className="d-flex justify-content-end">
                                <Button variant="outline-secondary" submit >Prosegui</Button>
                            </div>
                            
                        </Row>
                        <br></br>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}