import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Container, Table } from 'react-bootstrap';

// Custom Components
import Button from '../utils/Button';

import Ritarga from './forms/admin/Ritarga';
import Sposta from './forms/admin/Sposta';
import Riprezza from './forms/admin/Riprezza';
import RiprezzaPerTipo from './forms/admin/RiprezzaPerTipo';
import Inserisci from './forms/admin/Inserisci';


// Schermata profilo
export default function GestioneVeicoli() {
    
    let authToken = localStorage.getItem('authToken');

    const [veicoli, setVeicoli] = useState([]);

    const [RitargaShow, setRitargaShow] = useState(false);
    const [SpostaShow, setSpostaShow] = useState(false);
    const [RiprezzaShow, setRiprezzaShow] = useState(false);
    const [InserisciShow, setInserisciShow] = useState(false);
    const [RiprezzaPerTipoShow, setRiprezzaPerTipoShow] = useState(false);

    function ritarga(targa) {
        localStorage.setItem('targaVeicoloDaRitargare', targa);
        setRitargaShow(true)
    }

    function sposta(targa) {

        localStorage.setItem('targaVeicoloDaSpostare', targa);
        setSpostaShow(true)

    }

    function riprezza(targa) {

        localStorage.setItem('targaVeicoloDaRiprezzare', targa);
        setRiprezzaShow(true)

    }

    async function elimina(targa) {

        var data = JSON.stringify({
            targa: targa
        });

        var config = {
            method: 'delete',
            url: '/api/mezzo/eliminamezzo',
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
                        <div className="d-flex justify-content">
                            <Button variant="outline-primary" onClick={() => setInserisciShow(true)}>Inserisci nuovo veicolo</Button>
                            <Button variant="outline-success" onClick={() => setRiprezzaPerTipoShow(true)}>Riprezza per tipo</Button>
                        </div>

                        
                        <Inserisci
                            show={InserisciShow}
                            onHide={() => setInserisciShow(false)}
                        />

                        <RiprezzaPerTipo
                            show={RiprezzaPerTipoShow}
                            onHide={() => setRiprezzaPerTipoShow(false)}
                        />
                        

                        <Table className="mb-5 mt-3" responsive striped bordered hover >
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

                                    <td><p className=" h5 t-light card-text">{row.tipoMezzo}</p>
                                    </td>
                                    <td><p className=" h5 t-light card-text">{row.categoriaMezzo}</p>
                                    </td>

                                    <td><p className=" h5 t-light card-text">{row.emailAutista}</p>
                                    </td>

                                    <td><p className=" h5 t-light card-text">{row.prezzoOrario}</p>
                                    </td>

                                    <td><p className=" h5 t-light card-text">{row.stato}</p></td>
                                    <td>

                                        <div className="d-flex justify-content">
                                            <Button variant="outline-success" onClick={() => ritarga(row.targa)}>Ritarga</Button>
                                            <Button variant="outline-success" onClick={() => sposta(row.targa)}>Sposta</Button>
                                            <Button variant="outline-success" onClick={() => riprezza(row.targa)}>Riprezza</Button>
                                            <Button variant="outline-danger"onClick={() => elimina(row.targa)}>Elimina</Button>
                                        </div>
                                        <Ritarga
                                            show={RitargaShow}
                                            onHide={() => setRitargaShow(false)}
                                        />
                                        <Sposta
                                            show={SpostaShow}
                                            onHide={() => setSpostaShow(false)}
                                        />
                                        <Riprezza
                                            show={RiprezzaShow}
                                            onHide={() => setRiprezzaShow(false)}
                                        />
                                        
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