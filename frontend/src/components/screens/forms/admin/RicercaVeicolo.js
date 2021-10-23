import React from 'react'

import { Row, Col, Form } from 'react-bootstrap'

import Button from '../../../utils/Button'

import InputParcheggio from '../../../utils/InputParcheggio';

export default function RicercaVeicolo() {

    function onSubmit(e) {
        
    }

    return (
        <Form onSubmit={onSubmit}>
            <Row className="gy-3 align-items-end">
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="targaVeicolo">
                        <Form.Label>Targa</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci targa veicolo" />
                    </Form.Group>
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    
                    <InputParcheggio controlId="luogoConsegna">Posizione</InputParcheggio>
                    
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="tipoVeicolo">
                        <Form.Label>Tipo veicolo</Form.Label>
                        <Form.Control className="form-select" as="select">
                            <option value="" disabled selected>Seleziona...</option>
                            <option value="Auto">Auto</option>
                            <option value="Moto">Moto</option>
                            <option value="Bici">Bici</option>
                            <option value="Mono">Monopattino</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="statoVeicolo">
                        <Form.Label>Stato</Form.Label>
                        <Form.Control className="form-select" as="select">
                            <option value="" disabled selected>Seleziona...</option>
                            <option value="L">Libero</option>
                            <option value="O">Occupato</option>
                            <option value="G">Guasto</option>
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