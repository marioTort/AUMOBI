import React, { useState } from 'react';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, Button, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
export default function ModificaPassword(props) {

    const [showPassword, setShowPassword] = useState(false);
    
    const [vecchiaPassword, setVecchiaPassword] = useState("");
    const [nuovaPassword, setNuovaPassword] = useState("");


    async function modificaPassword(event) {
        event.preventDefault();
        var data = JSON.stringify({
            email: JSON.parse(localStorage.getItem("datiPersonali")).email,
            vecchiaPassword: vecchiaPassword,
            nuovaPassword: nuovaPassword
        });

        var config = {
            method: 'put',
            url: '/api/autenticazione/modificapassword',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.clear();
                alert("Password modificata con successo!");
                window.location.replace("/login");

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modifica password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="form" xs={{ span: 10, offset: 1 }}>
                        <br></br>
                        <Form.Group >
                            <Form.Label className="pe-2">Vecchia Password</Form.Label>
                            {props.tooltip ? <OverlayTrigger
                                placement={"left"}
                                overlay={
                                    <Tooltip id="formatoPassword">
                                        <br />- Almeno 8 caratteri
                                        <br />- Almeno un carattere maiuscolo
                                        <br />- Almeno un numero
                                    </Tooltip>
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </OverlayTrigger> : null}
                            <InputGroup >
                                <Form.Control id="vecchiaPassword" type={showPassword ? "text" : "password"} placeholder="Vecchia password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" onChange={(event) => { setVecchiaPassword(event.target.value) }} required />
                                <InputGroup.Append>
                                    <InputGroup.Text className="h-100">
                                        <FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} icon={showPassword ? faEyeSlash : faEye} />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                                <Form.Text id="passwordFormatError" className="text-danger d-none">Formato password non valido!</Form.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label className="pe-2">Nuova Password</Form.Label>
                            {props.tooltip ? <OverlayTrigger
                                placement={"left"}
                                overlay={
                                    <Tooltip id="formatoPassword">
                                        <br />- Almeno 8 caratteri
                                        <br />- Almeno un carattere maiuscolo
                                        <br />- Almeno un numero
                                    </Tooltip>
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </OverlayTrigger> : null}
                            <InputGroup >
                                <Form.Control id="nuovaPassword" type={showPassword ? "text" : "password"} placeholder="Nuova password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" onChange={(event) => { setNuovaPassword(event.target.value) }} required />
                                <InputGroup.Append>
                                    <InputGroup.Text className="h-100">
                                        <FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} icon={showPassword ? faEyeSlash : faEye} />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                                <Form.Text id="passwordFormatError" className="text-danger d-none">Formato password non valido!</Form.Text>
                            </InputGroup>
                        </Form.Group>
                        <br></br><br></br>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={modificaPassword}>Modifica</Button>
            </Modal.Footer>
        </Modal>
    );
}