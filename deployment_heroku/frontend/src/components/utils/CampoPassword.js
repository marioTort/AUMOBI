import React, { useState } from 'react'

// Bootstrap Components
import { Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


// Insert Password
export default function CampoPassword(props) {
    const [showPassword, setShowPassword] = useState(false);

    const [password, setPassword] = useState("");
    localStorage.setItem("password", password);


    return (
        <Form.Group >
            <Form.Label className="pe-2">{props.children}</Form.Label>
            {props.tooltip ? <OverlayTrigger
                placement={"top"}
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
                <Form.Control id={props.controlId} type={showPassword ? "text" : "password"} placeholder={props.placeholder} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" onChange={(event) => { setPassword(event.target.value) }} required />
                <InputGroup.Append>
                    <InputGroup.Text className="h-100">
                        <FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} icon={showPassword ? faEyeSlash : faEye} />
                    </InputGroup.Text>
                </InputGroup.Append>
                <Form.Text id="passwordFormatError" className="text-danger d-none">Formato password non valido!</Form.Text>
            </InputGroup>
        </Form.Group>
    );
}