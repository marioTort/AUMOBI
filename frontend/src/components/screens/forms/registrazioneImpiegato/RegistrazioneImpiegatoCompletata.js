import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
// Custom Components
import OperazioneCompletata from '../../../utils/OperazioneCompletata';

// Schermata Registrazione Completata
export default function RegistrazioneImpiegatoCompletata() {
    return (
        <div>
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <br></br>
                    <OperazioneCompletata
                        title={"Registrazione impiegato completata"}
                        buttonTo={"/schermataadmin"}
                        buttonLabel={"Home"}>
                        
                        Vuoi continuare a registrare?
                    </OperazioneCompletata>
                    <br></br><br></br><br></br>
                </Col>
            </Row>
        </Container> 
        </div>          
    );
}