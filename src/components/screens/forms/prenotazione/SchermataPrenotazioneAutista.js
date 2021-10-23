import React from 'react';

import { Col, Row, Container } from 'react-bootstrap'

import Map from './Map';
import AutistaForm from './AutistaForm';

export default function SchermataPrenotazioneAutista() {
    return (
        <Container fluid className="p-0 h-100 align-items-center justify-content-center">
            <Row className="h-100 g-0 align-items-center">
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 5 }} className="mx-auto my-5">
                    <div> 
                        <AutistaForm />
                    </div>
                </Col>
                <Col xs={{ span: 10 }} lg={{ span: 6 }} className="h-100 d-flex">
                    <Map />
                </Col>
            </Row>
        </Container>
    );
}