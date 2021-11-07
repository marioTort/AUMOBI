import React, { useState } from 'react';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function DataRitiro(props) {
    const [oraRitiro, setOraRitiro] = useState("");
    const [dataRitiro, setDataRitiro] = useState("");
    const now = new Date()

    function settaDataRitiro() {
        var dataR = new Date(dataRitiro);
        localStorage.setItem("dataRitiro", (dataR.getDate() + "/" + (dataR.getMonth() + 1) + "/" + dataR.getFullYear()));
        localStorage.setItem("oraRitiro", oraRitiro);
        localStorage.setItem("dataRitiroUTC", dataR);
        alert("Data di ritiro impostata! Clicca su Close per proseguire...");
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
                    Inserisci data di ritiro
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                        <br></br>
                        <Form>
                            <Row className="gy-8">

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
                                            <option value="05:00" disabled={(now.getHours() > 4 || (now.getHours() === 4 && now.getMinutes() > 40)) ? true : false}>5:00</option>
                                            <option value="05:30" disabled={(now.getHours() > 5 || (now.getHours() === 5 && now.getMinutes() > 10)) ? true : false}>5:30</option>
                                            <option value="06:00" disabled={(now.getHours() > 5 || (now.getHours() === 5 && now.getMinutes() > 40)) ? true : false}>6:00</option>
                                            <option value="06:30" disabled={(now.getHours() > 6 || (now.getHours() === 6 && now.getMinutes() > 10)) ? true : false}>6:30</option>
                                            <option value="07:00" disabled={(now.getHours() > 6 || (now.getHours() === 6 && now.getMinutes() > 40)) ? true : false}>7:00</option>
                                            <option value="07:30" disabled={(now.getHours() > 7 || (now.getHours() === 7 && now.getMinutes() > 10)) ? true : false}>7:30</option>
                                            <option value="08:00" disabled={(now.getHours() > 7 || (now.getHours() === 7 && now.getMinutes() > 40)) ? true : false}>8:00</option>
                                            <option value="08:30" disabled={(now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 10)) ? true : false}>8:30</option>
                                            <option value="09:00" disabled={(now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 40)) ? true : false}>9:00</option>
                                            <option value="09:30" disabled={(now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 10)) ? true : false}>9:30</option>
                                            <option value="10:00" disabled={(now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 40)) ? true : false}>10:00</option>
                                            <option value="10:30" disabled={(now.getHours() > 10 || (now.getHours() === 10 && now.getMinutes() > 10)) ? true : false}>10:30</option>
                                            <option value="11:00" disabled={(now.getHours() > 10 || (now.getHours() === 10 && now.getMinutes() > 40)) ? true : false}>11:00</option>
                                            <option value="11:30" disabled={(now.getHours() > 11 || (now.getHours() === 11 && now.getMinutes() > 10)) ? true : false}>11:30</option>
                                            <option value="12:00" disabled={(now.getHours() > 11 || (now.getHours() === 11 && now.getMinutes() > 40)) ? true : false}>12:00</option>
                                            <option value="12:30" disabled={(now.getHours() > 12 || (now.getHours() === 12 && now.getMinutes() > 10)) ? true : false}>12:30</option>
                                            <option value="13:00" disabled={(now.getHours() > 12 || (now.getHours() === 12 && now.getMinutes() > 40)) ? true : false}>13:00</option>
                                            <option value="13:30" disabled={(now.getHours() > 13 || (now.getHours() === 13 && now.getMinutes() > 10)) ? true : false}>13:30</option>
                                            <option value="14:00" disabled={(now.getHours() > 13 || (now.getHours() === 13 && now.getMinutes() > 40)) ? true : false}>14:00</option>
                                            <option value="14:30" disabled={(now.getHours() > 14 || (now.getHours() === 14 && now.getMinutes() > 10)) ? true : false}>14:30</option>
                                            <option value="15:00" disabled={(now.getHours() > 14 || (now.getHours() === 14 && now.getMinutes() > 40)) ? true : false}>15:00</option>
                                            <option value="15:30" disabled={(now.getHours() > 15 || (now.getHours() === 15 && now.getMinutes() > 10)) ? true : false}>15:30</option>
                                            <option value="16:00" disabled={(now.getHours() > 15 || (now.getHours() === 15 && now.getMinutes() > 40)) ? true : false}>16:00</option>
                                            <option value="16:30" disabled={(now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() > 10)) ? true : false}>16:30</option>
                                            <option value="17:00" disabled={(now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() > 40)) ? true : false}>17:00</option>
                                            <option value="17:30" disabled={(now.getHours() > 17 || (now.getHours() === 17 && now.getMinutes() > 10)) ? true : false}>17:30</option>
                                            <option value="18:00" disabled={(now.getHours() > 17 || (now.getHours() === 17 && now.getMinutes() > 40)) ? true : false}>18:00</option>
                                            <option value="18:30" disabled={(now.getHours() > 18 || (now.getHours() === 18 && now.getMinutes() > 10)) ? true : false}>18:30</option>
                                            <option value="19:00" disabled={(now.getHours() > 18 || (now.getHours() === 18 && now.getMinutes() > 40)) ? true : false}>19:00</option>
                                            <option value="19:30" disabled={(now.getHours() > 19 || (now.getHours() === 19 && now.getMinutes() > 10)) ? true : false}>19:30</option>
                                            <option value="20:00" disabled={(now.getHours() > 19 || (now.getHours() === 19 && now.getMinutes() > 40)) ? true : false}>20:00</option>
                                            <option value="20:30" disabled={(now.getHours() > 20 || (now.getHours() === 20 && now.getMinutes() > 10)) ? true : false}>20:30</option>
                                            <option value="21:00" disabled={(now.getHours() > 20 || (now.getHours() === 20 && now.getMinutes() > 40)) ? true : false}>21:00</option>
                                            <option value="21:30" disabled={(now.getHours() > 21 || (now.getHours() === 21 && now.getMinutes() > 10)) ? true : false}>21:30</option>
                                            <option value="22:00" disabled={(now.getHours() > 21 || (now.getHours() === 21 && now.getMinutes() > 40)) ? true : false}>22:00</option>
                                            <option value="22:30" disabled={(now.getHours() > 22 || (now.getHours() === 22 && now.getMinutes() > 10)) ? true : false}>22:30</option>
                                            <option value="23:00" disabled={(now.getHours() > 22 || (now.getHours() === 22 && now.getMinutes() > 40)) ? true : false}>23:00</option>
                                            <option value="23:30" disabled={(now.getHours() > 23 || (now.getHours() === 23 && now.getMinutes() > 10)) ? true : false}>23:30</option>
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
                <Button onClick={settaDataRitiro}>Inserisci</Button>
            </Modal.Footer>
        </Modal>
    );
}