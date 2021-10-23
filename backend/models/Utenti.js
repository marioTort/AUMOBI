const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UtentiSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cognome: {
        type: String,
        required: true
    },
    sesso: {
        type: String,
        required: true
    },
    luogoDiNascita: {
        type: String,
        required: true
    },
    dataDiNascita: {
        type: String,
        required: true,
        match: [
            /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
            "Inserire data di nascita nel formato gg/mm/aaaa"
        ]
    },
    CF: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/,
            "Inserire un formato valido!"
        ]
    },
    email: {
        type: String,
        required: [true, "Inserisci il tuo indirizzo email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Per favore, inserisci un indirizzo e-mail valido",
        ]
    },
    telefono: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$/,
            "Per favore, inserisci un formato valido. Es: +39 333 3333333"
        ]
    },
    password: {
        type: String,
        required: [true, "Per favore, inserisci una password di almeno 8 caratteri"],
        minlength: 8,
        select: false       //We don't want the password to be sent back as well unless we explicitly tell ask the query for it
    },
    tipoUtente: {
        type: String,                               //Admin, Autista o Parcheggiatore
        required: false
    },
    indirizzoAssegnazioneParcheggiatore: {          // Valido solo per utente di tipo " PARCHEGGIATORE ". Verrà assegnato dall'admin
        type: String,
        required: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UtentiSchema.pre("save", async function (next) {        //Devo avviarlo prima che l'utente venga salvato
    //Faccio il check di alcune cose...

    //Se la password non è stata modificata, si limita a salvare solo la password attuale. La password non è stata modificata => vai avanti.
    if(!this.isModified("password")) {
        next();
    }

    //Uso bcryptjs per creare un salt, ovvero una sequenza casuale di bit che, combinata assieme alla password, mi genera un output che viene inserito al posto della sola password per salvaguardare le password salvate in memoria

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();       
});              

// Funzione che permette di confrontare la password memorizzata nel db con quella immessa al momento del login
UtentiSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Questa funzione andrà ad usare JsonWebToken al fine di ritornare un token assegnato
// come payload uso l'id, mentre vado a creare una key segreta al fine di garantire un minimo di sicurezza agli utenti
// A tal fine vado a generare una stringa di 35 byte randomici codificati in esadecimale, usando il package crypto 
// di nodeJS. Il risultato ottenuto è il mio JWT_SECRET. Questi token avranno durata (JWT_EXPIRE) di 10 minuti.
UtentiSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

UtentiSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    //sha256 è il tipo di algoritmo
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    //Aggiunge alla data corrente 10 minuti
    return resetToken;
}

const UtentiModel = mongoose.model('Utenti', UtentiSchema);

module.exports = UtentiModel;