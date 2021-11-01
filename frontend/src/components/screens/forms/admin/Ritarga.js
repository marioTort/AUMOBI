import React, { useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function Ritarga(props) {
    
    const [nuovaTarga, setNuovaTarga] = useState("");


    async function ritargaMezzo(event) {
        event.preventDefault();

        var data = JSON.stringify({
            targa: localStorage.getItem('targaVeicoloDaRitargare'),
            nuovaTarga: nuovaTarga
        });

        var config = {
            method: 'put',
            url: '/api/mezzo/ritargamezzo',
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
                    Ritarga Mezzo
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
                                        <Form.Label>Nuova targa</Form.Label>
                                        <Form.Control type="text" placeholder="Inserisci la nuova targa" pattern="^[a-zA-Z]{1,2}[0-9]{2,4}[a-zA-Z]{2,3}$" onChange={(event) => { setNuovaTarga(event.target.value) }} required />
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
                <Button onClick={ritargaMezzo}>Modifica</Button>
            </Modal.Footer>
        </Modal>
    );
}