import React, { useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function Riprezza(props) {

    const [nuovoPrezzo, setNuovoPrezzo] = useState("");


    async function riprezzaMezzo(event) {
        event.preventDefault();

        var data = JSON.stringify({
            targa: localStorage.getItem('targaVeicoloDaRiprezzare'),
            nuovoPrezzo: nuovoPrezzo
        });

        var config = {
            method: 'put',
            url: '/api/mezzo/riprezzamezzo',
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
                    Riprezza Mezzo
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
                                        <Form.Label>Nuovo prezzo</Form.Label>
                                        <Form.Control type="text" placeholder="Inserisci il nuovo prezzo" onChange={(event) => { setNuovoPrezzo(event.target.value) }} required />
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
                <Button onClick={riprezzaMezzo}>Riprezza</Button>
            </Modal.Footer>
        </Modal>
    );
}