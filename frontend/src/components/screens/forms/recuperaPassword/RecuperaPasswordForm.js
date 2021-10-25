import React from 'react';

// Bootstrap Components
import { Form, Container, Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button'
import CampoEmail from '../../../utils/CampoEmail';

// Recupero Password Form
export default function RecuperaPasswordForm() {

    function onSubmit(e) {
        
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row className="align-items-center gy-4">
                <Col fluid className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                    <br></br>
                    <h1 className="h1 text-center t-bold">Recupera password</h1>
                    <p className="h4 text-center t-extralight">Inserisci l'email utilizzata in fase di registrazione per proseguire</p>
                    <Form onSubmit={onSubmit} >
                        <Row className="gy-4">
                            <CampoEmail controlId={"loginEmail"} placeholder={"Inserisci la tua email"} required>
                                Email
                            </CampoEmail>
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