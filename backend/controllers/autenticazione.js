const Utente = require('../models/Utenti');
const Patente = require('../models/Patenti');
const Wallet = require('../models/Wallet');
const Mezzo = require('../models/Mezzi');
const Stallo = require('../models/Stalli');
const Prenotazione = require('../models/Prenotazioni');

const invioEmail = require("../utils/invioEmail");
const crypto = require("crypto");

const StringCrypto = require('string-crypto');

let datiPatente;
let datiCarta;
let quattroCifre;
exports.login = async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
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
        
        try {
            datiPatente = await Patente.findOne({ email });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }

        try {
            datiCarta = await Wallet.findOne({ email });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }

        if (datiCarta) {
            //Abbiamo a che fare con un cliente...
            const {
                decryptString,
            } = new StringCrypto();
            
            quattroCifre = (decryptString(datiCarta.numeroCartaCredito, "AuMoBi"));
            
            quattroCifre = quattroCifre.toString();
            
            quattroCifre = quattroCifre.substring(12, 16);
        } 
        //Altimenti abbiamo a che fare sicuramente con un impiegato e i dati della carta non ci servono...


        //Se l'utente non è presente nel DB...
        if (!utente) {
            res.status(404).json({
                success: false,
                error: "Email errata. Riprovare."
            });
        }

        //creo una costante di tipo boolean che mi restituirà true se le password corrispondono. false altrimenti
        const isMatch = await utente.matchPasswords(password);

        //se le password non corrispondono...
        if (!isMatch) {
            res.status(404).json({
                success: false,
                error: "Password errata. Riprovare."
            });
        }
        if (!datiCarta) {
            sendTokenImpiegato(utente, 200, res);
        } else {
            /* Se invece password ed email sono corrispondenti genero il token di autenticazione che sostanzialmente permette 
            di accedere alla propria area riservata */
            sendToken(utente, 200, res);
            
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.recuperaPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const utente = await Utente.findOne({ email });

        if (!utente) {
            res.status(404).json({
                success: false,
                error: "Utente non trovato. Non è possibile inviare l'email per il recupero della password!"
            });
        }

        const resetToken = utente.getResetPasswordToken();

        //Devo essere adesso in grado di salvare questo utente con il token di resete della password generato...
        await utente.save();

        const resetUrl = `http://localhost:3000/resetpassword/${resetToken}
`;

        const message = `
            <h1>Recupero password</h1>
            <p>
                Abbiamo ricevuto una richiesta di recupero password da parte tua.
                Clicca sul seguente link per resettare la tua password e poter tornare ad usufruire dei nostri servizi:</p>
            <p></p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            <p>
                Distinti saluti dal team AUMOBI ©.
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
                data: "Email inviata con successo!",
                resetToken: resetToken
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

        if (!utente) {
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
            //token: utente.getSignedToken()
        });

    } catch (error) {
        next(error);
    }
};

exports.modificaEmailCliente = async (req, res, next) => {
    //DEVO CONTROLLARE CHE LA VECCHIA EMAIL IDENTIFICHI EFFETTIVAMENTE L'UTENTE NEL DB E CHE LA NUOVA EMAIL NON SIA GIA' PRESENTE NEL DB 
    const {
        vecchiaEmail,
        nuovaEmail
    } = req.body;

    try {
        const patentePresente = await Patente.findOne({ email: vecchiaEmail });
        const cartaPresente = await Wallet.findOne({ email: vecchiaEmail });

        const vecchioUtentePresente = await Utente.findOne({ email: vecchiaEmail });

        if (!vecchioUtentePresente) {
            res.json({ result: "Utente non presente!" });
        } else {
            try {
                const nuovoUtentePresente = await Utente.findOne({ email: nuovaEmail });
                
                if(nuovoUtentePresente) {
                    res.json({ result: "L'email inserita è già associata ad un altro utente!" });
                } else {

                    try {

                        if (patentePresente) {
                            await patentePresente.updateOne({ email: nuovaEmail });

                            try {
                                await patentePresente.save();
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message,
                                });
                            }

                        }
                        
                       try {
                           //Aggiorno tutte le carte associate al cliente...
                           await Wallet.updateMany(
                               { email: vecchiaEmail },
                               { $set: { email: nuovaEmail } }
                           );
                           
                       } catch (error) {
                           res.status(500).json({
                               success: false,
                               error: error.message,
                           });
                       }

                       try {
                           //Aggiorno tutte le prenotazioni...
                           await Prenotazione.updateMany(
                               {emailCliente: vecchiaEmail},
                                {$set: { emailCliente: nuovaEmail } }
                           );
                           
                       } catch (error) {
                           res.status(500).json({
                               success: false,
                               error: error.message,
                           });
                       }
                        

                        await vecchioUtentePresente.updateOne({ email: nuovaEmail });
                            try {
                                await vecchioUtentePresente.save();
                                res.json({
                                    datiUtente: vecchioUtentePresente,
                                    datiPatente: patentePresente,
                                    datiCarta: cartaPresente,
                                    success: "Email utente modificata con successo!"
                                });
                                
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message,
                                });
                            }
                    } catch (error) {
                        res.status(500).json({
                            success: false,
                            error: error.message,
                        });
                    }
                }
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.modificaEmailImpiegato = async (req, res, next) => {
//L'impiegato deve avere a prescindere la patente inserita. Non necessita wallet. Se l'impiegato è un autista controllo se ha un veicolo assegnato e, in tal caso, modifico il campo emailAutista 
    const {
        vecchiaEmail,
        nuovaEmail
    } = req.body;

    try {
        const stalloPresente = await Stallo.findOne({ emailParcheggiatore: vecchiaEmail });
        const mezzoPresente = await Mezzo.findOne({ emailAutista: vecchiaEmail });

        const vecchioUtentePresente = await Utente.findOne({ email: vecchiaEmail });

        if (!vecchioUtentePresente) {
            res.json({ result: "Utente non presente!" });
        } else {
            try {
                const nuovoUtentePresente = await Utente.findOne({ email: nuovaEmail });

                if (nuovoUtentePresente) {
                    res.json({ result: "L'email inserita è già associata ad un altro utente!" });
                } else {

                    try {

                        if(vecchioUtentePresente.tipoUtente === "Autista") {
                            if (mezzoPresente) {
                                await mezzoPresente.updateOne({ emailAutista: nuovaEmail });
                            }
                        }

                        if(vecchioUtentePresente.tipoUtente === "Parcheggiatore") {
                            if (stalloPresente) {
                                await stalloPresente.updateOne({ emailParcheggiatore: nuovaEmail });
                            }
                        }

                        await vecchioUtentePresente.updateOne({ email: nuovaEmail });

                        res.json({
                            datiUtente: vecchioUtentePresente,
                            success: "Email utente modificata con successo!"
                        });
                    } catch (error) {
                        res.status(500).json({
                            success: false,
                            error: error.message,
                        });
                    }
                }
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.modificaPassword = async (req, res, next) => {
    const {
        email,
        vecchiaPassword,
        nuovaPassword
    } = req.body;

    try {

        if (vecchiaPassword === nuovaPassword) {
            res.json({ error: "La vecchia password non può coincidere con la nuova!" });
        } else {

            const utentePresente = await Utente.findOne({ email }).select("+password");

            if (!utentePresente) {
                //Controllo se l'utente che voglio modificare, dotato di email, la quale lo identifica univocamente,
                // non è già presente nel db e, in tal caso, invio un messaggio di errore

                res.json({ result: "Utente non presente!" });

            } else {
                // Altrimenti lo modifico
                //***************************************

                //creo una costante di tipo boolean che mi restituirà true se le password corrispondono. false altrimenti
                const isMatch = await utentePresente.matchPasswords(vecchiaPassword);

                //se le password non corrispondono...
                if (!isMatch) {
                    res.status(404).json({
                        success: false,
                        error: "Password non corrispondenti!"
                    });
                }

                else {
                    utentePresente.password = nuovaPassword;
                    await utentePresente.save();

                    res.json({
                        datiUtente: utentePresente,
                        success: "Password modificata con successo!",
                        token: utentePresente.getSignedToken()
                    });
                }

                //***************************************
            }
        }
    } catch (error) {
        res.json({ result: false });
    }
};

exports.modificaTelefono = async (req, res, next) => {

    const {
        email,
        nuovoTelefono,
    } = req.body;

    try {
        const utentePresente = await Utente.findOne({ email });
        
        if (!utentePresente) {
            //Controllo se l'utente che voglio modificare, dotato di email, la quale lo identifica univocamente,
            // non è già presente nel db e, in tal caso, invio un messaggio di errore

            res.json({ result: "Utente non presente!" });

        } else {
            // Altrimenti lo modifico
            
            await utentePresente.updateOne({
                telefono: nuovoTelefono
            });
                try {
                    await utentePresente.save();
                    res.json({ 
                        datiUtente: utentePresente,
                        success: "Telefono modificato con successo!"
                    });
                } catch (error) {
                    res.json({ result: false });
                }

        }

    } catch (error) {
        res.json({ result: false });
    }

};

exports.eliminaAccount = async (req, res, next) => {
    const email = req.body.email;

    let utentePresente;

    try {
        await Patente.deleteOne({ email: email });
        await Wallet.deleteMany({ email: email });
        utentePresente = await Utente.findOneAndDelete({ email : email });
    } catch (error) {
        res.json({ result: false });
    }

    if (utentePresente) {
        res.json({ result: "Account eliminato con successo!" });
    } else {
        res.json({ result: "Account non presente!" });
    }
};

const sendToken = (utente, statusCode, res) => {
    const token = utente.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token,
        datiPatente, 
        datiCarta,
        utente,
        quattroCifre
    });
}

const sendTokenImpiegato = (utente, statusCode, res) => {
    const token = utente.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token,
        datiPatente,
        utente,
        quattroCifre
    });
}