import React, { useEffect, useState } from 'react';

// Bootstrap Components
import { Form } from 'react-bootstrap'


// Input data di nascita
export default function CampoDataNascita() {
    const [controlloData, setControlloData] = useState(false);
    useEffect(() => {
        if (controlloData) {
            let dataOdierna = new Date(); // costruttore data attuale
            let inputDataNascita = document.querySelector("#dataNascita");
            let etaMinima = document.querySelector("#etaMinima");
            let dataNascita = new Date(inputDataNascita.value);
            // Controlla che il dato inserito sia una data valida
            if (!isNaN(dataNascita.getTime())) {
                inputDataNascita.classList.remove("border-success");
                inputDataNascita.classList.add("border-danger");
                etaMinima.classList.remove("d-none");
                // Controlla requisito anno di nascita
                if (parseInt(dataOdierna.getFullYear()) - parseInt(dataNascita.getFullYear()) < 14) {
                    inputDataNascita.classList.add("border-danger");
                    inputDataNascita.classList.remove("border-success");
                    etaMinima.classList.remove("d-none");
                } else if ((parseInt(dataOdierna.getFullYear()) - parseInt(dataNascita.getFullYear())) === 14) {
                    // Controlla requisito mese di nascita
                    if (parseInt(dataOdierna.getMonth()) - parseInt(dataNascita.getMonth()) < 0) {
                        inputDataNascita.classList.add("border-danger");
                        inputDataNascita.classList.remove("border-success");
                        etaMinima.classList.remove("d-none");
                    } else if ((parseInt(dataOdierna.getMonth()) - parseInt(dataNascita.getMonth())) === 0) {
                        //controlla requisito giorno di nascita
                        if ((parseInt(dataOdierna.getDate()) - parseInt(dataNascita.getDate())) < 0) {
                            inputDataNascita.classList.add("border-danger");
                            inputDataNascita.classList.remove("border-success");
                            etaMinima.classList.remove("d-none");
                        } else {
                            inputDataNascita.classList.add("border-success");
                            inputDataNascita.classList.remove("border-danger");
                            etaMinima.classList.add("d-none");
                        }
                    }
                } else {
                    inputDataNascita.classList.add("border-success");
                    inputDataNascita.classList.remove("border-danger");
                    etaMinima.classList.add("d-none");
                }
            } else {
                inputDataNascita.classList.add("border-danger");
                inputDataNascita.classList.remove("border-success");
                etaMinima.classList.remove("d-none");
            }

        }
        setControlloData(false);
    }, [controlloData])

    const [dataDiNascita, setDataDiNascita] = useState("");
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