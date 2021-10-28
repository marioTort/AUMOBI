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
export default function SchermataAdmin() {

    return (
        <div>
                <div>
                    <Container fluid className="d-flex justify-content-center align-items-center my-5 ">
                        
                        <div className="d-flex flex-column align-items-start">
                            <h1 className=" t-bold">Bentornato Admin!</h1>
                        </div>
                    </Container >
                </div>
                <Container className="d-flex justify-content-center mt-5 pb-5">
                    <CardGroup >
                        <Row className="gy-5 align-items-center justify-content-center">   
                                    <LinkCard
                                        title={"Gestione Veicoli"}
                                        text={"Aggiungi, rimuovi o modifica i veicoli. "}
                                        to={"/gestioneveicoli"}
                                        buttonLabel={"Prosegui"}/>
                                    <LinkCard
                                        title={"Gestione Impiegati"}
                                        text={"Modifica tutti i dati che vuoi degli impiegati registrati su Aumobi."}
                                        to={"/gestioneimpiegati"}
                                        buttonLabel={"Prosegui"}/>
                                    <LinkCard
                                        title={"Visualizza Prenotazioni"}
                                        text={"Visualizza i dettagli delle prenotazioni degli utenti."}
                                        to={"/visualizzaprenotazioniadmin"}
                                        buttonLabel={"Prosegui"}/>
                                    <LinkCard
                                        title={"Registra Impiegato"}
                                        text={"Registra un nuovo impiegato: Autista o Parcheggiatore."}
                                        to={"/registrazioneimpiegato"}
                                        buttonLabel={"Prosegui"}/>
                                    <LinkCard
                                        title={"Mio Account"}
                                        text={"Visualizza e modifica i dati del tuo account."}
                                        to={"/gestioneaccountadmin"}
                                        buttonLabel={"Prosegui"}/>
                        </Row>
                    </CardGroup>
                </Container>
                
       </div>

    );

}