import React, { useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function ModificaDataRitiro(props) {

    const [idPrenotazione, setIdPrenotazione] = useState("");
    const [oraRitiro, setOraRitiro] = useState("");
    const [dataRitiro, setDataRitiro] = useState("");

    async function modificaDataRitiro(event) {
        event.preventDefault();
        var dataR = new Date(dataRitiro);

        var data = JSON.stringify({
            idPrenotazione: idPrenotazione,
            nuovaDataRitiro: (dataR.getDate() + "/" + (dataR.getMonth() + 1) + "/" + dataR.getFullYear()),
            nuovaOraRitiro: oraRitiro
        });

        var config = {
            method: 'put',
            url: '/api/prenotazione/modificadataritiro',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.replace("/archivioprenotazioni");
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
                    Modifica data ritiro
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                        <br></br>
                        <Form>
                            <Row className="gy-8">

                                <Col xs={{ span: 12 }}>
                                    <Form.Group controlId="cellulare">
                                        <Form.Label>#Prenotazione</Form.Label>
                                        <Form.Control type="text" placeholder="Inserisci id prenotazione" onChange={(event) => { setIdPrenotazione(event.target.value) }} required />
                                    </Form.Group>
                                </Col>

                                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                    <Form.Group onChange={(event) => { setDataRitiro(event.target.value) }}>
                                        <Form.Label>Data di ritiro</Form.Label>
                                        <Form.Control type="date" min={new Date().toISOString().substring(0, 10)} maxLength={10} required>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                    <Form.Group >
                                        <Form.Label>Ora di ritiro</Form.Label>
                                        <Form.Control as="select" classe="form-select" onChange={(event) => { setOraRitiro(event.target.value) }} required >
                                            <option value="" disabled selected>Seleziona ora di ritiro</option>
                                            <option value="05:00">5:00</option>
                                            <option value="05:30">5:30</option>
                                            <option value="06:00">6:00</option>
                                            <option value="06:30">6:30</option>
                                            <option value="07:00">7:00</option>
                                            <option value="07:30">7:30</option>
                                            <option value="08:00">8:00</option>
                                            <option value="08:30">8:30</option>
                                            <option value="09:00">9:00</option>
                                            <option value="09:30">9:30</option>
                                            <option value="10:00">10:00</option>
                                            <option value="10:30">10:30</option>
                                            <option value="11:00">11:00</option>
                                            <option value="11:30">11:30</option>
                                            <option value="12:00">12:00</option>
                                            <option value="12:30">12:30</option>
                                            <option value="13:00">13:00</option>
                                            <option value="13:30">13:30</option>
                                            <option value="14:00">14:00</option>
                                            <option value="14:30">14:30</option>
                                            <option value="15:00">15:00</option>
                                            <option value="15:30">15:30</option>
                                            <option value="16:00">16:00</option>
                                            <option value="16:30">16:30</option>
                                            <option value="17:00">17:00</option>
                                            <option value="17:30">17:30</option>
                                            <option value="18:00">18:00</option>
                                            <option value="18:30">18:30</option>
                                            <option value="19:00">19:00</option>
                                            <option value="19:30">19:30</option>
                                            <option value="20:00">20:00</option>
                                            <option value="20:30">20:30</option>
                                            <option value="21:00">21:00</option>
                                            <option value="21:30">21:30</option>
                                            <option value="22:00">22:00</option>
                                            <option value="22:30">22:30</option>
                                            <option value="23:00">23:00</option>
                                            <option value="23:30">23:30</option>
                                        </Form.Control>

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
                <Button onClick={modificaDataRitiro}>Modifica</Button>
            </Modal.Footer>
        </Modal>
    );
}