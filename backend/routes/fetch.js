const express = require('express');
const router = express.Router();

const { 
    storicoPrenotazioni,
    prenotazioniUtente,
    patenteUtente,
    elencoPatenti,
    listaStalli,
    listaVeicoliAutistaDisponibili,
    listaVeicoliDisponibiliStallo,
    listaImpiegati
} = require("../controllers/fetch");

// RICHIESTE

//PRENOTAZIONE
router.route("/storicoprenotazioni").post(storicoPrenotazioni);

router.route("/prenotazioniutente").post(prenotazioniUtente);

router.route("/veicoliautistadisponibili").post(listaVeicoliAutistaDisponibili);

router.route("/veicolidisponibilistallo").post(listaVeicoliDisponibiliStallo);

//PATENTE
router.route("/fetchPatente").post(patenteUtente);

router.route("/elencopatenti").post(elencoPatenti);

router.route("/listastalli").post(listaStalli);

router.route("/listaimpiegati").post(listaImpiegati);

//ESPORTAZIONI
module.exports = router;