const Wallet = require("../models/Wallet");
const Utente = require("../models/Utenti");

const regexCarta = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

const StringCrypto = require('string-crypto'); 
const password = 'AuMoBi';

const {
    encryptString,
    decryptString
} = new StringCrypto();

exports.aggiungiCarta = async (req, res, next) => {
    const {
        email,
        intestatario,
        numeroCartaCredito,
        annoScadenzaCarta,
        meseScadenzaCarta,
        CVV,
    } = req.body;

    if (numeroCartaCredito.match(regexCarta)) {
        try {
            const numeroCartaCriptato = encryptString(numeroCartaCredito, password);
            //controllo che l'email in input sia associata ad un utente...

            try {
                const utentePresente = await Utente.findOne({email});

                if (!utentePresente) {
                    res.json({result: "Utente non presente!"});
                } else {
                    //Controllo se a quell'utente corrisponde una carta di credito
                    const cartaPresente = await Wallet.findOne({ email, numeroCartaCriptato });

                    if (!cartaPresente) {
                        //Se non è inserita nessuna carta creo direttamente un nuovo oggetto...
                        const wallet = await Wallet.create({
                            email,
                            intestatario,
                            numeroCartaCredito: numeroCartaCriptato,
                            annoScadenzaCarta,
                            meseScadenzaCarta,
                            CVV
                        });

                        try {
                            await wallet.save();
                            res.json({
                                result: "Carta di credito inserita con successo",
                                datiCarta: wallet
                            });
                        } catch (error) {
                            res.status(500).json({
                                success: false,
                                error: error.message,
                            });
                        }

                    } else {
                        //controllo che le carte non siano le stesse...
                        const numeroCartaDecriptato = decryptString(cartaPresente.numeroCartaCredito, password);
                        if (numeroCartaDecriptato === numeroCartaCredito) {
                            res.json({ result: "Carta già inserita!" });
                        } else {
                            //Altrimenti sovrascrivo la carta...
                            await cartaPresente.updateOne({
                                intestatario,
                                numeroCartaCredito: numeroCartaCriptato,
                                annoScadenzaCarta,
                                meseScadenzaCarta,
                                CVV
                            });

                            try {
                                await cartaPresente.save();
                                res.json({
                                    result: "Carta di credito modificata con successo",
                                    datiCarta: cartaPresente
                                });
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message,
                                });
                            }

                        }
                    }
                }

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
    } else {
        res.json({ result: "Inserire carta di credito valida!"});
    }
};

exports.eliminaCarta = async (req, res, next) => {
    const email = req.body.email;

    let cartaInserita;

    try {
        const utentePresente = await Utente.findOne({ email });

        if (!utentePresente) {
            res.json({ result: "Utente non presente!" });
        } else {
            try {
                cartaInserita = await Wallet.findOneAndDelete({ email });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                });
            }

            if (cartaInserita) {
                res.json({ result: "Carta di credito eliminata con successo!" });
            } else {
                res.json({ result: "Carta di credito non presente!" });
            }
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
