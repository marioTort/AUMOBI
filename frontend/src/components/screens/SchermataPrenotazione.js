import React from 'react'
import axios from 'axios';

import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

import Button from '../utils/Button';

export default function SchermataPrenotazione() {
    //OGNI BUTTON DEVE AVERE IMPOSTATA QUESTA RIGA: localStorage.setItem("dataRitiroUTC", new Date());
    async function elencoStalliAuto(event) {
        event.preventDefault();

        var data = JSON.stringify({
            "tipoMezzi": "Auto"
        });

        var config = {
            method: 'post',
            url: '/api/fetch/listastalli',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("listaStalli", JSON.stringify(response.data));
                localStorage.setItem("dataRitiroUTC", new Date());
                window.location.replace("/schermataprenotazioneauto");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function prenotazioneAutista() {

        localStorage.setItem("dataRitiroUTC", new Date());
        window.location.replace("/schermataprenotazioneautista")
        
    }

    let authToken = localStorage.getItem('authToken');
    let patente = JSON.parse(localStorage.getItem("datiPatente"));

    if (!authToken) {
        window.location.replace("/login");
    } else {
        let tipoUtente = localStorage.getItem('tipoUtente');

        if(tipoUtente !== "Cliente") {
            window.location.replace("/");
        } else {
            if (!patente) {
                //Può prenotare solo bici e monopattini
                return (<>
                    <Container fluid className="mb-5 d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex flex-column align-items-center mt-5 my-5">
                            <h1 className="t-bold">Prenotazione</h1>
                            <h4 className=" mt-3 text-center t-light">Seleziona la tipologia di veicolo che più si adatta alle tue esigenze</h4>
                        </div>

                        <CardGroup >
                            <Row className="gy-5">

                                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 0 }}>
                                    <div className="h-100 mt-5 pb-5">
                                        <Card className=" h-100 border-5 shadow">
                                            <Card.Header className="border-3 shadow"><center><h2 className="card-title">Auto</h2></center></Card.Header>
                                            <Card.Body className="d-flex flex-column justify-content-evenly">
                                                <div className=" py-1 justify-content-center">
                                                    <p className=" h4 t-light card-text py-4">Su Aumobi hai un'ampia scelta di noleggio veicolo a quattro ruote! Clicca qui sotto per scegliere quello più adatto alle tue esigenze! Inoltre puoi anche selezionare il servizio autista se non disponi di patente o se semplicemente hai voglia di un pò di relax!</p>
                                                </div>
                                            </Card.Body>
                                            <div className="d-flex justify-content-center">

                                                <Button className="btn-lg" variant="outline-primary" onClick={prenotazioneAutista}>Prenota con autista</Button>
                                            </div>
                                        </Card>
                                    </div>
                                </Col>

                                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 0 }}>
                                    <div className="h-100 mt-5 pb-5">
                                        <Card className=" h-100 border-5 shadow">
                                            <Card.Header className="border-3 shadow"><center><h2 className="card-title">Bici & Monopattino</h2></center></Card.Header>
                                            <Card.Body className="d-flex flex-column justify-content-evenly">
                                                <div className=" py-1 justify-content-center">
                                                    <p className=" h4 t-light card-text py-4">Sei un patito dello sport o ci tieni a salvaguardare il nostro ambiente? Noleggia una delle nostre biciclette o un nostro monopattino!</p>
                                                </div>
                                            </Card.Body>
                                            <div className="d-flex justify-content-center">
                                                <Button className="btn-lg" to="/schermataprenotazionebici" variant="outline-primary">Prenota</Button>
                                            </div>
                                        </Card>
                                    </div>
                                </Col>

                            </Row>
                        </CardGroup>
                    </Container>
                </>
                );
            } else {
                //Faccio una prima selezione eliminando le auto a tutti gli utenti che non dispongono della patente B...
                let categoriaPatente = JSON.parse(localStorage.getItem("datiPatente")).categoria;
                if (categoriaPatente === "B") {
                    return (<>
                        <Container fluid className="mb-5 d-flex flex-column justify-content-center align-items-center">
                            <div className="d-flex flex-column align-items-center mt-5 my-5">
                                <h1 className="t-bold">Prenotazione</h1>
                                <h4 className=" mt-3 text-center t-light">Seleziona la tipologia di veicolo che più si adatta alle tue esigenze</h4>
                            </div>


                            <CardGroup >
                                <Row className="gy-5">

                                    <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 0 }}>
                                        <div className="h-100 mt-5 pb-5">
                                            <Card className=" h-100 border-5 shadow">
                                                <Card.Header className="border-3 shadow"><center><h2 className="card-title">Auto</h2></center></Card.Header>
                                                <Card.Body className="d-flex flex-column justify-content-evenly">
                                                    <div className=" py-1 justify-content-center">
                                                        <p className=" h4 t-light card-text py-4">Su Aumobi hai un'ampia scelta di noleggio veicolo a quattro ruote! Clicca qui sotto per scegliere quello più adatto alle tue esigenze! Inoltre puoi anche selezionare il servizio autista se non disponi di patente o se semplicemente hai voglia di un pò di relax!</p>
                                                    </div>
                                                </Card.Body>
                                                <div className="d-flex justify-content-center">
                                                    <Button className="btn-lg" to="schermataprenotazioneauto" variant="outline-primary" onClick={elencoStalliAuto}>Prenota</Button>
                                                    <Button className="btn-lg" variant="outline-primary" onClick={prenotazioneAutista}>Prenota con autista</Button>
                                                </div>
                                            </Card>
                                        </div>
                                    </Col>


                                    <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 0 }}>
                                        <div className="h-100 mt-5 pb-5">
                                            <Card className=" h-100 border-5 shadow">
                                                <Card.Header className="border-3 shadow"><center><h2 className="card-title">Moto</h2></center></Card.Header>
                                                <Card.Body className="d-flex flex-column justify-content-evenly">
                                                    <div className=" py-1 justify-content-center">
                                                        <p className=" h4 t-light card-text py-4">Non vuoi restare bloccato nel traffico ma vuoi goderti il tuo tragitto in tranquillità? Clicca qui sotto per noleggiare una fantastica moto!</p>
                                                    </div>
                                                </Card.Body>
                                                <div className="d-flex justify-content-center">
                                                    <Button className="btn-lg" to="/schermataprenotazionemoto" variant="outline-primary">Prenota</Button>
                                                </div>
                                            </Card>
                                        </div>
                                    </Col>

                                    <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 0 }}>
                                        <div className="h-100 mt-5 pb-5">
                                            <Card className=" h-100 border-5 shadow">
                                                <Card.Header className="border-3 shadow"><center><h2 className="card-title">Bici & Monopattino</h2></center></Card.Header>
                                                <Card.Body className="d-flex flex-column justify-content-evenly">
                                                    <div className=" py-1 justify-content-center">
                                                        <p className=" h4 t-light card-text py-4">Sei un patito dello sport o ci tieni a salvaguardare il nostro ambiente? Noleggia una delle nostre biciclette o un nostro monopattino!</p>
                                                    </div>
                                                </Card.Body>
                                                <div className="d-flex justify-content-center">
                                                    <Button className="btn-lg" to="/schermataprenotazionebici" variant="outline-primary">Prenota</Button>
                                                </div>
                                            </Card>
                                        </div>
                                    </Col>

                                </Row>
                            </CardGroup>
                        </Container>
                    </>
                    );
                } else {
                    return (<>
                        <Container fluid className="mb-5 d-flex flex-column justify-content-center align-items-center">
                            <div className="d-flex flex-column align-items-center mt-5 my-5">
                                <h1 className="t-bold">Prenotazione</h1>
                                <h4 className=" mt-3 text-center t-light">Seleziona la tipologia di veicolo che più si adatta alle tue esigenze</h4>
                            </div>


                            <CardGroup >
                                <Row className="gy-5">

                                    <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 0 }}>
                                        <div className="h-100 mt-5 pb-5">
                                            <Card className=" h-100 border-5 shadow">
                                                <Card.Header className="border-3 shadow"><center><h2 className="card-title">Auto</h2></center></Card.Header>
                                                <Card.Body className="d-flex flex-column justify-content-evenly">
                                                    <div className=" py-1 justify-content-center">
                                                        <p className=" h4 t-light card-text py-4">Su Aumobi hai un'ampia scelta di noleggio veicolo a quattro ruote! Clicca qui sotto per scegliere quello più adatto alle tue esigenze! Inoltre puoi anche selezionare il servizio autista se non disponi di patente o se semplicemente hai voglia di un pò di relax!</p>
                                                    </div>
                                                </Card.Body>
                                                <div className="d-flex justify-content-center">

                                                    <Button className="btn-lg" variant="outline-primary" onClick={prenotazioneAutista}>Prenota con autista</Button>
                                                </div>
                                            </Card>
                                        </div>
                                    </Col>

                                    <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 0 }}>
                                        <div className="h-100 mt-5 pb-5">
                                            <Card className=" h-100 border-5 shadow">
                                                <Card.Header className="border-3 shadow"><center><h2 className="card-title">Moto</h2></center></Card.Header>
                                                <Card.Body className="d-flex flex-column justify-content-evenly">
                                                    <div className=" py-1 justify-content-center">
                                                        <p className=" h4 t-light card-text py-4">Non vuoi restare bloccato nel traffico ma vuoi goderti il tuo tragitto in tranquillità? Clicca qui sotto per noleggiare una fantastica moto!</p>
                                                    </div>
                                                </Card.Body>
                                                <div className="d-flex justify-content-center">
                                                    <Button className="btn-lg" to="/schermataprenotazionemoto" variant="outline-primary">Prenota</Button>
                                                </div>
                                            </Card>
                                        </div>
                                    </Col>

                                    <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 0 }}>
                                        <div className="h-100 mt-5 pb-5">
                                            <Card className=" h-100 border-5 shadow">
                                                <Card.Header className="border-3 shadow"><center><h2 className="card-title">Bici & Monopattino</h2></center></Card.Header>
                                                <Card.Body className="d-flex flex-column justify-content-evenly">
                                                    <div className=" py-1 justify-content-center">
                                                        <p className=" h4 t-light card-text py-4">Sei un patito dello sport o ci tieni a salvaguardare il nostro ambiente? Noleggia una delle nostre biciclette o un nostro monopattino!</p>
                                                    </div>
                                                </Card.Body>
                                                <div className="d-flex justify-content-center">
                                                    <Button className="btn-lg" to="/schermataprenotazionebici" variant="outline-primary">Prenota</Button>
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
        }

        }

    }
    
}