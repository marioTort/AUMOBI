import React from 'react';
import { Link } from 'react-router-dom';

// Bootstrap Components
import {Container, Row, Col, Image, Form} from "react-bootstrap";

// Custom Components
import Button from "../../utils/Button";
import InsertEmail from '../../utils/InsertEmail';
import InsertPassword from '../../utils/InsertPassword';




// Login Form
export default function AutenticazioneForm() {

    function onSubmit(e) {

    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            
            <Row className="align-items-center gy-4">
               
            <Col fluid className="form" xs={{ span: 15, offset: 0 }} lg={{ span: 20, offset: 0 }}>
                <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Accedi</h1>
                    <Form  onSubmit={onSubmit}>
                        <Row className="gy-4">
                            <InsertEmail controlId={"loginEmail"} placeholder={"Inserisci la tua email"} required>
                                Email
                            </InsertEmail>
                            <InsertPassword controlId={"loginPassword"} placeholder={"Inserisci la tua password"}>
                                Password
                            </InsertPassword>
                            
                            
                            <Link to="/" className="link-secondary">Hai dimenticato la password?</Link>
                            
                            
                            <Link to="/" className="link-secondary">Non hai ancora un account? Registrati?</Link>
                            
                            <Button variant="outline-secondary" submit>Accedi</Button>
                            
                        </Row>
                        <br></br>
                    </Form>
                </Col>
                
            </Row>
        </Container >
    );
}