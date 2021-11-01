import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Container, Table } from 'react-bootstrap';

// Custom Components
import Button from '../utils/Button';
import EliminaVeicoloModal from './forms/admin/EliminaVeicoloModal';
import ModificaTargaModal from './forms/admin/ModificaTargaModal';
import ModificaPosizioneModal from './forms/admin/ModificaPosizioneModal';
import ModificaPrezzoModal from './forms/admin/ModificaPrezzoModal';
import ModificaPrezzoPerTipoModal from './forms/admin/ModificaPrezzoPerTipoModal';
import AggiungiVeicoloModal from './forms/admin/AggiungiVeicoloModal';
import RicercaVeicolo from './forms/admin/RicercaVeicolo';

// Schermata profilo
export default function GestioneVeicoli() {
    
    let authToken = localStorage.getItem('authToken');

    const [veicoli, setVeicoli] = useState([]);

    useEffect(() => {

        async function loadVeicoli() {

            var config = {
                method: 'post',
                url: '/api/fetch/listaveicoli',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setVeicoli(response.data.listaMezzi);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

        loadVeicoli();

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
                        <h2 className="t-bold pb-3 mt-5"><center>Gestione veicoli</center></h2>

                        <Table className="mb-5 mt-3" responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th><p className=" h5 t-bold card-text">#</p></th>
                                    <th><p className=" h5 t-bold card-text">Targa</p></th>
                                    <th><p className=" h5 t-bold card-text">Posizione</p></th>
                                    <th><p className=" h5 t-bold card-text">Tipo Veicolo</p></th>
                                    <th><p className=" h5 t-bold card-text">Categoria</p></th>
                                    <th><p className=" h5 t-bold card-text">Email Autista</p></th>
                                    <th><p className=" h5 t-bold card-text">Prezzo Orario</p></th>
                                    <th><p className=" h5 t-bold card-text">Stato Veicolo</p></th>
                                    <th><p className=" h5 t-bold card-text">Operazioni</p></th>
                                </tr>
                            </thead>
                            <tbody className="t-light">
                                {veicoli.map((row) => (
                                <tr>
                                    <td><p className=" h5 t-light card-text">{row._id}</p>
                                    </td>
                                    <td><p className=" h5 t-light card-text">{row.targa}</p>
                                    </td>

                                    <td><p className=" h5 t-light card-text">{row.posizione}</p>
                                    </td>
                                    <td ><p className=" h5 t-light card-text">{row.tipoMezzo}</p>

                                    </td>
                                    <td ><p className=" h5 t-light card-text">{row.categoriaMezzo}</p>

                                    </td>
                                    <td ><p className=" h5 t-light card-text">{row.emailAutista}</p>

                                    </td>
                                    <td ><p className=" h5 t-light card-text">{row.prezzoOrario}</p>

                                    </td>
                                        <td ><p className=" h5 t-light card-text">{row.stato}</p></td>
                                    <td>

                                        <div className="d-flex justify-content">
                                            <Button variant="outline-success">Ritarga</Button>
                                            <Button variant="outline-success">Sposta</Button>
                                            <Button variant="outline-success">Riprezza</Button>
                                            <Button variant="outline-danger">Elimina</Button>
                                        </div>

                                    </td>
                                </tr>
                                ))}
                            </tbody>

                        </Table>
                        <div className='py-5 d-flex justify-content-end'>

                        </div>
                    </Container>
                </React.Fragment>
            );
        }
    }
    
}