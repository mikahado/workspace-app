import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import ServiceItem from './ServiceItem'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button'

const WorkspaceCard = ({ workspace }) => {

    const {title, address, reviews, services, lat, lng} = workspace
     
    const service = services?.map(s => 
      <ServiceItem 
          key={s.id}
          service={s}
          />
        )

    const allRatings = reviews?.map(r => r.rating) 
    const ratingsAvg = reviews?.length ? allRatings.reduce((a,b) => a + b) / allRatings?.length : null

  return (
    <div>
      <Link to={`/workspaces/${workspace.id}`}>
        <h2>{title}</h2>
        </Link>

        {/* <img className='locationImage' src={require('./img/upload-img-placeholder.png')} alt="location" /> */}

        <img className='locationImage' src={`https://maps.googleapis.com/maps/api/staticmap?center=${workspace?.lat},${workspace?.lng}&zoom=16&size=400x400&maptype=roadmap&markers=${workspace?.lat},${workspace?.lng}&key=AIzaSyB6iTD6vclUpZ-BnAazxNCQmddOFn_nphw`} alt="location"/>




        <br/>
        {address}<br />
        {service}

      <br/>
        
        <Rating name="read-only" value={Math.ceil(ratingsAvg)} readOnly />
          <br />
          <Link to={`/workspaces/${workspace.id}`}>
        <p>{allRatings?.length} reviews</p>
        </Link>
        
    </div>
  )
}

export default WorkspaceCard