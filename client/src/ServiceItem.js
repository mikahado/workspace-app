import React from 'react'

const ServiceItem = ({service}) => {
 
  return (
    <div>
       <p>{service.category}</p>
       <p>{service.description}</p>
       <p>{service.wifi ? "Good WiFi" : "Poor or no WiFi"}</p>
    </div>
  )
}

export default ServiceItem