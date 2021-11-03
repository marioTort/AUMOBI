import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
// Custom Components
import OperazioneCompletata from '../../../utils/OperazioneCompletata';

import Footer from '../../../utils/Footer';

// Schermata Registrazione Completata
export default function RecuperaPasswordCompletato() {
    let authToken = localStorage.getItem('authToken');

    if (!authToken) {
        return (
            <div>
                <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
                    <Row>
                        <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                            <br></br>
                            <OperazioneCompletata
                                title={"Operazione completata"}
                                buttonTo={"/login"}
                                buttonLabel={"Accedi"}>

                                Ti è stata inviata un'email contenente un link per resettare la tua password.
                            </OperazioneCompletata>
                            <br></br><br></br><br></br>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    } else {
        window.location.replace("/");
    }

}