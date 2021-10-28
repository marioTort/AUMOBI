import React, { useState } from 'react';

// Bootstrap Components
import { Container, Table } from 'react-bootstrap';

// Custom Components
import Button from '../utils/Button';
import EliminaImpiegatoModal from './forms/admin/EliminaImpiegatoModal';
import RicercaImpiegato from './forms/admin/RicercaImpiegato';
import AssegnaAutistaModal from './forms/admin/AssegnaAutistaModal';
import AssegnaParcheggiatoreModal from './forms/admin/AssegnaParcheggiatoreModal';

// Schermata profilo
export default function GestioneImpiegati() {
    const [modals, setModals] = useState({
        eliminaImpiegatoModal: false,
        assegnaAutistaModal: false,
        assegnaParcheggiatoreModal: false,
    })
    return (
        <React.Fragment>
        <Container fluid className="mt-4">
        <h2 className="t-bold pb-3 mt-5"><center>Gestione impiegati</center></h2>
            <RicercaImpiegato/>
            <Table className="mb-5 mt-3" responsive striped bordered hover>
                <thead>
                    <tr>
                        <th><p className=" h5 t-bold card-text">Email Impiegato</p></th>
                        <th><p className=" h5 t-bold card-text">Nome</p></th>
                        <th><p className=" h5 t-bold card-text">Cognome</p></th>
                        <th><p className=" h5 t-bold card-text">Codice Fiscale</p></th>
                        <th><p className=" h5 t-bold card-text">Numero Patente</p></th>
                        <th><p className=" h5 t-bold card-text">Tipo Impiegato</p></th>
                        <th><p className=" h5 t-bold card-text">Targa Auto Assegnata</p></th>
                        <th><p className=" h5 t-bold card-text">Indirizzo Stallo Assegnato</p></th>
                        <th><p className=" h5 t-bold card-text">Elimina Impiegato</p></th>
                    </tr>
                </thead>
                <tbody className="t-light">
                            <tr>
                            <td><p className=" h5 t-light card-text">email</p></td>
                                <td><p className=" h5 t-light card-text">nome</p></td>
                                <td ><p className=" h5 t-light card-text">cognome </p></td>
                                <td ><p className=" h5 t-light card-text">cf</p> </td>
                                <td ><p className=" h5 t-light card-text">numero patente</p> </td>
                                <td ><p className=" h5 t-light card-text">Autista </p></td>
                                <td ><p className=" h5 t-light card-text">Targa </p></td>
                                <td ><p className=" h5 t-light card-text"> </p></td>
                                <td ><Button variant="outline-danger" onClick={() => setModals({ ...modals, eliminaImpiegatoModal: true })}>
                                    Elimina
                                </Button></td>
                            </tr>
                            <tr>
                            <td><p className=" h5 t-light card-text">email</p></td>
                                <td><p className=" h5 t-light card-text">nome</p></td>
                                <td ><p className=" h5 t-light card-text">cognome </p></td>
                                <td ><p className=" h5 t-light card-text">cf</p> </td>
                                <td ><p className=" h5 t-light card-text">numero patente</p> </td>
                                <td ><p className=" h5 t-light card-text">Parcheggiatore </p></td>
                                <td ><p className=" h5 t-light card-text"></p></td>
                                <td ><p className=" h5 t-light card-text">Indirizzo Stallo </p></td>
                                <td ><Button variant="outline-danger" onClick={() => setModals({ ...modals, eliminaImpiegatoModal: true })}>
                                    Elimina
                                </Button></td>
                            </tr>
                            <tr>
                                <td>3</td><td>3</td><td>3</td>
                            </tr>
                </tbody>
                <EliminaImpiegatoModal show={modals.eliminaImpiegatoModal} onHide={() => setModals({ ...modals, eliminaImpiegatoModal: false })} />
            </Table>
            <div className='py-5 d-flex justify-content-end'>
            <Button variant="outline-primary btn-lg" onClick={() => setModals({ ...modals, assegnaAutistaModal: true })}>
                Assegna Autista
            </Button>
            <Button variant="outline-primary btn-lg" onClick={() => setModals({ ...modals, assegnaParcheggiatoreModal: true })}>
                Assegna Parcheggiatore
            </Button>
            </div>
            <AssegnaAutistaModal show={modals.assegnaAutistaModal} onHide={() => setModals({ ...modals, assegnaAutistaModal: false })} />
            <AssegnaParcheggiatoreModal show={modals.assegnaParcheggiatoreModal} onHide={() => setModals({ ...modals, assegnaParcheggiatoreModal: false })} />
            </Container>
        </React.Fragment>
    );
}