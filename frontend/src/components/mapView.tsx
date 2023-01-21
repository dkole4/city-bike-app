import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

interface MapViewProps {
    lng: number;
    lat: number;
};

const MapView: React.FC<MapViewProps> = (location) => {
    // Display a message about missing location data to user.
    if (!location.lat && !location.lng) {
        return (
            <p style={{textAlign: "center"}}>
                Location of the station is unknown.
            </p>
        );
    }

    // Zoom of the map view.
    const zoom: number = 12;

    return (
        <MapContainer
            style={{ height: "50vh" }}
            center={location}
            zoom={zoom}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location} />
        </MapContainer>
    );
}

export default MapView;