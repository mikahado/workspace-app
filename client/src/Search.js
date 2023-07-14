import React from 'react'

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Search = ({handleSearchChange}) => {

  return (
    <div>
      <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">

        <TextField id="outlined-basic" className="search-box" onChange={handleSearchChange} variant="outlined" placeholder="Search Workspaces"/>

      </Box>
    </div>
  )
}

export default Search