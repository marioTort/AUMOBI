import React, { useState } from 'react'
import { useHistory } from 'react-router';

import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

import Button from '../utils/Button';

export default function SchermataPrenotazione() {

    const history = useHistory();
    const [state, setState] = useState({
        error: {
            show: false
        },
        submit: false
    })

    function onClick(e) {
        
    }

    return (<>      
            <Container fluid className="mb-5 d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center mt-5 my-5">
                    <h1 className="t-bold">Prenotazione</h1>
                    <h4 className=" mt-3 text-center t-light">Seleziona la tipologia di veicolo che più si adatta alle tue necessità per proseguire</h4>
                </div>

                        
                <CardGroup >
                    <Row className="gy-5">

                        <Col xs={{ span: 10, offset: 1 }}  lg={{ span: 4, offset: 0 }}>
                            <div className="h-100 mt-5 pb-5">
                                <Card className=" h-100 border-5 shadow">
                                    <Card.Header className="border-3 shadow"><center><h2 className="card-title">Auto</h2></center></Card.Header>
                                        <Card.Body className="d-flex flex-column justify-content-evenly">
                                            <div className=" py-1 justify-content-center">
                                                <p className=" h4 t-light card-text py-4">Su Aumobi hai un'ampia scelta di noleggio veicolo a quattro ruote! Clicca qui sotto per scegliere quello più adatto alle tue esigenze! Inoltre puoi anche selezionare il servizio autista se non disponi di patente o se semplicemente hai voglia di un pò di relax!</p>
                                            </div>
                                        </Card.Body>
                                    <div className="d-flex justify-content-center">
                                        <Button className="btn-lg" spinner={state.submit} onClick={onClick} variant="outline-primary">Prosegui</Button>
                                        <Button className="btn-lg" spinner={state.submit} onClick={onClick} variant="outline-primary">Prosegui con autista</Button>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        {/*disabled={session.patente && session.patente.tipologiaPatente === "B" ? false : true}*/}
                        
                        <Col xs={{ span: 10, offset: 1 }}  lg={{ span: 4, offset: 0 }}>
                            <div className="h-100 mt-5 pb-5">
                                <Card className=" h-100 border-5 shadow">
                                    <Card.Header className="border-3 shadow"><center><h2 className="card-title">Moto</h2></center></Card.Header>
                                        <Card.Body className="d-flex flex-column justify-content-evenly">
                                            <div className=" py-1 justify-content-center">
                                                <p className=" h4 t-light card-text py-4">Non vuoi restare bloccato nel traffico ma vuoi goderti il tuo tragitto in tranquillità? Clicca qui sotto per noleggiare una fantastica moto!</p>
                                            </div>
                                        </Card.Body>
                                    <div className="d-flex justify-content-center">
                                        <Button className="btn-lg" spinner={state.submit} onClick={onClick} variant="outline-primary">Prosegui</Button>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        {/*disabled={session.patente ? false : true}*/}

                        <Col xs={{ span: 10, offset: 1 }}  lg={{ span: 4, offset: 0 }}>
                            <div className="h-100 mt-5 pb-5">
                                <Card className=" h-100 border-5 shadow">
                                    <Card.Header className="border-3 shadow"><center><h2 className="card-title">Bici & Monopattino</h2></center></Card.Header>
                                        <Card.Body className="d-flex flex-column justify-content-evenly">
                                            <div className=" py-1 justify-content-center">
                                                <p className=" h4 t-light card-text py-4">Sei un patito dello sport o ci tieni a salvaguardare il nostro ambiente? Noleggia una delle nostre biciclette o un nostro monopattino!</p>
                                            </div>
                                        </Card.Body>
                                    <div className="d-flex justify-content-center">
                                        <Button className="btn-lg" spinner={state.submit} onClick={onClick} variant="outline-primary">Prosegui</Button>
                                    </div>
                                </Card>
                            </div>
                        </Col>

                    </Row>
                </CardGroup>
            </Container>
        </>          
    );
}