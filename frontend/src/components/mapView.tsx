import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

interface MapViewProps {
    longitude: number;
    latitude: number;
};

const MapView: React.FC<MapViewProps> = ({ longitude, latitude }) => {
    const location = { lat: latitude, lng: longitude };
    const zoom: number = 12;

    return (
        <MapContainer style={{ height: "50vh" }} center={location} zoom={zoom}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location} />
        </MapContainer>
    );
}

export default MapView;