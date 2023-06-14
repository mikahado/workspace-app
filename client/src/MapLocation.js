import { useState, useMemo, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, InfoWindow, Marker, MarkerF } from "@react-google-maps/api";

import Button from '@mui/material/Button';

// /*global google*/ 

const mapOptions = {
  center: {lat: 50, lng: 0},
  zoom: 1
};


const MapLocation = ({ workspaces, lat, lng }) => {


  const [currentPosition, setCurrentPosition ] = useState({});


  // const markerRef = useRef(null);


//   const success = (position) => {
//     const { latitude, longitude } = position.coords;
//     const currentPosition = {
//       lat: latitude,
//       lng: longitude
//     }
//     setCurrentPosition(currentPosition);
//   }

 
  const mapStyles = () => ({
        marginTop: "20px",
        height: "60vh",
        width: "100%"
      })
    

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(success);
//   }, [])

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

        {isLoaded && <GoogleMap
          id='workspace-map'
          mapContainerStyle={mapStyles()}
          draggable={true}
          zoom={18}
          center={{lat, lng}}
        >

          <MarkerF
            position={{lat, lng}}
            title="hehehe"
              />        

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
    </>
     )
}




export default MapLocation