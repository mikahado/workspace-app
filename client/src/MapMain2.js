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
  zoom: 11,
  disableDefaultUI: true,
};

const containerStyle = {
        marginTop: "20px",
        height: "50vh",
        width: "100%",
};

const MapMain2 = ({ workspaces, addWorkspace, isAdding }) => {
  const [currentPosition, setCurrentPosition] = useState({lat: 40.7420, lng: -73.9073});
  const [zoomMap, setZoomMap] = useState(11)

  const [selectedPosition, setSelectedPosition] = useState(null);

  const [data, setData] = useState({});
  const [selected, setSelected] = useState({});

  const [toggle, setToggle] = useState(false);
  // const [toggleButton, setToggleButton] = useState(false)



  const handleToggle = () => {
    setToggle(true);
  };

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
    setCurrentPosition(coords)
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
    <>
    <div>
      <br/>
    {toggle ? <button className="workspace-lookup" onClick={() => getLocation(selectedPosition)}><h3>Add {data?.address?.split(',')[0]}</h3></button> : null}
    </div>
    </>

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

  console.log("position", currentPosition)

  const [libraries] = useState(["places"]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete
          setSelected={setCurrentPosition}
          setData={setData}
          setToggle={handleToggle}
          // handleToggleButton={handleToggleButton}
          handleZoomMap={handleZoomMap}
        />
      </div>
      {footer}
      {isLoaded && (
            <GoogleMap
              id="workspace-map"
              mapContainerStyle={containerStyle}
              draggable={false}
              zoom={zoomMap}
              options={{
                disableDefaultUI: true
              }}
              center={currentPosition}
              // onClick={(e) => setSelectedPosition(e.latLng?.toJSON())}

            >

                {zoomMap === 18 ?
                  <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={currentPosition} />
                    :
                    null
                }

            </GoogleMap>
          )            
}

    </>
  );
};

const PlacesAutocomplete = ({ setSelected, setData, handleToggleButton, setToggle, handleZoomMap }) => {
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
    setValue("")
    handleZoomMap(18)
    setToggle()
  };

  const handleClear = () => {
    setValue("")
    handleZoomMap(11)

}

  return (
    <>
    <br/>
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

    </>
  );
};

export default MapMain2;
