import React from "react";
import { render, screen } from "@testing-library/react";
import Spending from "../src/components/spending/spending";

// Mock the props for the component
const mockSpending = {
  description: "Test Spending",
  amount: 100,
  currency: "USD",
  spent_at: "2023-09-06T12:00:00Z",
};

describe.only("Spending", () => {
  it("renders the description", () => {
    render(<Spending spending={mockSpending} />);
    const descriptionElement = screen.queryByText("Test Spending");
    expect(descriptionElement).toBeTruthy();
  });

  it("renders the formatted amount for USD currency", () => {
    render(<Spending spending={mockSpending} />);
    const amountElement = screen.queryByText("$100");
    expect(amountElement).toBeTruthy();
  });

  it("renders the formatted amount for HUF currency", () => {
    const hufSpending = { ...mockSpending, currency: "HUF" };
    render(<Spending spending={hufSpending} />);
    const amountElement = screen.queryByText("100 Ft");
    expect(amountElement).toBeTruthy();
  });

  it("renders the formatted date", () => {
    render(<Spending spending={mockSpending} />);
    const dateElement = screen.queryByText("September 06, 2023 at 2:00 PM");
    expect(dateElement).toBeTruthy();
  });
});
