import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Bootstrap Components
import { ProgressBar, Container, Row, Col, Form } from 'react-bootstrap';

// Custom Components
import InputDataNascita from '../../../utils/InputDataNascita';
import InputLuogoNascita from '../../../utils/InputLuogoNascita';
import Button from '../../../utils/Button';

const CodiceFiscale = require("codice-fiscale-js");

// Form Registrazione dati anagrafici
export default function RegistrazioneClienteForm() {
    const history = useHistory();
    const [checkValidate, setCheckValidate] = useState({
        nome: false,
        cognome: false,
        sesso: false,
        CF: {
            check: false,
            valid: false
        }
    })
    
    useEffect(() => {
        let inputNome = document.querySelector("#nome");
        let inputCognome = document.querySelector("#cognome");
        let inputSesso = document.querySelector("#sesso");
        // Controllo campo Nome
        if (checkValidate.nome) {
            inputNome.classList.remove("border-danger", "border-success");
            inputNome.value === "" ? inputNome.classList.add("border-danger") : inputNome.classList.add("border-success");
            setCheckValidate({ ...checkValidate, nome: false });
        }
        // Controllo campo Cognome
        if (checkValidate.cognome) {
            inputCognome.classList.remove("border-danger", "border-success")
            inputCognome.value === "" ? inputCognome.classList.add("border-danger") : inputCognome.classList.add("border-success");
            setCheckValidate({ ...checkValidate, cognome: false });
        }
        // Controllo campo Sesso
        if (checkValidate.sesso) {
            inputSesso.classList.remove("border-danger", "border-success")
            inputSesso.value === "" ? inputSesso.classList.add("border-danger") : inputSesso.classList.add("border-success");
            setCheckValidate({ ...checkValidate, sesso: false });
        }
        // Controllo CF
        if (checkValidate.CF.check) {
            let cf;
            let dataNascita = new Date(document.querySelector("#dataNascita").value);
            let nazionalita = document.querySelector("#nazionalita").value;
            let inputCF = document.querySelector("#CF");
            const data = {
                name: document.querySelector('#nome').value,
                surname: document.querySelector('#cognome').value,
                gender: document.querySelector('#sesso').value,
                day: parseInt(dataNascita.getDate()),
                month: parseInt(dataNascita.getMonth() + 1),
                year: parseInt(dataNascita.getFullYear()),
                birthplace: nazionalita === "ITALIA" ? document.querySelector("#comune").value : nazionalita,
                birthplaceProvincia: nazionalita === "ITALIA" ? document.querySelector("#provincia").value : "EE"
            }
            if ((data.gender === "M" || data.gender === "F") && (!isNaN(dataNascita.getTime())) && (data.birthplace !== "") && (data.birthplaceProvincia !== "")) {
                cf = CodiceFiscale.compute(data);
            }
            if (cf !== inputCF.value.toUpperCase()) {
                inputCF.classList.add("border-danger");
                inputCF.classList.remove("border-success");
                setCheckValidate({ ...checkValidate, CF: { check: false, valid: false } });
            } else {
                inputCF.classList.add("border-success");
                inputCF.classList.remove("border-danger");
                setCheckValidate({ ...checkValidate, CF: { check: false, valid: true } });
            }

        }
    }, [checkValidate])
    
    function onSubmit(e) {
            e.preventDefault();
            if (!checkValidate.CF.valid) {
                return
            }
                const userData = {
                    nome: document.querySelector("#nome").value,
                    cognome: document.querySelector("#cognome").value,
                    dataNascita: document.querySelector("#dataNascita").value,
                    sesso: document.querySelector("#sesso").value,
                    luogoNascita: {
                        regione: document.querySelector("#regione").value,
                        provincia: document.querySelector("#provincia").value,
                        citta: document.querySelector("#comune").value,
                    },
                    codiceFiscale: document.querySelector("#CF").value
                }
                history.push("/credenziali", {payload: userData});
        }
    

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar className="mb-4" variant="secondary" now={20}/>
                    <Form onSubmit={onSubmit}>
                        <Row className="gy-4">
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="nome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il tuo nome" checked pattern="^[A-Za-zèùàòé][a-zA-Z'èùàòé ]*$" onBlur={() => setCheckValidate({ ...checkValidate, nome: true })} required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="cognome">
                                    <Form.Label>Cognome</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il tuo cognome" pattern="^[A-Za-zèùàòé][a-zA-Z'èùàòé ]*$" onBlur={() => setCheckValidate({ ...checkValidate, cognome: true })} required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <InputDataNascita />
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="sesso">
                                    <Form.Label>Sesso </Form.Label>
                                    <Form.Control className="form-select" as="select" onBlur={() => setCheckValidate({ ...checkValidate, sesso: true })} required>
                                        <option value="" disabled selected>Seleziona...</option>
                                        <option value="M">M</option>
                                        <option value="F">F</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <InputLuogoNascita />
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="CF">
                                    <Form.Label className="me-2">Codice fiscale</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il tuo codice fiscale" onBlur={() => setCheckValidate({ ...checkValidate, CF: { ...checkValidate.CF, check: true } })} required />
                                </Form.Group>
                            </Col>
                            
                            <div className="d-flex justify-content-end">
                                <Button variant="outline-secondary" submit >Prosegui</Button>
                            </div>
                            
                        </Row>
                        <br></br>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}