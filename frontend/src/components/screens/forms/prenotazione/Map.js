import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useHistory } from 'react-router-dom';
import Button from '../../../utils/Button';
import { Row, Col, Card, Form } from 'react-bootstrap'

function MarkerMap(props) {

    function getIcon(_iconSize) {
            return L.icon({
                iconUrl: "/markerAuto.png",
                iconSize: [_iconSize]
            })
        
    }
    
    function selezionaRitiro(e) {
        e.preventDefault();
        document.querySelector("#ritiro").value = props.id

    }
    function selezionaConsegna(e) {
        e.preventDefault();
        document.querySelector("#consegna").value = props.id
    }
    
    return (
        <Marker position={[38.1202, 13.3572]} icon={getIcon(25)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">{props.nome}</h3>
                    <Button onClick= {selezionaRitiro} variant={"Primary"}>Seleziona per il ritiro</Button>
                    <Button onClick= {selezionaConsegna} variant={"Primary"}>Seleziona per la consegna</Button>
                </div>
            </Popup>
        </Marker>
    );
}

export default function Mappa() {
    const history = useHistory()

    

    return (
        <React.Fragment>
        <Col xs={{ span: 11, offset: 0 }} >
        <MapContainer center={[38.1202, 13.3572]} zoom={15} className="h-100 ms-auto">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; Aumobi" />
            {/*history.location.state.payload.depositi.map((key) => {
                return (<MarkerMap 
                    id={key._id}
                    tipologiaMezzo={history.location.state.payload.datiPrenotazione.tipologiaMezzo}
                    position={[key.posizione.x, key.posizione.y]}
                    nome={key.nome} />)
            })*/}


        </MapContainer>
        </Col>
        </React.Fragment>
    );
}