import React from 'react'

// Bootstrap Components
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';


// Custom Components

import Button from "../utils/Button";
import Footer from '../utils/Footer';


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
export default function SchermataCliente() {

    return (<>
        <div style={{  backgroundImage:`url(${process.env.PUBLIC_URL + '/cliente1.jpg'})`,
        
        height: '1500px'
                                    }}>
                <div >
                    <Container fluid className="d-flex justify-content-center align-items-center my-5">
                        
                        <div className="d-flex flex-column align-items-start">
                            <h1 className="t-bold">Benvenuto su AUMOBI!</h1>
                        </div>
                    </Container >
                </div>
                <Container className="d-flex justify-content-center mt-5">
                    <CardGroup >
                        <Row className="gy-5 align-items-center justify-content-center">   
                                    <LinkCard
                                        title={"Gestione Account"}
                                        text={"Da qui puoi visualizzare le informazioni sul tuo account, e se vuoi, modificarle."}
                                        to={"/"}
                                        buttonLabel={"Il tuo account"}/>
                                    <LinkCard
                                        title={"Prenotazione"}
                                        text={"Aumobi a tua dispozione, prenota il veicolo più adatto alle tue necessità!"}
                                        to={"/"}
                                        buttonLabel={"Prenota ora!"}/>
                                    <LinkCard
                                        title={"Archivio Prenotazioni"}
                                        text={"Grazie per aver usufruito di Aumobi! Da qui puoi visualizzare e gestire le tue prenotazioni."}
                                        to={"/"}
                                        buttonLabel={"Le tue prenotazioni"}/>
                        </Row>
                    </CardGroup>
                </Container>
                
       </div>
       <Footer></Footer>
   </>
    );

}