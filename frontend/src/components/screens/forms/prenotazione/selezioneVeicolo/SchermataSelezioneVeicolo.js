import React from 'react'
import { useHistory } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

import VeicoloCard from './VeicoloCard';
import RiepilogoCard from './RiepilogoCard';

export default function SchermataSelezioneVeicolo() {

    console.log('datiPrenotazione')

    return (
        <React.Fragment>
            <Container className="mt-5">
                <div>
                    <h1 className="t-bold text-center my-5">Seleziona veicolo</h1>
                </div>
            </Container>
            <Container className="mt-2 mb-5">
                <Row className="mb-100">
                    <Col xs={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 9 }}>
                        <Row className="gy-4 mb-5">
                            
                                
                                
                                    <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 0 }} xl={{ span: 4 }}>
                                        <VeicoloCard
                                            index={'index'}
                                            tipologiaMezzo={'tipologiaMezzo'}
                                            idMezzo={'id'}
                                            marca={'marca'}
                                            modello={'modello'}
                                            cambio={'cambio'}
                                            carburante={'carburante'}
                                            cilindrata={'cilindrata'}
                                            numeroPosti={'numeroPosti'}
                                            tariffa={'tariffaOraria'}
                                            path={'path'} />
                                    </Col>
                                
                            
                        </Row>
                    </Col>
                    <Col lg={{ span: 4 }} xl={{ span: 3 }}>
                        <RiepilogoCard
                            tipologiaMezzo={'tipologiaMezzo'}
                            autista={'autista'}
                            localitaRitiro={'ritiro.nome'}
                            localitaConsegna={'consegna.nome'}
                            dataRitiro={new Date().toLocaleString("it-IT")}
                            dataConsegna={new Date().toLocaleString("it-IT")}
                        />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}