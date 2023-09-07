import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SpendingList from "../src/components/spendingList/spendingList";

describe("SpendingList", () => {
  it("renders the form elements correctly", () => {
    render(<SpendingList />);

    const description = screen.getByTestId("input-description");
    const amount = screen.getByTestId("input-amount");
    const currency = screen.getByTestId("currency-select");
    const submit = screen.getByTestId("submit-button");

    // Ensure form elements are present
    expect(description).toBeTruthy();
    expect(amount).toBeTruthy();
    expect(currency).toBeTruthy();
    expect(submit).toBeTruthy();
  });

  it("renders the component with correct default values", () => {
    render(<SpendingList />);

    // Check if the description input field is empty by default
    const descriptionInput = screen.getByTestId("input-description");
    expect(descriptionInput.value).toBe();

    // Check if the amount input field is empty by default
    const amountInput = screen.getByTestId("input-amount");
    expect(amountInput.value).toBe();

    // Check if the currency select has the default value "USD"
    const currencyInput = document.getElementById(
      "mui-component-select-currency"
    );
    expect(currencyInput.textContent).toBe("USD");
  });
});
