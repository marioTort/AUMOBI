import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function AssegnaAutistaModal(props) {

    const [Autista, setAutista] = useState("");
    const [Targa, setTarga] = useState("");

    const [renderAutisti, setRenderAutisti] = useState(true);
    const [optionsAutisti, setOptionsAutisti] = useState([]);

    const [renderAuto, setRenderAuto] = useState(true);
    const [optionsAuto, setOptionsAuto] = useState([]);

    async function elencoAutisti() {

        var data = JSON.stringify({
            tipoUtente: "Autista"
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
                localStorage.setItem("listaAutisti", JSON.stringify(response.data));

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    elencoAutisti();

    async function elencoAuto() {

        var data = JSON.stringify({
            "tipoMezzo": "Auto"
        });

        var config = {
            method: 'post',
            url: '/api/fetch/listaauto',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("listaAuto", JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    elencoAuto();

    useEffect(() => {
        if (renderAutisti) {
            for (let index = 0; index < JSON.parse(localStorage.getItem('listaAutisti')).listaImp.length; index++) {
                const element = JSON.parse(localStorage.getItem('listaAutisti')).listaImp[index].email;
                setOptionsAutisti(optionsAutisti => [...optionsAutisti, <option value={element}>{element}</option>])
            }
        }
        setRenderAutisti(false);
    }, [renderAutisti])

    useEffect(() => {
        if (renderAuto) {
            for (let index = 0; index < JSON.parse(localStorage.getItem('listaAuto')).listaMezzi.length; index++) {
                const element = JSON.parse(localStorage.getItem('listaAuto')).listaMezzi[index].targa;
                setOptionsAuto(optionsAuto => [...optionsAuto, <option value={element}>{element}</option>])
            }
        }
        setRenderAuto(false);
    }, [renderAuto])



    async function assegnaAut(event) {
        event.preventDefault();
        var data = JSON.stringify({
            email: Autista,
            targa: Targa
        });

        var config = {
            method: 'put',
            url: '/api/mezzo/assegnaautista',
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
                    Assegna Autista
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                        <br></br>
                        <Form>
                            <Row className="gy-8">

                                <Form.Group>
                                    <Form.Label className="me-2">Lista Autisti</Form.Label>
                                    <Form.Control className="form-select" as="select" onChange={(event) => { setAutista(event.target.value) }} required>
                                        <option value="" disabled selected>Seleziona</option>
                                        {optionsAutisti}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="me-2">Lista Auto</Form.Label>
                                    <Form.Control className="form-select" as="select" onChange={(event) => { setTarga(event.target.value) }} required>
                                        <option value="" disabled selected>Seleziona</option>
                                        {optionsAuto}
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
                <Button onClick={assegnaAut}>Assegna</Button>
            </Modal.Footer>
        </Modal>
    );
}