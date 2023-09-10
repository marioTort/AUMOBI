const Patente = require('../models/Patenti');

exports.aggiungiPatente = async (req, res, next) => {
    const {
        email,
        numeroPatente,
        dataScadenza,
        categoria
    } = req.body;
    
    //Elimino un'eventuale patente dell'utente se questa è già presente nel database
    try {
        await Patente.deleteOne({ email });
    } catch (error) {
        res.json({ result: false });
    }
    //Altrimenti la inserisco
    try {
        
        const patente = await Patente.create({
            email,
            numeroPatente,
            dataScadenza,
            categoria
        });


        try {
            await patente.save();
        } catch (error) {
            res.json({ result: false });
        }

        res.json({ datiPatente: patente });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }

};

exports.eliminaPatente = async (req, res, next) => {
    const email = req.body.email;

    try {
        await Patente.deleteOne({ email: email });
    } catch (error) {
        res.json({ result: false });
    }
    res.json({ result: true });
};
