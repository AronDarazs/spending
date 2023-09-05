import React, { useState, useEffect } from "react";
import { createSpending, getSpendingList } from "../../services/apiService";
import Spending from "../spending/spending";
import "./SpendingForm.scss";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const SpendingForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    currency: "USD",
    spent_at: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data (check for missing fields)
    if (!formData.description || !formData.amount) {
      // Handle form validation error
      return;
    }

    // Transform the amount to an integer
    const amountAsInt = parseInt(formData.amount, 10);

    // Transform the currency to uppercase
    const currencyUppercase = formData.currency.toUpperCase();

    // Create a new object with transformed data
    const transformedData = {
      ...formData,
      amount: amountAsInt,
      currency: currencyUppercase,
    };

    // Set spent_at to the current datetime
    const currentDatetime = new Date().toISOString();
    transformedData.spent_at = currentDatetime;

    try {
      await createSpending(transformedData);
      // Reset the form
      setFormData({
        description: "",
        amount: 0,
        currency: "USD",
        spent_at: "",
      });

      // Fetch updated spendings
      fetchSpendings();
    } catch (error) {
      console.error("Error creating spending:", error.response);
      // Handle errors or show an error message to the user
    }
  };

  const handleCreateSpending = async (newSpending) => {
    try {
      const createdSpending = await createSpending(newSpending);
      setSpendings([...spendings, createdSpending]);
      // Handle success or show a success message to the user
    } catch (error) {
      console.error("Error creating spending:", error);
      // Handle errors or show an error message to the user
    }
  };

  const handleFilter = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const [spendings, setSpendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  // Fetch spendings when the component mounts
  async function fetchSpendings() {
    try {
      const spendingsData = await getSpendingList();
      setSpendings(spendingsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching spendings:", error);
    }
  }
  useEffect(() => {
    fetchSpendings();
  }, [createSpending]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <div className="input-fields">
            <input
              type="text"
              placeholder="description"
              name="description" // Match the key in formData
              value={formData.description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              placeholder="0"
              name="amount" // Match the key in formData
              value={formData.amount}
              onChange={handleInputChange}
            />
            {/* <label for="currency"></label> */}
            <select
              id="currency"
              name="currency" // Match the key in formData
              value={formData.currency}
              onChange={handleInputChange}
            >
              <option value="usd">USD</option>
              <option value="huf">HUF</option>
            </select>
            <input type="submit" />
          </div>
          <div className="order-filter">
            <select id="order" defaultValue="Sort by Date descending (Default)">
              <option value="descend">Sort by Date descending (Default)</option>
              <option value="ascend">Sort by Date ascending</option>
            </select>
            <div>
              <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleFilter}
                aria-label="text alignment"
              >
                <ToggleButton value="ALL">
                  ALL
                </ToggleButton>
                <ToggleButton value="HUF">
                  HUF
                </ToggleButton>
                <ToggleButton value="USD">
                  USD
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <div></div>
        </div>
      </form>
      <ul>
        {spendings.map((spending, id) => (
          <Spending spending={spending} key={id}></Spending>
        ))}
      </ul>
    </>
  );
};

export default SpendingForm;
