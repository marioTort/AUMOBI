import React, { useState } from 'react';

// Bootstrap Components
import { Container, Table } from 'react-bootstrap';

// Custom Components
import RicercaPrenotazioneAdmin from './forms/admin/RicercaPrenotazioneAdmin';

// Schermata profilo
export default function VisualizzaPrenotazioniAdmin() {
    
    return (
        <React.Fragment>
        <Container fluid className="mt-4">
        <h2 className="t-bold pb-3 mt-5"><center>Visualizza prenotazioni</center></h2>
            <RicercaPrenotazioneAdmin/>
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
                        <th><p className=" h5 t-bold card-text">Email Cliente</p></th>
                        <th><p className=" h5 t-bold card-text">Stato</p></th>
                        <th><p className=" h5 t-bold card-text">Servizio Autista</p></th>
                        <th><p className=" h5 t-bold card-text">Email Autista</p></th>
                    </tr>
                </thead>
                <tbody className="t-light">
                            <tr>
                            <td><p className=" h5 t-light card-text">00001</p></td>
                                <td><p className=" h5 t-light card-text">luogo</p></td>
                                <td ><p className=" h5 t-light card-text">data </p></td>
                                <td ><p className=" h5 t-light card-text">luogo</p></td>
                                <td ><p className=" h5 t-light card-text">data</p></td>
                                <td ><p className=" h5 t-light card-text">targa</p> </td>
                                <td ><p className=" h5 t-light card-text">tipo </p></td>
                                <td ><p className=" h5 t-light card-text">cliente@gmail.com </p></td>
                                <td ><p className=" h5 t-light card-text">PROGRAMMATA </p></td>
                                <td ><p className=" h5 t-light card-text">true </p></td>
                                <td ><p className=" h5 t-light card-text">autista@email.com </p></td>
                            </tr>
                            <tr>
                                <td>2</td><td>2</td><td>2</td>
                            </tr>
                            <tr>
                                <td>3</td><td>3</td><td>3</td>
                            </tr>
                </tbody>
            </Table>
            </Container>
        </React.Fragment>
    );
}