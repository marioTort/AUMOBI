import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {Carousel, Container, Row, Image, Card, Button} from "react-bootstrap";
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
                                <p className="h5">How it Works</p>
                                <h2>Better Way to Find your Perfect Cars</h2>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                            </div>
                            <div className="cards-wrapper">
                                <div className="card-info">
                                    <div className="icon-image">
                                        <Image className="icon" fluid src="images/home/icon-location.png" alt="location" />
                                    </div>
                                    <div className="content-card">
                                        <h3>Seleziona uno stallo</h3>
                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                                    </div>
                                </div>
                                <div className="card-info">
                                    <div className="icon-image red">
                                        <Image className="icon" fluid src="images/home/icon-calendar.png" alt="location" />
                                    </div>
                                    <div className="content-card">
                                        <h3>Scegli una data</h3>
                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                                    </div>
                                </div>
                                <div className="card-info">
                                    <div className="icon-image">
                                        <Image className="icon" fluid src="images/home/icon-booking.png" alt="location" />
                                    </div>
                                    <div className="content-card">
                                        <h3>Fissa la prenotazione</h3>
                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
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
                                <p className="h5 text-white">How it Works</p>
                                <h2 className="text-white">Better Way to Find your Perfect Cars</h2>
                                <p className="text-white">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                            </div>
                            <div className="cards-wrapper">
                                <Card className="card-item">
                                    <Card.Img variant="top" src="images/home/panda.png" />
                                    <Card.Body>
                                        <Card.Title>Fiat Panda</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        </Card.Text>
                                        <Button className="btn-red-outline" variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                                <Card className="card-item">
                                    <Card.Img variant="top" src="images/home/500.png" />
                                    <Card.Body>
                                        <Card.Title>Fiat 500</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        </Card.Text>
                                        <Button className="btn-red-outline" variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                                <Card className="card-item">
                                    <Card.Img variant="top" src="images/home/500X.png" />
                                    <Card.Body>
                                        <Card.Title>Fiat 500X</Card.Title>
                                        <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                        </Card.Text>
                                        <Button className="btn-red-outline" variant="primary">Go somewhere</Button>
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
