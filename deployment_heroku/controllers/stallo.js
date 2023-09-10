const Stallo = require("../models/Stalli");

exports.aggiungiStallo = async (req, res, next) => {
    const {
        indirizzoStallo,
        tipoMezzi,
        postiDisponibili,
        capienza
    } = req.body;


    let stalloPresente;

    try {
        stalloPresente = await Stallo.findOne({ indirizzoStallo });
    } catch (error) {
        res.json({ result: false });
    }

    if (stalloPresente) {
        //Controllo se lo stallo è già presente nel db e, in tal caso, invio un messaggio di errore

        res.json({ result: "Stallo già inserito" });

    } else {
        // Altrimenti lo inserisco

        try {
            const stallo = await Stallo.create({
                indirizzoStallo,
                tipoMezzi,
                postiDisponibili,
                capienza
            });

            try {
                await stallo.save();
            } catch (error) {
                res.json({ result: "Errore nel salvataggio dello stallo!" });
            }

            res.json({ datiStallo: stallo });

        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }

    }

};

exports.eliminaStallo = async (req, res, next) => {
    const indirizzoStallo = req.body.indirizzoStallo;

    let stalloPresente;

    try {
        stalloPresente = await Stallo.findOneAndDelete({ indirizzoStallo });
    } catch (error) {
        res.json({ result: false });
    }

    if (stalloPresente) {
        res.json({ result: "Punto di stallo eliminato con successo!" });
    } else {
        res.json({ result: "Punto di stallo non presente!" });
    }
};