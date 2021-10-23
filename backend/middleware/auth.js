const jwt = require('jsonwebtoken');
const Utente = require('../models/Utenti');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        res.status(401).json({
            success: false,
            error: "Non sei autorizzato ad accedere a questa area"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const utente = await Utente.findById(decoded.id);

        if (!utente) {
            res.status(404).json({
                success: false,
                error: "Nessun utente trovato con questo id"
            });
        }

        req.utente = utente;

        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            error: "Non sei autorizzato ad accedere a questa area"
        });
    }
}