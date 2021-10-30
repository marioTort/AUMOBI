import React, { useState, useEffect } from 'react';
import axios from 'axios';
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


    const [prenotazioni, setPrenotazioni] = useState([]);


    const [modals, setModals] = useState({
        modificaDataConsegnaModal: false,
        modificaDataRitiroModal: false,
        modificaLuogoConsegnaModal: false,
        annullaPrenotazioneModal: false,
        segnalaGuastoModal: false,
    })


    useEffect(() => {

        async function loadPrenotazioni() {

            var data = JSON.stringify({
                emailCliente: JSON.parse(localStorage.getItem("datiPersonali")).email
            });

            var config = {
                method: 'post',
                url: '/api/fetch/prenotazioniutente',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setPrenotazioni(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

        loadPrenotazioni();

    }, []);


    return (
        <React.Fragment>
        <Container fluid className="mt-4">
        <h2 className="t-bold pb-3 mt-5"><center>Archivio prenotazioni</center></h2>
            <RicercaPrenotazione/>
            <Table className="mb-5 mt-3" responsive striped bordered hover >
                <thead>
                    <tr>
                        <th><p className=" h5 t-bold card-text">#</p></th>
                        <th><p className=" h5 t-bold card-text">Targa Veicolo</p></th>
                        <th><p className=" h5 t-bold card-text">Tipo Veicolo</p></th>
                        <th><p className=" h5 t-bold card-text">Luogo Ritiro</p></th>
                        <th><p className=" h5 t-bold card-text">Data Ritiro</p></th>
                        <th><p className=" h5 t-bold card-text">Ora Ritiro</p></th>
                        <th><p className=" h5 t-bold card-text">Luogo Consegna</p></th>
                        <th><p className=" h5 t-bold card-text">Data Consegna</p></th>
                        <th><p className=" h5 t-bold card-text">Ora Consegna</p></th>
                        <th><p className=" h5 t-bold card-text">Prezzo Prenotazione</p></th>
                        <th><p className=" h5 t-bold card-text">Servizio Autista</p></th>
                        <th><p className=" h5 t-bold card-text">Stato</p></th>
                    </tr>
                </thead>
                <tbody className="t-light">
                            {prenotazioni.map((row) => (
                                <tr>
                                    <td>
                                        <p className=" h5 t-light card-text">{row._id}</p>
                                    </td>
                                    <td>
                                        <p className=" h5 t-light card-text">{row.targaVeicolo}</p>
                                    </td>
                                    <td>
                                        <p className=" h5 t-light card-text">{row.categoriaVeicolo}</p>
                                    </td>
                                    <td>
                                        <p className=" h5 t-light card-text">{row.luogoRitiro}</p>
                                    </td>
                                    <td>
                                        <p className=" h5 t-light card-text">{row.dataRitiro}</p>
                                    </td>
                                    <td>
                                        <p className=" h5 t-light card-text">{row.oraRitiro}</p>
                                    </td>
                                   
                                    <td>
                                        <p className=" h5 t-light card-text">{row.luogoConsegna}</p>
                                    </td>
                                    <td>
                                        <p className=" h5 t-light card-text">{row.dataConsegna}</p>
                                    </td>
                                    <td>
                                        <p className=" h5 t-light card-text">{row.oraConsegna}</p>
                                    </td>

                                    <td>
                                        <p className=" h5 t-light card-text">{Math.floor(row.prezzo) + 1}</p>
                                    </td>
                                    <td>
                                        <p className=" h5 t-light card-text">{row.servizioAutista}</p>
                                    </td>
                                    <td>
                                        <p className=" h5 t-light card-text">{row.statoPrenotazione}</p>
                                    </td>
                                </tr>
                                
                            ))
                            }
                            
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