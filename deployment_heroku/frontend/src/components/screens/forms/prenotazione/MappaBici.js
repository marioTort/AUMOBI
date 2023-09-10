import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Col } from 'react-bootstrap'

function StalliB() {

    function getIcon(_iconSize) {
            return L.icon({
                iconUrl: "images/mappa/markerBici.png",
                iconSize: [_iconSize]
            })
        
    }
    
    return (<div>
        <Marker position={[38.11114376186537, 13.35157839813205]} icon={getIcon(50)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">Piazza Indipendenza</h3>
                    
                </div>
            </Popup>
        </Marker>
        <Marker position={[38.13321785643879, 13.351880826929056]} icon={getIcon(50)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">Giardino Inglese</h3>
                </div>
            </Popup>
        </Marker>
    </div>
    );
}

function StalliM() {

    function getIcon(_iconSize) {
            return L.icon({
                iconUrl: "images/mappa/markerMonopattino.png",
                iconSize: [_iconSize]
            })
        
    }
    
    return (<div>
        <Marker position={[38.12036963131095, 13.357198011625277]} icon={getIcon(50)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">Teatro Massimo</h3>   
                </div>
            </Popup>
        </Marker>
        <Marker position={[38.1249026289687, 13.355919950763699]} icon={getIcon(50)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">Piazza Politeama</h3>
                </div>
            </Popup>
        </Marker>
    </div>
    );
}

export default function MappaBici() {
    
    return (
        <React.Fragment>
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 11, offset: 3 }} >
        <MapContainer center={[38.1202, 13.3572]} zoom={13} className="h-50 ms-auto">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; Aumobi" />
                <StalliB/> 
                <StalliM/> 
        </MapContainer>
        </Col>
        </React.Fragment>
    );
}