import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form , Button } from 'react-bootstrap'

export default function AggiungiPatente(props) {

    const [validaDati, setValidaDati] = useState({
        numeroPatente: false,
        dataScadenza: false,
        categoria: false
    });

    const [numeroPatente, setNumeroPatente] = useState("");
    const [dataScadenza, setDataScadenza] = useState("");
    const [categoria, setCategoria] = useState("");

    useEffect(() => {
        let patenteInserita = document.querySelector("#numeroPatente");
        let dataScad = document.querySelector("#dataScadenzaPatente");
        let tipo = document.querySelector("#tipoPatente");

        // Valido campo Numero Patente
        if (validaDati.numeroPatente) {
            const regex = new RegExp(/^([A-Z]{2}\d{7}[A-Z])|(^[U]1[BCDEFGHLMNPRSTUWYXZ]\w{6}[A-Z])$/);
            const error = document.querySelector("#formatoCartaNonValido");
            const match = regex.test(patenteInserita.value);

            if (!match) {
                patenteInserita.classList.add("border-danger", "text-danger");
                error.classList.remove("d-none");
            } else {
                patenteInserita.classList.remove("border-danger", "text-danger");
                patenteInserita.classList.add("border-success", "text-success");
                error.classList.add("d-none");
            }
            setValidaDati({ ...validaDati, numeroPatente: false });
        }
        if (validaDati.categoria) {
            tipo.classList.remove("border-danger", "border-success")
            tipo.value === "" ? tipo.classList.add("border-danger") : tipo.classList.add("border-success");
            setValidaDati({ ...validaDati, categoria: false });
        }
        if (validaDati.dataScadenza) {

            const regex = new RegExp(/^(0?[1-9]|1[012])[\/\-]\d{4}$/);
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

            setValidaDati({ ...validaDati, dataScadenza: false });
        }
    }, [validaDati])

    async function registraPatente(event) {
        event.preventDefault();

        var data = JSON.stringify({
            email: JSON.parse(localStorage.getItem("datiPersonali")).email,
            numeroPatente: numeroPatente,
            dataScadenza: dataScadenza,
            categoria: categoria
        });

        var config = {
            method: 'post',
            url: '/api/patente/aggiungipatente',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("datiPatente", JSON.stringify(response.data.datiPatente));
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
                    Aggiungi Patente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                            <br></br>
                            <Form>
                                <Row className="gy-4">

                                    <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                        <Form.Group controlId="numeroPatente">
                                            <Form.Label>Numero patente</Form.Label>
                                            <Form.Control type="text" placeholder="Inserisci il numero di patente" onBlur={() => setValidaDati({ ...validaDati, numeroPatente: true })} onChange={(event) => { setNumeroPatente(event.target.value) }} required />
                                            <Form.Text id="formatoCartaNonValido" className="text-danger d-none">Formato patente non valido!</Form.Text>
                                        </Form.Group>
                                    </Col>

                                    <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                        <Form.Group controlId="dataScadenzaPatente">
                                            <Form.Label>Data di scadenza (mm/aaaa)</Form.Label>
                                            <Form.Control type="text" placeholder="Inserisci data di scadenza (mm/aaaa)" onBlur={() => setValidaDati({ ...validaDati, dataScadenza: true })} onChange={(event) => { setDataScadenza(event.target.value) }} required />
                                            <Form.Text id="formatoDataNonValido" className="text-danger d-none">Formato data di scadenza non valido!</Form.Text>
                                        </Form.Group>
                                    </Col>


                                    <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                        <Form.Group controlId="tipoPatente">
                                            <Form.Label>Tipo patente</Form.Label>
                                            <Form.Control className="form-select" as="select" onBlur={() => setValidaDati({ ...validaDati, categoria: true })} onChange={(event) => { setCategoria(event.target.value) }} required>
                                                <option value="" disabled selected>Seleziona</option>
                                                <option value="AM">AM</option>
                                                <option value="A1">A1</option>
                                                <option value="B">B</option>
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
                <Button onClick={registraPatente}>Aggiungi</Button>
            </Modal.Footer>
        </Modal>
    );
}