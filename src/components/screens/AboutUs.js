import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../utils/Footer';

// Schermata Login
export default function AboutUs() {

    return (
        <div>      
            <Container className='mt-5'>
                <div id="menu" >
                <p className='h2 t-bold py-3'>Dove siamo </p>
                    <p className='h4 t-light pb-4'>La nostra azienda Aumobi ha sede a Palermo in Via Roma n.17. Offriamo i nostri servizi presso l'intera città di Palermo e potete trovare i nostri numerosi stalli sparsi per la città. Prevediamo di espanderci presto anche presso le città di Messina e Ribera.</p>
                <p className='h2 t-bold py-3'>Chi siamo</p>
                    <p className='h4 t-light pb-4'>Il team di Aumobi è composto da professionisti del settore.</p>
                <p className='h2 t-bold py-3'>Contatti</p>
                    <p className='h4 t-light pb-4'>Email: service.aumobi@gmail.com - Telefono: 3331784562</p>
                <p className='h2 t-bold py-3'>FAQ</p>
                    <p className='h4 t-light pb-4'>Il sito assicura la protezione sulla mia privacy?<br/> -Assolutamente sì, il nostro sito non violerà mai la privacy dei nostri amati clienti.<br/><br/>Posso annullare una prenotazione effettuata?<br/> -Sì, puoi annullare un noleggio fino ad un'ora prima dell'effettivo orario.<br/><br/>Gli autisti sono affidabili e competenti? <br/> -I nostri autisti sono scelti accuratamente tra i miglior piloti di tutta la Sicilia.</p>
                </div>  
                </Container>   
                <Footer></Footer>              
        </div>
    );
}