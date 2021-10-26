const express = require('express');
const router = express.Router();

const { 
    storicoPrenotazioni,
    prenotazioniUtente,
    patenteUtente,
    elencoPatenti
} = require("../controllers/fetch");

// RICHIESTE

//PRENOTAZIONE
router.route("/storicoprenotazioni").get(storicoPrenotazioni);

router.route("/prenotazioniutente").get(prenotazioniUtente);

//PATENTE
router.route("/fetchPatente").get(patenteUtente);

router.route("/elencopatenti").get(elencoPatenti);

//ESPORTAZIONI
module.exports = router;