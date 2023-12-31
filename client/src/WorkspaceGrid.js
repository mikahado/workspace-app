import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 60px 40px -7px',
}));


const WorkspaceGrid = ({ workspaceCard }) => {
  return (
    <div>
      <br/>
      <Box sx={{ margin: 0, flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {workspaceCard?.map((w, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item w={`${w}`}>{w}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default WorkspaceGrid;
