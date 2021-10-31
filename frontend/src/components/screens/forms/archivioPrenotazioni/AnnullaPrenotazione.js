import React, { useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function AnnullaPrenotazione(props) {

    const [idPrenotazione, setIdPrenotazione] = useState("");


    async function annullaPrenotazione(event) {
        event.preventDefault();
        var data = JSON.stringify({
            idPrenotazione: idPrenotazione
        });

        var config = {
            method: 'put',
            url: '/api/prenotazione/annullaprenotazione',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                //window.location.replace("/archivioprenotazioni");
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
                    Annulla prenotazione
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

                            </Row>
                            <br></br>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={annullaPrenotazione}>Annulla Prenotazione</Button>
            </Modal.Footer>
        </Modal>
    );
}