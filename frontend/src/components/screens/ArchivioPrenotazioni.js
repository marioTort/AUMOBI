import React, { useState } from 'react';

// Bootstrap Components
import { Container, Table } from 'react-bootstrap';

// Custom Components
import Button from '../utils/Button';
import AnnullaPrenotazioneModal from './forms/archivioPrenotazioni/AnnullaPrenotazioneModal';
import ModificaDataConsegnaModal from './forms/archivioPrenotazioni/ModificaDataConsegnaModal';
import ModificaDataRitiroModal from './forms/archivioPrenotazioni/ModificaDataRitiroModal';
import ModificaLuogoConsegnaModal from './forms/archivioPrenotazioni/ModificaLuogoConsegnaModal';
import SegnalaGuastoModal from './forms/archivioPrenotazioni/SegnalaGuastoModal';
import RicercaPrenotazione from './forms/archivioPrenotazioni/RicercaPrenotazione';

// Schermata profilo
export default function ArchivioPrenotazioni() {
    const [modals, setModals] = useState({
        modificaDataConsegnaModal: false,
        modificaDataRitiroModal: false,
        modificaLuogoConsegnaModal: false,
        annullaPrenotazioneModal: false,
        segnalaGuastoModal: false,
    })
    return (
        <React.Fragment>
        <Container fluid className="mt-4">
        <h2 className="t-bold pb-3 mt-5"><center>Archivio prenotazioni</center></h2>
            <RicercaPrenotazione/>
            <Table className="mb-5 mt-3" responsive striped bordered hover>
                <thead>
                    <tr>
                        <th><p className=" h5 t-bold card-text">#</p></th>
                        <th><p className=" h5 t-bold card-text">Luogo Ritiro</p></th>
                        <th><p className=" h5 t-bold card-text">Data Ritiro</p></th>
                        <th><p className=" h5 t-bold card-text">Luogo Consegna</p></th>
                        <th><p className=" h5 t-bold card-text">Data Consegna</p></th>
                        <th><p className=" h5 t-bold card-text">Targa Veicolo</p></th>
                        <th><p className=" h5 t-bold card-text">Tipo Veicolo</p></th>
                        <th><p className=" h5 t-bold card-text">Prezzo Prenotazione</p></th>
                        <th><p className=" h5 t-bold card-text">Stato</p></th>
                        <th><p className=" h5 t-bold card-text">Servizio Autista</p></th>
                        <th><p className=" h5 t-bold card-text">Annulla Prenotazione</p></th>
                        <th><p className=" h5 t-bold card-text">Segnala Guasto</p></th>
                    </tr>
                </thead>
                <tbody className="t-light">
                            <tr>
                            <td><p className=" h5 t-light card-text">1000000</p></td>
                                <td><p className=" h5 t-light card-text">luogo</p></td>
                                <td ><p className=" h5 t-light card-text">data </p>
                                <Button variant="outline-primary" onClick={() => setModals({ ...modals, modificaDataRitiroModal: true })}>
                                    Modifica
                                </Button>
                                </td>
                                <td ><p className=" h5 t-light card-text">luogo</p> 
                                <Button variant="outline-primary" onClick={() => setModals({ ...modals, modificaLuogoConsegnaModal: true })}>
                                    Modifica
                                </Button>
                                </td>
                                <td ><p className=" h5 t-light card-text">data</p> 
                                <Button variant="outline-primary" onClick={() => setModals({ ...modals, modificaDataConsegnaModal: true })}>
                                    Modifica
                                </Button>
                                </td>
                                <td ><p className=" h5 t-light card-text">targa</p> </td>
                                <td ><p className=" h5 t-light card-text">tipo </p></td>
                                <td ><p className=" h5 t-light card-text">prezzo </p></td>
                                <td ><p className=" h5 t-light card-text">PROGRAMMATA </p></td>
                                <td ><p className=" h5 t-light card-text">true </p></td>
                                <td ><Button variant="outline-danger" onClick={() => setModals({ ...modals, annullaPrenotazioneModal: true })}>
                                    Annulla
                                </Button></td>
                                <td ><Button variant="outline-secondary" onClick={() => setModals({ ...modals, segnalaGuastoModal: true })}>
                                    Segnala
                                </Button></td>
                            </tr>
                            <tr>
                                <td>2</td><td>2</td><td>2</td>
                            </tr>
                            <tr>
                                <td>3</td><td>3</td><td>3</td>
                            </tr>
                </tbody>
                <ModificaDataRitiroModal show={modals.modificaDataRitiroModal} onHide={() => setModals({ ...modals, modificaDataRitiroModal: false })} />
                <ModificaLuogoConsegnaModal show={modals.modificaLuogoConsegnaModal} onHide={() => setModals({ ...modals, modificaLuogoConsegnaModal: false })} />
                <ModificaDataConsegnaModal show={modals.modificaDataConsegnaModal} onHide={() => setModals({ ...modals, modificaDataConsegnaModal: false })} />
                <AnnullaPrenotazioneModal show={modals.annullaPrenotazioneModal} onHide={() => setModals({ ...modals, annullaPrenotazioneModal: false })} />
                <SegnalaGuastoModal show={modals.segnalaGuastoModal} onHide={() => setModals({ ...modals, segnalaGuastoModal: false })} />
            </Table>
            </Container>
        </React.Fragment>
    );
}