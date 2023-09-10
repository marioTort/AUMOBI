import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


import { Container, Col, Card } from 'react-bootstrap'

import Button from '../../../utils/Button';
import IniziaNoleggioModal from './IniziaNoleggioModal';
import TerminaNoleggioModal from './TerminaNoleggioModal';


export default function BiciMonopattinoForm() {
    
    const [terminaNoleggioModal, setTerminaNoleggioModal] = useState(false)
    const [iniziaNoleggioModal, setIniziaNoleggioModal] = useState(false)
    

    return (
        <React.Fragment>          
            <Container>
                <Col xs={{ span: 12 }}>

                    <Card className=" h-100 border-5 shadow mt-3 pb-5">
                                    <Card.Header className="border-3 shadow"><center><h2 className="card-title">Prenotazione <br/> Bici & Monopattino</h2></center></Card.Header>
                                        <Card.Body className="d-flex flex-column justify-content-evenly">
                                            
                                        </Card.Body>
                                    <div className="d-flex justify-content-center">
                                        <Button className="btn-lg"  onClick={() => setIniziaNoleggioModal(true)} variant="outline-success">Inizia noleggio</Button>
                                        <Button className="btn-lg"  onClick={() => setTerminaNoleggioModal(true)} variant="outline-danger">Termina noleggio</Button>
                                        <IniziaNoleggioModal show={iniziaNoleggioModal} onHide={() => setIniziaNoleggioModal(false)} />
                                        <TerminaNoleggioModal show={terminaNoleggioModal} onHide={() => setTerminaNoleggioModal(false)} />
                                    </div>
                                </Card>
                             
                    </Col>
            </Container>      
        </React.Fragment>
    );
}