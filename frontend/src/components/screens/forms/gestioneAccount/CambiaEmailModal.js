import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';


// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';
import InsertEmail from '../../../utils/InsertEmail';

export default function CambiaEmailModal(props) {

    const history = useHistory()
    const [state, setState] = useState({
        error: {
            show: false,
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
            aria-labelledby="cambiaEmailModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="cambiaEmailModal">
                    Modifica Email
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
                        onClick={() => { state.success.show ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                            <InsertEmail controlId={"cambiaEmail"} placeholder={"Inserisci la nuova email"} required>
                                Email
                            </InsertEmail>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }} className="buttonsGroup justify-content-end">
                                <Button variant="outline-secondary" onClick={props.onHide}>Annulla</Button>
                                <Button spinner={state.submit} variant="outline-secondary" submit>Conferma</Button>
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
import InsertEmail from '../../../utils/InsertEmail';

export default function CambiaEmailModal(props) {
    const { session, setSession } = useSession();
    const history = useHistory()
    const [state, setState] = useState({
        error: {
            show: false,
        },
        success: {
            show: false
        },
        submit: false
    })

    function onSubmit(e) {
        e.preventDefault();
        const emailInput = document.getElementById("modificaEmail");
        let idUtente
        if (props.id) {
            idUtente = props.id
        } else {
            idUtente = session.id
        }
        const data = {
            id: session.id,
            email: emailInput.value
        }
        setState({ ...state, submit: true });
        try {
            axios.put("/profilo/modificaEmail", data)
                .then(res => {
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
            aria-labelledby="cambiaEmailModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="cambiaEmailModal">
                    Modifica Email
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
                        onClick={() => { state.success.show ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                            <InsertEmail controlId={"cambiaEmail"} placeholder={"Inserisci la nuova email"} required>
                                Email
                            </InsertEmail>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }} className="buttonsGroup justify-content-end">
                                <Button variant="outline-secondary" onClick={props.onHide}>Annulla</Button>
                                <Button spinner={state.submit} variant="outline-secondary" submit>Conferma</Button>
                            </Col>
                        </Row>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
}*/