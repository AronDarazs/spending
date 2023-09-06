import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const FilterComponent = ({ filter, setFilter, currencies }) => {
  const handleFilterChange = (_, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange}>
      <ToggleButton value="ALL">ALL</ToggleButton>
      {currencies.map((currency) => (
        <ToggleButton key={currency} value={currency}>
          {currency}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default FilterComponent;
