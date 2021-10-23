import React, { useState } from 'react';

// Bootstrap Components
import { Container, Card } from 'react-bootstrap';

// Custom Components
import Button from '../utils/Button';
import CambiaEmailModal from './forms/gestioneAccount/CambiaEmailModal';
import CambiaCellulareModal from './forms/gestioneAccount/CambiaCellulareModal';
import CambiaPasswordModal from './forms/gestioneAccount/CambiaPasswordModal';

// Schermata profilo
export default function GestioneAccountAdmin() {
    const [modals, setModals] = useState({
        cambiaCellulareModal: false,
        cambiaEmailModal: false,
        cambiaPasswordModal: false,
    })

    return (
        <React.Fragment>
        <Container fluid className="p-5 h-100 py-5">
                    <center><Card className="border-5 shadow h-100">
                        <Card.Header className="border-3 shadow"><h1 className="card-title"><center>Nome Cognome <br/> <h2 className="card-title">Credenziali</h2></center></h1></Card.Header>
                        <Card.Body>
                        <div className=" py-3">
                            <p className=" h3 t-light card-text py-3">Cellulare: cellulare</p>
                            <p className=" h3 t-light card-text py-3"><center>Email: email</center></p>
                            <p className=" h3 t-light card-text py-3"><center>Password:  ********</center></p>
                        </div>
                            <center><Button className="my-3" variant="outline-primary py-2 btn-lg" onClick={() => setModals({ ...modals, cambiaCellulareModal: true })}>
                                Modifica cellulare
                            </Button></center>
                            <center><Button className="my-3" variant="outline-primary py-2 btn-lg" onClick={() => setModals({ ...modals, cambiaEmailModal: true })}>
                                Modifica email
                            </Button></center>
                            <center><Button className="my-3"  variant="outline-primary py-2 btn-lg" onClick={() => setModals({ ...modals, cambiaPasswordModal: true })}>
                                Modifica password
                            </Button></center>
                            </Card.Body>
                            <CambiaCellulareModal show={modals.cambiaCellulareModal} onHide={() => setModals({ ...modals, cambiaCellulareModal: false })} />
                            <CambiaEmailModal show={modals.cambiaEmailModal} onHide={() => setModals({ ...modals, cambiaEmailModal: false })} />
                            <CambiaPasswordModal show={modals.cambiaPasswordModal} onHide={() => setModals({ ...modals, cambiaPasswordModal: false })} />
                        </Card></center>
        </Container>
        </React.Fragment>
    );
}