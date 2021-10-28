import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';



// Bootstrap Components
import { Row, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';
import CampoEmail from '../../../utils/CampoEmail';


export default function AssegnaAutistaModal(props) {
    
    const history = useHistory()
    const [state, setState] = useState({
        error: {
            show: false,
        },
        success: {
            show: true,
        },
        submit: false
    })

    function onClick(e) {
        
    }
    return (
        <Modal
            {...props}
            size="m"
            aria-labelledby="assegnaAutistaModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="assegnaAutistaModal">
                    Assegna Autista
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.error.show ?
                    <WarningMessage
                        show={state.error.show || state.success.show}
                        variant={state.error.show ? "danger" : "success"}
                        header={state.error.show ? "Operazione fallita!" : "Operazione eseguita con successo"}
                        body={state.error.show ? state.error.message : state.success.message }
                        button={"Indietro"}
                        onClick={state.error.show ? () => { setState({ ...state, error: { show: false } }) } : () => history.push(0)} />
                    : <Row className="gy-4" >
                        <Form onSubmit={onClick}>
                            <Row className="gy-4">
                            <CampoEmail controlId={"emailAutista"} placeholder={"Inserisci l'email dell'autista da associare"} required>
                                Email Autista
                            </CampoEmail>
                            <Form.Group controlId="indirizzoStallo">
                                <Form.Label>Targa Auto</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci la targa dell'auto da associare" required />
                            </Form.Group>
                            </Row>
                        </Form>
                        <div className="buttonsGroup mx-auto">
                            <Button variant="outline-secondary" onClick={props.onHide}>Indietro</Button>
                            <Button spinner={state.submit} variant="outline-primary" onClick={onClick}>Conferma</Button>
                        </div>
                    </Row>
                }
            </Modal.Body>
        </Modal>
    );
}