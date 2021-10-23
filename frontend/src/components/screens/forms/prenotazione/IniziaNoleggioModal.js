import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';
import QRCode from '../../../utils/QRCode';

export default function IniziaNoleggioModal(props) {
    
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
            aria-labelledby="iniziaNoleggioModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="iniziaNoleggioModal">
                    Inizia Noleggio
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
                        <Col >
                            <h3 className="t-bold text-center h5">Scannerizza il QR-code oppure inserisci il codice che trovi sul veicolo per iniziare il noleggio.</h3>
                        </Col>
                        <QRCode/>
                        <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                <Form.Group controlId="cambiaCellulare">
                                    <Form.Label>Codice veicolo</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il codice del veicolo" />
                                </Form.Group>
                            </Col>
                        <div className="buttonsGroup mx-auto">
                            <Button variant="outline-secondary" onClick={props.onHide}>Annulla</Button>
                            <Button spinner={state.submit} variant="outline-primary" onClick={onClick}>Prosegui</Button>
                        </div>
                    </Row>
                }
            </Modal.Body>
        </Modal>
    );
}