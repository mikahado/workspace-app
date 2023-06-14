import React from 'react'
import {useGoogleMap} from '@ubilabs/google-maps-react-hooks';

const MapPlaces = () => {
    const map = useGoogleMap();
    
  return (
    <div>{map}</div>
  )
}

export default MapPlaces