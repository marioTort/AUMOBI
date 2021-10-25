import React, { useEffect, useState } from 'react'

// Bootstrap Components
import { Form, Col } from 'react-bootstrap';

// JSON
import Parcheggi from './Parcheggi'


// Input Luogo di nascita
export default function CampoParcheggio(props) {
    const [renderParcheggio, setRenderParcheggio] = useState(true);
    const [optionsParcheggio, setOptionsParcheggio] = useState([]);
    const [checkParcheggio, setCheckParcheggio] = useState(true);

    useEffect(() => {
        if (renderParcheggio) {
            for (let index = 0; index < Object.keys(Parcheggi).length; index++) {
                const element = Object.keys(Parcheggi)[index];
                setOptionsParcheggio(optionsParcheggio => [...optionsParcheggio, <option value={element}>{element}</option>])
            }
        }
        setRenderParcheggio(false);
    }, [renderParcheggio])

    return (
        <React.Fragment>
            
            <Form.Group controlId={props.controlId}>
                <Form.Label className="me-2">{props.children}</Form.Label>
                <Form.Control className="form-select" as="select" onChange={() => setCheckParcheggio(true)} required>
                    <option value="" disabled selected>Seleziona...</option>
                    {optionsParcheggio}
                </Form.Control>
            </Form.Group>
            
        </React.Fragment>

    );
}