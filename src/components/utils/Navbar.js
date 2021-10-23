import React from 'react';
import { Link, useHistory } from 'react-router-dom';
//import useAuthentication from '../../Hooks/useAuthentication';
//import useSession from '../../Hooks/useSession';

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
    /*const { auth, setAuth } = useAuthentication();
    const { session, setSession } = useSession()
    const history = useHistory();*/

    function openSidebar() {
        let sidebar = document.querySelector("#sidebar");
        sidebar.style.width = "200px";
    }

    /*function logout() {
        try {
            axios.get("/")
                .then(res => {
                    window.localStorage.clear();
                    setAuth(false)
                    history.push("/")
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }*/

    /*if (auth) {   
        return (
            <React.Fragment>
                <nav className="container-fluid navbar py-3 shadow">
                    <Row className="w-100 mx-auto align-items-center">
                        <Col>
                            <Link to="/">
                                <Image fluid src="/logo.png" alt="Logo PickMeUp!" />
                                <p className="h4">Il futuro del noleggio online!</p>
                            </Link>
                        </Col>
                        
                        <Col className="d-none d-lg-flex justify-content-center">
                            <div className="buttonsGroup">
                                <Button className="btn-lg" to={"/prenota"} variant={"Warning"}>Prenota ora!</Button>
                            </div>
                        </Col>
                        <Col className="justify-content-end d-flex">
                            
                            <Button onClick={openSidebar} variant={"Primary"}>
                                <FontAwesomeIcon icon={faBars} fixedWidth />
                            </Button>
                        </Col>
                    </Row>
                    <Sidebar>
                        <Button to={"/home"} variant={"Light"}>Home</Button>
                        {
                            session.user === "CLIENTE" &&
                            <>
                                <Button to={"/prenota"} variant={"Light"}>Prenota</Button>
                                <Button to={"/gestione-prenotazioni"} variant={"Light"}>Le mie prenotazioni</Button>
                            </>
                        }
                        {session.user === "AMMINISTRATORE" &&
                            <>
                                <Button to={"/gestione-prenotazioni"} variant={"Light"}>Gestione prenotazioni</Button>
                                <Button to={"/gestione-mezzi"} variant={"Light"}>Ricerca mezzi</Button>
                                <Button to={"/registrazione-impiegato"} variant={"Light"}>Registra impiegato</Button>
                                <Button to={"/gestione-utenti"} variant={"Light"}>Modifica utente</Button>
                                <Button to={"/gestione-impiegati"} variant={"Light"}>Cambia ruoli</Button>
                            </>
                        }
                        {session.user === "GESTORE_MEZZI" &&
                            <>
                                <Button to={"/gestione-mezzi"} variant={"Light"}>Ricerca mezzi</Button>
                            </>
                        }
                        {session.user === "AUTISTA" &&
                            <>
                                <Button to={"/gestione-prenotazioni"} variant={"Light"}>Le mie corse</Button>
                                <Button to={"/gestione-account/patente"} variant={"Light"}>Visualizza patente</Button>
                            </>
                        }
                        <Button to={"/gestione-account/profilo"} variant={"Light"}>Visualizza profilo</Button>
                        {session.user === "CLIENTE" &&
                            <>
                                <Button to={"/gestione-account/wallet"} variant={"Light"}>Visualizza Wallet</Button>
                                <Button to={"/gestione-account/patente"} variant={"Light"}>Visualizza patente</Button>
                            </>
                        }
                        <Button onClick={logout} variant={"Danger"}>Logout</Button>
                    </Sidebar>
                </nav>
            </React.Fragment>
        );
    } else { 
        return (
            <nav className="container-fluid navbar py-3 shadow">
                <Row className="w-100 mx-auto align-items-center">
                    <Col>
                        <Link to="/">
                            <Image fluid src="/logo.png" alt="Logo" />
                        </Link>
                    </Col>
                    <Col className="d-none d-lg-flex justify-content-center">
                    <Link to="/">
                        <u className="h3 text-underline text-light">About us</u>
                    </Link>
                    </Col>
                    <Col className="justify-content-end d-flex">
                        <FontAwesomeIcon onClick={openSidebar} className="iconButton d-lg-none" icon={faBars} size="lg" color="white" />
                        
                        <div className="buttonsGroup d-none d-lg-flex">
                            <Button to={"/"} variant="outline-light">Registrati</Button>
                            <Button to={"/"} variant="outline-light">Accedi</Button>
                        </div>
                    </Col>
                </Row>
                <Sidebar>
                    <Button to={"/"} variant="outline-light">Home</Button>
                    <Button to={"/"} variant="outline-light">Registrati</Button>
                    <Button to={"/"} variant="outline-light">Accedi</Button>
                    <Button to={"/"} variant="outline-light">About us</Button>
                </Sidebar>
            </nav>
        );
    }    */

    return (
        <nav className="container-fluid navbar py-3 shadow">
            <Row className="w-100 mx-auto align-items-center">
                <Col>
                    <Link to="/">
                        <Image className="logo-site" fluid src="/logo.png" alt="Logo" />
                    </Link>
                </Col>
                <Col className="d-none d-lg-flex justify-content-center">
                <Link to="/">
                    <u className="h3 text-underline text-light menu-page-item">About us</u>
                </Link>
                </Col>
                <Col className="justify-content-end d-flex">
                    <FontAwesomeIcon onClick={openSidebar} className="iconButton d-lg-none" icon={faBars} size="lg" color="white" />
                    
                    <div className="buttonsGroup d-none d-lg-flex">
                        <Button className="button-menu" to={"/"} variant="outline-light">Prenota</Button>
                        <Button className="button-menu" to={"/"} variant="outline-light">Account</Button>
                        <Button className="button-menu" to={"/"} variant="outline-light">Prenotazioni</Button>
                        <Button className="button-menu" to={"/"} variant="outline-light">Logout</Button>
                    </div>
                </Col>
            </Row>
            <Sidebar>
                <Button to={"/"} variant="outline-light">Prenota</Button>
                <Button to={"/"} variant="outline-light">Account</Button>
                <Button to={"/"} variant="outline-light">Prenotazioni</Button>
                <Button to={"/"} variant="outline-light">Logout</Button>
            </Sidebar>
        </nav>
    );
}