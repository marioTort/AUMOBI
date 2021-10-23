import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Custom CSS
import "./Theme.scss";
import './App.css';

//Routing
/*
import PrivateRoute from './components/routing/PrivateRoute';
<PrivateRoute exact path = "/" component = {PrivateScreen}/> DA INSERIRE DENTRO LO SWITCH. COSì PER COM'E' IMPOSTATO IMPEDISCE ALL'UTENTE NON AUTENTICATO DI VEDERE LA HOME. DA MODIFICARE IN SEGUITO

//Screens
import PrivateScreen from './components/screens/PrivateScreen';
*/

//Home
import Home from './components/screens/Home';

//Registrazione
import RegistrazioneCliente from './components/screens/RegistrazioneCliente';
import DatiBancariForm from './components/screens/forms/registrazione/DatiBancariForm';
import DatiPatenteForm from './components/screens/forms/registrazione/DatiPatenteForm';
import CredenzialiForm from './components/screens/forms/registrazione/CredenzialiForm';
import RegistrazioneCompletata from './components/screens/forms/registrazione/RegistrazioneCompletata';
import RegistrazioneImpiegato from './components/screens/RegistrazioneImpiegato';
import RegistrazioneImpiegatoCompletata from './components/screens/forms/registrazioneImpiegato/RegistrazioneImpiegatoCompletata';

//Autenticazione
import Autenticazione from './components/screens/Autenticazione';
import RecuperaPassword from './components/screens/RecuperaPassword';
import ResetPassword from './components/screens/ResetPassword';
import RecuperaPasswordCompletato from './components/screens/forms/recuperaPassword/RecuperaPasswordCompletato';
import ResetPasswordCompletato from './components/screens/forms/recuperaPassword/ResetPasswordCompletato';

//Navbar
import Navbar from './components/utils/Navbar';
import AboutUs from './components/screens/AboutUs';

//Cliente
import SchermataCliente from './components/screens/SchermataCliente';
import GestioneAccount from './components/screens/GestioneAccount';
import ArchivioPrenotazioni from './components/screens/ArchivioPrenotazioni';

//Prenotazione
import SchermataPrenotazione from './components/screens/SchermataPrenotazione';
import SchermataPrenotazioneBici from './components/screens/forms/prenotazione/SchermataPrenotazioneBici';
import SchermataPrenotazioneAuto from './components/screens/forms/prenotazione/SchermataPrenotazioneAuto';
import SchermataPrenotazioneAutista from './components/screens/forms/prenotazione/SchermataPrenotazioneAutista';
import SchermataPrenotazioneMoto from './components/screens/forms/prenotazione/SchermataPrenotazioneMoto';
import SchermataSelezioneVeicolo from './components/screens/forms/prenotazione/selezioneVeicolo/SchermataSelezioneVeicolo';

//Amministratore
import SchermataAdmin from './components/screens/SchermataAdmin';
import GestioneAccountAdmin from './components/screens/GestioneAccountAdmin';
import VisualizzaPrenotazioniAdmin from './components/screens/VisualizzaPrenotazioniAdmin';
import GestioneImpiegati from './components/screens/GestioneImpiegati';
import GestioneVeicoli from './components/screens/GestioneVeicoli';

//Impiegato
import SchermataParcheggiatore from './components/screens/SchermataParcheggiatore';
import GestioneAccountImpiegato from './components/screens/GestioneAccountImpiegato';
import ConfermaPrenotazione from './components/screens/ConfermaPrenotazione';
import SchermataAutista from './components/screens/SchermataAutista';
import VisualizzaPrenotazioniAutista from './components/screens/VisualizzaPrenotazioniAutista';

const App = () => {
  return (
    <Router>
      
      <Navbar/>

        <Switch>
        
          <Route exact path="/" component = {Home} />

          <Route exact path ="/aboutus" component = { AboutUs } />

          <Route exact path="/registrazionecliente" component = { RegistrazioneCliente } />
          <Route exact path="/datibancari" component = { DatiBancariForm } />
          <Route exact path="/datipatente" component = { DatiPatenteForm } />
          <Route exact path="/credenziali" component = { CredenzialiForm } />
          <Route exact path="/registrazionecompletata" component = { RegistrazioneCompletata } />
          <Route exact path="/registrazioneimpiegato" component = { RegistrazioneImpiegato } />
          <Route exact path="/registrazioneimpiegatocompletata" component = { RegistrazioneImpiegatoCompletata } />

          <Route exact path ="/login" component = { Autenticazione } />
          <Route exact path="/recuperapassword" component = { RecuperaPassword } />
          <Route exact path="/recuperapasswordcompletato" component = {RecuperaPasswordCompletato} />
          <Route exact path="/resetpassword" component = {ResetPassword} />
          <Route exact path="/resetpasswordcompletato" component = {ResetPasswordCompletato} />

          <Route exact path="/schermatacliente" component = {SchermataCliente} />

          <Route exact path="/gestioneaccount" component = {GestioneAccount} />

          <Route exact path="/archivioprenotazioni" component = {ArchivioPrenotazioni} />

          <Route exact path="/schermataprenotazione" component = {SchermataPrenotazione} />
          <Route exact path="/schermataprenotazionebici" component = {SchermataPrenotazioneBici} />
          <Route exact path="/schermataprenotazioneauto" component = {SchermataPrenotazioneAuto} />
          <Route exact path="/schermataprenotazionemoto" component = {SchermataPrenotazioneMoto} />
          <Route exact path="/schermataprenotazioneautista" component = {SchermataPrenotazioneAutista} />
          <Route exact path="/schermataselezioneveicolo" component = {SchermataSelezioneVeicolo} />

          <Route exact path="/schermataadmin" component = {SchermataAdmin} />
          <Route exact path="/gestioneaccountadmin" component = {GestioneAccountAdmin} />
          <Route exact path="/visualizzaprenotazioniadmin" component = {VisualizzaPrenotazioniAdmin} />
          <Route exact path="/gestioneimpiegati" component = {GestioneImpiegati} />
          <Route exact path="/gestioneveicoli" component = {GestioneVeicoli} />

          <Route exact path="/schermataparcheggiatore" component = {SchermataParcheggiatore} />
          <Route exact path="/gestioneaccountimpiegato" component = {GestioneAccountImpiegato} />
          <Route exact path="/confermaprenotazione" component = {ConfermaPrenotazione} />
          <Route exact path="/schermataautista" component = {SchermataAutista} />
          <Route exact path="/visualizzaprenotazioniautista" component = {VisualizzaPrenotazioniAutista} />
          
        </Switch>
    
    </Router> 
  );
}

export default App;
