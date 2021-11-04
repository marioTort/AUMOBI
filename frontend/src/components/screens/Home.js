import React from 'react';
import {Carousel, Container, Row, Image, Card} from "react-bootstrap";
// Framer Motion Componets

import Footer from '../utils/Footer';

export default function Home() {

        return (
            <>
                <div className="h-100"
                >
                <Carousel pause={false} fade>
                    <Carousel.Item className="h-100">
                        <img
                            className="carousel-img"
                            src="/home1.jpg"
                            alt="Home" />
                    </Carousel.Item>
                    <Carousel.Item className="h-100">
                        <img
                            className="carousel-img right-image"
                            src="/home2.jpg"
                            alt="Home" />
                    </Carousel.Item>
                    <Carousel.Item className="h-100">
                        <img
                            className="carousel-img"
                            src="/home3.jpg"
                            alt="Home" />
                    </Carousel.Item>
                    <Carousel.Item className="h-100">
                        <img
                            className="carousel-img right-image"
                            src="/home4.jpg"
                            alt="Home" />
                    </Carousel.Item>
                    <Carousel.Caption>
                        <Row className="gy-3 gx-0">
                            <Row className="g-0 text-wrapper">
                                <h1 className="display-2 t-bold text-white">AUMOBI</h1>
                                <p className="h2 text-white">Il futuro del noleggio online</p>
                                <p className="h3 t-light text-white">Accedi al tuo account o registrati per utilizzare i nostri servizi</p>
                            </Row>
                        </Row>
                    </Carousel.Caption>
                </Carousel>
                </div>

                <Row className="w-100 mx-auto align-items-center">
                    <Container className="info-section-container ">
                        <div className="info-section-wrapper">
                            <div className="info-content">
                                <p className="h5">Programma una prenotazione</p>
                                <h2>Il miglior modo per trovare il veicolo più adatto a te</h2>
                                <p>Il nostro servizio di prenotazione si basa su tre semplici step.</p>
                            </div>
                            <div className="cards-wrapper">
                                <div className="card-info">
                                    <div className="icon-image">
                                        <Image className="icon" fluid src="images/home/icon-location.png" alt="location" />
                                    </div>
                                    <div className="content-card">
                                        <h3>Seleziona uno stallo</h3>
                                        <p>Scegli lo stallo più vicino alla tua posizione per prelevare e consegnare i nostri mezzi oppure un luogo dove un nostro autista verrà a prenderti e a lasciarti.</p>
                                    </div>
                                </div>
                                <div className="card-info">
                                    <div className="icon-image red">
                                        <Image className="icon" fluid src="images/home/icon-calendar.png" alt="location" />
                                    </div>
                                    <div className="content-card">
                                        <h3>Scegli una data</h3>
                                        <p>Seleziona la data di ritiro e consegna. Ricorda che, qualora riscontrassi un ritardo, potrai sempre modificare la data di ritiro in base alle tue esigenze.</p>
                                    </div>
                                </div>
                                <div className="card-info">
                                    <div className="icon-image">
                                        <Image className="icon" fluid src="images/home/icon-booking.png" alt="location" />
                                    </div>
                                    <div className="content-card">
                                        <h3>Fissa la prenotazione</h3>
                                        <p>Una volta ultimata la prenotazione, ti verrà inviata un'email di conferma.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Row>

                <Row className="w-100 mx-auto align-items-center">
                    <Container className="info-section-container red-mode">
                        <div className="info-section-wrapper">
                            <div className="info-content">
                                <p className="h5 text-white">Ancora non ti abbiamo convinto?</p>
                                <h2 className="text-white">Dai un'occhiata alle nostre auto più richieste</h2>
                                <p className="text-white">Vantiamo di una vasta gamma di veicoli, oltre alle auto, sempre a prezzi più convenienti rispetto alla concorrenza! Registrati per visionare tutti i mezzi a tua disposizione.</p>
                            </div>
                            <div className="cards-wrapper">
                                <Card className="card-item">
                                    <Card.Img variant="top" src="images/home/panda.png" />
                                    <Card.Body>
                                        <Card.Title>Fiat Panda 4X4</Card.Title>
                                        <Card.Text>
                                        Il classico evergreen italiano. Perfetta per chi ha necessità di andare in montagna.
                                        </Card.Text>
                                        
                                    </Card.Body>
                                </Card>
                                <Card className="card-item">
                                    <Card.Img variant="top" src="images/home/500.png" />
                                    <Card.Body>
                                        <Card.Title>Fiat 500</Card.Title>
                                        <Card.Text>
                                        L'utilitaria per eccellenza. Elegante, maneggevole e adatta per ogni occasione.
                                        </Card.Text>
                                        
                                    </Card.Body>
                                </Card>
                                <Card className="card-item">
                                    <Card.Img variant="top" src="images/home/500X.png" />
                                    <Card.Body>
                                        <Card.Title>Fiat 500X</Card.Title>
                                        <Card.Text>
                                        La monovolume più richiesta. Comoda, spaziosa e adatta a tutte le famiglie.
                                        </Card.Text>
                                        
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </Container>
                </Row>

                <Footer></Footer>
            </>
        
        );
}
