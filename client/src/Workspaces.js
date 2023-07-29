import React, { useState, useEffect, useRef, useContext } from "react";

import WorkspaceCard from "./WorkspaceCard";
import Search from "./Search";
import WorkspaceGrid from "./WorkspaceGrid";
import WorkspaceAdd from "./WorkspaceAdd";
import { NavLink } from "react-router-dom";
import { UserContext } from "./context/user"

import Filter from "./Filter.js";

import Button from "@mui/material/Button";

const Workspaces = () => {

  const { workspaces } = useContext(UserContext)

  const [search, setSearch] = useState("");
  // eslint-disable-next-line
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterToggle, setFilterToggle] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const handleFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const searchBar = useRef(null)

  const scrollToSearch = () => {
    searchBar.current.scrollIntoView({ behavior: 'smooth' })
  };



  const filterBySearch = workspaces
    ?.filter((w) => w.title?.toLowerCase().includes(search.toLowerCase()))
    .filter((w) => {
      if (categoryFilter === "All") {
        return true;
      } else {
        return w.services.some((s) => s.category === categoryFilter);
      }
    });

  const workspaceCard = filterBySearch?.map((w) => (
    <WorkspaceCard key={w.id} workspace={w} />
  ));

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterClick = () => {
    setFilterToggle(true);
  };

  return (
    <div>
      <br /><br/>
      <h1 className="home-title">WORKSPACES</h1>
      <br/><br/>
      <Search handleSearchChange={handleSearchChange} />

      <br/>
      <Button onClick={handleFilterClick}>Filter by Category</Button>
      {filterToggle ? <Filter handleFilterChange={handleFilterChange} /> : null }
      <br/> <br/>
      <WorkspaceGrid workspaceCard={workspaceCard} />
    </div>
  );
};

export default Workspaces;
