import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map = ({ locations }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const center = locations.length
    ? { lat: locations[0].lat, lng: locations[0].lng }
    : { lat: 51.5074, lng: -0.1278 };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      {locations.map((loc, i) => (
        <Marker key={i} position={{ lat: loc.lat, lng: loc.lng }} />
      ))}
    </GoogleMap>
  );
};

export default Map;