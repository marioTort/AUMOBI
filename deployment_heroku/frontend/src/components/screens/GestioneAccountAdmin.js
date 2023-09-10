import React, { useState } from 'react';

// Bootstrap Components
import { Container, Card } from 'react-bootstrap';

// Custom Components
import Button from '../utils/Button';
import ModificaCellulare from './forms/gestioneAccount/ModificaCellulare';
import ModificaEmail from './forms/gestioneAccount/ModificaEmail';
import ModificaPassword from './forms/gestioneAccount/ModificaPassword';

// Schermata profilo
export default function GestioneAccountAdmin() {

    let authToken = localStorage.getItem('authToken');

    const [ModificaCellulareShow, setModificaCellulareShow] = useState(false);
    const [ModificaEmailShow, setModificaEmailShow] = useState(false);
    const [ModificaPasswordShow, setModificaPasswordShow] = useState(false);

    if (!authToken) {
        window.location.replace("/login");
    } else {
        let tipoUtente = localStorage.getItem('tipoUtente');

        if (tipoUtente !== "Admin") {
            window.location.replace("/");
        } else {

            let nome = JSON.parse(localStorage.getItem("datiPersonali")).nome;
            let cognome = JSON.parse(localStorage.getItem("datiPersonali")).cognome;
            let nomeCognome = nome + " " + cognome;

            let telefono = JSON.parse(localStorage.getItem("datiPersonali")).telefono;
            let email = JSON.parse(localStorage.getItem("datiPersonali")).email;

            return (
                <React.Fragment>
                    <Container fluid className="p-5 h-100 py-5">
                        <center><Card className="border-5 shadow h-100">
                            <Card.Header className="border-3 shadow"><h1 className="card-title"><center>{nomeCognome}<br /> <h2 className="card-title">Credenziali</h2></center></h1></Card.Header>
                            <Card.Body>
                                <div className=" py-3">
                                    <p className=" h5 t-bold card-text py-1">Telefono:</p>
                                    <p className=" h5 t-light card-text">{telefono}</p>
                                    <p className=" h5 t-bold card-text py-1">Email:</p>
                                    <p className=" h5 t-light card-text">{email}</p>
                                    <p className=" h5 t-bold card-text py-1">Password:</p>
                                    <p className=" h5 t-light card-text">********</p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button className="my-3" variant="outline-primary py-1" onClick={() => setModificaCellulareShow(true)}>
                                        Modifica cellulare
                                    </Button>
                                    <Button className="my-3" variant="outline-primary py-1" onClick={() => setModificaEmailShow(true)}>
                                        Modifica email
                                    </Button>

                                </div>
                                <div className="d-flex justify-content-center">

                                    <Button className="my-3" variant="outline-primary py-2" onClick={() => setModificaPasswordShow(true)}>
                                        Modifica password
                                    </Button>
                                </div>
                                <ModificaCellulare
                                    show={ModificaCellulareShow}
                                    onHide={() => setModificaCellulareShow(false)}
                                />
                                <ModificaEmail
                                    show={ModificaEmailShow}
                                    onHide={() => setModificaEmailShow(false)}
                                />
                                <ModificaPassword
                                    show={ModificaPasswordShow}
                                    onHide={() => setModificaPasswordShow(false)}
                                />
                            </Card.Body>
                        </Card></center>
                    </Container>
                </React.Fragment>
            );
        }
    }
    
}