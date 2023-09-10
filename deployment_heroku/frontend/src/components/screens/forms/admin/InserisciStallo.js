import React, { useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function Riprezza(props) {

    const [indirizzo, setIndirizzo] = useState("");
    const [tipoMezzi, setTipoMezzi] = useState("");
    const [postiDisponibili, setPostiDisponibili] = useState("");
    const [capienza, setCapienza] = useState("");


    async function inserisciNuovoStallo(event) {
        event.preventDefault();

        var data = JSON.stringify({
            indirizzoStallo: indirizzo,
            tipoMezzi: tipoMezzi,
            postiDisponibili: postiDisponibili,
            capienza: capienza
        });

        var config = {
            method: 'post',
            url: '/api/stallo/aggiungistallo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.replace("/schermataadmin");
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
                    Inserisci nuovo stallo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                        <br></br>
                        <Form>
                            <Row className="gy-8">

                                <Col xs={{ span: 12 }}>
                                    <Form.Group>
                                        <Form.Label>Indirizzo stallo</Form.Label>
                                        <Form.Control type="text" placeholder="Inserisci indirizzo" onChange={(event) => { setIndirizzo(event.target.value) }} required />
                                    </Form.Group>
                                </Col>

                                <Col xs={{ span: 12 }}>
                                    <Form.Group>
                                        <Form.Label>Tipo mezzi</Form.Label>
                                        <Form.Control className="form-select" as="select" onChange={(event) => { setTipoMezzi(event.target.value) }} required>
                                            <option value="" disabled selected>Seleziona</option>
                                            <option value="Auto">Auto</option>
                                            <option value="Moto">Moto</option>
                                            <option value="Bici">Bici</option>
                                            <option value="Monopattino">Monopattino</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col xs={{ span: 12 }}>
                                    <Form.Group>
                                        <Form.Label>Posti disponibili</Form.Label>
                                        <Form.Control type="text" placeholder="Inserisci numero posti disponibili" onChange={(event) => { setPostiDisponibili(event.target.value) }} required />
                                    </Form.Group>
                                </Col>

                                <Col xs={{ span: 12 }}>
                                    <Form.Group>
                                        <Form.Label>Capienza</Form.Label>
                                        <Form.Control type="text" placeholder="Inserisci capienza" onChange={(event) => { setCapienza(event.target.value) }} required />
                                    </Form.Group>
                                </Col>

                            </Row>
                            <br></br>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={inserisciNuovoStallo}>Inserisci</Button>
            </Modal.Footer>
        </Modal>
    );
}