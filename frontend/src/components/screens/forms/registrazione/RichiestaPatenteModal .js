import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

// Bootstrap Components
import { Row, Col, Modal } from 'react-bootstrap'

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';

export default function RichiestaPatenteModal(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
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
            show={show}
            size="m"
            aria-labelledby="richiestaPatenteModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="richiestaPatenteModal">
                    Inserimento Patente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.error.show ?
                    <WarningMessage
                        show={state.error.show || state.success.show}
                        variant={state.error.show ? "danger" : "success"}
                        header={state.error.show ? "Operazione fallita!" : "Operazione eseguita con successo"}
                        body={state.error.show ? state.error.message : state.success.message}
                        button={"Indietro"}
                        onClick={state.error.show ? () => { setState({ ...state, error: { show: false } }) } : () => history.push(0)} />
                    : <Row className="gy-4" >
                        <Col >
                            <h3 className="t-bold text-center h5">Vuoi inserire adesso la tua patente? Clicca su "Registra Patente". Ricorda che la potrai inserire anche in un secondo momento</h3>
                        </Col>
                        <div className="buttonsGroup mx-auto">
                            <Button variant="outline-secondary" onClick={handleClose} >Lo farò dopo</Button>
                            <Button spinner={state.submit} variant="outline-warning" onClick={onClick}>Registra Patente</Button>
                        </div>
                    </Row>
                }
            </Modal.Body>
        </Modal>
    );
}