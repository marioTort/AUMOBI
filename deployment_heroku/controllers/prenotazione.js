const Utente = require("../models/Utenti");
const Prenotazione = require("../models/Prenotazioni");
const Mezzo = require("../models/Mezzi");
const Wallet = require("../models/Wallet");
const Stallo = require("../models/Stalli");
const Patente = require('../models/Patenti');

const notifica = require("./notifiche");

const StringCrypto = require('string-crypto');
const key = 'AuMoBi';

const {
    decryptString
} = new StringCrypto();

//La password non la metto perchè questa sarà una funzionalità che andrà a finire in private, ovvero in quella parte accessibile SOLO previa autenticazione

//dichiaro due variabili che andrò ad usare per i timer...
let timerInizioPrenotazione;
let timerTempoScaduto;

//AUTO E MOTO
exports.programmaPrenotazione = async (req, res, next) => {
// Serve a generare una nuova prenotazione di auto o moto. CONTROLLARE CHE L'UTENTE ABBIA LA PATENTE
    const {

        emailCliente,
        targaVeicolo,
        luogoRitiro,   
        luogoConsegna, 
        dataRitiro, 
        oraRitiro, 
        dataConsegna, 
        oraConsegna,
        numeroCartaCliente

    } = req.body;

    var dataR = Date.parse(convertFromStringToDate(dataRitiro, oraRitiro));         //converte in ms la data e l'ora di ritiro
    var dataC = Date.parse(convertFromStringToDate(dataConsegna, oraConsegna));     //Stessa cosa con data e ora di consegna 

    let differenzaDate = dataC - dataR;
    try {
        //Verifico esistenza utente tramite emailCliente...
        const cliente = await Utente.findOne({ email: emailCliente });

        if (!cliente) {
            res.json({ result: "Utente non trovato!" });
        } else {
            try {
                //verifico esistenza mezzo tramite targaVeicolo...
                const mezzoPresente = await Mezzo.findOne({ targa: targaVeicolo });

                if (!mezzoPresente || mezzoPresente.stato === "Occupato" || mezzoPresente.stato === "Guasto") {
                    res.json({ result: "Impossibile prenotare il mezzo!" });
                } else {

                    try {

                        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                        var dataAttuale = new Date();

                        var dataCorrente = (dataAttuale.getDate() + '/' + (dataAttuale.getMonth() + 1) + '/' + dataAttuale.getFullYear());
                        var oraCorrente = (dataAttuale.getHours() + ':' + dataAttuale.getMinutes());
                        var dataCompletaAttuale = Date.parse(convertFromStringToDate(dataCorrente, oraCorrente));

                        if (dataC < dataCompletaAttuale || dataC < dataR) {
                            //console.log(dataR < dataCompletaAttuale);
                            //console.log(dataC < dataCompletaAttuale);
                            res.json({ result: "Non disponiamo ancora della DeLorean di Emmett Brown per tornare indietro nel tempo! Scegli una data di ritiro maggiore di quella attuale!" });
                        } else {
                            //verifico che la carta di credito inserita dal cliente sia esistente...
                            const cartaPresente = await Wallet.findOne({ email: emailCliente });
                            
                            const numeroCartaDecriptato = decryptString(cartaPresente.numeroCartaCredito, key);
                            console.log(numeroCartaDecriptato);



                            if (!cartaPresente || (numeroCartaDecriptato !== numeroCartaCliente)) {
                                res.json({ result: "Impossibile pagare con questa carta!" });
                            } else {
                                //controllo se il mezzo esistente ha un autista...
                                if (mezzoPresente.emailAutista !== null) {
                                    //prenotazione CON SERVIZIO AUTISTA
                                    try {
                                        const prenotazione = await Prenotazione.create({
                                            emailCliente,
                                            targaVeicolo,
                                            categoriaVeicolo: mezzoPresente.tipoMezzo,
                                            luogoRitiro,
                                            luogoConsegna,
                                            dataRitiro,
                                            oraRitiro,
                                            dataConsegna,
                                            oraConsegna,
                                            prezzo: (mezzoPresente.prezzoOrario / (60 * 60 * 1000) * differenzaDate),
                                            servizioAutista: true,
                                            statoPrenotazione: "PROGRAMMATA",
                                            metodoPagamento: `Carta di credito terminante per ${numeroCartaCliente.slice(-4)}`
                                        });
    
                                        try {
    
                                            await prenotazione.save();
    
                                            notifica.inviaEmailAutista(
                                                mezzoPresente.emailAutista,
                                                targaVeicolo,
                                                luogoRitiro,
                                                luogoConsegna,
                                                dataRitiro,
                                                oraRitiro,
                                                dataConsegna,
                                                oraConsegna
                                            );
    
                                            notifica.inviaEmailProgrammaPrenotazioneConAutista(
                                                prenotazione._id,
                                                emailCliente,
                                                targaVeicolo,
                                                luogoRitiro,
                                                luogoConsegna,
                                                dataRitiro,
                                                oraRitiro,
                                                dataConsegna,
                                                oraConsegna,
                                                prenotazione.metodoPagamento,
                                                prenotazione.prezzo
                                            );
    
                                            await mezzoPresente.updateOne({ stato: "Occupato" });
                                            res.json({ datiPrenotazione: prenotazione });
    
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
                                    //prenotazione SENZA servizio autista
                                    //verifico che i luoghi di ritiro e consegna siano effettivamente degli stalli e che il tipo di mezzi che questi accettano siano gli stessi di quello del mezzo che si intende prenotare
                                    try {
    
                                        //DEVO VERIFICARE CHE IL CLIENTE ABBIA LA PATENTE DI TIPO B PER LE AUTO, DI TIPO A PER MOTO DI CILINDRATA >= 50 E DI TIPO AM PER MOTO DI CILINDRATA < 50
    
                                        
                                        const patentePresente = await Patente.findOne({ email: emailCliente });
    
                                        if (!patentePresente) {
                                            res.json({ result: "Non hai inserito una patente. Impossibile prenotare il mezzo!" });
                                        } else {
    
                                            var autoPrenotabile = (patentePresente.categoria === "B" && mezzoPresente.tipoMezzo === "Auto");
    
                                            var motoPrenotabile = ((patentePresente.categoria === "B" || patentePresente.categoria === "A1") && mezzoPresente.tipoMezzo === "Moto"); 
    
                                            var scooterPrenotabile = (patentePresente.categoria === "AM" && mezzoPresente.categoriaMezzo < 50); 

                                            //var autoAutistaPrenotabile = (mezzoPresente.emailAutista);
                                            //console.log(autoAutistaPrenotabile)
                                            //console.log(scooterPrenotabile, motoPrenotabile, autoPrenotabile);
                                            if (!autoPrenotabile && !motoPrenotabile && !scooterPrenotabile ) {
                                                res.json({ result: "Impossibile prenotare il mezzo!" });
                                            } else {
                                                const stalloRitiro = await Stallo.findOne({ indirizzoStallo: mezzoPresente.posizione });
    
                                                if (!stalloRitiro || stalloRitiro.tipoMezzi !== mezzoPresente.tipoMezzo) {
                                                    res.json({ result: "Impossibile ritirare qui il mezzo!" });
                                                } else {
    
                                                    try {
    
                                                        const stalloConsegna = await Stallo.findOne({ indirizzoStallo: luogoConsegna });
    
                                                        if (!stalloConsegna || stalloConsegna.tipoMezzi !== mezzoPresente.tipoMezzo || stalloConsegna.postiDisponibili === 0) {
                                                            res.json({ result: "Impossibile consegnare qui il mezzo!" });
                                                        } else {
    
                                                            try {
                                                                var prezzoPren = (mezzoPresente.prezzoOrario / (60 * 60 * 1000) * differenzaDate);
                                                                console.log(prezzoPren);
                                                                console.log((60 * 60 * 1000) * differenzaDate);
                                                                console.log(differenzaDate);
                                                                console.log(60 * 60 * 1000);
                                                                //adesso posso creare effettivamente la prenotazione del mezzo
                                                                const prenotazione = await Prenotazione.create({
                                                                    emailCliente,
                                                                    targaVeicolo,
                                                                    categoriaVeicolo: mezzoPresente.tipoMezzo,
                                                                    luogoRitiro: mezzoPresente.posizione,
                                                                    luogoConsegna,
                                                                    dataRitiro,
                                                                    oraRitiro,
                                                                    dataConsegna,
                                                                    oraConsegna,
                                                                    prezzo: prezzoPren,
                                                                    servizioAutista: false,
                                                                    statoPrenotazione: "PROGRAMMATA",
                                                                    metodoPagamento: `Carta di credito terminante per ${numeroCartaCliente.slice(-4)}`
                                                                });
    
                                                                try {
    
                                                                    await prenotazione.save();
                                                                    notifica.inviaEmailProgrammaPrenotazione(
                                                                        prenotazione._id,
                                                                        emailCliente,
                                                                        targaVeicolo,
                                                                        prenotazione.luogoRitiro,
                                                                        luogoConsegna,
                                                                        dataRitiro,
                                                                        oraRitiro,
                                                                        dataConsegna,
                                                                        oraConsegna,
                                                                        prenotazione.metodoPagamento,
                                                                        prenotazione.prezzo
                                                                    );
    
                                                                    await mezzoPresente.updateOne({ stato: "Occupato" });
                                                                    //Decremento il numero di posti disponibili per riservare il posto al veicolo noleggiato
                                                                    await stalloConsegna.updateOne({ postiDisponibili: (stalloConsegna.postiDisponibili - 1) });
                                                                    res.json({ datiPrenotazione: prenotazione });
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

                        }
                        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
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

exports.iniziaPrenotazione = async (req, res, next) => {
    
    const {
        idPrenotazione
    } = req.body;

    try {
        //verifico che l'utente sia presente...

        const prenotazionePresente = await Prenotazione.findOne({ _id: idPrenotazione });

        if (!prenotazionePresente) {
            res.json({ result: "Prenotazione non presente!" });
        } else {
            
            try {
                
                const utentePresente = await Utente.findOne({ email: prenotazionePresente.emailCliente });
                let emailCliente = utentePresente.email;
                if (!utentePresente) {
                    //verifico che la prenotazione esista e che il suo stato non sia "INIZIATA" o "TERMINATA"...
                    res.json({ result: "Utente non trovato!" });   
                } else {

                    if (prenotazionePresente.statoPrenotazione === "INIZIATA" || prenotazionePresente.statoPrenotazione === "TERMINATA") {
                        res.json({ result: "Prenotazione già avviata o terminata!" });
                    } else {
                        
                        var dataR = Date.parse(convertFromStringToDate(prenotazionePresente.dataRitiro, prenotazionePresente.oraRitiro));         //converte in ms la data e l'ora di ritiro
                        var dataAttuale = new Date();

                        
                        var dataRitiroEffettiva = (dataAttuale.getDate() + '/' + (dataAttuale.getMonth() + 1) + '/' + dataAttuale.getFullYear());
                        var oraRitiroEffettiva = (dataAttuale.getHours() + ':' + dataAttuale.getMinutes());
                        var dataCompletaAttuale = Date.parse(convertFromStringToDate(dataRitiroEffettiva, oraRitiroEffettiva));

                        if((dataR - dataCompletaAttuale) >= 0) {
                            res.json({ result: "Non puoi avviare prima della data di ritiro una prenotazione!" });
                        } else {

                            //Posso adesso impostare lo stato della prenotazione ad "INIZIATA"

                            try {

                                await prenotazionePresente.updateOne({ statoPrenotazione: "INIZIATA" });

                                try {

                                    await prenotazionePresente.save();

                                    if (prenotazionePresente.servizioAutista === true) {
                                        //devo inviare una mail anche all'autista...

                                        try {

                                            const mezzoPresente = await Mezzo.findOne({ targa: prenotazionePresente.targaVeicolo });

                                            notifica.inviaEmailAutistaInizioPrenotazione(
                                                mezzoPresente.emailAutista,
                                                prenotazionePresente.dataConsegna,
                                                prenotazionePresente.oraConsegna,
                                                prenotazionePresente.luogoConsegna
                                            );

                                        } catch (error) {
                                            res.status(500).json({
                                                success: false,
                                                error: error.message
                                            });
                                        }

                                    }

                                    notifica.inviaEmailInizioPrenotazione(emailCliente,
                                        idPrenotazione,
                                        prenotazionePresente.dataConsegna,
                                        prenotazionePresente.oraConsegna,
                                        prenotazionePresente.luogoConsegna
                                    );
                                    
                                    try {
                                        const stallo = await Stallo.findOne({indirizzoStallo: prenotazionePresente.luogoRitiro});

                                        if(stallo) {
                                            await stallo.updateOne({postiDisponibili: (stallo.postiDisponibili + 1) });
                                        }

                                    } catch (error) {
                                        res.status(500).json({
                                            success: false,
                                            error: error.message
                                        });
                                    }

                                    var dataC = Date.parse(convertFromStringToDate(prenotazionePresente.dataConsegna, prenotazionePresente.oraConsegna));     //Stessa cosa con data e ora di consegna 

                                    //QUI DEVO FAR PARTIRE IL TIMER DURA QUANTO DURA LA PRENOTAZIONE.
                                    let differenzaDate = dataC - dataR;                     
                                    
                                    timerInizioPrenotazione = setTimeout(() => {
                                        notifica.inviaEmailRitardoConsegna(emailCliente, idPrenotazione);
                                    }, differenzaDate);

                                    //SUCCESSIVAMENTE NE FACCIO PARTIRE UNO DI 15 MINUTI (15 * 60 * 1000) ALLO SCADERE DEL QUALE VERRA' INVIATA UNA EMAIL AL CLIENTE PER COMUNICARGLI CHE DOVRà PAGARE UN SOVRAPPREZZO...
                                    
                                    let timeToSend = differenzaDate + (15 * 60 * 1000);
                                    
                                    timerTempoScaduto = setTimeout(() => {
                                        notifica.inviaEmailSovrapprezzo(emailCliente, idPrenotazione);
                                    }, timeToSend);

                                    //setTimeout(notifica.inviaEmailRitardoConsegna(emailCliente), differenzaDate);
                                    res.json({ result: "Prenotazione iniziata con successo!" });
                                } catch (error) {
                                    res.status(500).json({
                                    success: false,
                                        error: error.message
                                    });
                                }

                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                });
                            }

                        }

                    }
                    
                }

            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }

        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

};

exports.terminaPrenotazione = async (req, res, next) => {
    
    //INSERIRE LO STOP DEI TIMER

    const{
        idPrenotazione 
    } = req.body;


    //**************************************************************************** */
    
    
    try {
        //controllo che la prenotazione esista tramite l'idPrenotazione
        const prenotazionePresente = await Prenotazione.findOne({ _id: idPrenotazione });

        if (!prenotazionePresente) {
            res.json({ result: "Prenotazione non presente!" });
        } else {
            
            try {
                
                const mezzoPresente = await Mezzo.findOne({ targa: prenotazionePresente.targaVeicolo});
                console.log(prenotazionePresente.targaVeicolo);
                if (!mezzoPresente) {
                    res.json({ result: "Veicolo non presente!" });
                } else {
                    
                    if (prenotazionePresente.statoPrenotazione !== "INIZIATA") {
                        res.json({ result: "Impossibile terminare questa prenotazione, in quanto già terminata o non ancora iniziata!" });
                    } else {
                        
                        //STOPPO I TIMER

                        stopTimer(timerInizioPrenotazione);
                        stopTimer(timerTempoScaduto);

                        var dataAttuale = new Date();
                        var dataConsegnaEffettiva = (dataAttuale.getDate() + '/' + (dataAttuale.getMonth() + 1) + '/' + dataAttuale.getFullYear());
                        var oraConsegnaEffettiva = (dataAttuale.getHours() + ':' + dataAttuale.getMinutes());

                        var dataC = Date.parse(convertFromStringToDate(prenotazionePresente.dataConsegna, prenotazionePresente.oraConsegna));         //converte in ms la data e l'ora di ritiro
                        var dataCompletaAttuale = Date.parse(convertFromStringToDate(dataConsegnaEffettiva, oraConsegnaEffettiva));
                        console.log(dataC);
                        console.log(dataCompletaAttuale);
                        if ((dataCompletaAttuale - dataC) <= (15 * 60 * 1000)) {
                            //No sovrapprezzo
                            try {

                                notifica.inviaEmailFinePrenotazione(prenotazionePresente.emailCliente, idPrenotazione);
                                await prenotazionePresente.updateOne({
                                    dataConsegna: dataConsegnaEffettiva,
                                    oraConsegna: oraConsegnaEffettiva,
                                    statoPrenotazione: "TERMINATA"
                                });

                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                });
                            }

                        } else {
                            //Si sovrapprezzo
                            //Calcolo sovrapprezzo...

                            var dataR = Date.parse(convertFromStringToDate(prenotazionePresente.dataRitiro, prenotazionePresente.oraRitiro));         //converte in ms la data e l'ora di ritiro

                            let differenzaDate = dataCompletaAttuale - dataR;

                            var nuovoPrezzo = (mezzoPresente.prezzoOrario / (60 * 60 * 1000) * differenzaDate);
                            try {
                                
                                notifica.inviaEmailFinePrenotazioneSovrapprezzo(prenotazionePresente.emailCliente, idPrenotazione);
                                await prenotazionePresente.updateOne({
                                    dataConsegna: dataConsegnaEffettiva,
                                    oraConsegna: oraConsegnaEffettiva,
                                    prezzo: nuovoPrezzo,
                                    statoPrenotazione: "TERMINATA"
                                });

                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                });
                            }

                        }

                        //Controllo se è presente il servizio autista...

                        if(prenotazionePresente.servizioAutista === true) {
                            //Invio un'email all'autista...
                            notifica.inviaEmailFinePrenotazioneAutista(mezzoPresente.emailAutista, prenotazionePresente.luogoConsegna );

                        } else {
                            //Imposto lo stato del mezzo noleggiato a "LIBERO"...

                            try {
                                
                                await mezzoPresente.updateOne({ 
                                    posizione: prenotazionePresente.luogoConsegna,
                                    stato: "Libero" });

                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                });
                            }

                        }

                        try {
                            await prenotazionePresente.save();
                            await mezzoPresente.save();

                            try {

                                const utente = await Utente.findOne({ email: prenotazionePresente.emailCliente });
                                notifica.inviaEmailDettaglioNoleggio(
                                    prenotazionePresente.emailCliente,
                                    utente.nome,
                                    utente.cognome,
                                    idPrenotazione,
                                    prenotazionePresente.targaVeicolo,
                                    prenotazionePresente.categoriaVeicolo,
                                    prenotazionePresente.luogoRitiro,
                                    prenotazionePresente.luogoConsegna,
                                    prenotazionePresente.dataRitiro,
                                    prenotazionePresente.oraRitiro,
                                    prenotazionePresente.dataConsegna,
                                    prenotazionePresente.oraConsegna,
                                    prenotazionePresente.prezzo,
                                    prenotazionePresente.servizioAutista,
                                    prenotazionePresente.metodoPagamento
                                );
                                res.json({ 
                                    datiPrenotazione: prenotazionePresente,
                                    datiMezzo: mezzoPresente,
                                    result: "Prenotazione terminata con successo!" });
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                });
                            }

                        } catch (error) {
                            res.status(500).json({
                                success: false,
                                error: error.message
                            });
                        }

                        

                    }

                }

            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }

        }


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
    
    
    //**************************************************************************** */  
};

exports.terminaPrenotazioneAutista = async (req, res, next) => {

    const {
        targaVeicolo,
        luogoConsegna
    } = req.body;

    try {
        const mezzoPresente = await Mezzo.findOne({ targa: targaVeicolo });

        if(!mezzoPresente) {
            res.json({ result: "Mezzo non presente!" });
        } else {
            try {
                //Verifico che il luogo di consegna corrisponda effettivamente all'indirizzo di uno stallo...
                const stalloPresente = await Stallo.findOne({ indirizzoStallo: luogoConsegna });

                if (!stalloPresente) {
                    res.json({ result: "Impossibile consegnare qui il mezzo" });
                } else {
                    //controllo che ci sia almeno un posto disponibile e che il tipo di mezzi ospitati sia lo stesso del tipo di veicolo da consegnare...
                    if (stalloPresente.tipoMezzi === mezzoPresente.tipoMezzo && stalloPresente.postiDisponibili > 0) {
                        //modifico il numero di postiDisponibili dello stallo...
                        try {
                            await stalloPresente.updateOne({ postiDisponibili: (stalloPresente.postiDisponibili - 1)});
                            
                            try {
                                await mezzoPresente.updateOne({
                                    posizione: luogoConsegna,
                                    stato: "Libero"
                                });
                                notifica.inviaEmailConfermaConsegnaVeicolo(mezzoPresente.emailAutista, luogoConsegna);
                                res.json({
                                    result: "Mezzo consegnato con successo!",
                                    datiMezzo: mezzoPresente,
                                    datiStallo: stalloPresente
                                });
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                });
                            }
                            
                            
                        } catch (error) {
                            res.status(500).json({
                                success: false,
                                error: error.message
                            });
                        }
                    } else {
                        res.json({ result: "Impossibile consegnare qui il mezzo!"});
                    }
                }
                
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.annullaPrenotazione = async (req, res, next) => {

    //*********************************************************************************** */

    const {
        idPrenotazione
    } = req.body;

    try {

        const prenotazionePresente = await Prenotazione.findOne({ _id: idPrenotazione });

        if (!prenotazionePresente) {
            res.json({ result: "Prenotazione non presente!" });
        } else {

            //Verifico che il mezzo sia presente...

            try {

                const mezzoPresente = await Mezzo.findOne({ targa: prenotazionePresente.targaVeicolo });

                if (!mezzoPresente) {
                    res.json({ result: "Mezzo non presente!" });
                } else {

                    //controllo che lo stato della prenotazione sia "PROGRAMMATA"...

                    if (prenotazionePresente.statoPrenotazione !== "PROGRAMMATA") {
                        res.json({ result: "Impossibile annullare questa prenotazione!" });
                    } else {
                        //controllo se è presente il servizio autista...

                        if (prenotazionePresente.servizioAutista === true) {
                            //invio email all'autista per informarlo dell'annullamento della prenotazione...
                            notifica.inviaEmailAnnullaPrenotazioneAutista(mezzoPresente.emailAutista);
                        } else {
                            const stalloConsegna = await Stallo.findOne({ indirizzoStallo: prenotazionePresente.luogoConsegna });
                            try {
                                let postiDisp = stalloConsegna.postiDisponibili + 1;
                                try {
                                    //aumento il numero di posti disponibili nello stallo di consegna
                                    await stalloConsegna.updateOne({
                                        postiDisponibili: postiDisp
                                    });

                                } catch (error) {
                                    res.status(500).json({
                                        success: false,
                                        error: error.message
                                    });
                                }
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                });
                            }
                        }

                        try {
                            //aggiorno lo stato del mezzo a "Libero"...

                            await mezzoPresente.updateOne({ stato: "Libero" });

                            //**************************************************** */



                            //**************************************************** */
                            try {
                                //aggiorno lo stato della prenotazione ad "ANNULLATA"...
                                var nuovoPrezzo = prenotazionePresente.prezzo * 0.2;
                                await prenotazionePresente.updateOne({
                                    prezzo: nuovoPrezzo,
                                    statoPrenotazione: "ANNULLATA"
                                });
                                try {
                                    await prenotazionePresente.save();
                                    await mezzoPresente.save();
                                    notifica.inviaEmailAnnullaPrenotazioneCliente(prenotazionePresente.emailCliente, idPrenotazione);
                                    res.json({
                                        datiPrenotazione: prenotazionePresente,
                                        datiMezzo: mezzoPresente,
                                        result: "Prenotazione annullata con successo!"
                                    });
                                } catch (error) {
                                    res.status(500).json({
                                        success: false,
                                        error: error.message
                                    });
                                }
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                });
                            }

                        } catch (error) {
                            res.status(500).json({
                                success: false,
                                error: error.message
                            });
                        }

                    }

                }

            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }

        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

    //*********************************************************************************** */
};

exports.modificaLuogoConsegna = async (req, res, next) => {
    //Serve per cambiare luogo di consegna. Lo posso utilizzare anche quando mi viene segnalato il luogo di consegna più vicino a me. 
    //Ovviamente devo verificare che lo stallo abbia almeno un posto disponibile ed in tal caso "prenotarmelo" per me  
    //**************************************************************************** */
    const {
        idPrenotazione,
        nuovoLuogoConsegna
    } = req.body;
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    try {
        //Verifico che la prenotazione sia presente...
        const prenotazionePresente = await Prenotazione.findOne({ _id: idPrenotazione });

        if (!prenotazionePresente) {
            res.json({ result: "Prenotazione non presente!" });
        } else {
            const mezzoPresente = await Mezzo.findOne({ targa: prenotazionePresente.targaVeicolo });

            //Controllo se è presente il servizio autista...
            if (prenotazionePresente.servizioAutista === true) {
                try {
                    await prenotazionePresente.updateOne({ luogoConsegna: nuovoLuogoConsegna });
                    //informo l'autista di tale modifica...
                    notifica.inviaEmailModificaLuogoConsegnaAutista(mezzoPresente.emailAutista, nuovoLuogoConsegna);
                    notifica.inviaEmailModificaLuogoConsegnaCliente(prenotazionePresente.emailCliente, idPrenotazione, nuovoLuogoConsegna); 
                    res.json({
                        result: "Luogo consegna modificato con successo!",
                        datiPrenotazione: prenotazionePresente
                    });
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        error: error.message
                    });
                }
            } else {
                //controllo che il nuovo luogo di consegna sia presente...
                try {
                    const nuovoStalloPresente = await Stallo.findOne({ indirizzoStallo: nuovoLuogoConsegna });
                    if (!nuovoStalloPresente) {
                        res.json({ result: "Il luogo di consegna inserito non corrisponde a nessun nostro stallo!" });
                    } else {
                        //Se lo stallo è presente controllo che ci siano posti disponibili e che il tipo di mezzi dello stallo sia lo stesso del mezzo prenotato...
                        if (nuovoStalloPresente.postiDisponibili <= 0 || nuovoStalloPresente.tipoMezzi !== mezzoPresente.tipoMezzo) {
                            res.json({ result: "Impossibile consegnare qui il mezzo!" });
                        } else {
                            //incremento il numero di posti disponibili nel vecchio stallo...
                            try {
                                const vecchioStallo = await Stallo.findOne({ indirizzoStallo: prenotazionePresente.luogoConsegna});
                                //decremento il numero di posti disponibili nel nuovo stallo, aggiorno la prenotazione e notifico il cliente di ciò...
                                try {
                                    await vecchioStallo.updateOne({ postiDisponibili: (vecchioStallo.postiDisponibili + 1) }); 
                                    await nuovoStalloPresente.updateOne({ postiDisponibili: (nuovoStalloPresente.postiDisponibili - 1) });
                                    await prenotazionePresente.updateOne({ luogoConsegna: nuovoLuogoConsegna });
                                    notifica.inviaEmailModificaLuogoConsegnaCliente(prenotazionePresente.emailCliente, idPrenotazione, nuovoLuogoConsegna);
                                    res.json({
                                        result: "Luogo di consegna modificato con successo!",
                                        datiPrenotazione: prenotazionePresente
                                    });
                                } catch (error) {
                                    res.status(500).json({
                                        success: false,
                                        error: error.message
                                    });
                                }
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                }); 
                            }

                        }
                    }
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        error: error.message
                    }); 
                } 
            }
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        }); 
    }
    //**************************************************************************** */
};

exports.modificaDataRitiro = async (req, res, next) => {
    //Mi consente di modificare la data di prelievo o di consegna del mezzo. Gli passo l'idPrenotazione
    //cambierà il prezzo...

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    const {
        idPrenotazione,
        nuovaDataRitiro,
        nuovaOraRitiro
    } = req.body;

    try {
        
        const prenotazionePresente = await Prenotazione.findOne({ _id: idPrenotazione });
        if(!prenotazionePresente) {
            res.json({ result: "Prenotazione non presente!" });
        } else {
            //controllo che nuova data e nuova ora siano >= di quelle vecchie...
            let dataRN = Date.parse(convertFromStringToDate(nuovaDataRitiro, nuovaOraRitiro));
            var dataAttuale = new Date();

            var dataCorrente = (dataAttuale.getDate() + '/' + (dataAttuale.getMonth() + 1) + '/' + dataAttuale.getFullYear());
            var oraCorrente = (dataAttuale.getHours() + ':' + dataAttuale.getMinutes());
            var dataCompletaAttuale = Date.parse(convertFromStringToDate(dataCorrente, oraCorrente));
            
            if (dataRN < dataCompletaAttuale) {
                res.json({ result: "Non disponiamo ancora della DeLorean di Emmett Brown per tornare indietro nel tempo! Scegli una data di ritiro maggiore di quella attuale!" });
            } else {
                //Controllo che lo stato della prenotazione sia "PROGRAMMATA"
                if (prenotazionePresente.statoPrenotazione === "PROGRAMMATA") {
                    try {
                        const mezzo = await Mezzo.findOne({ targa: prenotazionePresente.targaVeicolo });
                        if (!mezzo) {
                            res.json({ result: "Mezzo non trovato!"});
                        } else {
                            //Controllo se è presente il servizio autista...
                            if (prenotazionePresente.servizioAutista === true) {
                                try {
                                    notifica.inviaEmailModificaDataRitiroAutista(
                                        mezzo.emailAutista,
                                        prenotazionePresente.luogoRitiro,
                                        nuovaDataRitiro,
                                        nuovaOraRitiro
                                    );
                                } catch (error) {
                                    res.status(500).json({
                                        success: false,
                                        error: error.message
                                    });
                                }
                            }
        
                            //aggiorno la prenotazione (dataRitiro, oraRitiro, prezzo) e invio l'email al cliente...
                            try {
                                var dataC = Date.parse(convertFromStringToDate(prenotazionePresente.dataConsegna, prenotazionePresente.oraConsegna));     //Stessa cosa con data e ora di consegna 
        
                                let differenzaDate = dataC - dataRN;
                                await prenotazionePresente.updateOne({ 
                                    dataRitiro: nuovaDataRitiro,
                                    oraRitiro: nuovaOraRitiro,
                                    prezzo: (mezzo.prezzoOrario / (60 * 60 * 1000) * differenzaDate)
                                });
                                try {
                                    await prenotazionePresente.save();
                                    notifica.inviaEmailModificaDataRitiroCliente(
                                        prenotazionePresente.emailCliente,
                                        idPrenotazione,
                                        nuovaDataRitiro, 
                                        nuovaOraRitiro,
                                        prenotazionePresente.prezzo
                                    );
                                    res.json({ 
                                        datiPrenotazione: prenotazionePresente,
                                        result: "Data di ritiro modificata con successo!" 
                                    });
                                } catch (error) {
                                    res.status(500).json({
                                        success: false,
                                        error: error.message
                                    });
                                }
        
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                });
                            }
                            
                        }
                        
                    } catch (error) {
                        res.status(500).json({
                            success: false,
                            error: error.message
                        });
                    }

                } else {
                    res.json({ result: "Impossibile modificare data di ritiro in quanto la prenotazione è già iniziata o si è conclusa!" });
                }
            }

        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
};

exports.modificaDataConsegna = async (req, res, next) => {
    //Mi consente di modificare la data di prelievo o di consegna del mezzo. Gli passo l'idPrenotazione
    //cambierà il prezzo...
    const {
        idPrenotazione,
        nuovaDataConsegna,
        nuovaOraConsegna
    } = req.body;

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    try {
        
        const prenotazionePresente = await Prenotazione.findOne({ _id: idPrenotazione });
        if (!prenotazionePresente) {
            res.json({ result: "Prenotazione non presente!" });
        } else {
            let dataR = Date.parse(convertFromStringToDate(prenotazionePresente.dataRitiro, prenotazionePresente.oraRitiro));
            let dataCN = Date.parse(convertFromStringToDate(nuovaDataConsegna, nuovaOraConsegna));

            var dataAttuale = new Date();

            var dataCorrente = (dataAttuale.getDate() + '/' + (dataAttuale.getMonth() + 1) + '/' + dataAttuale.getFullYear());
            var oraCorrente = (dataAttuale.getHours() + ':' + dataAttuale.getMinutes());
            var dataCompletaAttuale = Date.parse(convertFromStringToDate(dataCorrente, oraCorrente));

            if ( dataR >= dataCN || dataCN < dataCompletaAttuale ) {
                res.json({ result: "Non è possibile che la data di consegna di un veicolo sia minore di quella di prenotazione!" });
            } else {
                try {
                    const mezzo = await Mezzo.findOne({ targa: prenotazionePresente.targaVeicolo });
                    if (!mezzo) {
                        res.json({ result: "Mezzo non trovato!" });
                    } else {
                        //Controllo se è presente il servizio autista...
                        if (prenotazionePresente.servizioAutista === true) {
                            try {
                                notifica.inviaEmailModificaDataConsegnaAutista(
                                    mezzo.emailAutista,
                                    prenotazionePresente.luogoConsegna,
                                    nuovaDataConsegna,
                                    nuovaOraConsegna
                                );
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                });
                            }
                        }
                        //aggiorno la prenotazione (dataConsegna, oraConsegna, prezzo) e invio l'email al cliente...
                        try { 

                            let differenzaDate = dataCN - dataR;
                            console.log(dataCN);
                            console.log(differenzaDate);
                            await prenotazionePresente.updateOne({
                                dataConsegna: nuovaDataConsegna,
                                oraConsegna: nuovaOraConsegna,
                                prezzo: (mezzo.prezzoOrario / (60 * 60 * 1000) * differenzaDate)
                            });
                            console.log(prenotazionePresente.prezzo);

                            try {
                                await prenotazionePresente.save();
                                notifica.inviaEmailModificaDataConsegnaCliente(
                                    prenotazionePresente.emailCliente,
                                    idPrenotazione,
                                    nuovaDataConsegna,
                                    nuovaOraConsegna,
                                    prenotazionePresente.prezzo
                                );
                                console.log(prenotazionePresente.prezzo);
                                res.json({
                                    datiPrenotazione: prenotazionePresente,
                                    result: "Data di consegna modificata con successo!"
                                });
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                });  
                            }

                        } catch (error) {
                            res.status(500).json({
                                success: false,
                                error: error.message
                            });  
                        }
                    }
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        error: error.message
                    });
                }
            }

        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
};

