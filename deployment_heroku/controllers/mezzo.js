const Mezzo = require('../models/Mezzi');
const Utente = require('../models/Utenti');
const Stallo = require('../models/Stalli');

const notifica = require('./notifiche');

exports.aggiungiMezzo = async (req, res, next) => {
    const {
        targa,
        tipoMezzo,
        categoriaMezzo,
        posizione,
        prezzoOrario
    } = req.body;

    
    let mezzoPresente;
    
    try {
        mezzoPresente = await Mezzo.findOne({ targa });
    } catch (error) {
        res.json({ result: false });
    }
    
    if(mezzoPresente) {
        //Controllo se il mezzo dotato di targa (auto o moto), la quale lo identifica univocamente, è già presente 
        //nel db e, in tal caso, invio un messaggio di errore

        res.json({ result: "Mezzo già inserito" });

    } else {
        // Altrimenti lo inserisco
        
        try {
            //Verifico che lo stallo sia effettivamente presente...
            const stallo = await Stallo.findOne({ indirizzoStallo: posizione });

            if (!stallo || stallo.tipoMezzi !== tipoMezzo || stallo.postiDisponibili === 0) {
                //Controllo che lo stallo sia presente, che il tipo di mezzi che ospita sia uguale al tipo di mezzo 
                //che si intende depositare e che ci siano posti disponibili nello stallo...
                res.json({ result: "Indirizzo stallo non valido!"});
            } else {
                //Inserisco adesso il mezzo...
                await stallo.updateOne({
                    postiDisponibili: (stallo.postiDisponibili - 1)
                });
                try {
                    let mezzo;
                    if (tipoMezzo === "Auto") {
                        mezzo = await Mezzo.create({
                            targa,
                            emailAutista: null,
                            tipoMezzo,
                            categoriaMezzo,
                            posizione,
                            stato: "Libero",
                            prezzoOrario
                        });
                    }

                    if (tipoMezzo === "Moto") {
                        mezzo = await Mezzo.create({
                            targa,
                            tipoMezzo,
                            categoriaMezzo,
                            posizione,
                            stato: "Libero",
                            prezzoOrario
                        });
                    }

                    if (tipoMezzo === "Bici" || tipoMezzo === "Monopattino") {
                        mezzo = await Mezzo.create({
                            targa,
                            tipoMezzo,
                            posizione,
                            stato: "Libero",
                            prezzoOrario
                        });
                    }
            
                    try {
                        await mezzo.save();
                    } catch (error) {
                        res.json({ result: "Errore nel salvataggio del mezzo!" });
                    }

                    res.json({ datiMezzo: mezzo });

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

};

exports.ritargaMezzo = async (req, res, next) => {
    const {
        targa,
        nuovaTarga,
    } = req.body;


    let mezzoPresente;

    try {
        mezzoPresente = await Mezzo.findOne({ targa });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        }); 
    }

    if (!mezzoPresente) {
        //Controllo se il mezzo che voglio modificare dotato di targa (auto o moto), la quale lo identifica univocamente,
        // non è già presente nel db e, in tal caso, invio un messaggio di errore

        res.json({ result: "Mezzo non presente!" });

    } else {
        // Altrimenti controllo se la nuovaTarga sia già assegnata ad un altro mezzo...

        try {
            const targaPresente = await Mezzo.findOne({ targa: nuovaTarga });
            
            if (targaPresente) {
                res.json({ result: "Targa già assegnata ad un veicolo!"});
            } else {
                // Altrimenti posso ritargare il mezzo...
                await mezzoPresente.updateOne({ targa: nuovaTarga});
                res.json({ datiMezzo: mezzoPresente });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });  
        }
        
    }

};

exports.spostaMezzo = async (req, res, next) => {
    const {
        targa,
        nuovaPosizione,
    } = req.body;


    let mezzoPresente;

    try {
        mezzoPresente = await Mezzo.findOne({ targa });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }

    if (!mezzoPresente) {
        //Controllo se il mezzo che voglio modificare dotato di targa (auto o moto), la quale lo identifica univocamente,
        // non è già presente nel db e, in tal caso, invio un messaggio di errore

        res.json({ result: "Mezzo non presente!" });

    } else {
        // Altrimenti controllo se lo stallo sia presente, se sia libero e se sia destinato allo stesso tipo di veicoli del mezzo che voglio trasferire...
        try {
            
            const vecchioStallo = await Stallo.findOne({ indirizzoStallo: mezzoPresente.posizione });
            const nuovoStallo = await Stallo.findOne({ indirizzoStallo: nuovaPosizione });

            if (!nuovoStallo || nuovoStallo.tipoMezzi !== mezzoPresente.tipoMezzo || nuovoStallo.postiDisponibili === 0) {
                res.json({ result: "Impossibile modificare la posizione del mezzo!" });
            } else {
                //Incremento il numero di posti disponibili del vecchio stallo...
                await vecchioStallo.updateOne({
                    postiDisponibili: (vecchioStallo.postiDisponibili + 1)
                });
                //E decremento quelli del nuovo stallo...
                await nuovoStallo.updateOne({
                    postiDisponibili: (nuovoStallo.postiDisponibili - 1)
                });
                
                //Modifico ora il mezzo...
                try {
                    await mezzoPresente.updateOne({
                        posizione: nuovaPosizione,
                    });

                    res.json({ 
                        datiMezzo: mezzoPresente,
                        datiVecchioStallo: vecchioStallo,
                        datiNuovoStallo: nuovoStallo
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
};

exports.riprezzaMezzo = async (req, res, next) => {
    const {
        targa,
        nuovoPrezzo,
    } = req.body;


    let mezzoPresente;

    try {
        
        mezzoPresente = await Mezzo.findOne({ targa });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }

    if (!mezzoPresente) {
        //Controllo se il mezzo che voglio modificare dotato di targa (auto o moto), la quale lo identifica univocamente,
        // non è già presente nel db e, in tal caso, invio un messaggio di errore

        res.json({ result: "Mezzo non presente!" });

    } else {
        // Altrimenti modifico il prezzo...
        try {
            
            await mezzoPresente.updateOne({ prezzoOrario: nuovoPrezzo });
            res.json({ datiMezzo: mezzoPresente });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
};

exports.riprezzaPerTipo = async (req, res, next) => {
    
    const {
        tipoMezzo,
        nuovoPrezzo,
    } = req.body;    

    try {
        await Mezzo.updateMany(
            { tipoMezzo: tipoMezzo },
            { $set: { prezzoOrario: nuovoPrezzo } }
        );
        res.json({ result: "Operazione completata!" });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }

};

exports.eliminaMezzo = async (req, res, next) => {
    //TOGLIERE IL MEZZO DALL'AUTISTA, SE QUESTI E' PRESENTE
    const targa = req.body.targa;

    let mezzoPresente;

    try {
        mezzoPresente = await Mezzo.findOne({ targa });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }

    if (!mezzoPresente) {
        //Controllo se il mezzo che voglio modificare dotato di targa (auto o moto), la quale lo identifica univocamente,
        // non è già presente nel db e, in tal caso, invio un messaggio di errore

        res.json({ result: "Mezzo non presente!" });

    } else {
        // Altrimenti controllo se lo stallo sia presente, se sia libero e se sia destinato allo stesso tipo di veicoli del mezzo che voglio trasferire...
        try {
            //Incremento il numero di posti disponibili dello stallo...

            const stallo = await Stallo.findOne({ indirizzoStallo: mezzoPresente.posizione });         
            await stallo.updateOne({ postiDisponibili: (stallo.postiDisponibili + 1) });
            try {
                await mezzoPresente.deleteOne({ targa });
                res.json({ result: "Mezzo eliminato con successo!" });
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
};

exports.assegnaAutista = async (req, res, next) => {
    const {
        email,
        targa
    } = req.body;


    try {
        //Verifico che l'utente esista...
        const utentePresente = await Utente.findOne({ email });

        if (!utentePresente) {
            res.json({ result: "Impiegato non presente!" });
        } else {
            if (utentePresente.tipoUtente !== "Autista") {
                res.json({ result: "L'utente non è un autista!" });
            } else {

                //Verifico adesso che esista il veicolo della nuova assegnazione...

                try {
                    const nuovoMezzo = await Mezzo.findOne({ targa });

                    if (!nuovoMezzo) {
                        res.json({ result: "Mezzo inserito non presente!" });
                    } else {
                        //Controllo se il nuovo mezzo è un'auto

                        if (nuovoMezzo.tipoMezzo !== "Auto") {
                            res.json({ result: "Impossibile assegnare l'autista a questo mezzo!" });
                        } else {

                            //**************************************************** */
                            //Verifico che l'autista non sia già assegnato ad un veicolo e, in tal caso, lo rimuovo e lo informo di ciò
                            try {
                                await Mezzo.updateMany(
                                    { emailAutista: email },
                                    { $set: { emailAutista: null } }
                                );
                                notifica.inviaEmailCambioAutista(email);
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message,
                                });
                            }
                            //*****************************************************+++ */


                            //Controllo se un autista è già assegnato a questo mezzo e, in tal caso, lo aggiorno...
                            if (nuovoMezzo.emailAutista !== null) {
                                //Un altro autista era già assegnato a questo mezzo
                                try {
                                    notifica.inviaEmailCambioAutista(nuovoMezzo.emailAutista);
                                    await nuovoMezzo.updateOne({ emailAutista: email });
                                    notifica.inviaEmailAssegnazioneMezzo(email, nuovoMezzo.posizione);
                                } catch (error) {
                                    res.status(500).json({
                                        success: false,
                                        error: error.message,
                                    });
                                }

                            } else {
                                // Altrimenti il mezzo è libero da ogni autista...
                                try {
                                    await nuovoMezzo.updateOne({ emailAutista: email });
                                    notifica.inviaEmailAssegnazioneMezzo(email, nuovoMezzo.posizione);
                                } catch (error) {
                                    res.status(500).json({
                                        success: false,
                                        error: error.message,
                                    });
                                }
                            }
                            res.json({ success: "Autista correttamente assegnato!" });
                        }
                    }
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        error: error.message,
                    });
                }

            }
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        }); 
    }

};
