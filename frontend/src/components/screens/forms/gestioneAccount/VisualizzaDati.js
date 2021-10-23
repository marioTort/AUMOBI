import React, { useState } from 'react';


// Bootstrap Components
import { Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';
import EliminaAccountModal from './EliminaAccountModal';

// Riepilogo profilo
export default function VisualizzaDati() {

    const [eliminaAccountModal, setEliminaAccountModal] = useState(false)
    
    return (
        <Row className="gy-4">
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">DATA DI NASCITA</h6>
                <p className="t-light">{new Date(11/8/99).toLocaleDateString("it-IT")}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">SESSO</h6>
                <p className="t-light">sesso</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">COMUNE DI NASCITA</h6>
                <p className="t-light">citta</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">CODICE FISCALE</h6>
                <p className="t-light">codiceFiscale</p>
            </Col>
             <Button variant="outline-danger" onClick={() => setEliminaAccountModal(true)}>
                Elimina account
            </Button>
            <EliminaAccountModal show={eliminaAccountModal} onHide={() => setEliminaAccountModal(false)} />
        </Row>
    );
}

/*import React, { useState } from 'react';
import useSession from '../../../Hooks/useSession';

// Bootstrap Components
import { Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';
import EliminaAccountModal from './EliminaAccountModal';

// Riepilogo profilo
export default function VisualizzaDati() {
    const { session, setSession } = useSession();
    const [eliminaAccountModal, setEliminaAccountModal] = useState(false)
    
    return (
        <Row className="gy-4">
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">DATA DI NASCITA</h6>
                <p className="t-light">{new Date(session.dataNascita).toLocaleDateString("it-IT")}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">SESSO</h6>
                <p className="t-light">{session.sesso}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">COMUNE DI NASCITA</h6>
                <p className="t-light">{session.luogoNascita.citta}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">CODICE FISCALE</h6>
                <p className="t-light">{session.codiceFiscale}</p>
            </Col>
             <Button variant="outline-danger" onClick={() => setEliminaAccountModal(true)}>
                Elimina account
            </Button>
            <EliminaAccountModal show={eliminaAccountModal} onHide={() => setEliminaAccountModal(false)} />
        </Row>
    );
}*/