import React, { useState } from 'react'

// Bootstrap Components
import { Container, Card } from 'react-bootstrap';


// Custom Components
import IniziaPrenotazioneModal from './forms/impiegato/IniziaPrenotazioneModal';
import TerminaPrenotazioneModal from './forms/impiegato/TerminaPrenotazioneModal';
import Button from "../utils/Button";

export default function ConfermaPrenotazione() {

    const [terminaPrenotazioneModal, setTerminaPrenotazioneModal] = useState(false)
    const [iniziaPrenotazioneModal, setIniziaPrenotazioneModal] = useState(false)

    return (<React.Fragment>
        <Container fluid className="p-5 h-100 py-5">
                    <center><Card className="border-5 shadow h-100">
                        <Card.Header className="border-3 shadow"><h1 className="card-title"><center>Conferma Prenotazione</center></h1></Card.Header>
                        <Card.Body>
                        <div className=" py-3">
                            <p className=" h3 t-light card-text py-3">Clicca su 'Inizia prenotazione' per confermare l'inizio di una prenotazione <br/> oppure su 'Termina prenotazione' per confermarne la terminazione.</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <center><Button className="btn-lg"  onClick={() => setIniziaPrenotazioneModal(true)} variant="outline-primary">Inizia prenotazione</Button></center>
                            <center><Button className="btn-lg"  onClick={() => setTerminaPrenotazioneModal(true)} variant="outline-danger">Termina prenotazione</Button></center>
                        </div>    
                            </Card.Body>
                            <IniziaPrenotazioneModal show={iniziaPrenotazioneModal} onHide={() => setIniziaPrenotazioneModal(false)} />
                            <TerminaPrenotazioneModal show={terminaPrenotazioneModal} onHide={() => setTerminaPrenotazioneModal(false)} />
                            
                        </Card></center>
        </Container>
        </React.Fragment>
                        
    );
}