import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Bootstrap Components
import { ProgressBar, Container, Row, Col, Form } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';

// Form dati patente
export default function DatiPatenteForm() {
    const history = useHistory();
    const [state, setState] = useState({
        error: {
            show: false,
        },
        submit: false
    });
    const [checkValidate, setCheckValidate] = useState({
        numeroPatente: false
    })

    useEffect(() => {
        let campoNumeroPatente = document.querySelector("#numeroPatente");
        if (checkValidate.numeroPatente) {
            campoNumeroPatente.classList.remove("border-danger", "border-success");
            campoNumeroPatente.value === "" ? campoNumeroPatente.classList.add("border-danger") : campoNumeroPatente.classList.add("border-success");
            setCheckValidate({ ...checkValidate, numeroPatente: false });
        }
    }, [checkValidate])

    function onSubmit(e) {
        e.preventDefault();
         
            const userData = {
                ...history.location.state.payload,
                datiPatente: {
                    numeroPatente: document.querySelector("#numeroPatente").value,
                    dataScadenzaPatente: document.querySelector("#dataScadenzaPatente").value,
                    tipoPatente: document.querySelector("#tipoPatente").value
                }
            }
            setState({ ...state, submit: true });
            try {
                axios.post("/patente/aggiungipatente", userData)
                    .then((res) => {
                        history.push("/datibancari" , {payload: userData});
                    })
                    .catch(err => {
                        setState({
                            error: {
                                show: true,
                                message: err.response.data
                            },
                            submit: false
                        })
                    })
            } catch (err) {
                console.log(err.response.data.msg);
            }
            
        }
    

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar variant="secondary" className="mb-4" now={60} />
                    <Form onSubmit={onSubmit}>
                        <Row className="gy-4">

                            <p className="h4 text-center t-extralight">Se lo desideri puoi inserire la tua patente di guida adesso, <br></br>
                             altrimenti lascia i seguenti campi vuoti e clicca sul tasto prosegui.</p>
                            
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="numeroPatente">
                                    <Form.Label>Numero patente</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il numero di patente" pattern="^([A-Z]{2}\d{7}[A-Z])|(^[U]1[BCDEFGHLMNPRSTUWYXZ]\w{6}[A-Z])$" onBlur={() => setCheckValidate({ ...checkValidate, numeroPatente: true })} />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="dataScadenzaPatente">
                                    <Form.Label>Data di scadenza (mm/aaaa)</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci data di scadenza (mm/aaaa)" pattern="^(0?[1-9]|1[012])[\/\-]\d{4}$" />
                                </Form.Group>                             
                            </Col>
                            

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="tipoPatente">
                                    <Form.Label>Tipo patente</Form.Label>
                                    <Form.Control  className="form-select" as="select">
                                        <option value="" disabled selected>Seleziona...</option>
                                        <option value="AM">AM</option>
                                        <option value="A1">A1</option>
                                        <option value="B">B</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            
                            <div className="d-flex justify-content-end">
                                <Button to="/credenziali" variant="outline-secondary">Indietro</Button>
                                <Button variant="outline-secondary" submit>Prosegui</Button>
                            </div>
                        </Row>
                        <br></br>
                    </Form>
                </Col>
            </Row>
        </Container>
        
    );
}
    