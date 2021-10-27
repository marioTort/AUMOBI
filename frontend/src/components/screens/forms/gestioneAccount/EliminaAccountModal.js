//CANCELLARE...

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';



// Bootstrap Components
import { Row, Col, Modal } from 'react-bootstrap'

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';

export default function EliminaAccountModal(props) {
    
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
            aria-labelledby="eliminaAccountModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="eliminaAccountModal">
                    Elimina Account
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
                            <h3 className="t-bold text-center h5">Sei sicuro di voler eliminare l'account?</h3>
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
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession'
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal } from 'react-bootstrap'

// Custom Components
import Button from '../../../utils/Button';
import WarningMessage from '../../../utils/WarningMessage';

export default function EliminaAccountModal(props) {
    const { session, setSession } = useSession();
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
        e.preventDefault();
        let idUtente
        if (props.id) {
            idUtente = props.id
        } else {
            idUtente = session.id
        }
        const data = {
            id: idUtente,
        }
        setState({ ...state, submit: true });
        try {
            axios.post("/profilo/eliminaAccount", data)
                .then(res => {
                    if (!props.id) {
                        window.sessionStorage.clear();
                        history.push("/");
                    } else {
                        setState({ ...state, submit: false, success: { show: true, message: "Account eliminato correttamente" } });
                    }
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
            aria-labelledby="eliminaAccountModal"
            centered
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="eliminaAccountModal">
                    Elimina Account
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
                            <h3 className="t-bold text-center h5">Sei sicuro di voler eliminare l'account?</h3>
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