import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Workspace from './Workspace'
import Workspaces from './Workspaces'
import Navigation from './Navigation'
import Login from './Login'
import WorkspaceAdd from './WorkspaceAdd'
import './App.css';

function App() {
  
  return (
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
       



        </Routes>
     

  </div>  
  );
}

export default App;