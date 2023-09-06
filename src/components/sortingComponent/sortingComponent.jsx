import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SortingComponent = ({ sorting, setSorting }) => {
  const handleSortingChange = (event) => {
    setSorting(event.target.value);
  };

  return (
    <Select value={sorting} onChange={handleSortingChange}>
      <MenuItem value="descend">Sort by Date descending (Default)</MenuItem>
      <MenuItem value="ascend">Sort by Date ascending</MenuItem>
    </Select>
  );
};

export default SortingComponent;
