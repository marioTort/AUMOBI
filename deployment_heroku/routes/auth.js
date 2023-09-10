const express = require('express');
const router = express.Router();

//uso i componenti creati in controllers/auth.js
const { register,
        login,
        forgotPassword,
        resetPassword
} = require("../controllers/auth");

router.route("/register").post(register);

/*  Avrei potuto scriverlo anche in questo modo, ma per semplicità ho preferito creare un altro file auth.js
    nella cartella controllers che mi fornisce tutto il necessario e mi da una sintassi più lineare
router.post("/register", register (req, res)) {
    res.send("Register Route")
}
*/

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword/:resetToken").put(resetPassword);

module.exports = router;