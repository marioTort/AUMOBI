import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Bootstrap Components
import { Container, Table } from 'react-bootstrap';

// Custom Components
import Button from '../utils/Button';
import InserisciStallo from './forms/admin/InserisciStallo';

// Schermata profilo
export default function GestioneStalli() {


    let authToken = localStorage.getItem('authToken');

    const [stalli, setStalli] = useState([]);

    const [InserisciStalloShow, setInserisciStalloShow] = useState(false);

    async function elimina(indirizzoStallo) {

        var data = JSON.stringify({
            indirizzoStallo: indirizzoStallo
        });

        var config = {
            method: 'delete',
            url: '/api/stallo/eliminastallo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.replace("/schermataadmin");
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    useEffect(() => {

        async function loadStalli() {

            var config = {
                method: 'post',
                url: '/api/fetch/listastalliadmin',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            await axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    setStalli(response.data.listaStalli);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

        loadStalli();

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
                        <h2 className="t-bold pb-3 mt-5"><center>Gestione stalli</center></h2>
                        <Table className="mb-5 mt-3" responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th><p className=" h5 t-bold card-text">Indirizzo</p></th>
                                    <th><p className=" h5 t-bold card-text">Tipo Mezzi</p></th>
                                    <th><p className=" h5 t-bold card-text">Posti Disponibili</p></th>
                                    <th><p className=" h5 t-bold card-text">Capienza</p></th>
                                    <th><p className=" h5 t-bold card-text">Elimina Stallo</p></th>
                                </tr>
                            </thead>
                            <tbody className="t-light">
                                {stalli.map((row) => (
                                <tr>
                                    <td><p className=" h5 t-light card-text">{row.indirizzoStallo}</p></td>

                                    <td><p className=" h5 t-light card-text">{row.tipoMezzi}</p></td>

                                    <td ><p className=" h5 t-light card-text">{row.postiDisponibili}</p></td>

                                    <td ><p className=" h5 t-light card-text">{row.capienza}</p> </td>

                                    <td ><Button variant="outline-danger" onClick={() => elimina(row.indirizzoStallo)}>
                                        Elimina
                                    </Button></td>
                                </tr>
                                ))}
                            </tbody>
                            
                        </Table>
                        <div className='py-5 d-flex justify-content-end'>
                            <Button variant="outline-primary btn-lg" onClick={() => setInserisciStalloShow(true)}>
                                Aggiungi Nuovo Stallo
                            </Button>
                        </div>
                        <InserisciStallo
                            show={InserisciStalloShow}
                            onHide={() => setInserisciStalloShow(false)}
                        />
                        
                    </Container>
                </React.Fragment>
            );
        }
    }
    
}