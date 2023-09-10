import { useState } from "react";

export default function useSession(){
    const getSession = () => {
        const sessionString = localStorage.getItem("utente");
        const userSession = JSON.parse(sessionString);
        return userSession;
    };

    const [session, setSession] = useState(getSession());

    const saveSession = userSession => {
        localStorage.setItem('utente', JSON.stringify(userSession));
        setSession(userSession);
    };

    return {
        setSession: saveSession,
        session
    }
}