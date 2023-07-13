import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Workspace from './Workspace'
import Workspaces from './Workspaces'
import Navigation from './Navigation'
import WorkspaceAdd from './WorkspaceAdd'
import MapMain2 from './MapMain2'
import AuthDialog from './AuthDialog';
import ServicesAdd from './ServicesAdd'
import './App.css';
import { UserProvider } from "./context/user"
/*global google*/

function App() {
  
  return (
    <>

    <div className="App">
 
    <UserProvider>
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
            element={<AuthDialog />} 
            />

          <Route path="/workspaces/servicesadd" 
            element={<ServicesAdd />} 
            />

          <Route path="/map2" 
            element={<MapMain2 />} 
            />    

        </Routes>
        </UserProvider>
       </div>  

     

  </>
  );
}

export default App;