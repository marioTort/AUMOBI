import React, { useState } from 'react'

// Bootstrap Components
import { Form, InputGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


// Insert Password
export default function InsertPassword(props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Form.Group >
            <Form.Label className="pe-2">{props.children}</Form.Label>
            <InputGroup >
                <Form.Control id={props.controlId} type={showPassword ? "text" : "password"} placeholder={props.placeholder} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$" required />
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