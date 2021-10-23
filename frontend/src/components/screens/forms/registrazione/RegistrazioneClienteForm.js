import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Bootstrap Components
import { ProgressBar, Container, Row, Col, Form } from 'react-bootstrap';

// Custom Components
import InputDataNascita from '../../../utils/InputDataNascita';
import InputLuogoNascita from '../../../utils/InputLuogoNascita';
import Button from '../../../utils/Button';

// Form Registrazione dati anagrafici
export default function RegistrazioneClienteForm() {
    const history = useHistory();
    
    
    useEffect(() => {
    

        })
    

    function onSubmit(e) {
            e.preventDefault();
            
                const userData = {
                    cognome: document.querySelector("#cognome").value,
                    nome: document.querySelector("#nome").value,
                    dataNascita: document.querySelector("#dataNascita").value,
                    sesso: document.querySelector("#sesso").value,
                    luogoNascita: {
                        regione: document.querySelector("#regione").value,
                        provincia: document.querySelector("#provincia").value,
                        citta: document.querySelector("#comune").value,
                    },
                    codiceFiscale: document.querySelector("#CF").value
                }
                
                
                    // richiesta al server per registrare l'utente passando i dati inseriti
                    axios.post("/", userData)
                        .then((res) => {   
                            history.push("/credenziali", {payload: userData});
                        })
        }
    

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar className="mb-4" variant="secondary" now={20}/>
                    <Form onSubmit={onSubmit}>
                        <Row className="gy-4">
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="nome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il tuo nome" checked pattern="[A-z]+\ [A-z]+"  required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="cognome">
                                    <Form.Label>Cognome</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il tuo cognome" pattern="[A-z]+\ [A-z]+"  required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <InputDataNascita />
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
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
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="CF">
                                    <Form.Label className="me-2">Codice fiscale</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il tuo codice fiscale"  required />
                                </Form.Group>
                            </Col>
                            
                            <div className="d-flex justify-content-end">
                                <Button variant="outline-secondary" submit={onSubmit} >Prosegui</Button>
                            </div>
                            
                        </Row>
                        <br></br>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}