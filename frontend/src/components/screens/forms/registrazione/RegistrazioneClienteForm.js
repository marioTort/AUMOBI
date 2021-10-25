import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Bootstrap Components
import { ProgressBar, Container, Row, Col, Form } from 'react-bootstrap';

// Custom Components
import CampoDataNascita from '../../../utils/CampoDataNascita';
import CampoLuogoNascita from '../../../utils/CampoLuogoNascita';
import Button from '../../../utils/Button';

const CodiceFiscale = require("codice-fiscale-js");

// Form Registrazione dati anagrafici
export default function RegistrazioneClienteForm() {

    const history = useHistory();
    
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [sesso, setSesso] = useState("");
    const [CF, setCF] = useState("");

    //PASSO I DATI ANAGRAFICI ALLA PAGINA CREDENZIALI TRAMITE I LOCAL STORAGE...
    function inviaDatiAnagrafici() {

        localStorage.setItem("nome", nome);
        localStorage.setItem("cognome", cognome);
        localStorage.setItem("sesso", sesso);
        localStorage.setItem("CF", CF);
        history.push("/credenziali")

    }

        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar className="mb-4" variant="secondary" now={20}/>
                    <Form onSubmit={inviaDatiAnagrafici}>
                        <Row className="gy-4">
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="nome" onChange={(event) => { setNome(event.target.value) }}>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il tuo nome" checked pattern="^[A-Za-zèùàòé][a-zA-Z'èùàòé ]*$"  required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="cognome" onChange={(event) => { setCognome(event.target.value) }}>
                                    <Form.Label>Cognome</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il tuo cognome" pattern="^[A-Za-zèùàòé][a-zA-Z'èùàòé ]*$"  required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <CampoDataNascita />
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="sesso" onChange={(event) => { setSesso(event.target.value) }}>
                                    <Form.Label>Sesso </Form.Label>
                                    <Form.Control className="form-select" as="select"  required>
                                        <option value="" disabled selected>Seleziona...</option>
                                        <option value="M">M</option>
                                        <option value="F">F</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <CampoLuogoNascita />
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="CF" onChange={(event) => { setCF(event.target.value) }}>
                                    <Form.Label className="me-2">Codice fiscale</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il tuo codice fiscale" required />
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