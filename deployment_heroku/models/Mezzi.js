const mongoose = require("mongoose");

const MezziSchema = new mongoose.Schema({
    targa: {
        type: String,
        required: false,
        unique: true,
        match: [
            /^[a-zA-Z]{1,2}[0-9]{2,4}[a-zA-Z]{2,3}$/,
            "Inserisci un formato di targa valido"
        ]
    },
    emailAutista: {                 // Solo i veicoli muniti di autista avranno questo attributo
        type: String,
        required: false,
    },
    tipoMezzo: {                    // Auto, Moto, Monopattino o Bici
        type: String,
        required: true
    },
    categoriaMezzo: {
        type: String,
        required: false
    },
    posizione: {                    // Indirizzo dello stallo
        type: String,
        required: true
    },
    stato: {                        // Libero o Occupato. Coinciderà con lo stato dell'autista associato al mezzo
        type: String,
        required: false             // Mi serve quando vengono noleggiati bici e monopattini
    },
    prezzoOrario: {
        type: Number,
        required: true,
    }

});

const MezziModel = mongoose.model("Mezzi", MezziSchema);

module.exports = MezziModel;

