import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import ServiceItem from './ServiceItem'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button'

const WorkspaceCard = ({ workspace }) => {

    const {address, reviews, services} = workspace
     
    const title = workspace.title.split(",")[0]


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

        <img className='locationImage' src={`https://maps.googleapis.com/maps/api/staticmap?center=${workspace?.lat},${workspace?.lng}&zoom=16&size=400x400&maptype=roadmap&markers=${workspace?.lat},${workspace?.lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`} alt="Static Map"/>


        <br/>
        {/* {address}<br /> */}
        {service}


        
        <Rating name="read-only" value={Math.ceil(ratingsAvg)} readOnly />

          <Link to={`/workspaces/${workspace.id}`}>
        <p>{allRatings?.length} reviews</p>
        </Link>
        
    </div>
  )
}

export default WorkspaceCard