import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterComponent from "../src/components/filterComponent/filterComponent";

// Mock the props for the component
const mockFilter = "ALL";
const mockSetFilter = vi.fn();
const mockCurrencies = ["ALL", "USD", "HUF"];

describe("FilterComponent", () => {
  it("renders toggle buttons for each currency", () => {
    render(
      <FilterComponent
        filter={mockFilter}
        setFilter={mockSetFilter}
        currencies={mockCurrencies}
      />
    );

    // Verify that toggle buttons for each currency are rendered
    for (const currency of mockCurrencies) {
      const currencyToggleButton = screen.getByTestId(`toggle-${currency}`);
      expect(currencyToggleButton).toBeTruthy();
    }
  });

  it("calls setFilter when a currency toggle button is clicked", () => {
    render(
      <FilterComponent
        filter={mockFilter}
        setFilter={mockSetFilter}
        currencies={mockCurrencies}
      />
    );

    const hufToggleButton = screen.getByTestId("toggle-HUF");

    // Simulate a click on the GBP toggle button
    fireEvent.click(hufToggleButton);

    // Verify that setFilter was called with the selected currency
    expect(mockSetFilter).toHaveBeenCalledWith("HUF");
  });
});
