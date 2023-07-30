import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ServiceAdd = ({ service, id, toggle, setWorkspace }) => {

    const [services, setServices] = useState({
        workspace_id: id,
        category: "",
        description: "",
        wifi: true
        });  

console.log(services.wifi)

    const [errors, setErrors] = useState([])

  const handleServicesSubmit = (e) => {
    e.preventDefault()
    addServices()
  }

  const addServices = () => {

    const requestData = {
      ...services,
      wifi: Boolean(services.wifi) // Convert wifi to a boolean explicitly
    };

    fetch(`/api/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.errors) {
            const errorsLis = data.errors.map((e) => <li>{e}</li>);
            setErrors(errorsLis);
          } else {
            // data is structured like this: {id: 97, category: 'Cafe', wifi: null, description: 'haha', workspace_id: 139, …}
            toggle()
            setErrors([]);
            setWorkspace((prevWorkspace) => ({
              ...prevWorkspace,
              services: [...prevWorkspace.services, data],
            }));
          }
        });
  }

  return (
    <>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleServicesSubmit} 
      >
        <br/>
       
          <FormControl fullWidth sx={{ width: "25ch", textAlign: "center" }} >
            <InputLabel id="demo-simple-select-label">Type of Place</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={services.category}
              label="typeOfPlace"
              onChange={(e) =>
                setServices({ ...services, category: e.target.value })
              }
            >
              <MenuItem value={"Cafe"}>Cafe</MenuItem>
              <MenuItem value={"Hotel Lobby"}>Hotel Lobby</MenuItem>
              <MenuItem value={"Bar"}>Bar</MenuItem>
              <MenuItem value={"Public Space"}>Public Space</MenuItem>
              <MenuItem value={"Library"}>Library</MenuItem>
              <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
              <MenuItem value={"Coworking Space"}>Coworking Space</MenuItem>
              <MenuItem value={"Museum"}>Museum</MenuItem>
              <MenuItem value={"Gym"}>Gym</MenuItem>
              <MenuItem value={"Bookstore"}>Bookstore</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
          <br/><br/>

          <FormControl fullWidth sx={{ width: "25ch", textAlign: "center" }} >
            <InputLabel id="demo-simple-select-label">Wifi</InputLabel>
           
            <Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={services.wifi ? 'true' : 'false'}
  label="wifi"
  onChange={(e) =>
    setServices({ ...services, wifi: e.target.value === 'true' })
  }
>
  <MenuItem value={'true'}>Good WiFi</MenuItem>
  <MenuItem value={'false'}>Poor or no WiFi</MenuItem>
</Select>


          </FormControl>
        <br /><br/>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          value={services.description}     
          onChange={(e) =>
            setServices({ ...services, description: e.target.value })
          }     
        />

        <br /><br/>
        <Button type="submit" variant="contained" >Submit</Button>
        {errors}
      
      </Box>
 
    </>
  );
};

export default ServiceAdd;
