import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
// Bootstrap Components
import { ProgressBar, Form, Container, Row, Col, Modal } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';
import CampoEmail from '../../../utils/CampoEmail';
import CampoPassword from '../../../utils/CampoPassword';



export default function CredenzialiForm() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history = useHistory();

    const [validaDati, setValidaDati] = useState({
        cellulare: false
    });

    const [telefono, setTelefono] = useState("");

    useEffect(() => {
        let inputCellulare = document.querySelector("#cellulare");
        // Controllo campo Cellulare
        if (validaDati.cellulare) {
            inputCellulare.classList.remove("border-danger", "border-success");
            inputCellulare.value === "" ? inputCellulare.classList.add("border-danger") : inputCellulare.classList.add("border-success");
            setValidaDati({ ...validaDati, cellulare: false });
        }
    }, [validaDati])

    async function registraCliente(event) {
        event.preventDefault();

        let emailCliente = localStorage.getItem("email");

        if (document.querySelector("#password").value !== document.querySelector("#confermaPassword").value) {
            document.querySelector("#erroreMatchPassword").classList.remove("d-none");
            return
        } else {
            var data = JSON.stringify({
                nome: localStorage.getItem('nome'),
                cognome: localStorage.getItem('cognome'),
                sesso: localStorage.getItem('sesso'),
                luogoDiNascita: localStorage.getItem('luogoDiNascita'),
                dataDiNascita: localStorage.getItem('dataDiNascita'),
                CF: localStorage.getItem('CF'),
                email: localStorage.getItem('email'),
                telefono: telefono,
                password: localStorage.getItem('password')
            });

            var config = {
                method: 'post',
                url: '/api/registrazione/registrazionecliente',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            
            await axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    localStorage.clear();
                    localStorage.setItem("authToken", response.data.token);
                    localStorage.setItem("email", emailCliente);
                    history.push("/datipatente")
                })
                .catch(function (error) {
                    console.log(error);
                });


        }

    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row className="gy-5">
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar variant="success" now={40} className="mb-4" animated label={`40%`} />
                    <Form onSubmit={registraCliente}>
                        <Row className="gy-4" >

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <CampoEmail controlId={"email"} placeholder={"Inserisci la tua email"} required>
                                    Email
                                </CampoEmail>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="cellulare">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control type="tel" placeholder="Inserisci il numero di telefono" pattern="^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$" onBlur={() => setValidaDati({ ...validaDati, cellulare: true })} onChange={(event) => { setTelefono(event.target.value) }} required />
                                </Form.Group>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <CampoPassword tooltip controlId={"password"} placeholder={"Inserisci la password"}>
                                    Password
                                </CampoPassword>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <CampoPassword controlId={"confermaPassword"} placeholder={"Conferma la tua password"}>
                                    Conferma password
                                </CampoPassword>
                                <Form.Text id="erroreMatchPassword" className="d-none text-danger">Le password non coincidono!</Form.Text>
                            </Col>

                            <div className="d-flex justify-content-end">
                                <Button to="/registrazionecliente" variant="outline-secondary">Indietro</Button>
                                <Button variant="outline-success" submit onClick={handleShow}>Prosegui</Button>

                                <Modal
                                    size="m"
                                    aria-labelledby="richiestaPatenteModal"
                                    centered
                                    animation={false}
                                    show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className="t-bold" id="richiestaPatenteModal">
                                            Inserimento Patente
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                            <Row className="gy-4" >
                                                <Col >
                                                    <h3 className="t-bold text-center h5">Vuoi inserire adesso la tua patente? Clicca su "Registra Patente". Ricorda che la potrai inserire anche in un secondo momento</h3>
                                                </Col>
                                                <div className="buttonsGroup mx-auto">
                                                    <Button variant="outline-secondary" onClick={handleClose} >Lo farò dopo</Button>
                                                    <Button variant="outline-warning" to="/datipatente">Registra Patente</Button>
                                                </div>
                                            </Row>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </Row>
                        <br></br>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
    
}