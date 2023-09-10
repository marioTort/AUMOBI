const invioEmail = require("../utils/invioEmail");
const { jsPDF } = require("jspdf");
const logoConfig = require("../utils/logo");

const invioEmailAllegato = require("../utils/invioEmailAllegato");
const path = require('path');


//REGISTRAZIONE

exports.inviaEmailAvvenutaRegistrazione = async function(email) {
    const loginUrl = `https://aumobi.herokuapp.com/login`;

    const message = `
            <h1>Benvenuto su AUMOBI!</h1>
            <p>
                Ti inviamo questa email per confermare che ti sei correttamente registrato al nostro sito. Benvenuto!    
            </p>
            <p>
                Clicca qui per effettuare il login:
            </p>
            <a href=${loginUrl} clicktracking=off>${loginUrl}</a>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Conferma registrazione AUMOBI",
        text: message
    });

    /*try {
        await invioEmail({
            to: email,
            subject: "Conferma registrazione AUMOBI",
            text: message
        });

        res.status(200).json({
            success: true,
            data: "Email inviata con successo!"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            data: "Impossibile inviare l'email!"
        });
    } */
};

// assegnaParcheggiatore
exports.inviaEmailCambioParcheggiatore = async function (email) {

    const message = `
            <h1>Il tuo stallo è stato aggiornato!</h1>
            <p>
                Ti comunichiamo che un altro parcheggiatore è stato assegnato al tuo stallo. Presto verrai contattato per recarti nel nuovo stallo assegnatoti.
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Aggiornamento parcheggiatore stallo",
        text: message
    });
};
exports.inviaEmailAssegnazioneStallo = async function (email, indirizzoStallo) {

    const message = `
            <h1>Ti abbiamo assegnato un nuovo stallo!</h1>
            <p>
                Recati il più presto possibile allo stallo "${indirizzoStallo}" per prestare servizio.
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Assegnazione nuovo stallo",
        text: message
    });
};

//AUTENTICAZIONE

//MEZZO

//assegnaAutista
exports.inviaEmailCambioAutista = async function (email) {

    const message = `
            <h1>Il tuo veicolo ha cambiato autista!</h1>
            <p>
            Ti comunichiamo che un altro autista è stato assegnato al tuo veicolo! 
            </p>
            <p>
            Presto verrai contattato per recarti nello stallo a prendere il tuo nuovo veicolo.
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Aggiornamento autista",
        text: message
    });
};

exports.inviaEmailAssegnazioneMezzo = async function (email, posizioneMezzo) {

    const message = `
            <h1>Ti abbiamo assegnato un nuovo mezzo!</h1>
            <p>
                Recati il più presto possibile allo stallo ${posizioneMezzo} per ritirare il tuo nuovo veicolo e prestare servizio.
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Assegnazione nuovo mezzo",
        text: message
    });
};

//PRENOTAZIONE

//programmaPrenotazione

exports.inviaEmailProgrammaPrenotazione = async function ( 
    idPrenotazione,    
    email,
    targaVeicolo,
    luogoRitiro,
    luogoConsegna,
    dataRitiro,
    oraRitiro,
    dataConsegna,
    oraConsegna,
    metodoPagamento,
    prezzo
    ) {

    const message = `
            <h1>Prenotazione programmata!</h1>
            <p>
                La tua prenotazione #${idPrenotazione} è stata correttamente programmata. 
            </p>
            <p>
                Ricordati che giorno ${dataRitiro} alle ore ${oraRitiro} dovrai recarti presso ${luogoRitiro} per ritirare il tuo mezzo ${targaVeicolo}.
            </p>
            <p>
                La data di consegna è prevista per il ${dataConsegna} alle ore ${oraConsegna}, presso ${luogoConsegna}. Goditi l'esperienza del servizio AUMOBI!
            </p>
            <p>
                Il prezzo indicativo del noleggio è di € ${prezzo}.
            </p>
            <p>
                Metodo di pagamento: ${metodoPagamento}
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Programmazione prenotazione AUMOBI",
        text: message
    });
};

