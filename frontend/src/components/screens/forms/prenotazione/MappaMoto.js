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
        <Marker position={[38.1202, 13.3572]} icon={getIcon(50)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">VIA DI STO CAZZZOOOOOO</h3>
                </div>
            </Popup>
        </Marker>
        <Marker position={[38.1102, 13.3672]} icon={getIcon(50)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">VIA DI STO CAZZZOOOOOO</h3>
                </div>
            </Popup>
        </Marker>
    </div>
    );
}

export default function MappaMoto() {
    
    return (
        <React.Fragment>
        <Col xs={{ span: 11, offset: 0 }} >
        <MapContainer center={[38.1202, 13.3572]} zoom={15} className="h-100 ms-auto">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; Aumobi" />
                <Stalli/> 
        </MapContainer>
        </Col>
        </React.Fragment>
    );
}