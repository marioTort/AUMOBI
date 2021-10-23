import React from 'react'
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';


// Button
export default function Button(props) {
    const mainButtonClass = "btn";
    const buttonStyle = mainButtonClass + "-" + props.variant.toLowerCase();
    const buttonClasses = mainButtonClass + " " + buttonStyle;

    if (props.to) {
        return (
            <div className="button">
                <Link to={props.to}>
                    <button type={props.submit ? "submit" : "button"} className={buttonClasses + " " + props.className} onClick={props.onClick}>
                        {props.children}
                    </button>
                </Link>
            </div>
        );
    } else {
        return (
            <div className="button">
                <button disabled={props.disabled} type={props.submit ? "submit" : "button"} className={buttonClasses + " " + props.className} onClick={props.onClick}>
                    <Spinner
                        as="span"
                        animation={props.spinner ? "border" : ""}
                        size="sm"
                        aria-hidden="true"
                        role="status"
                        className={props.spinner ? "me-2" : ""} />{props.children}
                </button>
            </div>
        );
    }
}