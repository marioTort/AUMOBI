import React from 'react'

import { Row, Col, Form } from 'react-bootstrap'

import Button from '../../../utils/Button'
import InsertEmail from '../../../utils/InsertEmail';

export default function RicercaImpiegato() {

    function onSubmit(e) {
        
    }

    return (
        <Form onSubmit={onSubmit}>
            <Row className="gy-3 align-items-end">
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="idUtente">
                        <Form.Label>Email impiegato</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci id utente" />
                    </Form.Group>
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="cognomeUtente">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci cognome utente" />
                    </Form.Group>
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <InsertEmail controlId={"emailUtente"} placeholder={"Inserisci email utente"}>
                        Codice fiscale
                    </InsertEmail>
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="tipoUtente">
                        <Form.Label>Tipo impiegato</Form.Label>
                        <Form.Control className="form-select" as="select">
                            <option value="" disabled selected>Seleziona...</option>
                            <option value="A">Autista</option>
                            <option value="P">Parcheggiatore</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                
                <Col xs={{ span: 12 }} className="justify-content-end d-flex">
                    <Button variant="outline-primary" submit>Cerca</Button>
                </Col>
            </Row>
        </Form>
    );
}