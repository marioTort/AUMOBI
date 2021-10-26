import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

// Bootstrap Components
import { Row, Col, Modal, Form, Container, Alert } from 'react-bootstrap'

//Credit Card Components
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import useForm from '../../../utils/useForm';

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';

export default function AggiungiCartaModal(props) {
    const history = useHistory()
    const [state, setState] = useState({
        error: {
            show: false,
        },
        success: {
            show: false,
        },
        submit: false
    })

    function checkValidity() {

        document.querySelector("#dataScadenzaCarta").classList.remove("border-danger", "text-danger")

        const dataScadenzaPatente = document.querySelector("#dataScadenzaPatente")

        //Controllo sulle date inserite
        const now = new Date();
        const dataScadenza = new Date(dataScadenzaPatente.value)
        if (now.getFullYear() > dataScadenza.getFullYear()) {
            return false;
        } else if (now.getFullYear() === dataScadenza.getFullYear()) {
            if (now.getMonth() > dataScadenza.getMonth()) {
                return false
            } else if (now.getMonth() === dataScadenza.getMonth()) {
                if (now.getDate() > dataScadenza.getDate()) {
                    return false
                }
            }
        }

        return true
    }

    function onSubmit(e) {
        
    }

    const {handleChange, handleFocus, handleSubmit, values, errors} = useForm()
 
    return (
        <Modal 
            {...props}
            size="m"
            aria-labelledby="aggiungiCartaModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="aggiungiCartaModal">
                    Aggiungi carta
                </Modal.Title>
            </Modal.Header >
            <Modal.Body >
                {state.success.show || state.error.show ?
                    <WarningMessage
                        show={state.success.show || state.error.show}
                        variant={state.success.show ? "success" : "danger"}
                        header={state.success.show ? "Operazione completata" : "Operazione fallita!"}
                        button={"Indietro"}
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
                    :   <>
                        <Container>
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
                                <Form onSubmit={handleSubmit}>
                                    <Row className="gy-4" >
                                        <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                            <Form.Group controlId="numeroCarta">
                                                <Form.Label>Numero carta</Form.Label>
                                                <Form.Control type="number" id="cardNumber" data-testid="cardNumber" name="cardNumber" placeholder="Card Number" value={values.cardNumber} onChange={handleChange} onFocus={handleFocus} isValid={errors.cnumber} required />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }} >
                                            <Form.Group controlId="nomeCarta">
                                                <Form.Label>Intestatario</Form.Label>
                                                <Form.Control type="text" id="cardName" data-testid="cardName" name="cardName" placeholder="Cardholder Name" value={values.cardName} onChange={handleChange} onFocus={handleFocus} isValid={errors.cname} required />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }} >
                                            <Form.Group controlId="dataScadenzaCarta">
                                                <Form.Label>Data di scadenza</Form.Label>
                                                <Form.Control type="text" id="cardExpiration" data-testid="cardExpiration" name="cardExpiration" placeholder="Expiration Date" value={values.cardExpiration} onChange={handleChange} onFocus={handleFocus} isValid={errors.cexp} required />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                            <Form.Group controlId="cvv">
                                                <Form.Label>CVV</Form.Label>
                                                <Form.Control type="number" id="cardSecurityCode" data-testid="cardSecurityCode" name="cardSecurityCode" placeholder="Security Code" value={values.cardSecurityCode} onChange={handleChange} onFocus={handleFocus} isValid={errors.ccvv} required/>
                                            </Form.Group> 
                                        </Col>
                                        
                                        <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }} className="buttonsGroup justify-content-end">
                                            <Button variant="outline-secondary" onClick={props.onHide}>Annulla</Button>
                                            <Button variant="outline-success" submit>Aggiungi</Button>
                                        </Col>
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
                        </Container>
                </>}
            </Modal.Body>
        </Modal>
    );
}

/*import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession'
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';

export default function AggiungiCartaModal(props) {
    const { session, setSession } = useSession();
    const history = useHistory()
    const [state, setState] = useState({
        error: {
            show: false,
        },
        success: {
            show: false,
        },
        submit: false
    })

    function checkValidity() {

        document.querySelector("#dataScadenzaCarta").classList.remove("border-danger", "text-danger")

        const dataScadenzaPatente = document.querySelector("#dataScadenzaPatente")

        //Controllo sulle date inserite
        const now = new Date();
        const dataScadenza = new Date(dataScadenzaPatente.value)
        if (now.getFullYear() > dataScadenza.getFullYear()) {
            return false;
        } else if (now.getFullYear() === dataScadenza.getFullYear()) {
            if (now.getMonth() > dataScadenza.getMonth()) {
                return false
            } else if (now.getMonth() === dataScadenza.getMonth()) {
                if (now.getDate() > dataScadenza.getDate()) {
                    return false
                }
            }
        }

        return true
    }

    function onSubmit(e) {
        e.preventDefault();
        const numeroCarta = document.getElementById("numeroCarta");
        const intestatario = document.getElementById("intestatario");
        const dataScadenzaCarta = document.getElementById("dataScadenzaCarta");
        const CVV = document.getElementById("CVV");  

        const data = {
            id: session.id,
            patente: {
                numeroCarta: numeroCarta.value,
                intestatario: intestatario.value,
                dataScadenza: dataScadenzaCarta.value,
                cvv: CVV.value,
            }
        }

        if (!checkValidity()) {
            dataScadenzaCarta.classList.add("border-danger", "text-danger")
            return
        } else {
            dataScadenzaCarta.classList.add("border-success", "text-success")
        }
        setState({ ...state, submit: true });
        try {
            axios.post("/wallet/aggiungiCarta", data)
                .then(res => {
                    setSession({ ...session, metodiPagamento: [...session.metodiPagamento, res.data.metodoPagamento] })
                    setState({ ...state, submit: false, success: { show: true, message: res.data.message } })
                })
                .catch(err => {
                    setState({ ...state, submit: false, error: { show: true, message: err.response.data } });
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }
    return (
        <Modal
            {...props}
            size="m"
            aria-labelledby="aggiungiCartaModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="aggiungiCartaModal">
                    Aggiungi carta
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success.show || state.error.show ?
                    <WarningMessage
                        show={state.success.show || state.error.show}
                        variant={state.success.show ? "success" : "danger"}
                        header={state.success.show ? "Operazione completata" : "Operazione fallita!"}
                        button={"Indietro"}
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                        <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                <Form.Group controlId="numeroCarta">
                                    <Form.Label>Numero carta</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il numero di patente" pattern="[0-9]{16}" required />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }} >
                                <Form.Group controlId="nomeCarta">
                                    <Form.Label>Intestatario</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il nome e il cognome dell'intestatario" pattern="[A-z]+\ [A-z]+" required />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }} >
                                <Form.Group controlId="dataScadenzaCarta">
                                    <Form.Label>Data di scadenza</Form.Label>
                                    <Form.Control onBlur={() => checkValidity} type="month" placeholder="Inserisci data di scadenza" required />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                <Form.Group controlId="cvv">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il CVV" pattern="[0-9]{3}" required/>
                                </Form.Group> 
                            </Col>
                            
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }} className="buttonsGroup justify-content-end">
                                <Button variant="outline-secondary" onClick={props.onHide}>Annulla</Button>
                                <Button spinner={state.submit} variant="outline-secondary" submit>Aggiungi</Button>
                            </Col>
                        </Row>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
}*/