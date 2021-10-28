import React, { useState } from 'react';

// Bootstrap Components
import { Container, Table } from 'react-bootstrap';

// Custom Components
import Button from '../utils/Button';
import EliminaStalloModal from './forms/admin/EliminaStalloModal';
import AggiungiStalloModal from './forms/admin/AggiungiStalloModal';

// Schermata profilo
export default function GestioneStalli() {
    const [modals, setModals] = useState({
        eliminaStalloModal: false,
        aggiungiStalloModal: false,
    })
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
                            <tr>
                            <td><p className=" h5 t-light card-text">Luogo</p></td>

                                <td><p className=" h5 t-light card-text">Auto</p></td>

                                <td ><p className=" h5 t-light card-text">20</p></td>

                                <td ><p className=" h5 t-light card-text">20</p> </td>

                                <td ><Button variant="outline-danger" onClick={() => setModals({ ...modals, eliminaStalloModal: true })}>
                                    Elimina
                                </Button></td>
                            </tr>
                            <tr>
                                <td>2</td><td>2</td><td>2</td>
                            </tr>
                            <tr>
                                <td>3</td><td>3</td><td>3</td>
                            </tr>
                </tbody>
                <EliminaStalloModal show={modals.eliminaStalloModal} onHide={() => setModals({ ...modals, eliminaStalloModal: false })} />
            </Table>
            <div className='py-5 d-flex justify-content-end'>
            <Button variant="outline-primary btn-lg" onClick={() => setModals({ ...modals, aggiungiStalloModal: true })}>
                Aggiungi Nuovo Stallo
            </Button>
            </div>
            <AggiungiStalloModal show={modals.aggiungiStalloModal} onHide={() => setModals({ ...modals, aggiungiStalloModal: false })} />
            </Container>
        </React.Fragment>
    );
}