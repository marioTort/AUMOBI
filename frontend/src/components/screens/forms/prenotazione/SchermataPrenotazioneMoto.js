import React from 'react';

import { Col, Row, Container } from 'react-bootstrap'

import Map from './Map';
import MotoForm from './MotoForm';

export default function SchermataPrenotazioneMoto() {

    let authToken = localStorage.getItem('authToken');

    if (!authToken) {
        window.location.replace("/login");
    } else {
        let tipoUtente = localStorage.getItem('tipoUtente');

        if (tipoUtente !== "Cliente") {
            window.location.replace("/");
        } else {
            return (
                <Container fluid className="p-0 h-100 align-items-center justify-content-center">
                    <Row className="h-100 g-0 align-items-center">
                        <Col xs={{ span: 10, offset: 1 }} lg={{ span: 5 }} className="mx-auto my-5">
                            <div>
                                <MotoForm />
                            </div>
                        </Col>
                        <Col xs={{ span: 10 }} lg={{ span: 6 }} className="h-100 d-flex">
                            <Map />
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}