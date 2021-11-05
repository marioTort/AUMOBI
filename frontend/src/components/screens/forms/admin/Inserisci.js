import React, { useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function Inserisci(props) {

    const [targa, setTarga] = useState("");
    const [tipoMezzo, setTipoMezzo] = useState("");
    const [categoriaMezzo, setCategoriaMezzo] = useState("");
    const [posizione, setPosizione] = useState("");
    const [prezzoOrario, setPrezzoOrario] = useState("");

    async function aggiungiMezzo(event) {
        event.preventDefault();

        var data = JSON.stringify({
            targa: targa,
            tipoMezzo: tipoMezzo,
            categoriaMezzo: categoriaMezzo,
            posizione: posizione,
            prezzoOrario: prezzoOrario
        });

        var config = {
            method: 'post',
            url: '/api/mezzo/aggiungimezzo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
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
                    Inserisci nuovo veicolo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                        <br></br>
                        <Form>
                            <Row className="gy-8">
                                <Col xs={{ span: 12 }}>
                                    <Form.Group controlId="targa">
                                        <Form.Label>Targa</Form.Label>
                                        <Form.Control type="text" placeholder="Inserisci la targa del nuovo veicolo" pattern="^[a-zA-Z]{1,2}[0-9]{2,4}[a-zA-Z]{2,3}$" onChange={(event) => { setTarga(event.target.value) }} required />
                                    </Form.Group>
                                </Col>

                                <Col xs={{ span: 12 }}>
                                    <Form.Group controlId="tipoVeicolo">
                                        <Form.Label>Tipo veicolo</Form.Label>
                                        <Form.Control className="form-select" as="select" onChange={(event) => { setTipoMezzo(event.target.value) }} required>
                                            <option value="" disabled selected>Seleziona</option>
                                            <option value="Auto">Auto</option>
                                            <option value="Moto">Moto</option>
                                            <option value="Bici">Bici</option>
                                            <option value="Monopattino">Monopattino</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col xs={{ span: 12 }}>
                                    <Form.Group controlId="categoria">
                                        <Form.Label>Categoria</Form.Label>
                                        <Form.Control className="form-select" as="select" onChange={(event) => { setCategoriaMezzo(event.target.value) }}>
                                            <option value="" disabled selected>Seleziona</option>
                                            <option value="Utilitaria">Utilitaria</option>
                                            <option value="Monovolume">Monovolume</option>
                                            <option value="Fuoristrada">Fuoristrada</option>
                                            <option value="49">49</option>
                                            <option value="125">125</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col xs={{ span: 12 }}>
                                    <Form.Group>
                                        <Form.Label className="me-2">Posizione</Form.Label>
                                        <Form.Control className="form-select" as="select" onChange={(event) => { setPosizione(event.target.value) }} required>
                                            <option value="" disabled selected>Seleziona</option>
                                            <option value="Via E. Basile">Via E. Basile</option>
                                            <option value="Viale delle scienze">Viale delle scienze</option>
                                            <option value="Via Roma">Via Roma</option>
                                            <option value="Via della Libertà">Via della Libertà </option>
                                            <option value="Viale Lazio">Viale Lazio </option>
                                            <option value="Giardino Inglese">Giardino Inglese </option>
                                            <option value="Piazza Politeama">Piazza Politeama </option>
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
                <Button onClick={aggiungiMezzo}>Aggiungi</Button>
            </Modal.Footer>
        </Modal>
    );
}