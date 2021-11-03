import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function AssegnaParcheggiatoreModal(props) {

    const [Parcheggiatore, setParcheggiatore] = useState("");
    const [Stallo, setStallo] = useState("");

    const [renderParcheggiatori, setRenderParcheggiatori] = useState(true);
    const [optionsParcheggiatori, setOptionsParcheggiatori] = useState([]);

    const [renderStalli, setRenderStalli] = useState(true);
    const [optionsStalli, setOptionsStalli] = useState([]);

    async function elencoParcheggiatori() {

        var data = JSON.stringify({
            tipoUtente: "Parcheggiatore"
        });

        var config = {
            method: 'post',
            url: '/api/fetch/listaimp',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("listaParcheggiatori", JSON.stringify(response.data));

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    elencoParcheggiatori();

    async function elencoStalli() {

        var config = {
            method: 'post',
            url: '/api/fetch/listastalliadmin',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("listaStalli", JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    elencoStalli();

    useEffect(() => {
        if (renderParcheggiatori) {
            for (let index = 0; index < JSON.parse(localStorage.getItem('listaParcheggiatori')).listaImp.length; index++) {
                const element = JSON.parse(localStorage.getItem('listaParcheggiatori')).listaImp[index].email;
                setOptionsParcheggiatori(optionsParcheggiatori => [...optionsParcheggiatori, <option value={element}>{element}</option>])
            }
        }
        setRenderParcheggiatori(false);
    }, [renderParcheggiatori])

    useEffect(() => {
        if (renderStalli) {
            for (let index = 0; index < JSON.parse(localStorage.getItem('listaStalli')).listaStalli.length; index++) {
                const element = JSON.parse(localStorage.getItem('listaStalli')).listaStalli[index].indirizzoStallo;
                setOptionsStalli(optionsStalli => [...optionsStalli, <option value={element}>{element}</option>])
            }
        }
        setRenderStalli(false);
    }, [renderStalli])



    async function assegnaParch(event) {
        event.preventDefault();
        var data = JSON.stringify({
            email: Parcheggiatore,
            indirizzoAssegnazioneParcheggiatore: Stallo
        });

        var config = {
            method: 'put',
            url: '/api/registrazione/assegnaparcheggiatore',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.replace("/gestioneimpiegati");
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Assegna Parcheggiatore
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                        <br></br>
                        <Form>
                            <Row className="gy-8">

                                <Form.Group>
                                    <Form.Label className="me-2">Lista Parcheggiatori</Form.Label>
                                    <Form.Control className="form-select" as="select" onChange={(event) => { setParcheggiatore(event.target.value) }} required>
                                        <option value="" disabled selected>Seleziona</option>
                                        {optionsParcheggiatori}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="me-2">Lista Stalli</Form.Label>
                                    <Form.Control className="form-select" as="select" onChange={(event) => { setStallo(event.target.value) }} required>
                                        <option value="" disabled selected>Seleziona</option>
                                        {optionsStalli}
                                    </Form.Control>
                                </Form.Group>

                            </Row>
                            <br></br>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={assegnaParch}>Assegna</Button>
            </Modal.Footer>
        </Modal>
    );
}