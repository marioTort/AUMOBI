import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// Bootstrap Components
import { Image, Row, Col } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from './Button';
import Sidebar from './Sidebar';

// Navbar
export default function Navbar() {
    
    const history = useHistory();

    let tipoUtente = localStorage.getItem("tipoUtente");
    let authToken = localStorage.getItem("authToken");

    function openSidebar() {
        let sidebar = document.querySelector("#sidebar");
        sidebar.style.width = "200px";
    }


    function logout(event) {
        event.preventDefault();
        localStorage.clear();
        history.push("/login");
    }

    if (authToken) {
        if (tipoUtente === "Admin") {
            return ( // NAVBAR AMMINISTRATORE
                <nav className="container-fluid navbar py-3 shadow">
                    <Row className="w-100 mx-auto align-items-center">
                        <Col>
                            <Link to="/schermataadmin">
                                <Image className="logo-site" fluid src="/logo.png" alt="Logo" />
                            </Link>
                        </Col>
                        
                        <Col className="justify-content-end d-flex">
                            <FontAwesomeIcon onClick={openSidebar} className="iconButton d-lg-none" icon={faBars} size="lg" color="white" />
                            <div className="buttonsGroup d-none d-lg-flex">
                                <Button className="button-menu" to={"/gestioneveicoli"} variant="outline-light">Gestione Veicoli</Button>                       
                                <Button className="button-menu" to={"/gestioneimpiegati"} variant="outline-light">Gestione Impiegati</Button>
                                <Button className="button-menu" to={"/visualizzaprenotazioniadmin"} variant="outline-light">Visualizza Prenotazioni</Button>
                                <Button className="button-menu" to={"/registrazioneimpiegato"} variant="outline-light">Registra Impiegato</Button>
                                <Button className="button-menu" to={"/gestioneaccountadmin"} variant="outline-light">Mio Account</Button>
                                <Button className="button-menu" variant="outline-warning" onClick={logout} >Logout</Button>
                            </div>
                        </Col>
                    </Row>
                    <Sidebar>
                        <Button className="button-menu" to={"/gestioneveicoli"} variant="outline-light">Gestione Veicoli</Button>                       
                        <Button className="button-menu" to={"/gestioneimpiegati"} variant="outline-light">Gestione Impiegati</Button>
                        <Button className="button-menu" to={"/visualizzaprenotazioniadmin"} variant="outline-light">Visualizza Prenotazioni</Button>
                        <Button className="button-menu" to={"/registrazioneimpiegato"} variant="outline-light">Registra Impiegato</Button>
                        <Button className="button-menu" to={"/gestioneaccountadmin"} variant="outline-light">Mio Account</Button>
                        <Button className="button-menu" variant="outline-warning" onClick={logout} >Logout</Button>
                    </Sidebar>
                </nav>
            );
        } else if (tipoUtente === "Autista") {
            return ( // NAVBAR AUTISTA
                <nav className="container-fluid navbar py-3 shadow">
                    <Row className="w-100 mx-auto align-items-center">
                        <Col>
                            <Link to="/schermataautista">
                                <Image className="logo-site" fluid src="/logo.png" alt="Logo" />
                            </Link>
                        </Col>
            
                        <Col className="justify-content-end d-flex">
                                <FontAwesomeIcon onClick={openSidebar} className="iconButton d-lg-none" icon={faBars} size="lg" color="white" />
                                
                                <div className="buttonsGroup d-none d-lg-flex">
                                    <Button className="button-menu" to={"/gestioneaccountimpiegato"} variant="outline-light">Gestione Account</Button>
                                    <Button className="button-menu" to={"/confermaprenotazione"} variant="outline-light">Conferma Prenotazione</Button>
                                    <Button className="button-menu" to={"/visualizzaprenotazioniautista"} variant="outline-light">Visualizza Prenotazioni</Button>
                                    <Button className="button-menu" variant="outline-warning" onClick={logout}>Logout</Button>                        
                                </div>
                            </Col>
                        </Row>
                        <Sidebar>
                            <Button className="button-menu" to={"/gestioneaccountimpiegato"} variant="outline-light">Gestione Account</Button>
                            <Button className="button-menu" to={"/confermaprenotazione"} variant="outline-light">Conferma Prenotazione</Button>
                            <Button className="button-menu" to={"/visualizzaprenotazioniautista"} variant="outline-light">Visualizza Prenotazioni</Button>
                            <Button className="button-menu" variant="outline-warning" onClick={logout}>Logout</Button> 
                        </Sidebar>
                    
                </nav>
            );
        } else if (tipoUtente === "Parcheggiatore") {
            return ( // NAVBAR PARCHEGGIATORE
                <nav className="container-fluid navbar py-3 shadow">
                    <Row className="w-100 mx-auto align-items-center">
                        <Col>
                            <Link to="/schermataparcheggiatore">
                                <Image className="logo-site" fluid src="/logo.png" alt="Logo" />
                            </Link>
                        </Col>
                        
                        <Col className="justify-content-end d-flex">
                            <FontAwesomeIcon onClick={openSidebar} className="iconButton d-lg-none" icon={faBars} size="lg" color="white" />
                            
                            <div className="buttonsGroup d-none d-lg-flex">
                                <Button className="button-menu" to={"/gestioneaccountimpiegato"} variant="outline-light">Gestione Account</Button>
                                <Button className="button-menu" to={"/confermaprenotazione"} variant="outline-light">Conferma Prenotazione</Button>
                                <Button className="button-menu" variant="outline-warning" onClick={logout}>Logout</Button>                        
                            </div>
                        </Col>
                    </Row>
                    <Sidebar>
                        <Button className="button-menu" to={"/gestioneaccountimpiegato"} variant="outline-light">Gestione Account</Button>
                        <Button className="button-menu" to={"/confermaprenotazione"} variant="outline-light">Conferma Prenotazione</Button>
                        <Button className="button-menu" variant="outline-warning" onClick={logout}>Logout</Button> 
                    </Sidebar>
        
                </nav>
            );
        } else {
            return ( // NAVBAR CLIENTE
                <nav className="container-fluid navbar py-3 shadow">
                    <Row className="w-100 mx-auto align-items-center">
                        <Col>
                            <Link to="/schermatacliente">
                                <Image className="logo-site" fluid src="/logo.png" alt="Logo" />
                            </Link>
                        </Col>
                        <Col className="d-none d-lg-flex justify-content-center">
                        <Link to="/aboutus">
                            <u className="h3 text-underline text-light menu-page-item">About us</u>
                        </Link>
                        </Col>
                        <Col className="justify-content-end d-flex">
                            <FontAwesomeIcon onClick={openSidebar} className="iconButton d-lg-none" icon={faBars} size="lg" color="white" />
                            
                            <div className="buttonsGroup d-none d-lg-flex">
                                <Button className="button-menu" to={"/schermataprenotazione"} variant="outline-light">Prenota</Button>
                                <Button className="button-menu" to={"/gestioneaccount"} variant="outline-light">Account</Button>
                                <Button className="button-menu" to={"/archivioprenotazioni"} variant="outline-light">Prenotazioni</Button>
                                <Button className="button-menu" variant="outline-warning" onClick={logout}>Logout</Button>
                            </div>
                        </Col>
                    </Row>
                    <Sidebar>
                        <Button className="button-menu" to={"/schermataprenotazione"} variant="outline-light">Prenota</Button>
                        <Button className="button-menu" to={"/gestioneaccount"} variant="outline-light">Account</Button>
                        <Button className="button-menu" to={"/archivioprenotazioni"} variant="outline-light">Prenotazioni</Button>
                        <Button className="button-menu" variant="outline-warning" onClick={logout}>Logout</Button>
                        <Button className="button-menu" to={"/aboutus"} variant="outline-light">About us</Button>
                    </Sidebar>
                </nav>
            );
        }
    } else {
        return ( // NAVBAR SENZA LOGIN
            <nav className="container-fluid navbar py-3 shadow">
                <Row className="w-100 mx-auto align-items-center">
                    <Col>
                        <Link to="/">
                            <Image className="logo-site" fluid src="/logo.png" alt="Logo" />
                        </Link>
                    </Col>
                    <Col className="d-none d-lg-flex justify-content-center">
                    <Link to="/aboutus">
                        <u className="h3 text-underline text-light menu-page-item">About us</u>
                    </Link>
                    </Col>
                    <Col className="justify-content-end d-flex">
                        <FontAwesomeIcon onClick={openSidebar} className="iconButton d-lg-none" icon={faBars} size="lg" color="white" />
                        
                        <div className="buttonsGroup d-none d-lg-flex">
                            <Button className="button-menu" to={"/registrazionecliente"} variant="outline-light">Registrati</Button>
                            <Button className="button-menu" to={"/login"} variant="outline-warning">Accedi</Button>
                        </div>
                    </Col>
                </Row>
                <Sidebar>
                    <Button className="button-menu" to={"/"} variant="outline-light">Home</Button>
                    <Button className="button-menu" to={"/registrazionecliente"} variant="outline-light">Registrati</Button>
                    <Button className="button-menu" to={"/login"} variant="outline-warning">Accedi</Button>
                    <Button className="button-menu" to={"/aboutus"} variant="outline-light">About us</Button>
                </Sidebar>
            </nav>
        );
    }
}    