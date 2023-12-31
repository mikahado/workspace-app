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
 
        <img className='locationImage' src={`https://maps.googleapis.com/maps/api/staticmap?center=${workspace?.lat},${workspace?.lng}&zoom=17&size=400x400&maptype=roadmap&markers=${workspace?.lat},${workspace?.lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`} alt="Static Map"/>
        </Link>

        <br/>
        {/* {address}<br /> */}
        <div className="ws-card-info">{service}

      
        <Rating name="read-only" value={Math.ceil(ratingsAvg)} readOnly />

          <Link to={`/workspaces/${workspace.id}`}>
        <p>{allRatings?.length} reviews</p>
        </Link>
        </div>
    </div>
  )
}

export default WorkspaceCard