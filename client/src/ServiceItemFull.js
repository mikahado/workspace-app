import React from 'react';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CommentIcon from '@mui/icons-material/Comment';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';

const ServiceItemFull = ({ service }) => {
  const serviceItem = service[0];

  if (!serviceItem) {
    return null;
  }

  return (
    <div className="service-card">
      <div className="service-item">
        <CommentIcon />
        <span>{serviceItem.description}</span>
      </div>
      <div className="service-item">
        <LocationCityIcon />
        <span>{serviceItem.category}</span>
      </div>
      <div className="service-item">
        {serviceItem.has_wifi ? <WifiIcon /> : <WifiOffIcon />}
        <span>{serviceItem.has_wifi ? 'Good WiFi' : 'Poor or no WiFi'}</span>
      </div>
    </div>
  );
}

export default ServiceItemFull;