exports.inviaEmailProgrammaPrenotazioneConAutista = async function (
    idPrenotazione,
    email,
    targaVeicolo,
    luogoRitiro,
    luogoConsegna,
    dataRitiro,
    oraRitiro,
    dataConsegna,
    oraConsegna,
    metodoPagamento,
    prezzo
) {

    const message = `
            <h1>Prenotazione programmata!</h1>
            <p>
                La tua prenotazione #${idPrenotazione} è stata correttamente programmata. 
            </p>
            <p>
                Ricordati che giorno ${dataRitiro} alle ore ${oraRitiro} sarai prelevato da un nostro autista presso ${luogoRitiro} con il mezzo ${targaVeicolo}.
            </p>
            <p>
                La data di consegna è prevista per il ${dataConsegna} alle ore ${oraConsegna}, presso ${luogoConsegna}. Goditi l'esperienza del servizio AUMOBI!
            </p>
            <p>
                Il prezzo indicativo del noleggio è di € ${prezzo}.
            </p>
            <p>
                Metodo di pagamento: ${metodoPagamento}
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Programmazione prenotazione AUMOBI",
        text: message
    });
};

exports.inviaEmailAutista = async function (
    email,
    targaVeicolo,
    luogoRitiro,
    luogoConsegna,
    dataRitiro,
    oraRitiro,
    dataConsegna,
    oraConsegna
) {

    const message = `
            <h1>Prenotazione programmata!</h1>
            <p>
                Abbiamo ricevuto una richiesta di autista da parte di un cliente. 
            </p>
            <p>
                Ricordati che giorno ${dataRitiro} alle ore ${oraRitiro} dovrai prelevare il cliente presso ${luogoRitiro} con il mezzo ${targaVeicolo}.
            </p>
            <p>
                La data di consegna è prevista per il ${dataConsegna} alle ore ${oraConsegna}, presso ${luogoConsegna}.
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Richiesta prenotazione AUMOBI",
        text: message
    });
};

//iniziaPrenotazione

exports.inviaEmailInizioPrenotazione = async function (email, idPrenotazione, dataConsegna, oraConsegna, luogoConsegna) {

    const modificaPercorsoUrl = `https://aumobi.herokuapp.com/archivioprenotazioni`;

    const message = `
            <h1>Prenotazione iniziata!</h1>
            <p>
                La tua prenotazione #${idPrenotazione} è appena iniziata! Goditi l'esperienza del servizio AUMOBI!
            </p>
            
            <p>
                Ricordati che la consegna del mezzo deve essere effettuato entro le ore ${oraConsegna} del giorno ${dataConsegna} presso lo stallo di ${luogoConsegna}.
            </p>

            <p>
                Vuoi cambiare luogo di consegna e depositare il veicolo in uno stallo più vicino alla tua posizione? Clicca sul link sottostante:
            </p>

            <a href=${modificaPercorsoUrl} clicktracking=off>${modificaPercorsoUrl}</a>
            
            <p>
                Goditi l'esperienza del servizio AUMOBI!
            </p>

            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Inizio prenotazione AUMOBI",
        text: message
    });
};
exports.inviaEmailAutistaInizioPrenotazione = async function (email, dataConsegna, oraConsegna, luogoConsegna) {

    const message = `
            <h1>Prenotazione iniziata!</h1>
            <p>
                Ci è stato comunicato che hai appena prelevato il cliente!
            </p>
            
            <p>
                Il cliente deve terminare la prenotazione entro le ore ${oraConsegna} del giorno ${dataConsegna} e deve essere depositato presso ${luogoConsegna}.
            </p>

            <p>
                Ricordati che alla fine della prenotazione dovrai riportare il mezzo nello stallo più vicino alla tua posizione.
            </p>

            <p>
                Buon lavoro!
            </p>

            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Inizio prenotazione AUMOBI",
        text: message
    });
};

exports.inviaEmailRitardoConsegna = async function (email, idPrenotazione) {
    //in input passa l'email del cliente il cui timer è scaduto
    const ritardoUrl = `https://aumobi.herokuapp.com/archivioprenotazioni`;
    const guastoUrl = `https://aumobi.herokuapp.com/archivioprenotazioni`;

    const message = `
            <h1>Sei in ritardo con la tua consegna!</h1>
            <p>
                Ti comunichiamo che la durata del noleggio #${idPrenotazione} è scaduta e che hai 15 minuti di tempo per raggiungere lo stallo più vicino senza pagare un sovrapprezzo.
                Sei intrappolato in mezzo al traffico? Clicca sul seguente link per modificare la data di consegna:</p>
            <a href=${ritardoUrl} clicktracking=off>${ritardoUrl}</a>
            <p>
                Il tuo mezzo ha avuto un guasto? Clicca qui per segnalarcelo:  
            </p>
            <a href=${guastoUrl} clicktracking=off>${guastoUrl}</a>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Ritardo consegna AUMOBI",
        text: message
    });
};

exports.inviaEmailSovrapprezzo = async function (email, idPrenotazione) {

    const message = `
            <h1>Tempo scaduto!</h1>
            <p>
                Siamo spiacenti, ma i 15 minuti di tolleranza sono scaduti! Dovremo registrare un sovrapprezzo per la tua prenotazione #${idPrenotazione}.
            </p>
            <p>
                Il sovrapprezzo verrà calcolato in base all'orario di consegna del mezzo.
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Tempo consegna scaduto",
        text: message
    });
};

