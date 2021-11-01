import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Container, Table } from 'react-bootstrap';

// Custom Components
import Button from '../utils/Button';

import AssegnaAutistaModal from './forms/admin/AssegnaAutistaModal';
import AssegnaParcheggiatoreModal from './forms/admin/AssegnaParcheggiatoreModal';

// Schermata profilo
export default function GestioneImpiegati() {
    
    let authToken = localStorage.getItem('authToken');

    const [impiegati, setImpiegati] = useState([]);

    useEffect(() => {

        async function loadImpiegati() {

            var config = {
                method: 'post',
                url: '/api/fetch/listaimpiegati',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setImpiegati(response.data.listaImpiegati);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

        loadImpiegati();

    }, []);

    if (!authToken) {
        window.location.replace("/login");
    } else {

        async function eliminaImpiegato(email){
            var data = JSON.stringify({
                email: email
            });

            var config = {
                method: 'delete',
                url: '/api/autenticazione/eliminaaccount',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    window.location.replace("/schermataadmin");
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        let tipoUtente = localStorage.getItem('tipoUtente');

        if (tipoUtente !== "Admin") {
            window.location.replace("/");
        } else {

            return (
                <React.Fragment>
                    <Container fluid className="mt-4">
                        <h2 className="t-bold pb-3 mt-5"><center>Gestione impiegati</center></h2>
                        <Table className="mb-5 mt-3" responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th><p className=" h5 t-bold card-text">Email Impiegato</p></th>
                                    <th><p className=" h5 t-bold card-text">Nome</p></th>
                                    <th><p className=" h5 t-bold card-text">Cognome</p></th>
                                    <th><p className=" h5 t-bold card-text">Codice Fiscale</p></th>
                                    <th><p className=" h5 t-bold card-text">Tipo Impiegato</p></th>
                                    <th><p className=" h5 t-bold card-text">Indirizzo Stallo Assegnato (SE PARCHEGGIATORE)</p></th>
                                    <th><p className=" h5 t-bold card-text">Operazioni</p></th>
                                </tr>
                            </thead>
                            <tbody className="t-light">
                                {impiegati.map((row) => (
                                <tr>
                                    <td><p className=" h5 t-light card-text">{row.email}</p></td>
                                    <td><p className=" h5 t-light card-text">{row.nome}</p></td>
                                    <td ><p className=" h5 t-light card-text">{row.cognome}</p></td>
                                    <td ><p className=" h5 t-light card-text">{row.CF}</p> </td>
                                    <td ><p className=" h5 t-light card-text">{row.tipoUtente}</p></td>
                                    <td ><p className=" h5 t-light card-text">{row.indirizzoAssegnazioneParcheggiatore}</p></td>
                                    <td ><Button variant="outline-danger" onClick={() => eliminaImpiegato(row.email)}>
                                        Elimina Impiegato
                                    </Button></td>
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