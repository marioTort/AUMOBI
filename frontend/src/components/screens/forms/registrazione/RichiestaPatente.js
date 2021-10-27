import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';


export default function RichiestaPatente() {
    
    let authToken = localStorage.getItem('authToken');
    
    const history = useHistory();

    function inserisciCarta(event) {
        event.preventDefault();
        history.push("/datibancari");
    }

    function inserisciPatente(event) {
        event.preventDefault();
        history.push("/datipatente");
    }
    if(!authToken) {
        window.location.replace("/registrazionecliente");
    } else {
        return (
                <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
                    <Row>
                        <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                            <br></br>
                            <Container fluid className="d-flex align-items-center justify-content-center mt-5">
                                <div>
                                    <Row className="gy-3">
                                        <h1 className="h1 text-secondary t-bold text-center">
                                            Se lo desideri, puoi inserire la tua patente di guida adesso.<br></br>
                                            Ti ricordiamo che potrai farlo in qualsiasi altro momento. 
                                        </h1>

                                        <Col className="d-flex justify-content-center">
                                            <Button variant="outline-secondary" onClick={inserisciCarta}>Lo farò dopo</Button>
                                            <Button variant="outline-success" onClick={inserisciPatente}>Inserisci Patente</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                            <br></br><br></br><br></br>
                        </Col>
                    </Row>
                </Container>
    );
    }
}