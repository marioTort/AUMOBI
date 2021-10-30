import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';
import QRCode from '../../../utils/QRCode';
import StringCrypto from 'string-crypto';

export default function IniziaNoleggioModal(props) {
    
    const [targa, setTarga] = useState("");

    const key = 'AuMoBi';

    const {
        decryptString
    } = new StringCrypto();

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

    async function iniziaNoleggioBM(event) {
        event.preventDefault();
        
        var data = JSON.stringify({
            idMezzo: targa,
            emailCliente: JSON.parse(localStorage.getItem("datiPersonali")).email,
            numeroCartaCliente: decryptString(JSON.parse(localStorage.getItem("datiCarta")).numeroCartaCredito, key)
        });

        var config = {
            method: 'put',
            url: '/api/prenotazione/iniziaprenotazionebm',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                console.log(decryptString(JSON.parse(localStorage.getItem("datiCarta")).numeroCartaCredito, key));
                localStorage.setItem("datiPrenotazione", JSON.stringify(response.data.datiPrenotazione));
                window.location.replace("/schermataprenotazione");
            })
            .catch(function (error) {
                console.log(error);
            });
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
                                <Form.Control type="text" placeholder="Inserisci il codice del veicolo" onChange={(event) => { setTarga(event.target.value) }} required />
                                </Form.Group>
                            </Col>
                        <div className="buttonsGroup mx-auto">
                            <Button variant="outline-secondary" onClick={props.onHide}>Annulla</Button>
                            <Button variant="outline-success" onClick={iniziaNoleggioBM}>Prosegui</Button>
                        </div>
                    </Row>
                }
            </Modal.Body>
        </Modal>
    );
}