import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Bootstrap Components
import { ProgressBar, Container, Row, Col, Form } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';

let authToken = localStorage.getItem('authToken');

// Form dati patente
export default function DatiPatenteForm() {
    const history = useHistory();

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

            const regex = new RegExp(/^(0?[1-9]|1[012])[/-]\d{4}$/);
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
        
        const regex = new RegExp(/^(0?[1-9]|1[012])[/-]\d{4}$/);
        const match = regex.test(dataScadenza);

        if (!match) {
            alert("Inserisci una data di scadenza nel formato mm/aaaa");
        } else {
            var data = JSON.stringify({
                email: localStorage.getItem('email'),
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
                    history.push("/datibancari");
                })
                .catch(function (error) {
                    alert("Rispetta i formati richiesti!");
                    console.log(error);
                });
        }

    }

    if(!authToken) {
        window.location.replace("/registrazionecliente");
    } else {
        let isRegistrato = localStorage.getItem('isRegistrato');

        if (isRegistrato) {
            window.location.replace("/schermatacliente");
        } else {
            return (
                <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
                    <Row>
                        <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                            <br></br>
                            <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                            <ProgressBar variant="success" className="mb-4" now={60} animated label={`60%`} />
                            <Form onSubmit={registraPatente}>
                                <Row className="gy-4">

                                    <p className="h4 text-center t-extralight">Se lo desideri puoi inserire la tua patente di guida adesso, <br></br>
                                        altrimenti lascia i seguenti campi vuoti e clicca sul tasto "Prosegui"</p>

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

                                    <div className="d-flex justify-content-end">
                                        <Button variant="outline-success" submit>Prosegui</Button>
                                    </div>
                                </Row>
                                <br></br>
                            </Form>
                        </Col>
                    </Row>
                </Container>

            );
        }
        
    }
   
}
    