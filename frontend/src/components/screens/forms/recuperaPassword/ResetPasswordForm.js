import React from 'react';

// Bootstrap Components
import { Form, Container, Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button'
import CampoPassword from '../../../utils/CampoPassword';

// Recupero Password Form
export default function ResetPasswordForm() {

    function onSubmit(e) {
        
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row className="align-items-center gy-4">
                <Col fluid className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 12, offset: 1 }}>
                    <br></br>
                    <h1 className="h1 text-center t-bold">Reset password</h1>
                    <p className="h4 text-center t-extralight">Inserisci una nuova password</p>
                    <br></br>
                    <Form onSubmit={onSubmit} >
                        <Row className="gy-4">
                        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <CampoPassword tooltip controlId={"signupPassword"} placeholder={"Inserisci la password"}>
                                    Password
                                </CampoPassword>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <CampoPassword controlId={"confermaPassword"} placeholder={"Conferma la tua password"}>
                                    Conferma password
                                </CampoPassword>
                                <Form.Text id="confermaPasswordError" className="d-none text-danger">Le password non coincidono!</Form.Text>
                            </Col>
                            <div className="d-flex justify-content-center">
                                <Button variant="outline-secondary" submit>Prosegui</Button>
                            </div>
                        </Row>
                        <br></br>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}