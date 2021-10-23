/*In questo file è contenuto tutto ciò che riguarda i casi d'uso
        - INSERISCI MEZZO
        - MODIFICA MEZZO 
        - ELIMINA MEZZO
*/

//  IMPORTAZIONI

const express = require('express');
const router = express.Router();

const { aggiungiMezzo,
        ritargaMezzo,
        spostaMezzo,
        riprezzaMezzo,
        riprezzaPerTipo,
        eliminaMezzo,
        assegnaAutista
} = require("../controllers/mezzo");

// RICHIESTE

router.route("/aggiungimezzo").post(aggiungiMezzo);

router.route("/ritargamezzo").put(ritargaMezzo);

router.route("/spostamezzo").put(spostaMezzo);

router.route("/riprezzamezzo").put(riprezzaMezzo);

router.route("/riprezzapertipo").put(riprezzaPerTipo);

router.route("/eliminamezzo").delete(eliminaMezzo);

router.route("/assegnaautista").put(assegnaAutista);

//ESPORTAZIONI
module.exports = router;