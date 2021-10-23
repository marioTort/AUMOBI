import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
// Custom Components
import OperazioneCompletata from '../../../utils/OperazioneCompletata';

// Schermata Registrazione Completata
export default function RegistrazioneCompletata() {
    return (
        
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <br></br>
                    <OperazioneCompletata
                        title={"Registrazione completata"}
                        buttonTo={"/login"}
                        buttonLabel={"Accedi"}>
                        
                        Ora puoi effettuare l'accesso al tuo account.
                    </OperazioneCompletata>
                    <br></br><br></br><br></br>
                </Col>
            </Row>
        </Container>  
                  
    );
}