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
    listaImpiegati,
    listaVeicoli,
    listaStalliAdmin,
    listaAuto,
    listaImp
} = require("../controllers/fetch");

// RICHIESTE

//PRENOTAZIONE
router.route("/storicoprenotazioni").post(storicoPrenotazioni);

router.route("/prenotazioniutente").post(prenotazioniUtente);

router.route("/veicoliautistadisponibili").post(listaVeicoliAutistaDisponibili);

router.route("/veicolidisponibilistallo").post(listaVeicoliDisponibiliStallo);

router.route("/listaveicoli").post(listaVeicoli);

router.route("/listaauto").post(listaAuto);

router.route("/listaimp").post(listaImp);


//PATENTE
router.route("/fetchPatente").post(patenteUtente);

router.route("/elencopatenti").post(elencoPatenti);

router.route("/listastalli").post(listaStalli);

router.route("/listastalliadmin").post(listaStalliAdmin);

router.route("/listaimpiegati").post(listaImpiegati);

//ESPORTAZIONI
module.exports = router;