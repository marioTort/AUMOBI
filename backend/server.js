require('dotenv').config({path: "./config.env"});
const express = require('express');
const connectDB = require('./config/db');

//Mi connetto al DB...

connectDB();

const app = express();

app.use(express.json());

//Connetto il mio route

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/autenticazione", require("./routes/autenticazione"));
app.use("/api/patente", require("./routes/patente"));
app.use("/api/wallet", require("./routes/wallet"));
app.use("/api/registrazione", require("./routes/registrazione"));
app.use("/api/prenotazione", require("./routes/prenotazione"));
app.use("/api/mezzo", require("./routes/mezzo"));
app.use("/api/stallo", require("./routes/stallo"));
app.use("/api/fetch", require("./routes/fetch"));

//Creo il processo che avvia il server sulla porta 5000

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server avviato sulla porta ' +PORT));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1))             //Mi arresta il server senza far crashare nulla
})