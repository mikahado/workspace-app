import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import ServiceItem from './ServiceItem'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button'

const WorkspaceCard = ({ workspace }) => {

    const {title, address, reviews, services} = workspace
     
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

        <img className='locationImage' src={require('./img/upload-img-placeholder.png')} alt="location" />

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