import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100vh",
};

const center = {
    lat: 0,
    lng: 0,
};

const markersData = [
    { id: 1, position: { lat: 37.7749, lng: -122.4194 }, title: "San Francisco" },
    { id: 2, position: { lat: 34.0522, lng: -118.2437 }, title: "Los Angeles" },
];

const MapWithCurrentLocation = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAHaHjr0ny-KZnodo8o67829BcDkT0oeoY", // Replace with your API Key
    });

    const [currentLocation, setCurrentLocation] = useState(center);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                () => {
                    alert("Unable to retrieve your location");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={14}
        >
            {/* Current Location Marker */}
            <Marker position={currentLocation} title="You are here!" />

            {/* Other Markers */}
            {markersData.map((marker) => (
                <Marker
                    key={marker.id}
                    position={marker.position}
                    title={marker.title}
                    onClick={() => alert(`You clicked on: ${marker.title}`)}
                />
            ))}
        </GoogleMap>
    );
};

export default MapWithCurrentLocation;
