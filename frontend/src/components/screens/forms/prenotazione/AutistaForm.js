import React, { useState } from 'react';

import { Row, Col, Card, Form } from 'react-bootstrap'

import Button from '../../../utils/Button';
import StringCrypto from 'string-crypto';

import DataRitiro from './DataRitiro';
import DataConsegna from './DataConsegna';

export default function AutistaForm() {

    const key = 'AuMoBi';

    const {
        decryptString
    } = new StringCrypto();   
    
    const [DataRitiroShow, setDataRitiroShow] = useState(false);
    const [DataConsegnaShow, setDataConsegnaShow] = useState(false);

    const [luogoRitiro, setLuogoRitiro] = useState("");
    const [luogoConsegna, setLuogoConsegna] = useState("");

    function settaDatiPrenotazione(event) {

        event.preventDefault();

        localStorage.setItem("luogoRitiro", luogoRitiro);
        localStorage.setItem("luogoConsegna", luogoConsegna);

        localStorage.setItem("numeroCartaCliente", decryptString(JSON.parse(localStorage.getItem("datiCarta")).numeroCartaCredito, key));

        if (localStorage.getItem("dataRitiro") === null || localStorage.getItem("oraRitiro") === null || localStorage.getItem("dataConsegna") === null || localStorage.getItem("oraConsegna") === null) {
            alert("Inserisci la data di ritiro e consegna per continuare!");
        } else {
            window.location.replace("/schermataprenotazioneautista/selezioneautista");
        }


    }

    return (
        <React.Fragment>
            <Row className="gy-4">
                <Col xs={{ span: 12 }}>

                    <div className="h-100 mt-5 pb-5">
                        <Card className=" h-100 border-5 shadow">
                            <Card.Header className="border-3 shadow"><center><h2 className="card-title">Prenotazione <br /> Auto con autista</h2></center></Card.Header>
                            <Card.Body className="d-flex flex-column justify-content-evenly">
                                <div className=" py-1 justify-content-center">
                                    <p className=" h4 t-light card-text py-4">In questa pagina puoi inserire le informazioni utili per l'utilizzo del servizio autista. <br /> Inserisci il luogo, la data e l'ora di ritiro e di consegna e premi su 'Prosegui' per visualizzare tutti i veicoli che puoi avere a dispozione per il tuo noleggio!</p>
                                </div>

                                <Form>
                                    <Row className="gy-4">

                                        <Col xs={{ span: 12 }} lg={{ span: 12 }}>
                                            <Form.Group controlId="luogoRitiro">
                                                <Form.Label>Luogo di ritiro</Form.Label>
                                                <Form.Control type="text" placeholder="Inserisci la via dove l'autista ti verrà a prendere" onChange={(event) => { setLuogoRitiro(event.target.value) }} required />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={{ span: 12 }} lg={{ span: 12 }}>
                                            <Form.Group controlId="luogoConsegna">
                                                <Form.Label>Luogo di consegna</Form.Label>
                                                <Form.Control type="text" placeholder="Inserisci la via dove l'autista ti verrà a lasciare" onChange={(event) => { setLuogoConsegna(event.target.value) }} required />
                                            </Form.Group>
                                        </Col>



                                        <div className="d-flex justify-content-center">
                                            <Button className="my-3" variant="outline-primary py-1" onClick={() => setDataRitiroShow(true)} required>
                                                Inserisci data di ritiro
                                            </Button>
                                        </div>
                                        <DataRitiro
                                            show={DataRitiroShow}
                                            onHide={() => setDataRitiroShow(false)}
                                        />

                                        <div className="d-flex justify-content-center">
                                            <Button className="my-3" variant="outline-primary py-1" onClick={() => setDataConsegnaShow(true)} required>
                                                Inserisci data di consegna
                                            </Button>
                                        </div>
                                        <DataConsegna
                                            show={DataConsegnaShow}
                                            onHide={() => setDataConsegnaShow(false)}
                                        />

                                    </Row>
                                </Form>

                            </Card.Body>
                            <div className="d-flex justify-content-end">
                                <Button className="btn-lg" onClick={settaDatiPrenotazione} variant="outline-success">Prosegui</Button>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );

} 
