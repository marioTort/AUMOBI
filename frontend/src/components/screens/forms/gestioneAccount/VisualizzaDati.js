import React, { useState } from 'react';

// Bootstrap Components
import { Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';
import EliminaAccountModal from './EliminaAccountModal';

let dataNascita = JSON.parse(localStorage.getItem("datiPersonali")).dataDiNascita;
let sesso = JSON.parse(localStorage.getItem("datiPersonali")).sesso;
let luogoNascita = JSON.parse(localStorage.getItem("datiPersonali")).luogoDiNascita;
let cf = JSON.parse(localStorage.getItem("datiPersonali")).CF

// Riepilogo profilo
export default function VisualizzaDati() {
    const [eliminaAccountModal, setEliminaAccountModal] = useState(false)
    
    return (
        <Row className="gy-4">
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">DATA DI NASCITA</h6>
                <p className="t-light">{dataNascita}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">SESSO</h6>
                <p className="t-light">{sesso}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">COMUNE DI NASCITA</h6>
                <p className="t-light">{luogoNascita}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">CODICE FISCALE</h6>
                <p className="t-light">{cf}</p>
            </Col>
             <Button variant="outline-danger" onClick={() => setEliminaAccountModal(true)}>
                Elimina account
            </Button>
            <EliminaAccountModal show={eliminaAccountModal} onHide={() => setEliminaAccountModal(false)} />
        </Row>
    );
}