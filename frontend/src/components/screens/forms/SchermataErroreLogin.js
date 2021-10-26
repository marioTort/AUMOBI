import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
// Custom Components

// Schermata
export default function SchermataErroreLogin() {

    const history = useHistory();

    function logout(event) {
        event.preventDefault();
        localStorage.clear();
        history.push("/login");
    }
    
    return (


        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <br></br>
                    <Container fluid className="d-flex align-items-center justify-content-center mt-5">
                        <div>
                            <Row className="gy-3">
                                <h1 className="h1 text-danger t-bold text-center">
                                    Hai già effettuato il login!
                                </h1>
                                <p className="h4 text-center text-danger t-light">
                                    Clicca su logout per accedere a quest'area!
                                </p>

                                <Col className="d-flex justify-content-center">
                                    <Button variant="outline-danger" onClick={logout}>Logout</Button>
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