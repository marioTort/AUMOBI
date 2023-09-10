const mongoose = require('mongoose');

const PrenotazioniSchema = new mongoose.Schema({
    emailCliente: {
        type: String,
        required: [true, "Per favore, inserisci una email valida"]
    },
    targaVeicolo: {
        type: String,
        required: false
    },
    categoriaVeicolo: {
        type: String,
        required: false,
    },
    luogoRitiro: {
        type: String,
        required: [true, "Per favore, seleziona un luogo di ritiro tra quelli elencati"]
    },
    luogoConsegna: {
        type: String,
        required: [true, "Per favore, seleziona un luogo di consegna tra quelli elencati"]
    },
    dataRitiro: {
        type: String,
        required: [true, "Per favore, inserisci una data di ritiro del mezzo"]
    },
    oraRitiro: {
        type: String,
        required: [true, "Per favore, inserisci un'ora di ritiro del mezzo"]
    },
    dataConsegna: {
        type: String,
        required: [false, "Per favore, inserisci una data di consegna del mezzo"]
    },
    oraConsegna: {
        type: String,
        required: [false, "Per favore, inserisci un'ora di consegna del mezzo"]
    },
    prezzo: {
        type: String,
        required: false
    },
    servizioAutista: {
        type: Boolean,
        required: false
    },
    statoPrenotazione: {
        type: String,
        required: true
    },
    metodoPagamento: {
        type: String,
        required: true
    }
});

const PrenotazioniModel = mongoose.model('Prenotazioni', PrenotazioniSchema);

module.exports = PrenotazioniModel;