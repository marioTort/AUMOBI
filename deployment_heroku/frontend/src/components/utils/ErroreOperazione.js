import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Button from './Button'

export default function ErroreOperazione(props) {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center mt-5">
            <div>
                <Row className="gy-3">
                    <h1 className="h1 text-danger t-bold text-center">
                        {props.title}
                    </h1>
                    <p className="h4 text-center text-danger t-light">{props.children}</p>

                    <Col className="d-flex justify-content-center">
                        <Button to={props.buttonTo} variant="outline-danger" submit>{props.buttonLabel}</Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}