import React, { useState, useEffect } from 'react'

import WorkspaceCard from './WorkspaceCard'
import Search from './Search'
import WorkspaceGrid from './WorkspaceGrid'
import WorkspaceAdd from './WorkspaceAdd'
import { NavLink } from "react-router-dom";

import Filter from "./Filter.js"

import Button from '@mui/material/Button';

const Workspaces = () => {

  const [workspaces, setWorkspaces] = useState([])
  const [search, setSearch] = useState("")
  // eslint-disable-next-line
  const [showAddForm, setShowAddForm] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("All")

  const handleFilterChange = (e) => {
    setCategoryFilter(e.target.value)
  }


  useEffect(() => {
    fetch("/api/workspaces")
      .then(r => r.json())
      .then((data => {
        setWorkspaces(data)
      }
      ))
  }, [])

  const filterBySearch = workspaces?.filter(w => w.title?.toLowerCase().includes(search.toLowerCase())).filter(w => {
    if (categoryFilter === "All") {
      return true
    } else {
      return w.services.some(s => s.category === categoryFilter)
    }
  })

  const workspaceCard = filterBySearch?.map((w) =>
    <WorkspaceCard
      key={w.id}
      workspace={w}
    />)

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  // const handleShowAddClick = () => {
  //   setShowAddForm(!showAddForm)
  // }

  const handleAddWorkspace = (newWorkspace) => {
    console.log("DATAAAA", newWorkspace)
    setWorkspaces([...workspaces, newWorkspace]);
  }

  return (

    <div >
      <br />
      <h1>≡WORKSPACES≡</h1>
      <h3>-New York City-</h3>
      <br />
      <Search handleSearchChange={handleSearchChange} />
      <NavLink to="/workspaces/add" end>
        <Button variant="outlined" >Add a Workspace</Button>
      </NavLink>

      <br />

      {showAddForm ? <WorkspaceAdd key={workspaces.id} onAddWorkspace={handleAddWorkspace} reviews={workspaces.reviews} workspace_id={workspaces.id} /> : null}
      <br />
      < hr />
      <Filter handleFilterChange={handleFilterChange}/>
      <WorkspaceGrid workspaceCard={workspaceCard} />
    </div>

  )
}

export default Workspaces