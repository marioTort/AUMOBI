const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    intestatario: {
        type: String,
        required: true,
    },
    numeroCartaCredito: {
        type: String,
        required: true,
    },
    annoScadenzaCarta: {
        type: String,
        required: true,
    },
    meseScadenzaCarta: {
        type: String,
        required: true,
    },
    CVV: {
        type: String,
        required: true,
        select: false,
        match: [
            /^[0-9]{3,4}$/
        ]
    }
});

/*WalletSchema.pre("save", async function (next) {        

    //Uso bcryptjs per creare un salt, ovvero una sequenza casuale di bit che, combinata assieme al numero della carta, mi genera un output che viene inserito al posto del solo numero per salvaguardare le carte salvate in memoria

    const salt = await bcrypt.genSalt(10);
    this.CVV = await bcrypt.hash(this.CVV, salt);
    next();
});  */

const WalletModel = mongoose.model('Wallet', WalletSchema);

module.exports = WalletModel;