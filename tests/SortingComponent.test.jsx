import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortingComponent from "../src/components/sortingComponent/sortingComponent";

// Mock the props for the component
const mockSorting = "descend";
const mockSetSorting = vi.fn();

describe("SortingComponent", () => {
  it("renders the component with correct default value", () => {
    render(
      <SortingComponent sorting={mockSorting} setSorting={mockSetSorting} />
    );

    expect(screen.getByText("Sort by Date descending (Default)")).toBeTruthy();
  });
});
