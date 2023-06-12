import React, { useState, useEffect } from 'react'

import WorkspaceCard from './WorkspaceCard'
import Search from './Search'
import WorkspaceGrid from './WorkspaceGrid'
import WorkspaceAdd from './WorkspaceAdd'

import Button from '@mui/material/Button';

const Workspaces = () => {

  const [workspaces, setWorkspaces] = useState([])
  const [search, setSearch] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  console.log(workspaces)

  useEffect(() => {
    fetch("/api/workspaces")
    .then(r => r.json())
    .then((data => {
      setWorkspaces(data)
    }
      ))
  }, [])

  const filterBySearch = workspaces?.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))

  const workspaceCard = filterBySearch?.map((w) => 
    <WorkspaceCard 
      key={w.id}
      workspace={w}
      />)  

    const handleSearchChange = (e) => {
      setSearch(e.target.value)
    }

    const handleShowAddClick = () => {
      setShowAddForm(!showAddForm)
    }

    const handleAddWorkspace = (newWorkspace) => {
      setWorkspaces([...workspaces, newWorkspace]);
    }
   
  return (

    <div >
        <br />
        <h1>≡🬀 WORKSPACES 🬀≡</h1>
        <h3>-New York City-</h3>
        <br />        
        <Search handleSearchChange={handleSearchChange} />

        <Button variant="outlined" onClick={handleShowAddClick}>Add a Workspace</Button>
              <br />

        {showAddForm ? <WorkspaceAdd key={workspaces.id} onAddWorkspace={handleAddWorkspace} reviews={workspaces.reviews} workspace_id={workspaces.id} /> : null}
        <br />
        < hr />
    
        <WorkspaceGrid workspaceCard={workspaceCard}/>
    </div>

  )
}

export default Workspaces