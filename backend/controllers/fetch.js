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

exports.listaVeicoliAutistaDisponibili = async (req, res) => {

    try {
        
        const veicoli = await Mezzo.find(
            {
                emailAutista: {$ne: null},
                stato: {$ne: "Occupato"}
        }
        )
        res.json({ listaVeicoli: veicoli });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }

}

exports.listaVeicoliDisponibiliStallo = async (req, res) => {

    const { 
        indirizzoStallo,
        categoriaMezzo
    } = req.body;

    try {
        const auto = await Mezzo.find(
            {
                posizione: indirizzoStallo,
                stato: "Libero",
                emailAutista: null,
                categoriaMezzo: categoriaMezzo
            }
        )
        res.json({ listaMezzi: auto });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }

    

}

//Mezzo

//Wallet

//Stallo
exports.listaStalli = async (req, res, next) => {

    const {
        tipoMezzi
    } = req.body;
    try {
        const stallo = await Stallo.find(
            { tipoMezzi: tipoMezzi}
        );
        res.json({listaStalli: stallo});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
//Patente

exports.patenteUtente = async (req, res, next) => {

    const {
        email
    } = req.body;
    try {
        const patente = await Patente.find(
            {email: email}
        );
        res.json(patente);
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