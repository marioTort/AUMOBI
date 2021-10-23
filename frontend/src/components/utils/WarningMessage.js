import React from 'react'

import { Alert } from 'react-bootstrap'

import Button from './Button';

export default function WarningMessage(props) {
    return (
        <Alert show={props.show} variant={props.variant} className={props.className}>
            <Alert.Heading className="t-bold">{props.header}</Alert.Heading>
            <p className="t-light">
                {props.body}
            </p>
            <hr />
            <div className="d-flex justify-content-end">
                <Button to={props.to} variant={`outline-${props.variant}`} onClick={props.onClick} >{props.button}</Button>
            </div>
        </Alert>
    );
}