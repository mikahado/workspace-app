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