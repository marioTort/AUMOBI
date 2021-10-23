import React, { useState } from 'react';

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
    const [modals, setModals] = useState({
        eliminaVeicoloModal: false,
        modificaTargaModal: false,
        modificaPosizioneModal: false,
        modificaPrezzoModal: false,
        modificaPrezzoPerTipoModal: false,
        aggiungiVeicoloModal: false,
    })
    return (
        <React.Fragment>
        <Container fluid className="mt-4">
        <h2 className="t-bold pb-3 mt-5"><center>Gestione veicoli</center></h2>
            <RicercaVeicolo/>
            <Table className="mb-5 mt-3" responsive striped bordered hover>
                <thead>
                    <tr>
                        <th><p className=" h5 t-bold card-text">Targa</p></th>
                        <th><p className=" h5 t-bold card-text">Posizione</p></th>
                        <th><p className=" h5 t-bold card-text">Tipo Veicolo</p></th>
                        <th><p className=" h5 t-bold card-text">Categoria</p></th>
                        <th><p className=" h5 t-bold card-text">Servizio Autista</p></th>
                        <th><p className=" h5 t-bold card-text">Prezzo Orario</p></th>
                        <th><p className=" h5 t-bold card-text">Stato Veicolo</p></th>
                        <th><p className=" h5 t-bold card-text">Elimina Veicolo</p></th>
                    </tr>
                </thead>
                <tbody className="t-light">
                            <tr>
                            <td><p className=" h5 t-light card-text">1</p>
                                <Button variant="outline-primary" onClick={() => setModals({ ...modals, modificaTargaModal: true })}>
                                    Modifica
                                </Button></td>

                                <td><p className=" h5 t-light card-text">luogo</p>
                                <Button variant="outline-primary" onClick={() => setModals({ ...modals, modificaPosizioneModal: true })}>
                                    Modifica
                                </Button></td>
                                <td ><p className=" h5 t-light card-text">auto </p>
                                
                                </td>
                                <td ><p className=" h5 t-light card-text">sportiva</p> 

                                </td>
                                <td ><p className=" h5 t-light card-text">si/no</p> 
                                
                                </td>
                                <td ><p className=" h5 t-light card-text">10</p> 
                                <Button variant="outline-primary" onClick={() => setModals({ ...modals, modificaPrezzoModal: true })}>
                                    Modifica
                                </Button>
                                </td>
                                <td ><p className=" h5 t-light card-text">Libero </p></td>
                                <td ><Button variant="outline-danger" onClick={() => setModals({ ...modals, eliminaVeicoloModal: true })}>
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
                <ModificaTargaModal show={modals.modificaTargaModal} onHide={() => setModals({ ...modals, modificaTargaModal: false })} />
                <ModificaPosizioneModal show={modals.modificaPosizioneModal} onHide={() => setModals({ ...modals, modificaPosizioneModal: false })} />
                <ModificaPrezzoModal show={modals.modificaPrezzoModal} onHide={() => setModals({ ...modals, modificaPrezzoModal: false })} />
                <EliminaVeicoloModal show={modals.eliminaVeicoloModal} onHide={() => setModals({ ...modals, eliminaVeicoloModal: false })} />
            </Table>
            <div className='py-5 d-flex justify-content-end'>
            <Button variant="outline-primary btn-lg" onClick={() => setModals({ ...modals, modificaPrezzoPerTipoModal: true })}>
                Modifica Prezzo Per Tipo
            </Button>
            <Button variant="outline-primary btn-lg" onClick={() => setModals({ ...modals, aggiungiVeicoloModal: true })}>
                Aggiungi Nuovo Veicolo
            </Button>
            </div>
            <ModificaPrezzoPerTipoModal show={modals.modificaPrezzoPerTipoModal} onHide={() => setModals({ ...modals, modificaPrezzoPerTipoModal: false })} />
            <AggiungiVeicoloModal show={modals.aggiungiVeicoloModal} onHide={() => setModals({ ...modals, aggiungiVeicoloModal: false })} />
            </Container>
        </React.Fragment>
    );
}