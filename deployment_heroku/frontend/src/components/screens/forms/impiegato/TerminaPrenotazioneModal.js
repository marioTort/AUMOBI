import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';
import QRCode from '../../../utils/QRCode';

export default function TerminaPrenotazioneModal(props) {

    const [ID, setID] = useState("");
    
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

    async function terminaPrenotazione(event) {
        event.preventDefault();

        var data = JSON.stringify({
            idPrenotazione: ID
        });

        var config = {
            method: 'put',
            url: '/api/prenotazione/terminaprenotazione',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.replace("/");
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <Modal
            {...props}
            size="m"
            aria-labelledby="terminaPrenotazioneModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="terminaPrenotazioneModal">
                    Termina Prenotazione
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
                            <h3 className="t-bold text-center h5">Scannerizza il QR-code oppure inserisci il numero della prenotazione per terminare la prenotazione.</h3>
                        </Col>
                        <QRCode/>
                        <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                <Form.Group>
                                    <Form.Label>Numero prenotazione</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci il numero della prenotazione" onChange={(event) => { setID(event.target.value) }} required />
                                </Form.Group>
                            </Col>
                        <div className="buttonsGroup mx-auto">
                            <Button variant="outline-secondary" onClick={props.onHide}>Annulla</Button>
                            <Button variant="outline-danger" onClick={terminaPrenotazione}>Termina</Button>
                        </div>
                    </Row>
                }
            </Modal.Body>
        </Modal>
    );
}