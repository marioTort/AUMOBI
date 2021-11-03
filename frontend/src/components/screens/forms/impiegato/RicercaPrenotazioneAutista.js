import React from 'react'

import { Row, Col, Form } from 'react-bootstrap'

import Button from '../../../utils/Button'
import CampoEmail from '../../../utils/CampoEmail';

export default function RicercaPrenotazioneAutista() {

    function onSubmit(e) {
        
    }

    return (
        <Form onSubmit={onSubmit}>
            <Row className="gy-3 align-items-end">
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="#Prenotazione">
                        <Form.Label>N° Prenotazione</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci # prenotazione" />
                    </Form.Group>
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="luogoRitiro">
                        <Form.Label>Servizio Autista</Form.Label>
                        <Form.Control className="form-select" as="select">
                            <option value="" disabled selected>Seleziona...</option>
                            <option value="T">true</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <CampoEmail controlId={"loginEmail"} placeholder={"Inserisci la tua email"} required>
                        Email Autista
                    </CampoEmail>
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="idCliente">
                        <Form.Label>Stato</Form.Label>
                        <Form.Control className="form-select" as="select">
                            <option value="" disabled selected>Seleziona...</option>
                            <option value="PROGRAMMATA">PROGRAMMATA</option>
                            <option value="INIZIATA">INIZIATA</option>
                            <option value="TERMINATA">TERMINATA</option>
                            <option value="ANNULLATA">ANNULLATA</option>
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