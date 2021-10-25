import React, { useState, useEffect } from 'react'

// Bootstrap Components
import { Form } from 'react-bootstrap';

export default function CampoEmail(props) {
    const [validaFormato, setValidaFormato] = useState(false);

    // Check email format
    useEffect(() => {
        if (validaFormato) {
            let regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            let emailInsert = document.getElementById(props.controlId);
            let error = document.querySelector("#formatoEmailNonValido");
            let match = regex.test(emailInsert.value);
            if (!match) {
                emailInsert.classList.add("border-danger", "text-danger");
                error.classList.remove("d-none");
            } else {
                emailInsert.classList.remove("border-danger", "text-danger");
                emailInsert.classList.add("border-success", "text-success");
                error.classList.add("d-none");
            }
        }
        setValidaFormato(false);
    }, [validaFormato, props.controlId])

    const [email, setEmail] = useState("");
    localStorage.setItem("email", email);

    return (
        <Form.Group controlId={props.controlId}>
            <Form.Label>{props.children}</Form.Label>
            <Form.Control type="email" placeholder={props.placeholder} onBlur={() => setValidaFormato(true)} onChange={(event) => { setEmail(event.target.value) }} required={props.required ? true : false} />
            <Form.Text id="formatoEmailNonValido" className="text-danger d-none">Formato email non valido!</Form.Text>
        </Form.Group>
    );
}