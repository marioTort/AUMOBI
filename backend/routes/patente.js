/*In questo file è contenuto tutto ciò che riguarda i casi d'uso
        - AGGIUNGI PATENTE 
        - ELIMINA PATENTE
*/

//  IMPORTAZIONI

const express = require('express');
const router = express.Router();

const { aggiungiPatente,
        eliminaPatente
} = require("../controllers/patente");

// RICHIESTE

router.route("/aggiungipatente").post(aggiungiPatente);

router.route("/eliminapatente").delete(eliminaPatente);

//ESPORTAZIONI
module.exports = router;