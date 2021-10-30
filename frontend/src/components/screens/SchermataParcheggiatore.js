import React from 'react'

// Bootstrap Components
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';


// Custom Components

import Button from "../utils/Button";


// Util Card
function LinkCard(props) {
    return (
        <Col xs={{ span: 10 }} lg={{ span: 4 }} >
            <div>
                <Card className="border-5 shadow">
                <Card.Header className="border-3 shadow"><h2 className="card-title">{props.title}</h2></Card.Header>
                    <Card.Body>
                        <div className=" py-3">
                            <p className=" h4 t-light card-text py-4">{props.text}</p>
                        </div>
                        <Button  to={props.to} variant="outline-primary">{props.buttonLabel}</Button>
                    </Card.Body>
                </Card>
            </div>
        </Col>
    );
}

// Schermata personale utente
export default function SchermataParcheggiatore() {
    let authToken = localStorage.getItem('authToken');
    let tipoUtente = localStorage.getItem('tipoUtente');
    if (!authToken || tipoUtente!=="Parcheggiatore") {
        window.location.replace("/login");
    } else {
        let nome = JSON.parse(localStorage.getItem("datiPersonali")).nome;
        return (
            <div>
                <div>
                    <Container fluid className="d-flex justify-content-center align-items-center my-5 ">

                        <div className="d-flex flex-column align-items-start">
                            <h1 className="t-bold">Benvenuto, {nome}!</h1>
                        </div>
                    </Container >
                </div>
                <Container className="d-flex justify-content-center mt-5 pb-5">
                    <CardGroup >
                        <Row className="gy-5 align-items-center justify-content-center">
                            <LinkCard
                                title={"Gestione Account"}
                                text={"Visualizza e modifica i dati del tuo account. "}
                                to={"/gestioneaccountimpiegato"}
                                buttonLabel={"Prosegui"} />
                            <LinkCard
                                title={"Conferma Prenotazione"}
                                text={"Conferma l'inizio o la fine delle prenotazioni dei clienti."}
                                to={"/"}
                                buttonLabel={"Prosegui"} />
                        </Row>
                    </CardGroup>
                </Container>
            </div>
        );
    } 
}