import React from 'react'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const Filter = ({ handleFilterChange }) => {

  return (
    <div >
      <br />
      <FormControl onClick={handleFilterChange}>

        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={"All"}
        >
          <FormControlLabel value="All" control={<Radio />} label="All" />
          <FormControlLabel value="Restaurant" control={<Radio />} label="Restaurant" />
          <FormControlLabel value="Cafe" control={<Radio />} label="Cafe" />
          <FormControlLabel value="Coworking Space" control={<Radio />} label="Coworking Space" />
          <FormControlLabel value="Bar" control={<Radio />} label="Bar" />
          <FormControlLabel value="Museum" control={<Radio />} label="Museum" />
          <FormControlLabel value="Gym" control={<Radio />} label="Gym" />
          <FormControlLabel value="Hotel Lobby" control={<Radio />} label="Hotel Lobby" />
          <FormControlLabel value="Public Space" control={<Radio />} label="Public Space" />
          <FormControlLabel value="Library" control={<Radio />} label="Library" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />

        </RadioGroup>
 
      </FormControl>



    </div>
  )
}

export default Filter