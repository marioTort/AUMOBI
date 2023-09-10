const express = require('express');
const router = express.Router();

const { registrazioneCliente,
        registrazioneImpiegato,
        assegnaParcheggiatore
        
} = require("../controllers/registrazione");
// RICHIESTE

router.route("/registrazionecliente").post(registrazioneCliente);

router.route("/registrazioneimpiegato").post(registrazioneImpiegato);

router.route("/assegnaparcheggiatore").put(assegnaParcheggiatore);

//ESPORTAZIONI
module.exports = router;