import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';



// Bootstrap Components
import { Row, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';
import CampoParcheggio from '../../../utils/CampoParcheggio';


export default function AggiungiStalloModal(props) {
    
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
            aria-labelledby="aggiungiStalloModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="aggiungiStalloModal">
                    Aggiungi Stallo
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
                                                    <Form.Group controlId="indirizzo">
                                                        <Form.Label>Indirizzo</Form.Label>
                                                        <Form.Control type="text" placeholder="Inserisci l'indirizzo del nuovo stallo" required />
                                                    </Form.Group>
                                                       
                                                    <Form.Group controlId="tipoVeicolo">
                                                        <Form.Label>Tipo mezzi</Form.Label>
                                                        <Form.Control  className="form-select" as="select" required>
                                                            <option value="" disabled selected>Seleziona...</option>
                                                            <option value="Auto">Auto</option>
                                                            <option value="Moto">Moto</option>
                                                            <option value="Bici">Bici</option>
                                                            <option value="Mono">Monopattino</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId="posti">
                                                        <Form.Label>Posti disponibili</Form.Label>
                                                        <Form.Control type="text" placeholder="Inserisci i posti disponibili" required />
                                                    </Form.Group>

                                                    <Form.Group controlId="capienza">
                                                        <Form.Label>Capienza</Form.Label>
                                                        <Form.Control type="text" placeholder="Inserisci la capienza del nuovo stallo" required />
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