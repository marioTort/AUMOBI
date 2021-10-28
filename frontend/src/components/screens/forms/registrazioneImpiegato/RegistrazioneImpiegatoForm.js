import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Container, Row, Col, Form } from 'react-bootstrap';

// Custom Components
import CampoDataNascita from '../../../utils/CampoDataNascita';
import CampoLuogoNascita from '../../../utils/CampoLuogoNascita';
import Button from '../../../utils/Button';
import CampoEmailAdmin from '../../../utils/CampoEmailAdmin';
import CampoPassword from '../../../utils/CampoPassword';

const CodiceFiscale = require("codice-fiscale-js");

// Form Registrazione dati anagrafici
export default function RegistrazioneClienteForm() {

    const [validaDati, setValidaDati] = useState({
        nome: false,
        cognome: false,
        sesso: false,
        CF: {
            check: false,
            valid: false
        },
        cellulare: false
    })

    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [sesso, setSesso] = useState("");
    const [CF, setCF] = useState("");
    const [telefono, setTelefono] = useState("");
    const [tipoUtente, setTipoUtente] = useState("");

    const [numeroPatente, setNumeroPatente] = useState("");
    const [dataScadenza, setDataScadenza] = useState("");
    const [tipoPatente, setTipoPatente] = useState("");

    useEffect(() => {
        let nomeInserito = document.querySelector("#nome");
        let cognomeInserito = document.querySelector("#cognome");
        let sessoInserito = document.querySelector("#sesso");
        // Controllo campo Nome
        if (validaDati.nome) {
            nomeInserito.classList.remove("border-danger", "border-success");
            nomeInserito.value === "" ? nomeInserito.classList.add("border-danger") : nomeInserito.classList.add("border-success");
            setValidaDati({ ...validaDati, nome: false });
        }
        // Controllo campo Cognome
        if (validaDati.cognome) {
            cognomeInserito.classList.remove("border-danger", "border-success")
            cognomeInserito.value === "" ? cognomeInserito.classList.add("border-danger") : cognomeInserito.classList.add("border-success");
            setValidaDati({ ...validaDati, cognome: false });
        }
        // Controllo campo Sesso
        if (validaDati.sesso) {
            sessoInserito.classList.remove("border-danger", "border-success")
            sessoInserito.value === "" ? sessoInserito.classList.add("border-danger") : sessoInserito.classList.add("border-success");
            setValidaDati({ ...validaDati, sesso: false });
        }
        // Controllo CF
        if (validaDati.CF.check) {
            let cf;
            let dataNascita = new Date(document.querySelector("#dataNascita").value);
            let nazionalita = "ITALIA";
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
                setValidaDati({ ...validaDati, CF: { check: false, valid: false } });
            } else {
                inputCF.classList.add("border-success");
                inputCF.classList.remove("border-danger");
                setValidaDati({ ...validaDati, CF: { check: false, valid: true } });
            }
            // Controllo campo Cellulare
            if (validaDati.cellulare) {
                let inputCellulare = document.querySelector("#cellulare");
                inputCellulare.classList.remove("border-danger", "border-success");
                inputCellulare.value === "" ? inputCellulare.classList.add("border-danger") : inputCellulare.classList.add("border-success");
                setValidaDati({ ...validaDati, cellulare: false });
            }
        }
    }, [validaDati])
    

    async function registra(event) {
        event.preventDefault();
        var data = JSON.stringify({
            nome: nome,
            cognome: cognome,
            sesso: sesso,
            luogoDiNascita: localStorage.getItem('luogoDiNascita'),
            dataDiNascita: localStorage.getItem('dataDiNascita'),
            CF: CF,
            email: localStorage.getItem('emailImpiegato'),
            telefono: telefono,
            password: localStorage.getItem('password'),
            tipoUtente: tipoUtente
        });

        var config = {
            method: 'post',
            url: '/api/registrazione/registrazioneimpiegato',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    

    async function inserisci(event) {
        event.preventDefault();
        var data = JSON.stringify({
            email: localStorage.getItem('emailImpiegato'),
            numeroPatente: numeroPatente,
            dataScadenza: dataScadenza,
            categoria: tipoPatente
        });

        var config = {
            method: 'post',
            url: '/api/patente/aggiungipatente',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.removeItem("emailImpiegato");
                window.location.replace("/registrazioneimpiegatocompletata");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione impiegato</h1>
                    <Form>
                        <Row className="gy-4">
                            <Col xs={{ span: 6 }} >
                                <Form.Group controlId="nome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci nome" checked pattern="[A-z]+\ [A-z]+" onBlur={() => setValidaDati({ ...validaDati, nome: true })} onChange={(event) => { setNome(event.target.value) }} required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} >
                                <Form.Group controlId="cognome">
                                    <Form.Label>Cognome</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci cognome" pattern="[A-z]+\ [A-z]+" onBlur={() => setValidaDati({ ...validaDati, cognome: true })} onChange={(event) => { setCognome(event.target.value) }} required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} >
                                <CampoDataNascita />
                            </Col>
                            <Col xs={{ span: 6 }} >
                                <Form.Group controlId="sesso">
                                    <Form.Label>Sesso </Form.Label>
                                    <Form.Control className="form-select" as="select" onBlur={() => setValidaDati({ ...validaDati, sesso: true })} onChange={(event) => { setSesso(event.target.value) }} required>
                                        <option value="" disabled selected>Seleziona...</option>
                                        <option value="M">M</option>
                                        <option value="F">F</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <CampoLuogoNascita />
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <Form.Group controlId="CF">
                                    <Form.Label className="me-2">Codice fiscale</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci codice fiscale" onBlur={() => setValidaDati({ ...validaDati, CF: { ...validaDati.CF, check: true } })} onChange={(event) => { setCF(event.target.value) }} required />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 6 }} >
                                <Form.Group controlId="cellulare">
                                    <Form.Label>Cellulare</Form.Label>
                                    <Form.Control type="tel" placeholder="Inserisci numero di cellulare" pattern="^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$" onBlur={() => setValidaDati({ ...validaDati, cellulare: true })} onChange={(event) => { setTelefono(event.target.value) }} required />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 6 }} >
                                <Form.Group controlId="tipologiaImpiegato">
                                    <Form.Label>Tipologia impiegato </Form.Label>
                                    <Form.Control className="form-select" as="select" onChange={(event) => { setTipoUtente(event.target.value) }} required>
                                        <option value="" disabled selected>Seleziona</option>
                                        <option value="Autista">Autista</option>
                                        <option value="Parcheggiatore">Parcheggiatore</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <CampoEmailAdmin controlId={"signupEmail"} placeholder={"Inserisci email"} required>
                                    Email
                                </CampoEmailAdmin>
                            </Col>
                            
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <CampoPassword tooltip controlId={"signupPassword"} placeholder={"Inserisci password"}>
                                    Password
                                </CampoPassword>
                            </Col>
                            <div className="d-flex justify-content-end">
                                <Button variant="outline-success" onClick={registra} >Registra Impiegato</Button>
                            </div>

                            <div style={{ borderTop: "2px solid #000000 ", marginLeft: 0, marginRight: 0 }}></div>

                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="numeroPatente">
                                    <Form.Label>Numero patente</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci numero di patente" pattern="[a-zA-Z]{2}\d{7}[a-zA-Z]{1}" onChange={(event) => { setNumeroPatente(event.target.value) }} required/>
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="dataScadenza">
                                    <Form.Label>Data di scadenza</Form.Label>
                                    <Form.Control type="month" placeholder="Inserisci data di scadenza" onChange={(event) => { setDataScadenza(event.target.value) }} required/>
                                </Form.Group>                             
                            </Col>

                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="tipologiaPatente">
                                    <Form.Label>Tipologia patente</Form.Label>
                                    <Form.Control className="form-select" as="select" onChange={(event) => { setTipoPatente(event.target.value) }} required>
                                        <option value="" disabled selected>Seleziona</option>
                                        <option value="B">B</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            
                            
                            <div className="d-flex justify-content-end">
                                <Button variant="outline-success" onClick={inserisci} >Inserisci Patente</Button>
                            </div>
                            
                        </Row>
                        <br></br>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}