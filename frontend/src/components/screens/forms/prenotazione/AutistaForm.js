import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//import axios from 'axios'

import { Row, Col, Card, Form } from 'react-bootstrap'

import Button from '../../../utils/Button';
import InputDataPrenotazione from '../../../utils/InputDataPrenotazione';
import InputParcheggio from '../../../utils/InputParcheggio';


export default function AutoForm() {

    function onClick(){

    }
    
    return (
        <React.Fragment>          
                <Row className="gy-4">
                    <Col xs={{ span: 12 }}>
                    
                            <div className="h-100 mt-5 pb-5">
                                <Card className=" h-100 border-5 shadow">
                                    <Card.Header className="border-3 shadow"><center><h2 className="card-title">Prenotazione <br/> Auto con autista</h2></center></Card.Header>
                                        <Card.Body className="d-flex flex-column justify-content-evenly">
                                            <div className=" py-1 justify-content-center">
                                                <p className=" h4 t-light card-text py-4">In questa pagina puoi inserire le informazioni utili per l'utilizzo del servizio autista. <br/> Inserisci il luogo, la data e l'ora di ritiro e di consegna e premi su 'Prosegui' per visualizzare tutti i veicoli che puoi avere a dispozione per il tuo noleggio!</p>
                                            </div>

                                            <Form onSubmit={onClick}>
                                                <Row className="gy-4">
                                                    
                                                    <Col xs={{ span: 12 }} lg={{ span: 12 }}>
                                                        <Form.Group controlId="luogoRitiro">
                                                            <Form.Label>Luogo di ritiro</Form.Label>
                                                            <Form.Control type="text" placeholder="Inserisci la via dove l'autista ti verrà a prendere" required />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xs={{ span: 12 }} lg={{ span: 12 }}>
                                                        <Form.Group controlId="luogoConsegna">
                                                            <Form.Label>Luogo di consegna</Form.Label>
                                                            <Form.Control type="text" placeholder="Inserisci la via dove l'autista ti verrà a lasciare" required />
                                                        </Form.Group>
                                                    </Col>

                                                    <InputDataPrenotazione
                                                        controlDataId={"dataRitiro"}
                                                        labelData={"Data di ritiro"}
                                                        placeholderData={"Seleziona data di ritiro"}
                                                        controlOrarioId={"oraRitiro"}
                                                        defaultOrario={"Seleziona ora di ritiro"}
                                                        labelOrario={"Ora di ritiro"} 
                                                    />
                                                    
                                                    <InputDataPrenotazione
                                                        controlDataId={"dataConsegna"}
                                                        labelData={"Data di consegna"}
                                                        placeholderData={"Seleziona data di consegna"}
                                                        controlOrarioId={"oraConsegna"}
                                                        defaultOrario={"Seleziona ora di consegna"}
                                                        labelOrario={"Ora di consegna"}
                                                    />

                                                </Row>
                                            </Form>

                                        </Card.Body>
                                    <div className="d-flex justify-content-center">
                                        <Button className="btn-lg"  onClick={onClick} variant="outline-primary">Prosegui</Button>
                                    </div>
                                </Card>
                            </div>  
                    </Col>
                </Row>      
        </React.Fragment>
    );
}