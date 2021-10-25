import React, { useState, useEffect } from 'react'

// Bootstrap Components
import { Form } from 'react-bootstrap';

// Insert Email
export default function CampoEmail(props) {
    const [validateFormat, setValidateFormat] = useState(false);

    // Check email format
    useEffect(() => {
        if (validateFormat) {
            let regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            let emailInsert = document.getElementById(props.controlId);
            let error = document.querySelector("#emailFormatError");
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
        setValidateFormat(false);
    }, [validateFormat, props.controlId])

    return (
        <Form.Group controlId={props.controlId}>
            <Form.Label>{props.children}</Form.Label>
            <Form.Control type="email" placeholder={props.placeholder} onBlur={() => setValidateFormat(true)} required={props.required ? true : false} />
            <Form.Text id="emailFormatError" className="text-danger d-none">Formato email non valido!</Form.Text>
        </Form.Group>
    );
}