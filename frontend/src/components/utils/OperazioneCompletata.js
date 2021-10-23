import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Button from './Button'

export default function OperazioneCompletata(props) {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center mt-5">
            <div>
                <Row className="gy-3">
                    <h1 className="h1 text-success t-bold text-center">
                        {props.title}
                    </h1>
                    <p className="h4 text-center text-success t-light">{props.children}</p>
                    
                    <Col className="d-flex justify-content-center">
                        <Button to={props.buttonTo} variant="outline-success">{props.buttonLabel}</Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}