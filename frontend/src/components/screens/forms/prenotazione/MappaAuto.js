import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Col } from 'react-bootstrap'

function Stalli() {

    function getIcon(_iconSize) {
            return L.icon({
                iconUrl: "images/mappa/markerAuto.png",
                iconSize: [_iconSize]
            })
        
    }
    
    return (<div>
        <Marker position={[38.09981349590849, 13.346753569296208]} icon={getIcon(50)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">Via E. Basile</h3>
                    
                </div>
            </Popup>
        </Marker>
        <Marker position={[38.10350332734076, 13.348132640460571]} icon={getIcon(50)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">Viale delle scienze</h3>
                </div>
            </Popup>
        </Marker>
    </div>
    );
}

export default function MappaAuto() {
    
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