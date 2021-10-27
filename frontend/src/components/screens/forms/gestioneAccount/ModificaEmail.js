import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

export default function ModificaEmail(props) {
    const [validaDati, setValidaDati] = useState({
        email: false
    });

    const [email, setEmail] = useState("");

    useEffect(() => {
        let inputEmail = document.querySelector("#email");
        // Controllo campo Cellulare
        if (validaDati.email) {
            let regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            let error = document.querySelector("#formatoEmailNonValido");
            let match = regex.test(inputEmail.value);
            
            if (!match) {
                inputEmail.classList.add("border-danger", "text-danger");
                error.classList.remove("d-none");
            } else {
                inputEmail.classList.remove("border-danger", "text-danger");
                inputEmail.classList.add("border-success", "text-success");
                error.classList.add("d-none");
            }
            setValidaDati({ ...validaDati, email: false });
        }
    }, [validaDati])

    async function modificaEmail(event) {
        event.preventDefault();

        var data = JSON.stringify({
            vecchiaEmail: JSON.parse(localStorage.getItem("datiPersonali")).email,
            nuovaEmail: email
        });

        var config = {
            method: 'put',
            url: '/api/autenticazione/modificaemailcliente',
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
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="tel" placeholder="Inserisci la nuova email" onBlur={() => setValidaDati({ ...validaDati, email: true })} onChange={(event) => { setEmail(event.target.value) }} required />
                                        <Form.Text id="formatoEmailNonValido" className="text-danger d-none">Formato email non valido!</Form.Text>
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
                <Button onClick={modificaEmail}>Aggiungi</Button>
            </Modal.Footer>
        </Modal>
    );
}