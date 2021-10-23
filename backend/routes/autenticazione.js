/*In questo file è contenuto tutto ciò che riguarda i casi d'uso
        - LOGIN 
        - RECUPERA PASSWORD 
        - LOGOUT
*/

//  IMPORTAZIONI
const express = require('express');
const router = express.Router();

const { login,
        recuperaPassword,
        resetPassword,
        modificaEmailCliente,
        modificaEmailImpiegato,
        modificaPassword,
        modificaTelefono,
        eliminaAccount
} = require("../controllers/autenticazione");
// RICHIESTE

router.route("/login").post(login);

router.route("/recuperapassword").post(recuperaPassword);

router.route("/resetpassword/:resetToken").put(resetPassword);

router.route("/modificaemailcliente").put(modificaEmailCliente);

router.route("/modificaemailimpiegato").put(modificaEmailImpiegato);

router.route("/modificapassword").put(modificaPassword);

router.route("/modificatelefono").put(modificaTelefono);

router.route("/eliminaaccount").delete(eliminaAccount);

//ESPORTAZIONI
module.exports = router;