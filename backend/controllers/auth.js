const Utente = require('../models/Utenti');
const invioEmail = require("../utils/invioEmail");
const crypto = require("crypto");

exports.register = async (req, res, next) => {
    const { 
        nome,
        cognome,
        sesso,
        luogoDiNascita,
        dataDiNascita,
        CF,
        email,
        telefono,
        password,
        tipoUtente,
        indirizzoAssegnazioneParcheggiatore
    } = req.body;

    try {
        
        const utente = await Utente.create({
            nome, 
            cognome, 
            sesso, 
            luogoDiNascita, 
            dataDiNascita, 
            CF, 
            email, 
            telefono, 
            password, 
            tipoUtente, 
            indirizzoAssegnazioneParcheggiatore
        });

        sendToken(utente, 201, res);
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).json({
            success: false,
            error: "Per favore, fornisci un indirizzo email e una password"
        });
    }
    /* Verifica PRIMA che l'utente sia effettivamente presente nel DB controllando se l'email che lo identifica
    in modo univoco si trova all'interno del DB e POI, se ciò accade, prende la password e la confronta con quella immessa
    al momento del login */
    try {
        const utente = await Utente.findOne({ email }).select("+password");

        //Se l'utente non è presente nel DB...
        if(!utente) {
            res.status(404).json({
                success: false,
                error: "Email errata. Riprovare."
            });
        }

        //creo una costante di tipo boolean che mi restituirà true se le password corrispondono. false altrimenti
        const isMatch = await utente.matchPasswords(password);

        //se le password non corrispondono...
        if(!isMatch) {
            res.status(404).json({
                success: false,
                error: "Password errata. Riprovare."
            });
        }

        /* Se invece password ed email sono corrispondenti genero il token di autenticazione che sostanzialmente permette 
        di accedere alla propria area riservata */ 

        sendToken(utente, 200, res);

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const utente = await Utente.findOne({ email });

        if(!utente) {
            res.status(404).json({
                success: false,
                error: "Utente non trovato. Non è possibile inviare l'email per il recupero della password!"
            });
        }

        const resetToken = utente.getResetPasswordToken();

        //Devo essere adesso in grado di salvare questo utente adesso...
        await utente.save();
        
        const resetUrl = `http://localhost:3000/resetpassword/${ resetToken }`;

        const message = `
            <h1>Recupero password</h1>
            <p>
                Abbiamo ricevuto una richiesta di recupero password da parte tua.
                Clicca sul seguente link per resettare la tua password e poter tornare ad usufruire dei nostri servizi:</p>
            <p></p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            <p>
                Distinti saluti dal team AUMOBI©.
            </p>
        `
        try {
            await invioEmail({
                to: utente.email,
                subject: "Richiesta recupero password AUMOBI",
                text: message
            });

            res.status(200).json({
                success: true,
                data: "Email inviata con successo!"
            });

        } catch (error) {
            utente.resetPasswordToken = undefined;
            utente.resetPasswordExpire = undefined;

            await utente.save();

            return next(
                res.status(500).json({
                    success: false,
                    data: "Impossibile inviare l'email!"
                })
            )
        }
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const utente = await Utente.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }        //Greater then data di adesso
        })

        if(!utente) {
            res.status(400).json({
                success: false,
                error: "Token non valido!"
            });
        }

        utente.password = req.body.password;
        utente.resetPasswordToken = undefined;
        utente.resetPasswordExpire = undefined;
    
        await utente.save();

        res.status(201).json({
            success: true,
            data: "Password modificata con successo!",
            token: utente.getSignedToken()
        });

    } catch (error) {
        next(error);
    }
};

const sendToken = (utente, statusCode, res) => {
    const token = utente.getSignedToken();
    res.status(statusCode).json({
        success: true, 
        token 
    });
}