const pdf = require("jspdf");
const logoConfig = require ("./logo");
const invioEmailAllegato = require("./invioEmailAllegato");

exports.dettaglioNoleggio = async function (
    email,
    nome,
    cognome,
    idPrenotazione, 
    targaVeicolo, 
    categoriaVeicolo, 
    luogoRitiro, 
    luogoConsegna, 
    dataRitiro, 
    oraRitiro, 
    dataConsegna, 
    oraConsegna, 
    prezzo, 
    servizioAutista,
    numeroCartaCredito,
    intestatario
    ) {
    
    var doc = new pdf()
    var imgData = logoConfig.logo.uri 

    doc.addImage(imgData, 'PNG', 86, 270, 50, 28)

    doc.setFontSize("22")
    doc.text(`Resoconto noleggio:`, 70, 20)

    doc.setFontSize("18")

    doc.text(`Dati cliente: `, 10, 40)
    doc.text(`Nome e cognome: ${nome} ${cognome}`, 30, 50)

    doc.text(`Dati pagamento: `, 10, 65)
    doc.text(`Numero carta di credito: ${numeroCartaCredito}`, 30, 75)
    doc.text(`Intestatario: ${intestatario}`, 30, 85)

    doc.text(`Dati prenotazione: `, 10, 100)
    doc.text(`ID: ${idPrenotazione}`, 30, 110)
    doc.text(`Targa veicolo: ${targaVeicolo}`, 30, 120)
    doc.text(`Categoria veicolo: ${categoriaVeicolo}`, 30, 130)
    doc.text(`Luogo ritiro: ${luogoRitiro}`, 30, 140)
    doc.text(`Data ritiro: ${dataRitiro}`, 30, 150)
    doc.text(`Ora ritiro: ${oraRitiro}`, 30, 160)
    doc.text(`Luogo consegna: ${luogoConsegna}`, 30, 170)
    doc.text(`Data consegna: ${dataConsegna}`, 30, 180)
    doc.text(`Ora consegna: ${oraConsegna}`, 30, 190)
    doc.text(`Prezzo: € ${prezzo}`, 30, 200)
    doc.text(`Servizio autista: ${servizioAutista}`, 30, 210)

    doc.text(`Grazie per aver scelto il servizio AUMOBI! `, 50, 255)

    doc.save(`../pdf/${idPrenotazione}.pdf`);

    const message = `
            <p>
                Fattura relativa al noleggio #${idPrenotazione}
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmailAllegato({
        to: email,
        subject: "Invio fattura AUMOBI",
        text: message,
        attachments: doc
    });

};






