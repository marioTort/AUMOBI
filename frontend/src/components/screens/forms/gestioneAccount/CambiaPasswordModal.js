import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';
import InsertPassword from '../../../utils/InsertPassword';


export default function CambiaPasswordModal(props) {
    
    const history = useHistory()
    const [state, setState] = useState({
        error: {
            show: false
        },
        success: {
            show: false
        },
        submit: false
    })

    function onSubmit(e) {
        
    }

    return (
        <Modal
            {...props}
            size="m"
            aria-labelledby="cambiaPasswordModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="cambiaPasswordModal">
                    Modifica password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success.show || state.error.show ?
                    <WarningMessage
                        show={state.success.show || state.error.show}
                        variant={state.success.show ? "success" : "danger"}
                        header={state.success.show ? "Operazione completata con successo" : "Operazione fallita!"}
                        body={state.success.show ? state.success.message : state.error.message}
                        button={"Indietro"}
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                <InsertPassword controlId={"vecchiaPassword"} placeholder={"Inserisci la tua password attuale"}>
                                    Vecchia password
                                </InsertPassword>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                <InsertPassword controlId={"nuovaPassword"} placeholder={"Inserisci la tua nuova password"}>
                                    Nuova password
                                </InsertPassword>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                <InsertPassword controlId={"confermaNuovaPassword"} placeholder={"Conferma la tua password"}>
                                    Conferma password
                                </InsertPassword>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }} className="buttonsGroup justify-content-end">
                                <Button variant="outline-secondary" onClick={props.onHide}>Annulla</Button>
                                <Button variant="outline-secondary" submit>Conferma</Button>
                            </Col>
                        </Row>
                    </Form>
                }
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
import InsertPassword from '../../../utils/InsertPassword';

const CryptoJS = require("crypto-js");

export default function CambiaPasswordModal(props) {
    const { session, setSession } = useSession();
    const history = useHistory()
    const [state, setState] = useState({
        error: {
            show: false
        },
        success: {
            show: false
        },
        submit: false
    })

    function onSubmit(e) {
        e.preventDefault();
        const vecchiaPasswordInput = document.getElementById("vecchiaPassword");
        const nuovaPasswordInput = document.getElementById("nuovaPassword");
        const confermaPasswordInput = document.getElementById("confermaNuovaPassword");
        if (nuovaPasswordInput.value !== confermaPasswordInput.value) {
            setState({ ...state, error: { show: true, message: "La nuova password e la conferma non coincidono." } })
            return
        }
        const encryptedVecchiaPassword = CryptoJS.AES.encrypt(vecchiaPasswordInput.value, "pick-me-up").toString()
        const encryptedNuovaPassword = CryptoJS.AES.encrypt(nuovaPasswordInput.value, "pick-me-up").toString()
        const data = {
            id: session.id,
            vecchiaPassword: encryptedVecchiaPassword,
            nuovaPassword: encryptedNuovaPassword
        }
        setState({ ...state, submit: true });
        try {
            axios.put("/profilo/modificaPassword", data)
                .then(res => {
                    setState({ ...state, submit: false, success: { show: true, message: res.data } })
                })
                .catch(err => {
                    setState({ ...state, submit: false, error: { show: true, message: err.responde.data } });
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <Modal
            {...props}
            size="m"
            aria-labelledby="cambiaPasswordModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="cambiaPasswordModal">
                    Modifica password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success.show || state.error.show ?
                    <WarningMessage
                        show={state.success.show || state.error.show}
                        variant={state.success.show ? "success" : "danger"}
                        header={state.success.show ? "Operazione completata con successo" : "Operazione fallita!"}
                        body={state.success.show ? state.success.message : state.error.message}
                        button={"Indietro"}
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                <InsertPassword controlId={"vecchiaPassword"} placeholder={"Inserisci la tua password attuale"}>
                                    Vecchia password
                                </InsertPassword>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                <InsertPassword controlId={"nuovaPassword"} placeholder={"Inserisci la tua nuova password"}>
                                    Nuova password
                                </InsertPassword>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                <InsertPassword controlId={"confermaNuovaPassword"} placeholder={"Conferma la tua password"}>
                                    Conferma password
                                </InsertPassword>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }} className="buttonsGroup justify-content-end">
                                <Button variant="outline-secondary" onClick={props.onHide}>Annulla</Button>
                                <Button variant="outline-secondary" submit>Conferma</Button>
                            </Col>
                        </Row>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
}*/