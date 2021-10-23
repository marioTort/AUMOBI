/*In questo file è contenuto tutto ciò che riguarda i casi d'uso
        - AGGIUNGI CARTA
        - ELIMINA CARTA
*/

//  IMPORTAZIONI

const express = require('express');
const router = express.Router();

const { aggiungiCarta,
        eliminaCarta
} = require("../controllers/wallet");

// RICHIESTE

router.route("/aggiungicarta").post(aggiungiCarta);

router.route("/eliminacarta").delete(eliminaCarta);

//ESPORTAZIONI
module.exports = router;