//terminaPrenotazione

exports.inviaEmailFinePrenotazione = async function (email, idPrenotazione) {

    const message = `
            <h1>Prenotazione terminata!</h1>
            <p>
                La tua prenotazione #${idPrenotazione} è appena terminata! Grazie per aver scelto il servizio AUMOBI!</p>
            <p>
                A breve riceverai un'email contenente il resoconto del noleggio. 
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Fine prenotazione AUMOBI",
        text: message
    });
};

exports.inviaEmailFinePrenotazioneSovrapprezzo = async function (email, idPrenotazione) {

    const message = `
            <h1>Prenotazione terminata!</h1>
            <p>
                La tua prenotazione #${idPrenotazione} è appena terminata! 
            </p>
            <p>
                Siamo spiacenti, ma abbiamo verificato che il veicolo è stato consegnato con più di 15 minuti di ritardo. Pertanto ti abbiamo addebitato un sovrapprezzo pari al 20% della durata effettiva della tua consegna.
            </p>
            <p>
                Grazie per aver scelto il servizio AUMOBI!
            </p>

            <p>
                A breve riceverai un'email contenente il resoconto del noleggio. 
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Fine prenotazione AUMOBI",
        text: message
    });
};

exports.inviaEmailDettaglioNoleggio = async function (
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
    numeroCartaCredito
    ) {

    const doc = new jsPDF();
    var imgData = logoConfig.logo.uri; 

    doc.addImage(imgData, 'PNG', 86, 270, 50, 28)

    doc.setFontSize("22")
    doc.text(`Resoconto noleggio:`, 70, 20)

    doc.setFontSize("18")

    doc.text(`Dati cliente: `, 10, 40)
    doc.text(`Nome: ${nome}`, 30, 50)
    doc.text(`Cognome: ${cognome}`, 30, 60)

    doc.text(`Dati pagamento: `, 10, 75)
    doc.text(`Numero carta di credito: ${numeroCartaCredito}`, 30, 85)

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

    doc.save(`${idPrenotazione}.pdf`);

    const ABSPATH = path.dirname(process.mainModule.filename);
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
        attachments: [
            {
                path: ABSPATH + `/${idPrenotazione}.pdf`
            }
        ]
    });
};

exports.inviaEmailFinePrenotazioneAutista = async function (email, luogoConsegna) {

    const message = `
            <h1>Prenotazione terminata!</h1>
            <p>
                Ci è stato notificato che hai appena lasciato il cliente presso ${luogoConsegna}.    
            </p>
            <p>
                Apprestati a consegnare il veicolo nello stallo più vicino alla tua posizione, in modo tale da rendere disponibile il veicolo per una nuova prenotazione.
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Fine prenotazione AUMOBI",
        text: message
    });
};

exports.inviaEmailConfermaConsegnaVeicolo = async function (email, luogoConsegna) {

    const message = `
            <h1>Veicolo consegnato!</h1>
            <p>
                Ci è stato notificato che hai appena consegnato il mezzo assegnatoti presso lo stallo ${luogoConsegna}.    
            </p>
            <p>
                Il veicolo è tornato disponibile per una nuova prenotazione. Resta in attesa di una nuova corsa!
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Consegna veicolo AUMOBI",
        text: message
    });
};

//annullaPrenotazione

exports.inviaEmailAnnullaPrenotazioneCliente = async function (email, idPrenotazione) {
    const message = `
            <h1>Prenotazione annullata!</h1>
            <p>
                La prenotazione ${idPrenotazione} è stata correttamente annullata.     
            </p>
            <p>
                Ti verrà addebitato un importo pari al 20% del prezzo della prenotazione originaria. Grazie per aver scelto il servizio AUMOBI!
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Annullamento prenotazione AUMOBI",
        text: message
    });
};

exports.inviaEmailAnnullaPrenotazioneAutista = async function (email) {
    const message = `
            <h1>Prenotazione annullata!</h1>
            <p>
                Ci è stato notificato che l'utente ha annullato la prenotazione.    
            </p>
            <p>
                Il veicolo è pertanto tornato disponibile per una nuova prenotazione. Resta in attesa di una nuova corsa!
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Annullamento prenotazione AUMOBI",
        text: message
    });
};

//modificaLuogoConsegna

