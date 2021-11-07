import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Bootstrap Components
import { ProgressBar, Container, Row, Col, Form } from 'react-bootstrap';

// Custom Components
import CampoDataNascita from '../../../utils/CampoDataNascita';
import CampoLuogoNascita from '../../../utils/CampoLuogoNascita';
import Button from '../../../utils/Button';

const CodiceFiscale = require("codice-fiscale-js");

// Form Registrazione dati anagrafici
export default function RegistrazioneClienteForm() {
    const history = useHistory();
    const [validaDati, setValidaDati] = useState({
        nome: false,
        cognome: false,
        sesso: false,
        CF: {
            check: false,
            valid: false
        }
    })

    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [sesso, setSesso] = useState("");
    const [CF, setCF] = useState("");

    useEffect(() => {
        let nomeInserito = document.querySelector("#nome");
        let cognomeInserito = document.querySelector("#cognome");
        let sessoInserito = document.querySelector("#sesso");

        const error = document.querySelector("#formatoCFNonValido");

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
                error.classList.remove("d-none");
                setValidaDati({ ...validaDati, CF: { check: false, valid: false } });
            } else {
                inputCF.classList.add("border-success");
                inputCF.classList.remove("border-danger");
                error.classList.add("d-none");
                setValidaDati({ ...validaDati, CF: { check: false, valid: true } });
            }

        }
    }, [validaDati])

    //PASSO I DATI ANAGRAFICI ALLA PAGINA CREDENZIALI TRAMITE I LOCAL STORAGE...
    function inviaDatiAnagrafici() {

        const regex = new RegExp(/^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/);
        const match = regex.test(CF);

        if (!match) {
            alert("Codice fiscale non corretto!");
        } else {
            localStorage.setItem("nome", nome);
            localStorage.setItem("cognome", cognome);
            localStorage.setItem("sesso", sesso);
            localStorage.setItem("CF", CF);
            history.push("/credenziali");
        }

    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar className="mb-4" variant="success" animated  now={20} label={`20%`} />
                    <Form onSubmit={inviaDatiAnagrafici}>
                        <Row className="gy-4">
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="nome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il tuo nome" checked pattern="^[A-Za-zèùàòé][a-zA-Z'èùàòé ]*$" onBlur={() => setValidaDati({ ...validaDati, nome: true })} onChange={(event) => { setNome(event.target.value) }} required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="cognome">
                                    <Form.Label>Cognome</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il tuo cognome" pattern="^[A-Za-zèùàòé][a-zA-Z'èùàòé ]*$" onBlur={() => setValidaDati({ ...validaDati, cognome: true })} onChange={(event) => { setCognome(event.target.value) }} required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <CampoDataNascita />
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="sesso">
                                    <Form.Label>Sesso</Form.Label>
                                    <Form.Control className="form-select" as="select" onBlur={() => setValidaDati({ ...validaDati, sesso: true })} onChange={(event) => { setSesso(event.target.value) }} required>
                                        <option value="" disabled selected>Seleziona</option>
                                        <option value="M">M</option>
                                        <option value="F">F</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <CampoLuogoNascita />
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="CF">
                                    <Form.Label className="me-2">Codice fiscale</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il tuo codice fiscale" onBlur={() => setValidaDati({ ...validaDati, CF: { ...validaDati.CF, check: true } })} onChange={(event) => { setCF(event.target.value) }} required />
                                    <Form.Text id="formatoCFNonValido" className="text-danger d-none">Formato codice fiscale non valido!</Form.Text>
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