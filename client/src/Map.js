// import React, {useState, useCallback, forwardRef} from 'react';
// import {GoogleMapsProvider} from '@ubilabs/google-maps-react-hooks';

// const Map = () => {
//   const [mapContainer, setMapContainer] = useState(null);
//   const mapRef = useCallback(node => {
//     node && setMapContainer(node);
//   }, []);

//   const mapOptions = {
//     // Add your map options here
//     // `center` and `zoom` are required for every map to be displayed
//     center: {lat: 53.5582447, lng: 9.647645},
//     zoom: 6
//   };

//   return (
//     <GoogleMapsProvider
//       googleMapsAPIKey="AIzaSyB6iTD6vclUpZ-BnAazxNCQmddOFn_nphw"
//       mapContainer={mapContainer}
//       mapOptions={mapOptions}>
//         <div ref={mapRef} style={{height: '100%'}} />
//     </GoogleMapsProvider>
//   );
// }

// export default Map;