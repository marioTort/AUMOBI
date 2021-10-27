import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default function AggiornaCarta(props) {

    const [validaDati, setValidaDati] = useState({
        intestatario: false,
        numeroCartaCredito: false,
        dataScadenzaCarta: false,
        CVV: false
    });

    const [intestatario, setIntestatario] = useState("");
    const [numeroCartaCredito, setNumeroCartaCredito] = useState("");
    const [dataScadenzaCarta, setDataScadenzaCarta] = useState("");
    const [CVV, setCVV] = useState("");

    const dataStringa = dataScadenzaCarta.toString();

    let mese = dataStringa.substring(0, 2);
    let anno = dataStringa.substring(3, 5);

    useEffect(() => {

        const numeroCarta = document.querySelector("#cardNumber");
        const intestat = document.querySelector("#cardName");
        const dataScad = document.querySelector("#cardExpiration");
        const cvv = document.querySelector("#cardSecurityCode");

        if (validaDati.numeroCartaCredito) {
            const regex = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/);
            const error = document.querySelector("#formatoCartaNonValido");
            const match = regex.test(numeroCarta.value);

            if (!match) {
                numeroCarta.classList.add("border-danger", "text-danger");
                error.classList.remove("d-none");
            } else {
                numeroCarta.classList.remove("border-danger", "text-danger");
                numeroCarta.classList.add("border-success", "text-success");
                error.classList.add("d-none");
            }
            setValidaDati({ ...validaDati, numeroCartaCredito: false });
        }
        if (validaDati.intestatario) {
            intestat.classList.remove("border-danger", "border-success")
            intestat.value === "" ? intestat.classList.add("border-danger") : intestat.classList.add("border-success");
            setValidaDati({ ...validaDati, intestatario: false });
        }
        if (validaDati.dataScadenzaCarta) {

            const regex = new RegExp(/^(0?[1-9]|1[012])[\/\-]\d{2}$/);
            const error = document.querySelector("#formatoDataNonValido");
            const match = regex.test(dataScad.value);

            if (!match) {
                dataScad.classList.add("border-danger", "text-danger");
                error.classList.remove("d-none");
            } else {
                dataScad.classList.remove("border-danger", "text-danger");
                dataScad.classList.add("border-success", "text-success");
                error.classList.add("d-none");
            }

            setValidaDati({ ...validaDati, dataScadenzaCarta: false });
        }
        if (validaDati.CVV) {

            const regex = new RegExp(/^[0-9]{3,4}$/);
            const error = document.querySelector("#formatoDataNonValido");
            const match = regex.test(cvv.value);

            if (!match) {
                cvv.classList.add("border-danger", "text-danger");
                error.classList.remove("d-none");
            } else {
                cvv.classList.remove("border-danger", "text-danger");
                cvv.classList.add("border-success", "text-success");
                error.classList.add("d-none");
            }

            setValidaDati({ ...validaDati, CVV: false });
        }
    }, [validaDati])

    async function registraCarta(event) {
        event.preventDefault();

        var data = JSON.stringify({
            email: JSON.parse(localStorage.getItem("datiPersonali")).email,
            intestatario: intestatario,
            numeroCartaCredito: numeroCartaCredito,
            annoScadenzaCarta: anno,
            meseScadenzaCarta: mese,
            CVV: CVV
        });

        var config = {
            method: 'post',
            url: '/api/wallet/aggiungicarta',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("datiCarta", JSON.stringify(response.data.datiCarta));
                window.location.replace("/gestioneaccount");
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
                    Aggiorna Carta
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                        <br></br>
                        <div className="box justify-content-center align-items-center">
                            <div className="formDiv">
                                <div className="credit-card">
                                    <Cards
                                        cvc={CVV}
                                        expiry={dataScadenzaCarta}
                                        name={intestatario}
                                        number={numeroCartaCredito}
                                    />
                                    <br></br>
                                </div>
                                <Form onSubmit={registraCarta}>
                                    <Row className="gy-4" >
                                        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                            <Form.Group >
                                                <Form.Label>Numero carta</Form.Label>
                                                <Form.Control type="number" id="cardNumber" placeholder="Numero carta" onBlur={() => setValidaDati({ ...validaDati, numeroCartaCredito: true })} onChange={(event) => { setNumeroCartaCredito(event.target.value) }} required />
                                                <Form.Text id="formatoCartaNonValido" className="text-danger d-none">Formato patente non valido!</Form.Text>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                            <Form.Group >
                                                <Form.Label>Intestatario</Form.Label>
                                                <Form.Control type="text" id="cardName" placeholder="Intestatario" onBlur={() => setValidaDati({ ...validaDati, intestatario: true })} onChange={(event) => { setIntestatario(event.target.value) }} required />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                            <Form.Group>
                                                <Form.Label>Data di scadenza</Form.Label>
                                                <Form.Control type="text" id="cardExpiration" placeholder="Data di scadenza" onBlur={() => setValidaDati({ ...validaDati, dataScadenzaCarta: true })} onChange={(event) => { setDataScadenzaCarta(event.target.value) }} required />
                                                <Form.Text id="formatoDataNonValido" className="text-danger d-none">Formato carta non valido!</Form.Text>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                            <Form.Group >
                                                <Form.Label>CVV</Form.Label>
                                                <Form.Control type="number" id="cardSecurityCode" placeholder="CVV" onBlur={() => setValidaDati({ ...validaDati, CVV: true })} onChange={(event) => { setCVV(event.target.value) }} required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <br></br>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={registraCarta}>Aggiungi</Button>
            </Modal.Footer>
        </Modal>
    );


}