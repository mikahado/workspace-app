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

/*global google*/

const mapOptions = {
  center: { lat: 40.7420, lng: -73.9073 },
  zoom: 11
};

const containerStyle = {
        marginTop: "20px",
        height: "60vh",
        width: "100%",
};

const MapMain2 = ({ workspaces, addWorkspace, isAdding }) => {
  const [currentPosition, setCurrentPosition] = useState({lat: 40.7420, lng: -73.9073});
  const [zoomMap, setZoomMap] = useState(11)

  const [selectedPosition, setSelectedPosition] = useState(null);

  const [data, setData] = useState({});
  const [selected, setSelected] = useState({});

  // const [toggle, setToggle] = useState(false);
  // const [toggleButton, setToggleButton] = useState(false)



  // const handleToggleMap = () => {
  //   setToggle(!toggle);
  // };

  // const handleToggleButton = () => {
  //   setToggleButton(!toggleButton);
  // };

  const handleZoomMap = (newZoom) => {
    setZoomMap(newZoom)
  }

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

  // const onSelect = (item) => {
  //   setSelected(item);
  // };

  // const onMarkerDragEnd = (e) => {
  //   if (e.latLng) {
  //     const lat = e.latLng.lat();
  //     const lng = e.latLng.lng();
  //     setSelectedPosition({ lat, lng });
  //   }
  // };

  // const success = (position) => {
  //   const { latitude, longitude } = position.coords;
  //   const currentPosition = {
  //     lat: latitude,
  //     lng: longitude,
  //   };
  //   setCurrentPosition(currentPosition);
  // };

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

  // const mapStyles = () => {
  //   if (!isAdding) {
  //     return {
  //       marginTop: "20px",
  //       height: "50vh",
  //       width: "100%",
  //     };
  //   } else {
  //     return {
  //       marginTop: "20px",
  //       height: "80vh",
  //       width: "100%",
  //     };
  //   }
  // };

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
          // setToggleMap={handleToggleMap}
          // handleToggleButton={handleToggleButton}
          handleZoomMap={handleZoomMap}
        />
      </div>

      {isLoaded && (
            <GoogleMap
              id="workspace-map"
              mapContainerStyle={containerStyle}
              draggable={true}
              zoom={zoomMap}
              center={currentPosition}
              // onClick={(e) => setSelectedPosition(e.latLng?.toJSON())}
              onClick={(e) => setSelectedPosition(e.latLng?.toJSON())}
              // center={currentPosition.lat ? currentPosition : defaultCenter}
            >
                  <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={currentPosition} />

            </GoogleMap>
          )            
}
        {/* {toggleButton ? footer : null} */}
    </>
  );
};

const PlacesAutocomplete = ({ setSelected, setData,handleToggleButton, handleZoomMap }) => {
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
    // setToggleMap();
    // handleToggleButton()
    handleZoomMap(18)
  };

  const handleClear = () => {
    setValue("")
    handleZoomMap(11)
    // handleToggleButton()
    // setToggleMap()
}

  return (
    <>
    <br/><br/><br/>
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
      <button onClick={handleClear}>Clear</button>
    </Combobox>

    </>
  );
};

export default MapMain2;
