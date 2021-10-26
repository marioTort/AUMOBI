const Utente = require("../models/Utenti");
const Prenotazione = require("../models/Prenotazioni");
const Mezzo = require("../models/Mezzi");
const Wallet = require("../models/Wallet");
const Stallo = require("../models/Stalli");
const Patente = require('../models/Patenti');



//Utente

//Prenotazione

exports.storicoPrenotazioni = async (req, res, next) => {
    //Semplice get che mi ritorna la lista di tutte le prenotazioni effettuate. Lo riciclo anche per l'autista. Gli passo l'email tanto

    const prenotazioni = await Prenotazione.find();
    res.json(prenotazioni);

};

exports.prenotazioniUtente = async (req, res, next) => {
    //Semplice get che mi ritorna la lista di tutte le prenotazioni effettuate. Lo riciclo anche per l'autista. Gli passo l'email tanto
    //res.send("Storico Prenotazioni Route");

    const { emailCliente } = req.body;

    const prenotazioni = await Prenotazione.find(
        { emailCliente: emailCliente }
    );
    
    //const prenotazioni = await Prenotazione.find(emailCliente);
    if(prenotazioni.length === 0) {
        res.json({result: "Nessuna prenotazione presente!"});
    } else {
        res.json(prenotazioni);
    }

};

//Mezzo

//Wallet

//Stallo

//Patente

exports.patenteUtente = async (req, res, next) => {

    const {
        email
    } = req.body;
    try {
        const patente = await Patente.find(
            {email: email}
        );
        res.json({datiPatente: patente});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.elencoPatenti = async (req, res, next) => {
    const patenti = await Patente.find();
    res.json(patenti);
};