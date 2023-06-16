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
        description: ""
        });  


    const [errors, setErrors] = useState([])

  const handleServicesSubmit = (e) => {
    e.preventDefault()
    addServices()
  }

  const addServices = () => {

    fetch(`/api/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(services),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.errors) {
            const errorsLis = data.errors.map((e) => <li>{e}</li>);
            setErrors(errorsLis);
            console.log(data.errors)
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
            </Select>
          </FormControl>
        <br />
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

        <br />
        <Button type="submit" variant="contained" >Submit</Button>
        {errors}
      
      </Box>
 
    </>
  );
};

export default ServiceAdd;
