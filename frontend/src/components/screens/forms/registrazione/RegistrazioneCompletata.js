import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
// Custom Components
import Button from '../../../utils/Button';

// Schermata Registrazione Completata

function home() {
    localStorage.clear();
    window.location.replace("/");
}

export default function RegistrazioneCompletata() {
    return (
        
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <Container fluid className="d-flex align-items-center justify-content-center mt-5">
                        <div>
                            <Row className="gy-3">
                                <h1 className="h1 text-success t-bold text-center">
                                    Registrazione completata
                                </h1>
                                <p className="h4 text-center text-success t-light">Ora puoi effettuare l'accesso al tuo account.</p>

                                <Col className="d-flex justify-content-center">
                                    <Button variant="outline-success" onClick={home}>Home</Button>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>  
                  
    );
}