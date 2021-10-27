import React, { useState } from 'react';

// Bootstrap Components
import { Container, Row, Col, Card, CardColumns } from 'react-bootstrap';

// Custom Components
import Button from '../utils/Button';
import VisualizzaDati from './forms/gestioneAccount/VisualizzaDati';
import CambiaEmailModal from './forms/gestioneAccount/CambiaEmailModal';
import CambiaCellulareModal from './forms/gestioneAccount/CambiaCellulareModal';
import CambiaPasswordModal from './forms/gestioneAccount/CambiaPasswordModal';
import AggiungiPatenteModal from './forms/gestioneAccount/AggiungiPatenteModal';
import RimuoviPatenteModal from './forms/gestioneAccount/RimuoviPatenteModal';
import AggiungiCartaModal from './forms/gestioneAccount/AggiungiCartaModal';
import RimuoviCartaModal from './forms/gestioneAccount/RimuoviCartaModal';

import SchermataErrore from "../screens/forms/gestioneAccount/SchermataErrore";

// Schermata profilo
export default function GestioneAccount() {
    
    let authToken = localStorage.getItem('authToken');
    let numeroPatente = JSON.parse(localStorage.getItem("datiPatente")).numeroPatente;
    
    const [modals, setModals] = useState({
        cambiaCellulareModal: false,
        cambiaEmailModal: false,
        cambiaPasswordModal: false,
        aggiungiPatenteModal: false,
        rimuoviPatenteModal: false,
        aggiungiCartaModal: false,
        rimuoviCartaModal: false
    })
    
    if (!authToken) {
        return (
            <SchermataErrore />
            );
        } else {

        let nome = JSON.parse(localStorage.getItem("datiPersonali")).nome;
        let cognome = JSON.parse(localStorage.getItem("datiPersonali")).cognome;
        let nomeCognome = nome + " " + cognome;

        let telefono = JSON.parse(localStorage.getItem("datiPersonali")).telefono;
        let email = JSON.parse(localStorage.getItem("datiPersonali")).email;

        let numeroCarta = JSON.parse(localStorage.getItem("cifre"));
        let intestatario = JSON.parse(localStorage.getItem("datiCarta")).intestatario;
        let dataScadenzaCarta = (JSON.parse(localStorage.getItem("datiCarta")).meseScadenzaCarta + "/" + JSON.parse(localStorage.getItem("datiCarta")).annoScadenzaCarta);

            if (!numeroPatente) {
                return (
                    <h1>PORCO DIO</h1>

                );
            } else {
                let dataScadenza = JSON.parse(localStorage.getItem("datiPatente")).dataScadenza;
                let tipologiaPatente = JSON.parse(localStorage.getItem("datiPatente")).categoria;
                return (
                    <React.Fragment>
                        <Container fluid className="p-0 h-100">
                            <Row className="g-0 h-100 align-items-center">
                                <Col xs={{ span: 12, offset: 1 }} md={{ span: 10, offset: 1 }} lg={{ span: 7, offset: 1 }} xl={{ span: 3, offset: 1 }} className="ms-lg-auto mt-5 mt-lg-0">
                                    <div>
                                        <div className="d-flex justify-content-start align-items-center mb-5">
                                            <div className="d-flex flex-column">
                                                <h1 className="t-bold">{nomeCognome}</h1>
                                            </div>
                                        </div>
                                        <VisualizzaDati />
                                    </div>
                                </Col>

                                <Col xs={{ span: 12, offset: 0 }} md={{ span: 12, offset: 0 }} lg={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 0 }} className="d-flex d-lg-block me-auto mt-5 pb-5">
                                    <Row className="gy-5 align-items-center justify-content-center">
                                        <Col xs={{ span: 10 }} lg={{ span: 4 }} >
                                            <Card className="border-5 shadow">
                                                <Card.Header className="border-3 shadow"><h2 className="card-title">Credenziali</h2></Card.Header>
                                                <Card.Body>
                                                    <div className=" py-3">
                                                        <p className=" h5 t-bold card-text py-1">Telefono:</p>
                                                        <p className=" h5 t-light card-text">{telefono}</p>
                                                        <p className=" h5 t-bold card-text py-1">Email:</p>
                                                        <p className=" h5 t-light card-text">{email}</p>
                                                        <p className=" h5 t-bold card-text py-1">Password:</p>
                                                        <p className=" h5 t-light card-text">********</p>
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        <Button className="my-3" variant="outline-primary py-1" onClick={() => setModals({ ...modals, cambiaCellulareModal: true })}>
                                                            Modifica cellulare
                                                        </Button>
                                                        <Button className="my-3" variant="outline-primary py-1" onClick={() => setModals({ ...modals, cambiaEmailModal: true })}>
                                                            Modifica email
                                                        </Button>

                                                    </div>
                                                    <div className="d-flex justify-content-center">

                                                        <Button className="my-3" variant="outline-primary py-2" onClick={() => setModals({ ...modals, cambiaPasswordModal: true })}>
                                                            Modifica password
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                                <CambiaCellulareModal show={modals.cambiaCellulareModal} onHide={() => setModals({ ...modals, cambiaCellulareModal: false })} />
                                                <CambiaEmailModal show={modals.cambiaEmailModal} onHide={() => setModals({ ...modals, cambiaEmailModal: false })} />
                                                <CambiaPasswordModal show={modals.cambiaPasswordModal} onHide={() => setModals({ ...modals, cambiaPasswordModal: false })} />
                                            </Card>
                                        </Col>


                                        <Col xs={{ span: 10 }} lg={{ span: 4 }} >
                                            <Card className="border-5 shadow">
                                                <Card.Header className="border-3 shadow"><h2 className="card-title">Patente</h2></Card.Header>
                                                <Card.Body>
                                                    <div className=" py-2">
                                                        <CardColumns className="col-10 offset-1">

                                                            <div className=" py-5">
                                                                <p className=" h5 t-bold card-text py-2">Numero patente:</p>
                                                                <p className=" h5 t-light card-text">{numeroPatente}</p>
                                                                <p className=" h5 t-bold card-text py-2">Data di scadenza:</p>
                                                                <p className=" h5 t-light card-text">{dataScadenza}</p>
                                                                <p className=" h5 t-bold card-text py-2">Tipologia patente:</p>
                                                                <p className=" h5 t-light card-text">{tipologiaPatente}</p>
                                                            </div>
                                                            <div className="d-flex justify-content-center">
                                                                <Button className="my-1" onClick={() => setModals({ ...modals, rimuoviPatenteModal: true })} variant="outline-danger py-1">
                                                                    Elimina
                                                                </Button>
                                                            </div>

                                                        </CardColumns>
                                                    </div>
                                                    <RimuoviPatenteModal show={modals.rimuoviPatenteModal} onHide={() => setModals({ ...modals, rimuoviPatenteModal: false })} />
                                                </Card.Body>
                                                <AggiungiPatenteModal show={modals.aggiungiPatenteModal} onHide={() => setModals({ ...modals, aggiungiPatenteModal: false })} />
                                            </Card>
                                        </Col>

                                        <Col xs={{ span: 10 }} lg={{ span: 4 }} >
                                            <Card className="border-5 shadow">
                                                <Card.Header className="border-3 shadow"><h2 className="card-title">Carta di Credito</h2></Card.Header>
                                                <Card.Body>
                                                    <div className=" py-2">
                                                        <CardColumns className="col-10 offset-1">

                                                            <div className=" py-2">

                                                                <p className=" h5 t-bold card-text py-2">Numero carta:</p>
                                                                <p className=" h5 t-light card-text">**** **** **** {numeroCarta}</p>
                                                                <p className=" h5 t-bold card-text py-2">Intestatario:</p>
                                                                <p className=" h5 t-light card-text">{intestatario}</p>
                                                                <p className=" h5 t-bold card-text py-2">Data di scadenza:</p>
                                                                <p className=" h5 t-light card-text">{dataScadenzaCarta}</p>
                                                                <p className=" h5 t-bold card-text py-2">CVV:</p>
                                                                <p className=" h5 t-light card-text">***</p>

                                                            </div>
                                                            <div className="d-flex justify-content-center">
                                                                <Button className="my-1" variant="outline-primary py-1">
                                                                    Aggiorna
                                                                </Button>
                                                            </div>
                                                        </CardColumns>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </React.Fragment>
                );
            }
            
            
            
            
            
        

}
}
