import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Workspace from './Workspace'
import Workspaces from './Workspaces'
import Navigation from './Navigation'
import Login from './Login'
import WorkspaceAdd from './WorkspaceAdd'
import MapMain from './MapMain'
import MapMain2 from './MapMain2'
import Map from './Map'
import MapLocation from './MapLocation'
import './App.css';
/*global google*/



function App() {
  
  return (
    <>

    <div className="App">
 
    <Navigation />  
      
        <Routes>
          <Route exact path="/" 
            element={<Home />} 
            /> 
          <Route exact path="/workspaces" 
            element={<Workspaces />} 
            /> 
          <Route path="/workspaces/:id" 
            element={<Workspace />} 
            />
          <Route path="/workspaces/add" 
          element={<WorkspaceAdd />} 
          />
          <Route path="/login" 
            element={<Login />} 
            />

          {/* <Route path="/map" 
            element={<MapMain />} 
            /> */}

          <Route path="/map2" 
            element={<MapMain2 />} 
            />    

        </Routes>
       </div>  

     

  </>
  );
}

export default App;