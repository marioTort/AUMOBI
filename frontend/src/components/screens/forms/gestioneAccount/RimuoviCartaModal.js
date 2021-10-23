import React, { useState } from 'react'
import { useHistory } from 'react-router';


// Bootstrap Components
import { Row, Col, Modal } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';

export default function RimuoviCartaModal(props) {
    
    const history = useHistory();
    const [state, setState] = useState({
        error: {
            show: false,
        },
        success: {
            show: false
        },
        submit: false
    })

    function onClick(e) {
        
    }

    return (
        <Modal
            {...props}
            size="m"
            aria-labelledby="rimuoviCartaModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="rimuoviCartaModal">
                    Elimina carta
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
                    : <Row className="gy-4" >
                        <Col >
                            <h3 className="t-bold text-center h5">Sei sicuro di voler eliminare la tua carta?</h3>
                        </Col>
                        <div className="buttonsGroup mx-auto">
                            <Button variant="outline-secondary" onClick={props.onHide}>Annulla</Button>
                            <Button spinner={state.submit} variant="outline-danger" onClick={onClick}>Elimina</Button>
                        </div>
                    </Row>
                }
            </Modal.Body>
        </Modal>
    );
}

/*import React, { useState } from 'react'
import { useHistory } from 'react-router';
import useSession from '../../../Hooks/useSession';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';

export default function RimuoviCartaModal(props) {
    const { session, setSession } = useSession();
    const history = useHistory();
    const [state, setState] = useState({
        error: {
            show: false,
        },
        success: {
            show: false
        },
        submit: false
    })

    function onClick(e) {
        e.preventDefault();
        const data = {
            id: session.id,
        }
        setState({ ...state, submit: true });
        try {
            axios.delete("/wallet/eliminaCarta", { data: data })
            .then(res => {
                setSession({ ...session, metodiPagamento: res.data.metodiPagamento })
                setState({ ...state, submit: false, success: { show: true, message: res.data.message } })
            })
            .catch(err => {
                setState({ ...state, submit: false, error: { show: true, message: err.response.data } })
            })
        } catch (error) {
            console.log(error.resposnse.data.msg)
        }
    }

    return (
        <Modal
            {...props}
            size="m"
            aria-labelledby="rimuoviCartaModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="rimuoviCartaModal">
                    Elimina carta
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
                    : <Row className="gy-4" >
                        <Col >
                            <h3 className="t-bold text-center h5">Sei sicuro di voler eliminare la tua carta?</h3>
                        </Col>
                        <div className="buttonsGroup mx-auto">
                            <Button variant="outline-secondary" onClick={props.onHide}>Annulla</Button>
                            <Button spinner={state.submit} variant="outline-danger" onClick={onClick}>Elimina</Button>
                        </div>
                    </Row>
                }
            </Modal.Body>
        </Modal>
    );
}*/