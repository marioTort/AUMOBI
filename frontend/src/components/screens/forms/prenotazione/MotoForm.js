import React, { useState, useEffect } from 'react';

import { Row, Col, Card, Form } from 'react-bootstrap'

import Button from '../../../utils/Button';
import CampoDataPrenotazione from '../../../utils/CampoDataPrenotazione';
import CampoParcheggio from '../../../utils/CampoParcheggio';

import StringCrypto from 'string-crypto';
import DataRitiro from './DataRitiro';
import DataConsegna from './DataConsegna';

export default function MotoForm() {
    const key = 'AuMoBi';

    const {
        decryptString
    } = new StringCrypto();

    const [DataRitiroShow, setDataRitiroShow] = useState(false);
    const [DataConsegnaShow, setDataConsegnaShow] = useState(false);

    const [luogoRitiro, setLuogoRitiro] = useState("");
    const [luogoConsegna, setLuogoConsegna] = useState("");

    const [renderParcheggio, setRenderParcheggio] = useState(true);
    const [optionsParcheggio, setOptionsParcheggio] = useState([]);

    useEffect(() => {
        if (renderParcheggio) {
            for (let index = 0; index < JSON.parse(localStorage.getItem('listaStalli')).listaStalli.length; index++) {
                const element = JSON.parse(localStorage.getItem('listaStalli')).listaStalli[index].indirizzoStallo;
                setOptionsParcheggio(optionsParcheggio => [...optionsParcheggio, <option value={element}>{element}</option>])
            }
        }
        setRenderParcheggio(false);
    }, [renderParcheggio])

    function settaDatiPrenotazione(event) {

        event.preventDefault();

        if (JSON.parse(localStorage.getItem("datiPatente")).categoria === "AM") {
            localStorage.setItem("TIPOVEICOLO", "49");
        } else {
            localStorage.setItem("TIPOVEICOLO", "125");
        }

        localStorage.setItem("luogoRitiro", luogoRitiro);
        localStorage.setItem("luogoConsegna", luogoConsegna);

        localStorage.setItem("numeroCartaCliente", decryptString(JSON.parse(localStorage.getItem("datiCarta")).numeroCartaCredito, key));

        window.location.replace("/schermataprenotazionemoto/selezionemoto")

    }

    return (
        <React.Fragment>
            <Row className="gy-4">
                <Col xs={{ span: 12 }}>

                    <div className="h-100 mt-5 pb-5">
                        <Card className=" h-100 border-5 shadow">
                            <Card.Header className="border-3 shadow"><center><h2 className="card-title">Prenotazione <br /> Moto</h2></center></Card.Header>
                            <Card.Body className="d-flex flex-column justify-content-evenly">
                                <div className=" py-1 justify-content-center">
                                    <p className=" h4 t-light card-text py-4">In questa pagina puoi visualizzare una mappa con gli stalli contenenti le moto che puoi prenotare! <br /> Inserisci il luogo, la data e l'ora di ritiro e di consegna e premi su 'Prosegui' per visualizzare tutti i veicoli che puoi avere a dispozione per il tuo noleggio!</p>
                                </div>

                                <Form>
                                    <Row className="gy-4">

                                        <Form.Group>
                                            <Form.Label className="me-2">Luogo di ritiro</Form.Label>
                                            <Form.Control className="form-select" as="select" onChange={(event) => { setLuogoRitiro(event.target.value) }} required>
                                                <option value="" disabled selected>Seleziona</option>
                                                {optionsParcheggio}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className="me-2">Luogo di consegna</Form.Label>
                                            <Form.Control className="form-select" as="select" onChange={(event) => { setLuogoConsegna(event.target.value) }} required>
                                                <option value="" disabled selected>Seleziona</option>
                                                {optionsParcheggio}
                                            </Form.Control>
                                        </Form.Group>

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