exports.inviaEmailModificaLuogoConsegnaCliente = async function (email, idPrenotazione, luogoConsegna) {
    const message = `
            <h1>Luogo di consegna modificato!</h1>
            <p>
                Hai correttamente modificato il luogo di consegna relativo alla prenotazione #${idPrenotazione}. Il nuovo luogo di consegna è ${luogoConsegna}.    
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Modifica luogo di consegna AUMOBI",
        text: message
    });
};

exports.inviaEmailModificaLuogoConsegnaAutista = async function (email, luogoConsegna) {
    const message = `
            <h1>Luogo di consegna modificato!</h1>
            <p>
                Il cliente ha appena modificato il suo luogo di consegna. Dovrai recarti presso ${luogoConsegna}.    
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Modifica luogo di consegna AUMOBI",
        text: message
    });
};

//modificaDataRitiro

exports.inviaEmailModificaDataRitiroCliente = async function (email, idPrenotazione, dataRitiro, oraRitiro, prezzo) {
    const message = `
            <h1>Data di ritiro modificata!</h1>
            <p>
                Hai correttamente modificato la data di ritiro relativa alla prenotazione #${idPrenotazione}. 
                La nuova data di consegna è ${dataRitiro}, ${oraRitiro}.    
            </p>
            <p>
                Il prezzo è stato aggiornato e sarà pari a € ${prezzo}.
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Modifica data di ritiro AUMOBI",
        text: message
    });
};

exports.inviaEmailModificaDataRitiroAutista = async function (email, luogoRitiro, dataRitiro, oraRitiro) {
    const message = `
            <h1>Data di ritiro modificata!</h1>
            <p>
                Il cliente ha appena modificato la sua data di consegna. Dovrai recarti presso ${luogoRitiro} 
                alle ore ${dataRitiro} di giorno ${oraRitiro}.    
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Modifica data di ritiro AUMOBI",
        text: message
    });
};

//modificaDataConsegna

exports.inviaEmailModificaDataConsegnaCliente = async function (email, idPrenotazione, dataConsegna, oraConsegna, prezzo) {
    const message = `
            <h1>Data di consegna modificata!</h1>
            <p>
                Hai correttamente modificato la data di consegna relativa alla prenotazione #${idPrenotazione}. 
                La nuova data di consegna è ${dataConsegna}, ${oraConsegna}.    
            </p>
            <p>
                Il prezzo è stato aggiornato e sarà pari a € ${prezzo}.
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Modifica data di consegna AUMOBI",
        text: message
    });
};

exports.inviaEmailModificaDataConsegnaAutista = async function (email, luogoConsegna, dataConsegna, oraConsegna) {
    const message = `
            <h1>Data di consegna modificata!</h1>
            <p>
                Il cliente ha appena modificato la sua data di consegna. Dovrai recarti presso ${luogoConsegna} 
                alle ore ${dataConsegna} di giorno ${oraConsegna}.    
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Modifica data di consegna AUMOBI",
        text: message
    });
};
//segnalaGuasto

exports.inviaEmailSegnalaGuastoCliente = async function (email, idPrenotazione, dataConsegna, oraConsegna, luogoGuasto, prezzo) {
    const message = `
            <h1>Guasto segnalato!</h1>
            <p>
                Ci è stato notificato che il mezzo relativo alla prenotazione #${idPrenotazione} ha subito un guasto. 
                Il tuo noleggio risulta pertanto terminato il ${dataConsegna} alle ore ${oraConsegna}.    
            </p>
            <p>
                Il tuo veicolo è fermo presso ${luogoGuasto}.
            </p>
            <p>
                Il prezzo è stato aggiornato e sarà pari a € ${prezzo}.
            </p>
            <p>
                Verrai contattato il prima possibile da un nostro utente per risolvere le problematiche relative al guasto. Ci scusiamo del disagio.
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Segnalazione guasto AUMOBI",
        text: message
    });
};

exports.inviaEmailSegnalaGuastoAutista = async function (email, dataConsegna, oraConsegna, luogoGuasto) {
    const message = `
            <h1>Guasto segnalato!</h1>
            <p>
                Ci è stato notificato che il tuo mezzo ha subito un guasto durante un noleggio. 
                Il guasto ci risulta essere registrato il ${dataConsegna} alle ore ${oraConsegna}.    
            </p>
            <p>
                Il tuo veicolo è fermo presso ${luogoGuasto}.
            </p>
            <p>
                Verrai contattato il prima possibile da un nostro utente per risolvere le problematiche relative al guasto. Nel frattempo attendi e metti il veicolo in sicurezza.
            </p>
            <p>
                Distinti saluti dal team AUMOBI ©.
            </p>
        `
    invioEmail({
        to: email,
        subject: "Segnalazione guasto AUMOBI",
        text: message
    });
};