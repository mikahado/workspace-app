import { useState, useMemo, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { GoogleMapProvider, useGoogleMap, } from '@ubilabs/google-maps-react-hooks'

import Button from '@mui/material/Button';

/*global google*/

const mapOptions = {
  // Add your map options here
  // `center` and `zoom` are required for every map to be displayed
  center: {lat: 50, lng: 0},
  zoom: 1
};


const MapMain2 = ({ workspaces, addWorkspace, isAdding }) => {

  const [ selected, setSelected ] = useState({});
  const [currentPosition, setCurrentPosition ] = useState({});
  const [selectedPosition, setSelectedPosition] = useState(null);

  const [location, setLocation] = useState({})


  const handleWorkspaceSubmit = () => {

    const workspace = {
      lat: location.lat,
      lng: location.lng,
    }
    console.log("hehehe")
    addWorkspace(workspace)
  }

  const getLocation = coords => {
   setLocation(coords);
    handleWorkspaceSubmit()
    // Navigate to part 2 off adding a workspace
  };

  const markerRef = useRef(null);

  const onSelect = item => {
    setSelected(item);
  }

  const onMarkerDragEnd = e => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setSelectedPosition({ lat, lng });
    }
  };

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    const currentPosition = {
      lat: latitude,
      lng: longitude
    }
    setCurrentPosition(currentPosition);
  }

  const footer = (
    <div className="footer">
      <div className="inner-footer">
      <span className="location-text">Choose workspace and press</span>
      <Button variant="contained" onClick={() => getLocation(selectedPosition)}>
        Next
      </Button>
      </div>
    </div>
  );

  const mapStyles = () => {
    if (!isAdding) {
      return {
        marginTop: "20px",
        height: "50vh",
        width: "100%"
      }
    } else {
      return {
        marginTop: "20px",
        height: "80vh",
        width: "100%"
      }
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB6iTD6vclUpZ-BnAazxNCQmddOFn_nphw",
    libraries: ["places"],
  });

     return (
    <>     

      {/* <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyB6iTD6vclUpZ-BnAazxNCQmddOFn_nphw"
      > */}

      <div className="places-container">
        <PlacesAutocomplete setSelected={setCurrentPosition} />
      </div>

        {isLoaded && <GoogleMap
          id='workspace-map'
          mapContainerStyle={mapStyles()}
          draggable={true}
          zoom={18}
          center={currentPosition.lat ? currentPosition : mapOptions.center}
          onClick={(e) => setSelectedPosition(e.latLng?.toJSON())}
          // center={currentPosition.lat ? currentPosition : defaultCenter}
        >
       

          {/* <Marker
            position={selectedPosition}
            ref={() => markerRef}
            onDragEnd={onMarkerDragEnd}
            draggable={true} /> */}
          {/* {
            workspaces ?
            workspaces.map(item => {
              return (
              <Marker 
              key={item.id}
              position={item.location}
              onClick={() => onSelect(item)}
              />
              )
            }) : null
          } */}

          {
            // isAdding ? 
            //  :
            // null
          }

          {
            // selected.location ?
            // (
            //   <InfoWindow
            //   position={selected.location}
            //   onCloseClick={() => setSelected({})}
            // >
            //   <div className="infowindow">
            //     {/* <p>{selected.title}</p>
            //     <img src={selected.image} className="small-image" alt="rental"/>
            //     <p>price: {selected.price}</p>
            //     <p>sqm2: {selected.sqm}</p>
            //     <p>bedrooms: {selected.bedrooms}</p> */}
            //   </div>
            // </InfoWindow>
            // ) : null
          }

        </GoogleMap>
         }
        {selected && <Marker position={currentPosition} />}

      {footer}
    </>
     )
}


const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng })
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

export default MapMain2