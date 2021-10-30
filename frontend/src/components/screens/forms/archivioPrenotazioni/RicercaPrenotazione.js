import React from 'react'

import { Row, Col, Form } from 'react-bootstrap'

import Button from '../../../utils/Button'

import CampoParcheggio from '../../../utils/CampoParcheggio';

export default function RicercaPrenotazione() {

    async function annullaPrenotazione(event) {
        event.preventDefault();
        
    }

    return (
        <Form>
            <Row className="gy-3 align-items-end">
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="#Prenotazione">
                        <Form.Label>N° Prenotazione</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci # prenotazione" />
                    </Form.Group>
                </Col>
                
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="tipoVeicolo">
                        <Form.Label>Tipo veicolo</Form.Label>
                        <Form.Control className="form-select" as="select">
                            <option value="" disabled selected>Seleziona</option>
                            <option value="Auto">Auto</option>
                            <option value="Moto">Moto</option>
                            <option value="Bici">Bici</option>
                            <option value="Mono">Monopattino</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="prezzo">
                        <Form.Label>Stato</Form.Label>
                        <Form.Control className="form-select" as="select">
                            <option value="" disabled selected>Seleziona</option>
                            <option value="PROGRAMMATA">PROGRAMMATA</option>
                            <option value="INIZIATA">INIZIATA</option>
                            <option value="TERMINATA">TERMINATA</option>
                            <option value="ANNULLATA">ANNULLATA</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }} className="justify-content-end d-flex">
                    <Button variant="outline-primary" submit>Avvia Ricerca</Button>
                </Col>
                <Col xs={{ span: 12 }} className="justify-content-center d-flex">
                    <Button variant="outline-success" >Modifica data di ritiro</Button>
                    <Button variant="outline-success" >Modifica data di consegna</Button>
                    <Button variant="outline-success" >Modifica luogo di consegna</Button>
                    <Button variant="outline-danger" onClick={annullaPrenotazione}>Annulla Prenotazione</Button>
                    <Button variant="outline-danger" >Segnala Guasto</Button>
                </Col>
            </Row>
        </Form>
    );
}