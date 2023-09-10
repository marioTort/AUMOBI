import { useState } from "react";

// Custom Hook: 
// utilizza dietro le quinte l'hook useState di React per ottenere i dati salvati in sessione (localStorage)
// e per modificarli. In particolare gestisce il dato salvato in locale "auth" che memorizza
// lo stato dell'utente come autenticato o no. 

export default function IsLogged() {
    const getLogin = () => {
        const login = localStorage.getItem("auth");
        const userLogin = JSON.parse(login);
        return userLogin;
    };

    const [login, setLogin] = useState(getLogin());

    const saveLogin = userLogin => {
        localStorage.setItem('auth', userLogin);
        setLogin(userLogin);
    };

    return {
        setLogin: saveLogin,
        login
    }
}