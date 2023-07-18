import React, { useState, useEffect } from "react";
import { useLoadScript, GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import Button from '@mui/material/Button';

const libraries = ["places"];
const mapContainerStyle = {
  marginTop: "20px",
  height: "60vh",
  width: "100%"
};

const MapLocation = ({ title, lat, lng }) => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [selected, setSelected] = useState(null);
  const [map, setMap] = useState(null);

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleMarkerClick = (event) => {
    setSelected({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  useEffect(() => {
    if (selected) {
      // Perform reverse geocoding or any other necessary actions
    }
  }, [selected]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return isLoaded ? (
    <GoogleMap
      id="workspace-map"
      mapContainerStyle={mapContainerStyle}
      draggable={true}
      zoom={18}
      center={{ lat, lng }}
      options={{
        disableDefaultUI: true,
        tilt: 1
      }}
      onLoad={handleMapLoad}
    >
      <Marker
        position={{ lat, lng }}
        title="hehehe"
        onClick={handleMarkerClick}
      />
      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <p>{title}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default MapLocation;
