const mongoose = require("mongoose");

const StalliSchema = new mongoose.Schema({
    indirizzoStallo: {
        type: String,
        required: true
    },
    tipoMezzi: {                // Auto, Moto, Bici, Monopattini
        type: String,           
        required: true
    },
    postiDisponibili: {         
        type: Number,
        required: true
    },
    capienza: {                             
        type: Number,
        required: true
    },
    emailParcheggiatore: { 
        type: String,
        required: false
    }
});

const StalliModel = mongoose.model("Stalli", StalliSchema);

module.exports = StalliModel;