import React, { useState } from 'react';
import axios from 'axios';
// Bootstrap Components
import { Container, Row, Col, Card, CardColumns } from 'react-bootstrap';

// Custom Components
import Button from '../utils/Button';

import VisualizzaDati from './forms/gestioneAccount/VisualizzaDati';
import AggiungiPatente from './forms/gestioneAccount/AggiungiPatente';

import ModificaCellulare from './forms/gestioneAccount/ModificaCellulare';
import ModificaEmail from './forms/gestioneAccount/ModificaEmail';
import ModificaPassword from './forms/gestioneAccount/ModificaPassword';


import SchermataErrore from "../screens/forms/gestioneAccount/SchermataErrore";

// Schermata profilo
export default function GestioneAccount() {

    let authToken = localStorage.getItem('authToken');
    let Patente = JSON.parse(localStorage.getItem("datiPatente"));

    //GIUSTI...
    const [AggiungiPatenteShow, setAggiungiPatenteShow] = useState(false);

    const [ModificaCellulareShow, setModificaCellulareShow] = useState(false);
    const [ModificaEmailShow, setModificaEmailShow] = useState(false);
    const [ModificaPasswordShow, setModificaPasswordShow] = useState(false);

    async function eliminaPatente(event) {
        event.preventDefault();

        var data = JSON.stringify({
            email: JSON.parse(localStorage.getItem("datiPatente")).email
        });

        var config = {
            method: 'delete',
            url: '/api/patente/eliminapatente',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.removeItem("datiPatente");
                window.location.replace("/gestioneaccount");
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    if (!authToken) {
        return (
            <SchermataErrore />
        );
    } else {

        let tipoUtente = localStorage.getItem('tipoUtente');

        if ((tipoUtente !== "Autista") && (tipoUtente !== "Parcheggiatore")) {
            window.location.replace("/");
        } else {

            let nome = JSON.parse(localStorage.getItem("datiPersonali")).nome;
            let cognome = JSON.parse(localStorage.getItem("datiPersonali")).cognome;
            let nomeCognome = nome + " " + cognome;

            let telefono = JSON.parse(localStorage.getItem("datiPersonali")).telefono;
            let email = JSON.parse(localStorage.getItem("datiPersonali")).email;

            if (!Patente) {
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
                                                        <Button className="my-3" variant="outline-primary py-1" onClick={() => setModificaCellulareShow(true)}>
                                                            Modifica cellulare
                                                        </Button>
                                                        <Button className="my-3" variant="outline-primary py-1" onClick={() => setModificaEmailShow(true)}>
                                                            Modifica email
                                                        </Button>

                                                    </div>
                                                    <div className="d-flex justify-content-center">

                                                        <Button className="my-3" variant="outline-primary py-2" onClick={() => setModificaPasswordShow(true)}>
                                                            Modifica password
                                                        </Button>
                                                    </div>
                                                    <ModificaCellulare
                                                        show={ModificaCellulareShow}
                                                        onHide={() => setModificaCellulareShow(false)}
                                                    />
                                                    <ModificaEmail
                                                        show={ModificaEmailShow}
                                                        onHide={() => setModificaEmailShow(false)}
                                                    />
                                                    <ModificaPassword
                                                        show={ModificaPasswordShow}
                                                        onHide={() => setModificaPasswordShow(false)}
                                                    />
                                                </Card.Body>
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
                                                                <p className=" h5 t-light card-text"></p>
                                                                <p className=" h5 t-bold card-text py-2">Data di scadenza:</p>
                                                                <p className=" h5 t-light card-text"></p>
                                                                <p className=" h5 t-bold card-text py-2">Tipologia patente:</p>
                                                                <p className=" h5 t-light card-text"></p>
                                                            </div>
                                                            <div className="d-flex justify-content-center">
                                                                <Button className="my-1" onClick={() => setAggiungiPatenteShow(true)} variant="outline-primary py-1">
                                                                    Aggiungi
                                                                </Button>
                                                            </div>

                                                        </CardColumns>
                                                    </div>
                                                    <AggiungiPatente
                                                        show={AggiungiPatenteShow}
                                                        onHide={() => setAggiungiPatenteShow(false)}
                                                    />
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </React.Fragment>
                );
            } else {
                let numeroPatente = JSON.parse(localStorage.getItem("datiPatente")).numeroPatente;
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
                                                        <Button className="my-3" variant="outline-primary py-1" onClick={() => setModificaCellulareShow(true)}>
                                                            Modifica cellulare
                                                        </Button>
                                                        <Button className="my-3" variant="outline-primary py-1" onClick={() => setModificaEmailShow(true)}>
                                                            Modifica email
                                                        </Button>

                                                    </div>
                                                    <div className="d-flex justify-content-center">

                                                        <Button className="my-3" variant="outline-primary py-2" onClick={() => setModificaPasswordShow(true)}>
                                                            Modifica password
                                                        </Button>
                                                    </div>
                                                    <ModificaCellulare
                                                        show={ModificaCellulareShow}
                                                        onHide={() => setModificaCellulareShow(false)}
                                                    />
                                                    <ModificaEmail
                                                        show={ModificaEmailShow}
                                                        onHide={() => setModificaEmailShow(false)}
                                                    />
                                                    <ModificaPassword
                                                        show={ModificaPasswordShow}
                                                        onHide={() => setModificaPasswordShow(false)}
                                                    />
                                                </Card.Body>

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
                                                                <Button className="my-1" onClick={eliminaPatente} variant="outline-danger py-1">
                                                                    Elimina
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
   
}
