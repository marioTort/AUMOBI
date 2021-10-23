/*In questo file è contenuto tutto ciò che riguarda i casi d'uso
        - AGGIUNGI Stallo
        - ELIMINA Stallo
*/

//  IMPORTAZIONI

const express = require('express');
const router = express.Router();

const { aggiungiStallo,
        eliminaStallo
} = require("../controllers/stallo");

// RICHIESTE

router.route("/aggiungistallo").post(aggiungiStallo);

router.route("/eliminastallo").delete(eliminaStallo);

//ESPORTAZIONI
module.exports = router;