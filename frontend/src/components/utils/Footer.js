import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Image } from 'react-bootstrap';
export default function Footer() {

    return (
        <Row className="w-100 mx-auto align-items-center">
            <footer className="footer-home shadow">
                    <Link to="/">
                        <Image className="logo-site" fluid src="/logo.png" alt="Logo" />
                    </Link>
            </footer>
        </Row>
    );
}