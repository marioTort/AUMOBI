import React, { useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function Inserisci(props) {

    const [tipoMezzo, setTipoMezzo] = useState("");
    const [prezzoOrario, setPrezzoOrario] = useState("");

    async function riprezzaPerTipo(event) {
        event.preventDefault();

        var data = JSON.stringify({
            tipoMezzo: tipoMezzo,
            nuovoPrezzo: prezzoOrario
        });

        var config = {
            method: 'put',
            url: '/api/mezzo/riprezzapertipo',
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
                    Riprezza per tipo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                        <br></br>
                        <Form>
                            <Row className="gy-8">

                                <Col xs={{ span: 12 }}>
                                    <Form.Group controlId="tipoVeicolo">
                                        <Form.Label>Tipo veicolo</Form.Label>
                                        <Form.Control className="form-select" as="select" onChange={(event) => { setTipoMezzo(event.target.value) }} required>
                                            <option value="" disabled selected>Seleziona</option>
                                            <option value="Bici">Bici</option>
                                            <option value="Monopattino">Monopattino</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col xs={{ span: 12 }}>
                                    <Form.Group controlId="prezzo">
                                        <Form.Label>Prezzo Orario</Form.Label>
                                        <Form.Control type="text" placeholder="Inserisci il prezzo orario del nuovo veicolo" onChange={(event) => { setPrezzoOrario(event.target.value) }} required />
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
                <Button onClick={riprezzaPerTipo}>Riprezza</Button>
            </Modal.Footer>
        </Modal>
    );
}