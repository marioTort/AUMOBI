import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render = { (props) =>
                //Questa funzione riceve delle props e verifica se c'è qualcosa nel nostro local storage
                //Quindi in sostanza verifica se l'utente ha effettuato il login e lo porta nell'area privata
                localStorage.getItem("authToken") ? (
                    <Component {...props} />
                ) : (
                    //Se non trova niente nel local storage, reindirizza alla pagina di login.
                    <Redirect to="/login" />
                )
            }
        />
    )
}

export default PrivateRoute;
