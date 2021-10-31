import React from 'react'
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, Card } from 'react-bootstrap';



import Button from '../../../utils/Button';

export default function SelezioneAuto() {

    return (
        <React.Fragment>
            <Container className="mt-5">
                <div>
                    <h1 className="t-bold text-center my-5">Seleziona Auto</h1>
                </div>
            </Container>
            <Container className="mt-2 mb-5">
                <Row className="mb-100">
                    <Col xs={{ span: 10, offset: 1 }}  xl={{ span: 4, offset: 0 }}>
                        <Row className="gy-4 mb-5">
                        <div>
                            <Card className="h-100 border-5 shadow">
                            <Card.Header className="border-3 shadow"><center><h2 className="card-title">Fiat Panda 4x4</h2></center></Card.Header>
                                <Card.Body className="d-flex flex-column justify-content-evenly">
                                <div className=" py-1 justify-content-center">
                                    <li className=" h4 t-light card-text py-4">Categoria: Fuoristrada</li>
                                    <li className=" h4 t-light card-text py-4">Targa: targa</li>
                                    <li className=" h4 t-light card-text py-4">Prezzo orario: $</li>
                                </div>
                                    
                                <div className="d-flex justify-content-end">
                                    <Button className="button-menu" variant="outline-warning" to="/prenotazionecompletata">Prenota Ora & <br/> genera Codice-QR</Button>
                                </div>
                                </Card.Body>
                            </Card>
                        </div>                                 
                        </Row>
                    </Col>
                    <Col xs={{ span: 10, offset: 1 }}  xl={{ span: 4, offset: 0 }}>
                        <Row className="gy-4 mb-5">
                        <div>
                            <Card className="h-100 border-5 shadow">
                            <Card.Header className="border-3 shadow"><center><h2 className="card-title">Fiat 500</h2></center></Card.Header>
                                <Card.Body className="d-flex flex-column justify-content-evenly">
                                <div className=" py-1 justify-content-center">
                                    <li className=" h4 t-light card-text py-4">Categoria: Utilitaria</li>
                                    <li className=" h4 t-light card-text py-4">Targa: targa</li>
                                    <li className=" h4 t-light card-text py-4">Prezzo orario: $</li>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Button className="button-menu" variant="outline-warning" to="/prenotazionecompletata">Prenota Ora & <br/> genera Codice-QR</Button>
                                </div>
                                </Card.Body>
                            </Card>
                        </div>                                 
                        </Row>
                    </Col>  
                    <Col xs={{ span: 10, offset: 1 }}  xl={{ span: 4, offset: 0 }}>
                        <Row className="gy-4 mb-5">
                        <div>
                            <Card className="h-100 border-5 shadow">
                            <Card.Header className="border-3 shadow"><center><h2 className="card-title">Fiat 500X</h2></center></Card.Header>
                                <Card.Body className="d-flex flex-column justify-content-evenly">
                                <div className=" py-1 justify-content-center">
                                    <li className=" h4 t-light card-text py-4">Categoria: Monovolume</li>
                                    <li className=" h4 t-light card-text py-4">Targa: targa</li>
                                    <li className=" h4 t-light card-text py-4">Prezzo orario: $</li>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Button className="button-menu" variant="outline-warning" to="/prenotazionecompletata">Prenota Ora & <br/> genera Codice-QR</Button>
                                </div>
                                </Card.Body>
                            </Card>
                        </div>                                 
                        </Row>
                    </Col> 
                </Row>
            </Container>
        </React.Fragment>
    );
    
}