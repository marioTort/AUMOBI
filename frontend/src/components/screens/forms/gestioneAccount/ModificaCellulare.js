import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function ModificaCellulare(props) {
    const [validaDati, setValidaDati] = useState({
        cellulare: false
    });

    const [telefono, setTelefono] = useState("");

    useEffect(() => {
        let inputCellulare = document.querySelector("#cellulare");
        // Controllo campo Cellulare
        if (validaDati.cellulare) {
            inputCellulare.classList.remove("border-danger", "border-success");
            inputCellulare.value === "" ? inputCellulare.classList.add("border-danger") : inputCellulare.classList.add("border-success");
            setValidaDati({ ...validaDati, cellulare: false });
        }
    }, [validaDati])

    async function modificaTelefono(event) {
        event.preventDefault();

        var data = JSON.stringify({
            email: JSON.parse(localStorage.getItem("datiPersonali")).email,
            nuovoTelefono: telefono
        });

        var config = {
            method: 'put',
            url: '/api/autenticazione/modificatelefono',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.clear();
                window.location.replace("/login");
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
                    Aggiungi Patente
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
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control type="tel" placeholder="Inserisci il numero di telefono" pattern="^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$" onBlur={() => setValidaDati({ ...validaDati, cellulare: true })} onChange={(event) => { setTelefono(event.target.value) }} required />
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
                <Button onClick={modificaTelefono}>Aggiungi</Button>
            </Modal.Footer>
        </Modal>
    );
}