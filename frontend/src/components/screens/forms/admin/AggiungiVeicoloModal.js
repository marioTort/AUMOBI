import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';



// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';
import CampoParcheggio from '../../../utils/CampoParcheggio';


export default function AggiungiVeicoloModal(props) {
    
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
            aria-labelledby="aggiungiVeicoloModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="aggiungiVeicoloModal">
                    Aggiungi Veicolo
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
                                                    <Form.Group controlId="targa">
                                                        <Form.Label>Targa</Form.Label>
                                                        <Form.Control type="text" placeholder="Inserisci la targa del nuovo veicolo" required />
                                                    </Form.Group>
                                                    
                                                        <CampoParcheggio controlId="posizione">Posizione</CampoParcheggio>
                                                       
                                                    <Form.Group controlId="tipoVeicolo">
                                                        <Form.Label>Tipo veicolo</Form.Label>
                                                        <Form.Control  className="form-select" as="select" required>
                                                            <option value="" disabled selected>Seleziona...</option>
                                                            <option value="Auto">Auto</option>
                                                            <option value="Moto">Moto</option>
                                                            <option value="Bici">Bici</option>
                                                            <option value="Mono">Monopattino</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId="categoria">
                                                        <Form.Label>Categoria</Form.Label>
                                                        <Form.Control  className="form-select" as="select">
                                                            <option value="" disabled selected>Seleziona...</option>
                                                            <option value="Auto">Utilitaria</option>
                                                            <option value="Auto">Monovolume</option>
                                                            <option value="Auto">Sportiva</option>
                                                            <option value="Moto">49</option>
                                                            <option value="Moto">125</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId="prezzo">
                                                        <Form.Label>Prezzo</Form.Label>
                                                        <Form.Control type="text" placeholder="Inserisci il prezzo orario del nuovo veicolo" required />
                                                    </Form.Group>
                                                    <Form.Group controlId="statoVeicolo">
                                                        <Form.Label>Stato</Form.Label>
                                                        <Form.Control className="form-select" as="select" required>
                                                            <option value="" disabled selected>Seleziona...</option>
                                                            <option value="L">Libero</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId="servizioAutista">
                                                        <Form.Label>Servizio autista</Form.Label>
                                                        <Form.Control className="form-select" as="select" required>
                                                            <option value="" disabled selected>Seleziona...</option>
                                                            <option value="T">true</option>
                                                            <option value="F">false</option>
                                                        </Form.Control>
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

                        
                        <th><p className=" h5 t-bold card-text">Stato Veicolo</p></th>