import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Row, Col, Card } from 'react-bootstrap';



import Button from '../../../utils/Button';

export default function SelezioneAuto() {

    const [auto, setAuto] = useState([]);


    useEffect(() => {

        async function loadAuto() {

            var data = JSON.stringify({
                "indirizzoStallo": localStorage.getItem("luogoRitiro")
            });

            var config = {
                method: 'post',
                url: '/api/fetch/veicolidisponibilistallo',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setAuto(response.data.listaMezzi);
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            }

        loadAuto();

    }, []);

    return (
        <React.Fragment>
            <Container className="mt-5">
                <div>
                    <h1 className="t-bold text-center my-5">Seleziona Auto</h1>
                </div>
            </Container>
            <Container className="mt-2 mb-5">
                <Row className="mb-100">
                        
                        <Col xs={{ span: 10, offset: 1 }} xl={{ span: 4, offset: 0 }}>
                            <Row className="gy-4 mb-5">
                                <div>
                                    {auto.map((macchina) => (
                                        <Card className="h-100 border-5 shadow">
                                        <Card.Img variant="top" src="images/home/panda.png"/>
                                        <Card.Body className="d-flex flex-column justify-content-evenly">
                                            <div className=" py-1 justify-content-center">
                                                <li className=" h4 t-light card-text py-4">Categoria: {macchina.categoriaMezzo}</li>
                                                <li className=" h4 t-light card-text py-4">Targa: {macchina.targa}</li>
                                                <li className=" h4 t-light card-text py-4">Prezzo orario: {macchina.prezzoOrario} €</li>
                                            </div>

                                            <div className="d-flex justify-content-end">
                                                <Button className="button-menu" variant="outline-secondary" to="/prenotazionecompletata">Seleziona Auto</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    ))}
                                </div>
                            </Row>
                        </Col>

                    
                </Row>
            </Container>
        </React.Fragment>
    );
    
}