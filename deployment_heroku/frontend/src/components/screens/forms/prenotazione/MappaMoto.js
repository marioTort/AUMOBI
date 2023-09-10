import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Col } from 'react-bootstrap'

function Stalli() {

    function getIcon(_iconSize) {
            return L.icon({
                iconUrl: "images/mappa/markerMoto.png",
                iconSize: [_iconSize]
            }) 
    }
    
    return (<div>
        <Marker position={[38.115901647567064, 13.361464198132142]} icon={getIcon(50)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">Via Maqueda</h3>
                </div>
            </Popup>
        </Marker>
        <Marker position={[38.11446503373733, 13.374054088126664]} icon={getIcon(50)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">Via Lincoln</h3>
                </div>
            </Popup>
        </Marker>
        <Marker position={[38.142180244662505, 13.337424984639613]} icon={getIcon(50)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">Viale Lazio</h3>
                </div>
            </Popup>
        </Marker>
        <Marker position={[38.103090413754316, 13.329738769331993]} icon={getIcon(50)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">Corso Calatafimi</h3>
                </div>
            </Popup>
        </Marker>
    </div>
    );
}

export default function MappaMoto() {
    
    return (
        <React.Fragment>
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 11, offset: 3 }} >
        <MapContainer center={[38.1202, 13.3572]} zoom={13} className="h-50 ms-auto">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; Aumobi" />
                <Stalli/> 
        </MapContainer>
        </Col>
        </React.Fragment>
    );
}