import React from 'react';
import QRCode from 'react-google-qrcode';

export default function PrenotazioneCompletata() {
    return (
        <div className="mt-5">
          <center>
              <h1 className="py-3 t-bold"><font color="success">Prenotazione Completata!</font></h1>
            <QRCode
            data="CODICEPRENOTAZIONE" //ci andrebbe il codice della prenotazione appena creata
            size={331}
            framed
            />
            <h3 className="py-5 t-light">Salva questo codice QR in modo da velocizzare le operazioni di Inizio e Termina Prenotazione da parte dei nostri impiegati. <br/> In alternativa puoi sempre richiedere di inserire il codice della prenotazione manualmente</h3>
          </center>
        </div>
    );
}

