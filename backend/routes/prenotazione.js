/* In questo file è contenuto tutto ciò che riguarda i casi d'uso 
                    - CREA PRENOTAZIONE
                    - STORICO PRENOTAZIONI
                    - MODIFICA PERCORSO
                    - MODIFICA DATA 
                    - ANNULLA PRENOTAZIONE 
*/

//  IMPORTAZIONI

const express = require('express');
const router = express.Router();

const { programmaPrenotazione,
        modificaLuogoConsegna,
        modificaDataRitiro,
        modificaDataConsegna,
        segnalaGuasto,
        annullaPrenotazione,
        iniziaPrenotazione,
        terminaPrenotazione,
        terminaPrenotazioneAutista,
        iniziaPrenotazioneBM,
        terminaPrenotazioneBM
} = require("../controllers/prenotazione");

// RICHIESTE

router.route("/programmaprenotazione").post(programmaPrenotazione);

router.route("/iniziaprenotazione").put(iniziaPrenotazione);

router.route("/terminaprenotazione").put(terminaPrenotazione);

router.route("/terminaprenotazioneautista").put(terminaPrenotazioneAutista);

router.route("/annullaprenotazione").put(annullaPrenotazione);

router.route("/modificaluogoconsegna").put(modificaLuogoConsegna);

router.route("/modificadataritiro").put(modificaDataRitiro);

router.route("/modificadataconsegna").put(modificaDataConsegna);


router.route("/segnalaguasto").put(segnalaGuasto);


router.route("/iniziaprenotazionebm").put(iniziaPrenotazioneBM);

router.route("/terminaprenotazionebm").put(terminaPrenotazioneBM);


//ESPORTAZIONI
module.exports = router;