import React, { useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function Sposta(props) {
    
    const [nuovaPosizione, setNuovaPosizione] = useState("");


    async function spostaMezzo(event) {
        event.preventDefault();

        var data = JSON.stringify({
            targa: localStorage.getItem('targaVeicoloDaSpostare'),
            nuovaPosizione: nuovaPosizione
        });

        var config = {
            method: 'put',
            url: '/api/mezzo/sposta',
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
                    Sposta Mezzo
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
                                        <Form.Label className="me-2">Nuovo Stallo</Form.Label>
                                        <Form.Control className="form-select" as="select" onChange={(event) => { setNuovaPosizione(event.target.value) }} required>
                                            <option value="" disabled selected>Seleziona</option>
                                            
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
                <Button onClick={spostaMezzo}>Sposta</Button>
            </Modal.Footer>
        </Modal>
    );
}