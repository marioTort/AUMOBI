import React, { useEffect, useState } from 'react';

// Bootstrap Components
import { Form } from 'react-bootstrap'


// Input data di nascita
export default function CampoDataNascita() {
    const [controlloData, setControlloData] = useState(false);
    const [dataDiNascita, setDataDiNascita] = useState("");
    
    useEffect(() => {
        if(){

        } else {

        }
    }, [checkData])

    
    
    var data = new Date(dataDiNascita);
    localStorage.setItem("dataDiNascita", (data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear()));
    

    return (
        <>
            <Form.Group controlId="dataNascita" onChange={(event) => { setDataDiNascita(event.target.value) }}>
                <Form.Label className="pe-2">Data di nascita</Form.Label>
                <Form.Control type="date" placeholder="Inserisci data di nascita" onBlur={() => setControlloData(true)} pattern="[0-9]{4}-[0-1][0-9]-[0-3][0-9]" maxLength={10} required />
                <Form.Text id="etaMinima" className="d-none text-danger">Devi avere almeno 14 anni per registrarti!</Form.Text>
            </Form.Group>
        </>
    );
}