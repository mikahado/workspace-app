// import { useState, useMemo, useEffect } from "react";
// import { GoogleMap, useLoadScript, useJsApiLoader, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";
// import { GoogleMapProvider, useGoogleMap, } from '@ubilabs/google-maps-react-hooks'


// const mapOptions = {
//   // Add your map options here
//   // `center` and `zoom` are required for every map to be displayed
//   center: {lat: 53.5582447, lng: 9.647645},
//   zoom: 6
// };


// const MapMain2 = () => {

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyB6iTD6vclUpZ-BnAazxNCQmddOFn_nphw",
//     libraries: ["places"],
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return <Map />;

// }


// function Map() {

// const [mapContainer, setMapContainer] = useState(null);

// const [ currentPosition, setCurrentPosition ] = useState({});
  
//   const success = position => {
//     const currentPosition = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     }
//     setCurrentPosition(currentPosition);
//   };
  
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(success);
//   })
  
//   const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
//   const [selected, setSelected] = useState(null);

//   const onMarkerDragEnd = (e) => {
//     const lat = e.latLng.lat();
//     const lng = e.latLng.lng();
//     setCurrentPosition({ lat, lng})
//   };


//   const mapStyles = {        
//     height: "90vh",
//     width: "100%"};
  
//   const defaultCenter = {
//     lat: 41.3851, lng: 2.1734
//   }

//   return (
//     <>
//       <div className="places-container">
//         <PlacesAutocomplete setSelected={setSelected} />
//       </div>

//       <GoogleMap
//           mapContainerStyle={mapStyles}
//           zoom={17}
//           center={currentPosition}>
//           {
//             currentPosition.lat ? 
//             <Marker
//             // position={currentPosition}
//             // onDragEnd={(e) => onMarkerDragEnd(e)}
//             // draggable={true} 
//             /> :
//             null
//           }
//         </GoogleMap>
//     </>
//   );
// }







// const PlacesAutocomplete = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     const results = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(results[0]);
//     setSelected({ lat, lng });
//   };

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         className="combobox-input"
//         placeholder="Search an address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// }

// export default MapMain2