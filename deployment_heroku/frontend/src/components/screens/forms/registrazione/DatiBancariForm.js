import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Bootstrap Components
import { ProgressBar, Container, Row, Col, Form } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';

//Credit Card Components
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

let authToken = localStorage.getItem('authToken');

export default function DatiBancariForm() {
    
    const history = useHistory();
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

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
        // Valido campo Numero Patente
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
            const error = document.querySelector("#formatoCVVNonValido");
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
            email: localStorage.getItem('email'),
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
                localStorage.clear();
                history.push("/registrazionecompletata");
            })
            .catch(function (error) {
                console.log(error);
            });

    }
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    if (!authToken) {
        window.location.replace("/registrazionecliente");
    } else {

        let isRegistrato = localStorage.getItem('isRegistrato');

        if (isRegistrato) {
            window.location.replace("/schermatacliente");
        } else {

            return (       
                    <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5 pb-5">
                        <Row>
                        <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                            <br></br>
                            <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                            <ProgressBar variant="success" className="mb-4" now={80} animated label={`80%`}/>
                            <p className="h4 pb-4 text-center t-extralight">Per terminare la registrazione inserisci la tua carta di credito adesso.</p>
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
                                            <Form.Control type="text" id="cardNumber" placeholder="Numero carta" minLength="16" maxLength="16" onBlur={() => setValidaDati({ ...validaDati, numeroCartaCredito: true })} onChange={(event) => { setNumeroCartaCredito(event.target.value) }} required />
                                            <Form.Text id="formatoCartaNonValido" className="text-danger d-none">Formato carta non valido!</Form.Text>
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
                                        <Form.Label>Data di scadenza (mm/aa)</Form.Label> 
                                            <Form.Control type="text" id="cardExpiration" placeholder="Data di scadenza"  minLength="5" maxLength="5" onBlur={() => setValidaDati({ ...validaDati, dataScadenzaCarta: true })} onChange={(event) => { setDataScadenzaCarta(event.target.value) }} required />
                                            <Form.Text id="formatoDataNonValido" className="text-danger d-none">Formato data non valido!</Form.Text>
                                        </Form.Group>
                                    </Col>
    
                                    <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                        <Form.Group >
                                            <Form.Label>CVV</Form.Label>
                                            <Form.Control type="text" id="cardSecurityCode" placeholder="CVV" maxLength="4" onBlur={() => setValidaDati({ ...validaDati, CVV: true })} onChange={(event) => { setCVV(event.target.value) }} required/>
                                            <Form.Text id="formatoCVVNonValido" className="text-danger d-none">Formato CVV non valido!</Form.Text>
                                        </Form.Group> 
                                    </Col>
                                    
                                    <div className="d-flex justify-content-end">
                                        <Button variant="outline-success" submit>Completa Registrazione</Button>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                        <br></br>   
                    </div>
                    </Col>
                    </Row>
                    </Container>
            );
        }

    }
}