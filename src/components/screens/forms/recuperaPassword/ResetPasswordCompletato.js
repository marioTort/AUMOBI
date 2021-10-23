import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
// Custom Components
import OperazioneCompletata from '../../../utils/OperazioneCompletata';

import Footer from '../../../utils/Footer';

// Schermata Registrazione Completata
export default function ResetPasswordCompletato() {
    return (
        <div>
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <br></br>
                    <OperazioneCompletata
                        title={"Operazione completata"}
                        buttonTo={"/"}
                        buttonLabel={"Accedi"}>
                        
                        Hai resettato la password con successo. <br></br>
                        Ora puoi accedere utilizzando la tua nuova password.
                    </OperazioneCompletata>
                    <br></br><br></br><br></br>
                </Col>
            </Row>
        </Container>  
        <Footer/>
        </div>             
    );
}