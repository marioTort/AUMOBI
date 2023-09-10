import React from 'react';

import { Col, Row, Container } from 'react-bootstrap'

import BiciMonopattinoForm from './BiciMonopattinoForm';
import MappaBici from './MappaBici';

export default function SchermataPrenotazioneBici() {

    let authToken = localStorage.getItem('authToken');

    if(!authToken) {
        window.location.replace("/login");
    } else {
        let tipoUtente = localStorage.getItem('tipoUtente');

        if (tipoUtente !== "Cliente") {
            window.location.replace("/");
        } else {
            return (

                <Container fluid className="p-0 h-100 align-items-center justify-content-center">
                    <Row className="h-100 g-0 align-items-center">
                   
                        <Col md={{ span: 10, offset: 1 }} lg={{ span: 5 }} xl={{ span: 4 }} className=" my-5">
                            <div>
                                <BiciMonopattinoForm />
                            </div>
                        </Col>
                        <Col md={{ span: 10 }} lg={{ span: 5 }} xl={{ span: 4 }} className="h-100 d-flex my-5">
                            <MappaBici />
                        </Col>
                    </Row>
                </Container>

            );
        }
    }
}