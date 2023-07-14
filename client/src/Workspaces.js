import React, { useState, useEffect } from "react";

import WorkspaceCard from "./WorkspaceCard";
import Search from "./Search";
import WorkspaceGrid from "./WorkspaceGrid";
import WorkspaceAdd from "./WorkspaceAdd";
import { NavLink } from "react-router-dom";

import Filter from "./Filter.js";

import Button from "@mui/material/Button";

const Workspaces = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [search, setSearch] = useState("");
  // eslint-disable-next-line
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterToggle, setFilterToggle] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const handleFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  useEffect(() => {
    fetch("/api/workspaces")
      .then((r) => r.json())
      .then((data) => {
        setWorkspaces(data);
      });
  }, []);

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
      <br />
      <h1>≡WORKSPACES≡</h1>
      <Search handleSearchChange={handleSearchChange} />


      <Button onClick={handleFilterClick}>Filter by Category</Button>
      {filterToggle ? <Filter handleFilterChange={handleFilterChange} /> : null }
      <WorkspaceGrid workspaceCard={workspaceCard} />
    </div>
  );
};

export default Workspaces;
