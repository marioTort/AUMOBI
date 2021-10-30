import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


import { Row, Col, Card } from 'react-bootstrap'

import Button from '../../../utils/Button';
import IniziaNoleggioModal from './IniziaNoleggioModal';
import TerminaNoleggioModal from './TerminaNoleggioModal';


export default function BiciMonopattinoForm() {
    
    const [terminaNoleggioModal, setTerminaNoleggioModal] = useState(false)
    const [iniziaNoleggioModal, setIniziaNoleggioModal] = useState(false)
    

    return (
        <React.Fragment>          
                <Row className="gy-4">
                    <Col xs={{ span: 12 }}>
                            <div className="h-100 mt-5 pb-5">
                                <Card className=" h-100 border-5 shadow">
                                    <Card.Header className="border-3 shadow"><center><h2 className="card-title">Prenotazione <br/> Bici & Monopattino</h2></center></Card.Header>
                                        <Card.Body className="d-flex flex-column justify-content-evenly">
                                            <div className=" py-5 justify-content-center">
                                                <p className=" h4 t-light card-text py-4">In questa pagina puoi visualizzare una mappa con gli stalli contenenti le bici e i monopattini che puoi prenotare! <br/> Recati in uno di questi luoghi e clicca sul tasto 'Inizia noleggio' per cominciare la tua avventura! <br/> Recati di nuovo in questa pagina e clicca 'Termina noleggio' quando vorrai terminare la tua esperienza.</p>
                                            </div>
                                        </Card.Body>
                                    <div className="d-flex justify-content-center">
                                        <Button className="btn-lg"  onClick={() => setIniziaNoleggioModal(true)} variant="outline-success">Inizia noleggio</Button>
                                        <Button className="btn-lg"  onClick={() => setTerminaNoleggioModal(true)} variant="outline-danger">Termina noleggio</Button>
                                        <IniziaNoleggioModal show={iniziaNoleggioModal} onHide={() => setIniziaNoleggioModal(false)} />
                                        <TerminaNoleggioModal show={terminaNoleggioModal} onHide={() => setTerminaNoleggioModal(false)} />
                                    </div>
                                </Card>
                            </div>  
                    </Col>
                </Row>      
        </React.Fragment>
    );
}