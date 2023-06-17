import React from 'react'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const Filter = ({handleFilterChange}) => {

    const handleFilterSelect = (e) => {
      handleFilterChange(e.target.value)
      }
    
  return (
    <div >
      <br/>
      <FormControl onClick={handleFilterSelect}>

        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="All" control={<Radio />} label="All" />
          <FormControlLabel value="Resturaunt" control={<Radio />} label="Resturaunt" />
          <FormControlLabel value="Cafe" control={<Radio />} label="Cafe" />
          <FormControlLabel value="POPS" control={<Radio />} label="POPS" />
          <FormControlLabel value="Random Nook" control={<Radio />} label="Random Nook" />
          <FormControlLabel value="Museum" control={<Radio />} label="Museum" />
          <FormControlLabel value="Diner" control={<Radio />} label="Diner" />
          <FormControlLabel value="Hotel Lobby" control={<Radio />} label="Hotel Lobby" />
          
      </RadioGroup>
      
    </FormControl>



    </div>
  )
}

export default Filter