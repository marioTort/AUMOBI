const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const PatentiSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    numeroPatente: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^([A-Z]{2}\d{7}[A-Z])|(^[U]1[BCDEFGHLMNPRSTUWYXZ]\w{6}[A-Z])$/,
            "Inserire numero patente corretto. Es: U1R108108P"
        ]
    },
    dataScadenza: {
        type: String,
        required: true,
    },
    categoria: {                            // AM, A1, B
        type: String,
        required: true,
    }
});

PatentiSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

const PatentiModel = mongoose.model('Patenti', PatentiSchema);

module.exports = PatentiModel;