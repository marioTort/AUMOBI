import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Bootstrap Components
import { Container, Table } from 'react-bootstrap';

import Button from '../utils/Button';
import ModificaDataRitiro from '../screens/forms/archivioPrenotazioni/ModificaDataRitiro';
import ModificaDataConsegna from '../screens/forms/archivioPrenotazioni/ModificaDataConsegna';
import ModificaLuogoConsegna from '../screens/forms/archivioPrenotazioni/ModificaLuogoConsegna';
import SegnalaGuasto from '../screens/forms/archivioPrenotazioni/SegnalaGuasto';



// Schermata profilo
export default function ArchivioPrenotazioni() {


    const [prenotazioni, setPrenotazioni] = useState([]);

    const [ModificaDataRitiroShow, setModificaDataRitiroShow] = useState(false);
    const [ModificaDataConsegnaShow, setModificaDataConsegnaShow] = useState(false);
    const [ModificaLuogoConsegnaShow, setModificaLuogoConsegnaShow] = useState(false);
    
    const [SegnalaGuastoShow, setSegnalaGuastoShow] = useState(false);

    function modificaDataRitiro(id) {
        localStorage.setItem('idModificaDataRitiro', id);
        setModificaDataRitiroShow(true)
    }

    function modificaDataConsegna(id) {

        localStorage.setItem('idModificaDataConsegna', id);
        setModificaDataConsegnaShow(true)
    }

    function modificaLuogoConsegna(id, tipoVeicolo) {
        var data = JSON.stringify({
            tipoMezzi: tipoVeicolo
        });

        var config = {
            method: 'post',
            url: '/api/fetch/listastalli',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("listaStalli", JSON.stringify(response.data));
                localStorage.setItem('idModificaLuogoConsegna', id);
                setModificaLuogoConsegnaShow(true)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    function segnalaGuastoShow(id) {
        localStorage.setItem('idSegnalaGuasto', id);
        setSegnalaGuastoShow(true)
    }

    
    
    async function annullaPrenotazione(id) {

        var data = JSON.stringify({
            idPrenotazione: id
        });

        var config = {
            method: 'put',
            url: '/api/prenotazione/annullaprenotazione',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.replace("/archivioprenotazioni");
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    

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
    console.log(prenotazioni)
    let authToken = localStorage.getItem('authToken');

    if (!authToken) {
        window.location.replace("/login");
    } else {
        let tipoUtente = localStorage.getItem('tipoUtente');

        if (tipoUtente !== "Cliente") {
            window.location.replace("/");
        } else {

            if (prenotazioni===null) {
                return(
                <h1 className="py-5"><center>NESSUNA PRENOTAZIONE IN ELENCO</center></h1>
                );
            } else {
                return (
                    <React.Fragment>
                        <Container fluid className="mt-4">
                            <h2 className="t-bold pb-3 mt-5"><center>Archivio prenotazioni</center></h2>

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

                                        <th><p className=" h5 t-bold card-text">Stato</p></th>
                                        <th><p className=" h5 t-bold card-text">Operazioni</p></th>
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
                                                <p className=" h5 t-light card-text">{row.statoPrenotazione}</p>
                                            </td>
                                            <td>
                                                <p className=" h5 t-light card-text">

                                                    <div className="d-flex justify-content-end">

                                                        <Button variant="outline-success" onClick={() => modificaDataRitiro(row._id)}>Modifica data di ritiro</Button>
                                                        <Button variant="outline-success" onClick={() => modificaDataConsegna(row._id)}>Modifica data di consegna</Button>
                                                        <Button variant="outline-success" onClick={() => modificaLuogoConsegna(row._id, row.categoriaVeicolo)}>Modifica luogo di consegna</Button>
                                                        <Button variant="outline-danger" onClick={() => annullaPrenotazione(row._id)}>Annulla Prenotazione</Button>
                                                        <Button variant="outline-danger" onClick={() => segnalaGuastoShow(row._id)}>Segnala Guasto</Button>

                                                    </div>
                                                    <ModificaDataRitiro
                                                        show={ModificaDataRitiroShow}
                                                        onHide={() => setModificaDataRitiroShow(false)}
                                                    />
                                                    <ModificaDataConsegna
                                                        show={ModificaDataConsegnaShow}
                                                        onHide={() => setModificaDataConsegnaShow(false)}
                                                    />
                                                    <ModificaLuogoConsegna
                                                        show={ModificaLuogoConsegnaShow}
                                                        onHide={() => setModificaLuogoConsegnaShow(false)}
                                                    />
                                                    <SegnalaGuasto
                                                        show={SegnalaGuastoShow}
                                                        onHide={() => setSegnalaGuastoShow(false)}
                                                    />

                                                </p>
                                            </td>
                                        </tr>

                                    ))
                                    }

                                </tbody>
                            </Table>
                        </Container>
                    </React.Fragment>
                );
            }

        }
    }

}