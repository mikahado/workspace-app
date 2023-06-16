import { useState, useMemo, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
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

import Button from "@mui/material/Button";

// /*global google*/

const mapOptions = {
  center: { lat: 50, lng: 0 },
  zoom: 1,
};

const MapMain2 = ({ workspaces, addWorkspace, isAdding }) => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [selectedPosition, setSelectedPosition] = useState(null);

  const [data, setData] = useState({});
  const [selected, setSelected] = useState({});

  const [toggle, setToggle] = useState(false);
  const [toggleButton, setToggleButton] = useState(false)

  const handleToggleMap = () => {
    setToggle(!toggle);
  };

  const handleToggleButton = () => {
    setToggleButton(!toggleButton);
  };

  const [location, setLocation] = useState({});

  const handleWorkspaceSubmit = () => {
    const workspace = {
      title: data.address,
      lat: data.lat,
      lng: data.lng,
    };
    addWorkspace(workspace);
  };

  const getLocation = (coords) => {
    setLocation(coords);
    handleWorkspaceSubmit();
  };

  // const markerRef = useRef(null);

  const onSelect = (item) => {
    setSelected(item);
  };

  const onMarkerDragEnd = (e) => {
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
      lng: longitude,
    };
    setCurrentPosition(currentPosition);
  };

  const footer = (
    <div className="footer">
      <div className="inner-footer">
        <span className="location-text"></span>
        <Button
          variant="contained"
          onClick={() => getLocation(selectedPosition)}
        >
          Add
        </Button>
      </div>
    </div>
  );

  const mapStyles = () => {
    if (!isAdding) {
      return {
        marginTop: "20px",
        height: "50vh",
        width: "100%",
      };
    } else {
      return {
        marginTop: "20px",
        height: "80vh",
        width: "100%",
      };
    }
  };

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(success);
  // }, [])

  const [libraries] = useState(["places"]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB6iTD6vclUpZ-BnAazxNCQmddOFn_nphw",
    libraries,
  });

  return (
    <>
      {/* <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyB6iTD6vclUpZ-BnAazxNCQmddOFn_nphw"
      > */}

      <div className="places-container">
        <PlacesAutocomplete
          setSelected={setCurrentPosition}
          setData={setData}
          setToggleMap={handleToggleMap}
          handleToggleButton={handleToggleButton}
        />
      </div>

      {toggle
        ? isLoaded && (
            <GoogleMap
              id="workspace-map"
              mapContainerStyle={mapStyles()}
              draggable={true}
              zoom={18}
              center={currentPosition.lat ? currentPosition : mapOptions.center}
              // onClick={(e) => setSelectedPosition(e.latLng?.toJSON())}
              onClick={(e) => setSelectedPosition(e.latLng?.toJSON())}
              // center={currentPosition.lat ? currentPosition : defaultCenter}
            >
        
            </GoogleMap>
           
          )            
         
        : null}
        {toggleButton ? footer : null}
    </>
  );
};

const PlacesAutocomplete = ({ setSelected, setData, setToggleMap, handleToggleButton }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setData({ address, lat, lng });
    setToggleMap();
    handleToggleButton()
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search"
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
};

export default MapMain2;
