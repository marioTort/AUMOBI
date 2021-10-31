import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function ModificaLuogoConsegna(props) {

    const [idPrenotazione, setIdPrenotazione] = useState("");
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



    async function modificaLuogoConsegna(event) {
        event.preventDefault();
        var data = JSON.stringify({
            idPrenotazione: idPrenotazione,
            nuovoLuogoConsegna: luogoConsegna
        });

        var config = {
            method: 'put',
            url: '/api/prenotazione/modificaluogoconsegna',
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
                    Modifica luogo di consegna
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
                                        <Form.Label>#Prenotazione</Form.Label>
                                        <Form.Control type="text" placeholder="Inserisci id prenotazione" onChange={(event) => { setIdPrenotazione(event.target.value) }} required />
                                    </Form.Group>
                                </Col>

                                <Form.Group>
                                    <Form.Label className="me-2">Luogo di consegna</Form.Label>
                                    <Form.Control className="form-select" as="select" onChange={(event) => { setLuogoConsegna(event.target.value) }} required>
                                        <option value="" disabled selected>Seleziona</option>
                                        {optionsParcheggio}
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
                <Button onClick={modificaLuogoConsegna}>Modifica</Button>
            </Modal.Footer>
        </Modal>
    );
}