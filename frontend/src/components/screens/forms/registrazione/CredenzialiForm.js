import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

// Bootstrap Components
import { ProgressBar, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from '../../../utils/Button';
import CampoEmail from '../../../utils/CampoEmail';
import CampoPassword from '../../../utils/CampoPassword';

export default function CredenzialiForm() {

    const history = useHistory();

    const [checkValidate, setCheckValidate] = useState({
        cellulare: false
    });

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");

    const [state, setState] = useState({
        error: {
            show: false,
        },
        submit: false
    });

    useEffect(() => {
        let campoCellulare = document.querySelector("#cellulare");
        
        // Controllo campo Cellulare
        if (checkValidate.cellulare) {
            campoCellulare.classList.remove("border-danger", "border-success");
            campoCellulare.value === "" ? campoCellulare.classList.add("border-danger") : campoCellulare.classList.add("border-success");
            setCheckValidate({ ...checkValidate, cellulare: false });
        }
    }, [checkValidate])


    async function onSubmit(e) {
        e.preventDefault();


        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };


        if (document.querySelector("#password").value !== document.querySelector("#confermaPassword").value) {
            document.querySelector("#confermaPasswordError").classList.remove("d-none");
            return setError("password non corrispondenti");
        } else {


            try {
                const { data } = await axios.post(
                    "/api/registrazione/registrazionecliente",
                    {
                        ...history.location.state.payload,
                        email: document.querySelector("#email").value,
                        telefono: document.querySelector("#cellulare").value,
                        password: document.querySelector("#password").value
                    },
                    config
                  );
                  localStorage.setItem("authToken", data.token);

                    history.push("/datipatente", {payload: data});
                    setState({ ...state, submit: true });

            } catch (error) {
                setError(error.response.data.error);
                    setTimeout(() => {
                      setError("");
                    }, 5000);
            } 

        }
    }


    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100 mt-5">
            <Row className="gy-5">
                <Col className="form" xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                <br></br>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar variant="secondary" now={40} className="mb-4" />
                    <Form onSubmit={onSubmit} onClick={() => setState({ ...state, error: { show: false } })}>
                        <Row className="gy-4" >

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <CampoEmail controlId={"email"} placeholder={"Inserisci la tua email"} required>
                                    Email
                                </CampoEmail>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="cellulare">
                                    <Form.Label>Cellulare</Form.Label>
                                    <Form.Control type="tel" placeholder="Inserisci il numero di cellulare" pattern="^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$" onBlur={() => setCheckValidate({ ...checkValidate, cellulare: true })} required />
                                </Form.Group>
                            </Col>
                            
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <CampoPassword tooltip controlId={"password"} placeholder={"Inserisci la password"}>
                                    Password
                                </CampoPassword>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                            <Form.Group >
                                <Form.Label className="pe-2">Conferma password</Form.Label>
                                
                                <InputGroup >
                                    <Form.Control controlId={"confermaPassword"} type={showPassword ? "text" : "password"} placeholder={"Conferma la tua password"} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required />
                                    <InputGroup.Append>
                                        <InputGroup.Text className="h-100">
                                        <FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} icon={showPassword ? faEyeSlash : faEye} />
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                    <Form.Text id="passwordFormatError" className="text-danger d-none">Formato password non valido!</Form.Text>
                                </InputGroup>
                            </Form.Group>
                            </Col>

                            <div className="d-flex justify-content-end">
                                <Button to="/registrazionecliente" variant="outline-secondary">Indietro</Button>
                                <Button spinner={state.submit} variant="outline-secondary" submit>Prosegui</Button>
                            </div>
                        </Row>
                        <br></br>
                    </Form>
                </Col>
            </Row>
        </Container >
        
    );
}