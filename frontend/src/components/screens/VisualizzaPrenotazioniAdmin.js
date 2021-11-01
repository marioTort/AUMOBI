import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Container, Table } from 'react-bootstrap';

// Custom Components
import RicercaPrenotazioneAdmin from './forms/admin/RicercaPrenotazioneAdmin';

// Schermata profilo
export default function VisualizzaPrenotazioniAdmin() {
    
    let authToken = localStorage.getItem('authToken');

    const [prenotazioni, setPrenotazioni] = useState([]);

    useEffect(() => {

        async function loadPrenotazioni() {

            var config = {
                method: 'post',
                url: '/api/fetch/storicoprenotazioni',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setPrenotazioni(response.data.listaPrenotazioni);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

        loadPrenotazioni();

    }, []);

    if (!authToken) {
        window.location.replace("/login");
    } else {
        let tipoUtente = localStorage.getItem('tipoUtente');

        if (tipoUtente !== "Admin") {
            window.location.replace("/");
        } else {
            return (
                <React.Fragment>
                    <Container fluid className="mt-4">
                        <h2 className="t-bold pb-3 mt-5"><center>Visualizza prenotazioni</center></h2>
                        
                        <Table className="mb-5 mt-3" responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th><p className=" h5 t-bold card-text">#</p></th>
                                    <th><p className=" h5 t-bold card-text">Luogo Ritiro</p></th>
                                    <th><p className=" h5 t-bold card-text">Data Ritiro</p></th>
                                    <th><p className=" h5 t-bold card-text">Ora Ritiro</p></th>

                                    <th><p className=" h5 t-bold card-text">Luogo Consegna</p></th>
                                    <th><p className=" h5 t-bold card-text">Data Consegna</p></th>
                                    <th><p className=" h5 t-bold card-text">Ora Consegna</p></th>

                                    <th><p className=" h5 t-bold card-text">Targa Veicolo</p></th>
                                    <th><p className=" h5 t-bold card-text">Tipo Veicolo</p></th>
                                    <th><p className=" h5 t-bold card-text">Email Cliente</p></th>
                                    <th><p className=" h5 t-bold card-text">Stato</p></th>
                                    
        
                                </tr>
                            </thead>
                            <tbody className="t-light">
                                {prenotazioni.map((row) => (
                                <tr>
                                    <td><p className=" h5 t-light card-text">{row._id}</p></td>
                                    <td><p className=" h5 t-light card-text">{row.luogoRitiro}</p></td>
                                    <td ><p className=" h5 t-light card-text">{row.dataRitiro}</p></td>
                                    <td><p className=" h5 t-light card-text">{row.oraRitiro}</p></td>

                                    <td ><p className=" h5 t-light card-text">{row.luogoConsegna}</p></td>
                                    <td ><p className=" h5 t-light card-text">{row.dataConsegna}</p></td>
                                    <td><p className=" h5 t-light card-text">{row.oraConsegna}</p></td>

                                    <td ><p className=" h5 t-light card-text">{row.targaVeicolo}</p> </td>
                                    <td ><p className=" h5 t-light card-text">{row.categoriaVeicolo}</p></td>
                                    <td ><p className=" h5 t-light card-text">{row.emailCliente}</p></td>
                                    <td ><p className=" h5 t-light card-text">{row.statoPrenotazione}</p></td>
                                    
                                    
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </React.Fragment>
            );
        }
    }

}