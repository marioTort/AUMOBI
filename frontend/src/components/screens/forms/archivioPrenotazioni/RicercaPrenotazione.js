import React, { useState } from 'react';

import { Row, Col, Form } from 'react-bootstrap'

import Button from '../../../utils/Button'
import ModificaDataRitiro from './ModificaDataRitiro';
import ModificaDataConsegna from './ModificaDataConsegna';
import ModificaLuogoConsegna from './ModificaLuogoConsegna';
import AnnullaPrenotazione from './AnnullaPrenotazione';
import SegnalaGuasto from './SegnalaGuasto';



export default function RicercaPrenotazione() {
    
    const [ModificaDataRitiroShow, setModificaDataRitiroShow] = useState(false);
    const [ModificaDataConsegnaShow, setModificaDataConsegnaShow] = useState(false);
    const [ModificaLuogoConsegnaShow, setModificaLuogoConsegnaShow] = useState(false);
    const [AnnullaPrenotazioneShow, setAnnullaPrenotazioneShow] = useState(false);
    const [SegnalaGuastoShow, setSegnalaGuastoShow] = useState(false);
    
    return (
        <Form>
            <Row className="gy-3 align-items-end">
                
                <Col xs={{ span: 12 }} className="justify-content-center d-flex">
                    <Button variant="outline-success" onClick={() => setModificaDataRitiroShow(true)}>Modifica data di ritiro</Button>
                    <Button variant="outline-success" onClick={() => setModificaDataConsegnaShow(true)}>Modifica data di consegna</Button>
                    <Button variant="outline-success" onClick={() => setModificaLuogoConsegnaShow(true)}>Modifica luogo di consegna</Button>
                    <Button variant="outline-danger" onClick={() => setAnnullaPrenotazioneShow(true)}>Annulla Prenotazione</Button>
                    <Button variant="outline-danger" onClick={() => setSegnalaGuastoShow(true)}>Segnala Guasto</Button>
                </Col>
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
                <AnnullaPrenotazione
                    show={AnnullaPrenotazioneShow}
                    onHide={() => setAnnullaPrenotazioneShow(false)}
                />
                <SegnalaGuasto
                    show={SegnalaGuastoShow}
                    onHide={() => setSegnalaGuastoShow(false)}
                />
            </Row>
        </Form>
    );
}