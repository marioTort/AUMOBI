import React from 'react'
import axios from 'axios';
// Bootstrap Components
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';


// Custom Components

import Button from "../utils/Button";
import Footer from '../utils/Footer';



// Util Card
function LinkCard(props) {

    async function elencoStalli() {

        var config = {
            method: 'post',
            url: '/api/fetch/listastalliadmin',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("listaStalli", JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    elencoStalli();

    return (
        <Col md={{ span: 10 }} lg={{ span: 5 }} xl={{ span: 4 }}  >
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
    let authToken = localStorage.getItem('authToken');
    if(!authToken) {
        window.location.replace("/login");
    } else {

        let tipoUtente = localStorage.getItem('tipoUtente');

        if (tipoUtente !== "Cliente") {
            window.location.replace("/");
        } else {
            let nome = JSON.parse(localStorage.getItem("datiPersonali")).nome;

            localStorage.removeItem("oraConsegna");
            localStorage.removeItem("oraRitiro");
            localStorage.removeItem("dataRitiro");
            localStorage.removeItem("dataConsegna");

            return (<>
                <div style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/cliente1.jpg'})`,

                    height: '1500px'
                }}>
                    <div >
                        <Container fluid className="d-flex justify-content-center align-items-center my-5">

                            <div className="d-flex flex-column align-items-start">
                                <h1 className="t-bold">Ciao, {nome}</h1>
                            </div>
                        </Container >
                    </div>
                    <Container className="d-flex justify-content-center mt-5">
                        <CardGroup >
                            <Row className="gy-5 align-items-center justify-content-center">
                                <LinkCard
                                    title={"Gestione Account"}
                                    text={"Da qui puoi visualizzare le informazioni sul tuo account, e se vuoi, modificarle."}
                                    to={"/gestioneaccount"}
                                    buttonLabel={"Il tuo account"} />
                                <LinkCard
                                    title={"Prenotazione"}
                                    text={"Aumobi a tua dispozione, prenota il veicolo più adatto alle tue necessità!"}
                                    to={"/schermataprenotazione"}
                                    buttonLabel={"Prenota ora!"} />
                                <LinkCard
                                    title={"Archivio Prenotazioni"}
                                    text={"Grazie per aver usufruito di Aumobi! Da qui puoi visualizzare e gestire le tue prenotazioni."}
                                    to={"/archivioprenotazioni"}
                                    buttonLabel={"Le tue prenotazioni"} />
                            </Row>
                        </CardGroup>
                    </Container>

                </div>
                <Footer></Footer>
            </>
            );
        }
    }

}