import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Bootstrap Components
import { ProgressBar, Container, Row, Col, Form, Alert } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';

//Credit Card Components
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import validateInfo from '../../../utils/validateInfo';


export default function DatiBancariForm() {
    const history = useHistory();
    const [state, setState] = useState({
        error: {
            show: false,
        },
        submit: false
    });

    const [values, setValues] = useState({
        cardName: '',
        cardNumber: '',
        cardExpiration: '',
        cardSecurityCode: '',
        focus: ''
    })

    const [errors, setErrors] = useState({})

    const handleFocus = (e) => {
        setValues({ 
            ...values,
            focus: (e.target.name === 'cardSecurityCode') ? 'cvc' : e.target.name
        });
    }

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    function onSubmit(e) {
        e.preventDefault();
        setErrors(validateInfo(values))
            
            const userData = {
                ...history.location.state.payload.email,
                datiCarta: {
                    numeroCarta: document.querySelector("#numeroCarta").value,
                    nomeCarta: document.querySelector("#nomeCarta").value,
                    dataScadenzaCarta: document.querySelector("#dataScadenzaCarta").value,
                    cvv: document.querySelector("#cvv").value
                }
            }
              
            setState({ ...state, submit: true });
            try {
                axios.post("/wallet/aggiungicarta", userData)
                    .then((res) => {
                        history.push("/registrazionecompletata");
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
            <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5 pb-5">
                <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar variant="secondary" className="mb-4" now={80} />
                    <p className="h4 pb-4 text-center t-extralight">Per terminare la registrazione inserisci la tua carta di credito adesso.</p>
            <div className="box justify-content-center align-items-center">
                <div className="formDiv">
                    <div className="credit-card">
                        <Cards
                            cvc={values.cardSecurityCode}
                            expiry={values.cardExpiration}
                            focused={values.focus}
                            name={values.cardName}
                            number={values.cardNumber}
                        />
                        <br></br>
                    </div>
                    <Form onSubmit={onSubmit} onClick={() => setState({ ...state, error: { show: false } })}>
                        <Row className="gy-4" >
                        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="numeroCarta">
                                    <Form.Label>Numero carta</Form.Label>
                                    <Form.Control type="number" id="cardNumber" data-testid="cardNumber" name="cardNumber" placeholder="Numero carta" pattern="/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$" value={values.cardNumber} onChange={handleChange} onFocus={handleFocus} isValid={errors.cnumber} required />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="nomeCarta">
                                    <Form.Label>Intestatario</Form.Label>
                                    <Form.Control type="text" id="cardName" data-testid="cardName" name="cardName" placeholder="Intestatario" value={values.cardName} onChange={handleChange} onFocus={handleFocus} isValid={errors.cname} required />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="dataScadenzaCarta">
                                    <Form.Label>Data di scadenza</Form.Label>
                                    <Form.Control type="text" id="cardExpiration" data-testid="cardExpiration" name="cardExpiration" placeholder="Data di scadenza" value={values.cardExpiration} onChange={handleChange} onFocus={handleFocus} isValid={errors.cexp} required />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="cvv">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control type="number" id="cardSecurityCode" data-testid="cardSecurityCode" name="cardSecurityCode" placeholder="CVV" value={values.cardSecurityCode} onChange={handleChange} onFocus={handleFocus} isValid={errors.ccvv} required/>
                                </Form.Group> 
                            </Col>
                            
                            <div className="d-flex justify-content-end">
                                <Button to="/datipatente" variant="outline-secondary">Indietro</Button>
                                <Button spinner={state.submit} variant="outline-secondary" submit>Prosegui</Button>
                            </div>
                        </Row>
                    </Form>
                </div>
                <br></br>
                <Alert
                    id="alertMessage"
                    data-testid="alertMessage"
                    variant={errors.variant}
                    show={errors.show}
                >
                    {errors.message}
                </Alert>{" "}    
            </div>
            </Col>
            </Row>
            </Container>
            
    
    );
}

/*
<>
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row>
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar variant="secondary" className="mb-4" now={80} />
                    <Form onSubmit={onSubmit}>
                        <Row className="gy-4">

                            <p className="h4 text-center t-extralight">Se lo desideri puoi inserire la tua carta di credito adesso, <br></br>
                             altrimenti lascia i seguenti campi vuoti e clicca sul tasto prosegui.</p>
                            
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="numeroCarta">
                                    <Form.Label>Numero carta</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il numero della carta" pattern="[0-9]{16}" />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                            <Form.Group controlId="nomeCarta">
                                    <Form.Label>Intestatario</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il nome e il cognome dell'intestatario" pattern="[A-z]+\ [A-z]+" />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="dataScadenza">
                                    <Form.Label>Data di scadenza</Form.Label>
                                    <Form.Control type="month" placeholder="Inserisci data di scadenza" />
                                </Form.Group>
                                
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="CVV">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control type="month" placeholder="Inserisci il CVV" pattern="[0-9]{3}"/>
                                </Form.Group>     
                            </Col>
                            
                            <div className="d-flex justify-content-end">
                                <Button to="/datipatente" variant="outline-secondary" submit>Indietro</Button>
                                <Button to="/registrazionecompletata" variant="outline-secondary" submit>Prosegui</Button>
                            </div>
                        </Row>
                        <br></br>
                    </Form>
                </Col>
            </Row>
        </Container>
        <Footer/>
        </>*/