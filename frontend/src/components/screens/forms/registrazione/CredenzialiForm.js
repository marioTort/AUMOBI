import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

// Bootstrap Components
import { ProgressBar, Form, Container, Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../../utils/Button';
import InsertEmail from '../../../utils/InsertEmail';
import InsertPassword from '../../../utils/InsertPassword';
//import AlertMessage from '../../Utility/AlertMessage';



export default function CredenzialiForm() {
    const history = useHistory();
    const [checkValidate, setCheckValidate] = useState({
        cellulare: false
    })
    const [state, setState] = useState({
        error: {
            show: false,
        },
        submit: false
    });

    useEffect(() => {
        let inputCellulare = document.querySelector("#cellulare");
        
        // Controllo campo Cellulare
        if (checkValidate.cellulare) {
            inputCellulare.classList.remove("border-danger", "border-success");
            inputCellulare.value === "" ? inputCellulare.classList.add("border-danger") : inputCellulare.classList.add("border-success");
            setCheckValidate({ ...checkValidate, cellulare: false });
        }
    }, [checkValidate])

    function onSubmit(e) {
        e.preventDefault();
        if (document.querySelector("#password").value !== document.querySelector("#confermaPassword").value) {
            document.querySelector("#confermaPasswordError").classList.remove("d-none");
            return
        } else {
            
            const userData = {
                ...history.location.state.payload,
                credenziali: {
                    cellulare: document.querySelector("#cellulare").value,
                    email: document.querySelector("#email").value,
                    password: document.querySelector("#password").value,
                }
            }
            setState({ ...state, submit: true });
            try {
                axios.post("api/registrazione/registrazionecliente", userData)
                    .then((res) => {
                        history.push("/datipatente", {payload: userData.credenziali.email});
                    })
                    .catch(err => {
                        setState({
                            error: {
                                show: true,
                                message: err.response.data
                            },
                            submit: false
                        })
                    })
            } catch (err) {
                console.log(err.response.data.msg);
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
                                <InsertEmail controlId={"email"} placeholder={"Inserisci la tua email"} required>
                                    Email
                                </InsertEmail>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <Form.Group controlId="cellulare">
                                    <Form.Label>Cellulare</Form.Label>
                                    <Form.Control type="tel" placeholder="Inserisci il numero di cellulare" pattern="^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$" onBlur={() => setCheckValidate({ ...checkValidate, cellulare: true })} required />
                                </Form.Group>
                            </Col>
                            
                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <InsertPassword tooltip controlId={"password"} placeholder={"Inserisci la password"}>
                                    Password
                                </InsertPassword>
                            </Col>

                            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                <InsertPassword controlId={"confermaPassword"} placeholder={"Conferma la tua password"}>
                                    Conferma password
                                </InsertPassword>
                                <Form.Text id="confermaPasswordError" className="d-none text-danger">Le password non coincidono!</Form.Text>
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