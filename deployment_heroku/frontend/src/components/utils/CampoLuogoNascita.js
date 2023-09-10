import React, { useEffect, useState } from 'react'

// Bootstrap Components
import { Form } from 'react-bootstrap';

// JSON
import LuogoNascita from './LuogoNascita'


export default function CampoLuogoNascita() {
    const [renderRegioni, setRenderRegioni] = useState(false);
    const [optionsRegioni, setOptionsRegioni] = useState([]);
    const [renderProvince, setRenderProvince] = useState(false);
    const [optionsProvince, setOptionsProvince] = useState([]);
    const [renderComune, setRenderComune] = useState(false);
    const [optionsComune, setOptionsComune] = useState([]);

    // Popola la select delle regioni
    useEffect(() => {
        if (renderRegioni) {
            for (let index = 0; index < LuogoNascita.regioni.length; index++) {
                const element = LuogoNascita.regioni[index].nome
                setOptionsRegioni(optionsRegioni => [...optionsRegioni, <option value={element}>{element.toUpperCase()}</option>])
            }
        }
        setRenderRegioni(true);
    }, [renderRegioni])

    // Popola la select delle province in base alla regione selezionata
    useEffect(() => {
        if (renderProvince) {
            setOptionsProvince([]);
            let regione = document.querySelector("#regione").value;
            for (let i = 0; i < LuogoNascita.regioni.length; i++) {
                if (LuogoNascita.regioni[i].nome === regione) {
                    for (let j = 0; j < LuogoNascita.regioni[i].province.length; j++) {
                        const element = LuogoNascita.regioni[i].province[j];
                        setOptionsProvince(optionsProvince => [...optionsProvince, <option value={element.code}>{element.nome.toUpperCase()}</option>])
                    }
                }
            }
        }
        setRenderProvince(false);
    }, [renderProvince])

    // Popola la select dei comuni in base alla regione e alla provicia selezionate
    useEffect(() => {
        if (renderComune) {
            setOptionsComune([]);
            let regione = document.querySelector("#regione").value;
            let provincia = document.querySelector("#provincia").value;
            for (let i = 0; i < LuogoNascita.regioni.length; i++) {
                if (LuogoNascita.regioni[i].nome === regione) {
                    for (let j = 0; j < LuogoNascita.regioni[i].province.length; j++) {
                        if (LuogoNascita.regioni[i].province[j].code === provincia) {
                            for (let k = 0; k < LuogoNascita.regioni[i].province[j].comuni.length; k++) {
                                const element = LuogoNascita.regioni[i].province[j].comuni[k].nome;
                                setOptionsComune(optionsComune => [...optionsComune, <option value={element}>{element.toUpperCase()}</option>])
                            }
                        }
                    }
                }

            }
        }
        setRenderComune(false);
    }, [renderComune])

    // Controlla la nazione selezionata.
    // Se è Italia, allora abilita i campi regione, provincia e comune e abilita il flag per
    // popolare le regioni, altrimenti disabilita i campi precedenti
    useEffect(() => {
            let regione = document.querySelector("#regione");
            let provincia = document.querySelector("#provincia");
            let comune = document.querySelector("#comune");
            regione.removeAttribute("disabled");
            provincia.removeAttribute("disabled");
            comune.removeAttribute("disabled");
    })

    const [luogoDiNascita, setLuogoDiNascita] = useState("");

    localStorage.setItem("luogoDiNascita", luogoDiNascita);

    return (
        <React.Fragment>
            <Form.Group className="col-12 col-lg-6" controlId="regione">
                <Form.Label>Regione di nascita</Form.Label>
                <Form.Control className="form-select" as="select" onChange={() => setRenderProvince(true)} required>
                    <option value="" disabled selected>Seleziona</option>
                    {optionsRegioni}
                </Form.Control>
            </Form.Group>
            <Form.Group className="col-12 col-lg-6" controlId="provincia">
                <Form.Label>Provincia di nascita</Form.Label>
                <Form.Control className="form-select" as="select" onChange={() => setRenderComune(true)} required>
                    <option value="" disabled selected>Seleziona</option>
                    {optionsProvince}
                </Form.Control>
            </Form.Group>
            <Form.Group className="col-12 col-lg-6" controlId="comune" onChange={(event) => { setLuogoDiNascita(event.target.value) }}>
                <Form.Label>Comune di nascita</Form.Label>
                <Form.Control className="form-select" as="select" required>
                    <option value="" disabled selected>Seleziona</option>
                    {optionsComune}
                </Form.Control>
            </Form.Group>
        </React.Fragment>

    );
}