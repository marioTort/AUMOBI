const Utente = require('../models/Utenti');
const Stallo = require('../models/Stalli');
const notifica = require('./notifiche');

exports.registrazioneCliente = async (req, res, next) => {
    const {
        nome,
        cognome,
        sesso,
        luogoDiNascita,
        dataDiNascita,
        CF,
        email,
        telefono,
        password
    } = req.body;

    try {

        const cliente = await Utente.create({
            nome,
            cognome,
            sesso,
            luogoDiNascita,
            dataDiNascita,
            CF,
            email,
            telefono,
            password
        });

        sendToken(cliente, 201, res);
        notifica.inviaEmailAvvenutaRegistrazione(cliente.email);

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.registrazioneImpiegato = async (req, res, next) => {
    
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
    } = req.body;

    try {

        const impiegato = await Utente.create({
            nome,
            cognome,
            sesso,
            luogoDiNascita,
            dataDiNascita,
            CF,
            email,
            telefono,
            password,
            tipoUtente
        });

        sendToken(impiegato, 201, res);
        notifica.inviaEmailAvvenutaRegistrazione(impiegato.email);
    
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }

};

exports.assegnaParcheggiatore = async (req, res, next) => {
    const {
        email,
        indirizzoAssegnazioneParcheggiatore
    } = req.body;

    let impiegatoPresente;

    try {
        impiegatoPresente = await Utente.findOne({ email });
        if (!impiegatoPresente) {
            res.json({ result: "Impiegato non presente!" });
        } else {
            if (impiegatoPresente.tipoUtente === 'Parcheggiatore') {
                try {
                    //DEVO VERIFICARE CHE LO STALLO ESISTA ED EVENTUALMENTE SOSTITUIRE IL PARCHEGGIATORE
                    const stalloPresente = await Stallo.findOne({ indirizzoStallo: indirizzoAssegnazioneParcheggiatore });

                    if (!stalloPresente) {
                        res.json({ result: "Stallo non presente!" });
                    } else {

                        try {
                            const vecchioParcheggiatore = await Utente.findOne({ email: stalloPresente.emailParcheggiatore });

                            if(vecchioParcheggiatore) {
                                await vecchioParcheggiatore.updateOne({ indirizzoAssegnazioneParcheggiatore: null });
                                notifica.inviaEmailCambioParcheggiatore(stalloPresente.emailParcheggiatore);
                            }

                        } catch (error) {
                            res.status(500).json({
                                success: false,
                                error: error.message,
                            });
                        }


                        await stalloPresente.updateOne({ emailParcheggiatore: email});

                        try {
                            await impiegatoPresente.updateOne({
                                indirizzoAssegnazioneParcheggiatore: indirizzoAssegnazioneParcheggiatore
                            });
                            notifica.inviaEmailAssegnazioneStallo(email, indirizzoAssegnazioneParcheggiatore);
                            res.json({ success: "Indirizzo correttamente assegnato!" });
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
            } else {
                res.json({ result: "L'impiegato selezionato non è un parcheggiatore!" });
            }
        }
        
    } catch (error) {
        res.json({ result: false });
    }

};

const sendToken = (utente, statusCode, res) => {
    const token = utente.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token
    });
}