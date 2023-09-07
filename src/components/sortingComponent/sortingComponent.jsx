import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SortingComponent = ({ sorting, setSorting }) => {
  const handleSortingChange = (event) => {
    setSorting(event.target.value);
  };

  return (
    <Select value={sorting} onChange={handleSortingChange} data-testid="sort-component">
      <MenuItem value="descend" data-testid="sort-descend">
        Sort by Date descending (Default)
      </MenuItem>
      <MenuItem value="ascend" data-testid="sort-ascend">
        Sort by Date ascending
      </MenuItem>
    </Select>
  );
};

export default SortingComponent;
