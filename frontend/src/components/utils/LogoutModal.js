import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';



// Bootstrap Components
import { Row, Col, Modal } from 'react-bootstrap'

// Custom Components
import Button from './Button';
import WarningMessage from './WarningMessage';

export default function LogoutModal(props) {
    
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

    function logout(event) {
        event.preventDefault();
        localStorage.clear();
        
        history.push("/login");
    }

    return (
        <Modal
            {...props}
            size="m"
            aria-labelledby="logoutModal"
            centered
            onHide={logout}
            animation={false}>
            <Modal.Header>
                <Modal.Title className="t-bold" id="logoutModal">
                    Logout
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
                            <h3 className="t-bold text-center h5">Sei sicuro di voler effettuare il logout?</h3>
                        </Col>
                        <div className="buttonsGroup mx-auto">
                            <Button variant="outline-secondary" onClick={props.onHide}>Annulla</Button>
                            <Button variant="outline-danger" onClick={logout}>Logout</Button>
                        </div>
                    </Row>
                }
            </Modal.Body>
        </Modal>
    );
}