exports.segnalaGuasto = async (req, res, next) => {
    //invia un'email al cliente dove dice che un autista lo verrà a prelevare
    /*
    segnalaGuasto (idPrenotazione, luogoGuasto)
    dall'idPrenotazione prendo emailCliente e la targa del mezzo. Mando una email al cliente dove gli dico che verrà 
    contattato il prima possibile. Modifico lo stato del mezzo a "Guasto" e modifico la prenotazione in modo da far
    spuntare come luogoConsegna il luogo del guasto, la data e l'ora di consegna saranno quelle attuali,
    mentre il prezzo sarà calcolato in base ai nuovi valori
    Devo aumentare il numero di posti disponibili presso il vecchio luogo di consegna.
    */
   
    const {
        idPrenotazione,
        luogoGuasto
    } = req.body;

    try {
        
        const prenotazionePresente = await Prenotazione.findOne({ _id: idPrenotazione });

        if (!prenotazionePresente) {
            res.json({ result: "Prenotazione non presente!" });
        } else {
            
            try {
                const mezzo = await Mezzo.findOne({ targa: prenotazionePresente.targaVeicolo });
                if (prenotazionePresente.statoPrenotazione !== "INIZIATA") {
                    res.json({ result: "Impossibile terminare questa prenotazione, in quanto già terminata o non ancora iniziata!" });
                } else {
                    
                    //Stoppo i timer
                    stopTimer(timerInizioPrenotazione);
                    stopTimer(timerTempoScaduto);
                    
                    var dataAttuale = new Date();
                    var dataGuasto = (dataAttuale.getDate() + '/' + (dataAttuale.getMonth() + 1) + '/' + dataAttuale.getFullYear());
                    var oraGuasto = (dataAttuale.getHours() + ':' + dataAttuale.getMinutes());

                    var dataR = Date.parse(convertFromStringToDate(prenotazionePresente.dataRitiro, prenotazionePresente.oraRitiro));         //converte in ms la data e l'ora di ritiro
                    var dataCompletaGuasto = Date.parse(convertFromStringToDate(dataGuasto, oraGuasto));
                    console.log(dataR);
                    console.log(dataCompletaGuasto);
                    var differenzaDate = dataCompletaGuasto - dataR;
                    console.log(differenzaDate);

                    if(prenotazionePresente.servizioAutista === true) {
                        //devo fornire indicazioni anche all'autista...
                        notifica.inviaEmailSegnalaGuastoAutista(
                            mezzo.emailAutista,
                            dataGuasto,
                            oraGuasto,
                            luogoGuasto
                        );
                    }

                    try {
                        await prenotazionePresente.updateOne({
                            dataConsegna: dataGuasto,
                            oraConsegna: oraGuasto,
                            prezzo: (mezzo.prezzoOrario / (60 * 60 * 1000) * differenzaDate),
                            statoPrenotazione: "TERMINATA"
                        });
            
                        try {
                            await prenotazionePresente.save();
                            notifica.inviaEmailSegnalaGuastoCliente(
                                prenotazionePresente.emailCliente,
                                idPrenotazione,
                                dataGuasto,
                                oraGuasto,
                                luogoGuasto,
                                (mezzo.prezzoOrario / (60 * 60 * 1000) * differenzaDate)
                            );
                            
                            try {
                                await mezzo.updateOne({
                                    posizione: luogoGuasto,
                                    stato: "Guasto"
                                });
                                res.json({ 
                                    result: "Guasto segnalato con successo!",
                                    datiMezzo: mezzo,
                                    datiPrenotazione: prenotazionePresente
                                });
                            } catch (error) {
                                res.status(500).json({
                                    success: false,
                                    error: error.message
                                });      
                            }
                        } catch (error) {
                            res.status(500).json({
                                success: false,
                                error: error.message
                            });
                        }
                        
                        try {
                            
                        } catch (error) {
                            res.status(500).json({
                                success: false,
                                error: error.message
                            });    
                        }
                    } catch (error) {
                        res.status(500).json({
                            success: false,
                            error: error.message
                        });
                    }
                }
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                });      
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

//BICI E MONOPATTINI
exports.iniziaPrenotazioneBM = async (req, res, next) => {
    //La uso per creare una prenotazione per bici o monopattini, che non hanno bisogno di programmare una prenotazione  
    const {
        idMezzo,
        emailCliente,
        numeroCartaCliente
    } = req.body;

    try {
        //Verifico che l'utente inserito sia presente...
        const clientePresente = await Utente.findOne({ email:emailCliente });
    
        if(!clientePresente) {
            res.json({ result: "Utente non trovato!" });
        } else {
            try {
                //Verifico che sia presente la carta di credito inserita...
                const cartaPresente = await Wallet.findOne({ email: emailCliente });

                const numeroCartaDecriptato = decryptString(cartaPresente.numeroCartaCredito, key);
                console.log(numeroCartaDecriptato);
                if (!cartaPresente || numeroCartaDecriptato !== numeroCartaCliente) {
                    res.json({ result: "Impossibile pagare con questa carta!" });
                } else {
                    var data = new Date();
                    try {
                        //Verifico adesso che l'id sia presente tra i mezzi...
                        const veicoloPresente = await Mezzo.findOne({targa: idMezzo});

                        if (!veicoloPresente || veicoloPresente.stato === "Occupato" || veicoloPresente.stato === "Guasto") {
                            res.json({ result: "Impossibile noleggiare il veicolo!"});
                        } else {
                            const stallo = await Stallo.findOne({ indirizzoStallo: veicoloPresente.posizione });
                            
                            if(!stallo) {
                                res.json({ result: "Impossibile ritirare qui il mezzo!" });
                            } else {
                                try {
                                    //Aumento il numero di posti disponibili dello stallo...
                                    await stallo.updateOne({ postiDisponibili: (stallo.postiDisponibili + 1) });
                                    
                                    await veicoloPresente.updateOne({ stato: "Occupato" });

                                    //Creo una nuova prenotazione...
                                    const nuovaPrenotazione = await Prenotazione.create({
                                        emailCliente,
                                        targaVeicolo: idMezzo,
                                        categoriaVeicolo: veicoloPresente.tipoMezzo,
                                        luogoRitiro: veicoloPresente.posizione,
                                        luogoConsegna: "null",
                                        dataRitiro: (data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear()),
                                        oraRitiro: (data.getHours() + ':' + data.getMinutes()),
                                        dataConsegna: null,
                                        oraConsegna: null,
                                        prezzo: null,
                                        statoPrenotazione: "INIZIATA",
                                        metodoPagamento: `Carta di credito terminante per ${numeroCartaCliente.slice(-4)}`
                                    });

                                    try {
                                        await nuovaPrenotazione.save();
                                        notifica.inviaEmailInizioPrenotazione(emailCliente, nuovaPrenotazione._id);
                                        res.json({ datiPrenotazione: nuovaPrenotazione });
                                    } catch (error) {
                                        res.status(500).json({
                                            success: false,
                                            error: error.message
                                        });
                                    }

                                } catch (error) {
                                    res.status(500).json({
                                        success: false,
                                        error: error.message
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

exports.terminaPrenotazioneBM = async (req, res, next) => {
    //Serve ad impostare lo stato a "Libero", a vedere dove è stato depositato il veicolo e a calcolare il prezzo da pagare...
    
    const {
        emailCliente,
        idMezzo,
        luogoConsegna
    } = req.body;
    

    try {
        var data = new Date();
        console.log(data);
        var dataC = (data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear());
        var oraC = (data.getHours() + ':' + data.getMinutes());
console.log(dataC);
console.log(oraC);
        var dataMS = Date.parse(convertFromStringToDate(dataC, oraC));

        const prenotazioneDaTerminare = await Prenotazione.findOne({
                                            emailCliente: emailCliente,
                                            targaVeicolo: idMezzo,
                                            statoPrenotazione: "INIZIATA",
                                            //$or: [{ categoriaVeicolo: "Bici" }, { categoriaVeicolo: "Monopattino" } ]
                                            })
        console.log(prenotazioneDaTerminare);
                                            console.log(prenotazioneDaTerminare.dataRitiro);
                                            console.log(prenotazioneDaTerminare.oraRitiro)
        var dataR = Date.parse(convertFromStringToDate(prenotazioneDaTerminare.dataRitiro, prenotazioneDaTerminare.oraRitiro));
        const mezzoDaConsegnare = await Mezzo.findOne({ targa: idMezzo });
        // CONTROLLARE CHE LO STALLO ESISTA, CHE IL TIPO DEI VEICOLI SIA LO STESSO DEL VEICOLO NOLEGGIATO
        const stalloConsegna = await Stallo.findOne({ indirizzoStallo: luogoConsegna });
        
        if (prenotazioneDaTerminare.statoPrenotazione === "TERMINATA") {
            res.json({ result: "Prenotazione già terminata!" });
        } else {
            if (!stalloConsegna || stalloConsegna.tipoMezzi !== mezzoDaConsegnare.tipoMezzo || stalloConsegna.postiDisponibili === 0) {
                res.json({ result: "Impossibile consegnare qui il mezzo!" });
            } else {
                try {
                    // POI IMPOSTARE LUOGO DI CONSEGNA, DATA DI CONSEGNA, ORA DI CONSEGNA, PREZZO 
                    await prenotazioneDaTerminare.updateOne({
                        luogoConsegna: luogoConsegna,
                        dataConsegna: dataC,
                        oraConsegna: oraC,
                        prezzo: (mezzoDaConsegnare.prezzoOrario / (60 * 60 * 1000) * (dataMS - dataR)),
                        statoPrenotazione: "TERMINATA"
                    });

                    try {
                        // SUCCESSIVAMENTE PASSARE LO STATO DEL MEZZO A "Libero" E DECREMENTARE IL NUMERO DEI POSTI DISPONIBILI NELLO STALLO
                        notifica.inviaEmailFinePrenotazione(prenotazioneDaTerminare.emailCliente, prenotazioneDaTerminare._id);
                        
                        await mezzoDaConsegnare.updateOne({ stato: "Libero" });
                        
                        await stalloConsegna.updateOne({ postiDisponibili: (stalloConsegna.postiDisponibili - 1) });
                        
                        try {
                            await prenotazioneDaTerminare.save();

                            const utente = await Utente.findOne({ email: emailCliente });
                            notifica.inviaEmailDettaglioNoleggio(
                                emailCliente,
                                utente.nome,
                                utente.cognome,
                                prenotazioneDaTerminare._id,
                                prenotazioneDaTerminare.targaVeicolo,
                                prenotazioneDaTerminare.categoriaVeicolo,
                                prenotazioneDaTerminare.luogoRitiro,
                                prenotazioneDaTerminare.luogoConsegna,
                                prenotazioneDaTerminare.dataRitiro,
                                prenotazioneDaTerminare.oraRitiro,
                                prenotazioneDaTerminare.dataConsegna,
                                prenotazioneDaTerminare.oraConsegna,
                                prenotazioneDaTerminare.prezzo,
                                prenotazioneDaTerminare.servizioAutista,
                                prenotazioneDaTerminare.metodoPagamento
                            );
                            res.json({
                                datiPrenotazione: prenotazioneDaTerminare,
                                result: "Prenotazione terminata con successo!"
                            });
                        } catch (error) {
                            res.status(500).json({
                                success: false,
                                error: error.message
                            });
                        }

                    } catch (error) {
                        res.status(500).json({
                            success: false,
                            error: error.message
                        });
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

function stopTimer(timer) {
    clearInterval(timer);
};

function convertFromStringToDate(data, ora) {
    let datePieces = data.split("/");
    let timePieces = ora.split(":");
    return (new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],
        timePieces[0], timePieces[1]))
};



