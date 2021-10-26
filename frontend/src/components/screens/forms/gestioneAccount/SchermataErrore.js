import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// Custom Components
import ErroreOperazione from '../../../utils/ErroreOperazione';

// Schermata
export default function SchermataErrore() {
    return (

        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <br></br>
                    <ErroreOperazione
                        title={"Effettua il login per accedere a quest'area!"}
                        buttonTo={"/login"}
                        buttonLabel={"Accedi"}>
                    </ErroreOperazione>
                    <br></br><br></br><br></br>
                </Col>
            </Row>
        </Container>

    );
}