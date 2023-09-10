import React from 'react';
import QRCode from 'react-google-qrcode';

export default function PrenotazioneCompletata() {

  let idPrenotazione = localStorage.getItem('IDPrenotazione');
  if (!idPrenotazione) {
    window.location.replace("/schermataprenotazione");
  } else {
    return (
      <div className="mt-5">
        <center>
          <h1 className="py-3 t-bold"><font color="success">Prenotazione Completata!</font></h1>
          <QRCode
            data={localStorage.getItem("IDPrenotazione")}
            size={260}
            framed
          />
          <h3 className="py-5 t-light">Fai uno screen a questo codice QR in modo da velocizzare le operazioni di Inizio e Termina Prenotazione da parte dei nostri impiegati. <br /> In alternativa puoi sempre richiedere di inserire il codice della prenotazione manualmente</h3>
        </center>
      </div>
    );
  }

}

