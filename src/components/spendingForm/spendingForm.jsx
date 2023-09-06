import React, { useState, useEffect } from "react";
import { createSpending, getSpendingList } from "../../services/apiService";
import Spending from "../spending/spending";
import "./SpendingForm.scss";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const SpendingForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    currency: "USD",
    spent_at: "",
  });

  const [spendings, setSpendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [sorting, setSorting] = useState("descend");
  const [errors, setErrors] = useState({});
  const [sortedSpendings, setSortedSpendings] = useState([]);
  const [filteredSpendings, setFilteredSpendings] = useState([]);

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const transformedData = transformFormData();
    const currentDatetime = new Date().toISOString();
    transformedData.spent_at = currentDatetime;

    try {
      await createSpending(transformedData);
      resetForm();
      fetchSpendings();
    } catch (error) {
      console.error("Error creating spending:", error.response);
      // Handle errors or show an error message to the user
    }
  };

  // Validation logic
  const validateForm = () => {
    const validationErrors = {};

    if (!formData.description.trim()) {
      validationErrors.description = "Description is required";
    }

    const amountAsInt = parseInt(formData.amount, 10);
    if (isNaN(amountAsInt) || amountAsInt <= 0) {
      validationErrors.amount = "Amount must be a positive number";
    }

    return validationErrors;
  };

  // Transformation logic
  const transformFormData = () => {
    const currencyUppercase = formData.currency.toUpperCase();
    return {
      ...formData,
      amount: parseInt(formData.amount, 10),
      currency: currencyUppercase,
    };
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      description: "",
      amount: 0,
      currency: "USD",
      spent_at: "",
    });
  };

  // Fetch spendings when the component mounts
  useEffect(() => {
    fetchSpendings();
  }, [createSpending]);

  // Sorting function
  const sortSpendings = (data, sortOrder) => {
    const sortedData = [...data];
    if (sortOrder === "ascend") {
      sortedData.sort((a, b) => new Date(a.spent_at) - new Date(b.spent_at));
    } else {
      sortedData.sort((a, b) => new Date(b.spent_at) - new Date(a.spent_at));
    }
    return sortedData;
  };

  // Filtering function
  const filterSpendings = (data, filterValue) => {
    if (filterValue === "ALL") {
      return data;
    }
    return data.filter((spending) => spending.currency === filterValue);
  };

  // Update the filteredSpendings state whenever spendings or filter change
  useEffect(() => {
    const filteredData = filterSpendings(sortedSpendings, filter);
    setFilteredSpendings(filteredData);
  }, [sortedSpendings, filter]);

  // Update the sortedSpendings state whenever spendings or sorting change
  useEffect(() => {
    const sortedData = sortSpendings(spendings, sorting);
    setSortedSpendings(sortedData);
  }, [spendings, sorting]);

  // Function to handle filter change
  const handleFilterChange = (event) => {
    if (event.target.value !== null) {
      setFilter(event.target.value);
    }
  };

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <div className="input-fields">
            <TextField
              placeholder="description"
              variant="outlined"
              name="description"
              onChange={handleInputChange}
              value={formData.description}
              error={!!errors.description}
              helperText={errors.description}
            />
            <TextField
              placeholder="0"
              variant="outlined"
              type="number"
              name="amount"
              onChange={handleInputChange}
              value={formData.amount}
              error={!!errors.amount}
              helperText={errors.amount}
            />
            <Select
              value={formData.currency}
              label="currency"
              name="currency"
              onChange={handleInputChange}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="HUF">HUF</MenuItem>
            </Select>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
      <div className="order-filter">
        <Select value={sorting} onChange={(e) => setSorting(e.target.value)}>
          <MenuItem value="descend">Sort by Date descending (Default)</MenuItem>
          <MenuItem value="ascend">Sort by Date ascending</MenuItem>
        </Select>
        <div>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilterChange}
          >
            <ToggleButton value="ALL">ALL</ToggleButton>
            <ToggleButton value="HUF">HUF</ToggleButton>
            <ToggleButton value="USD">USD</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <ul>
        {filteredSpendings.map((spending, id) => (
          <Spending spending={spending} key={id}></Spending>
        ))}
      </ul>
    </>
  );
};

export default SpendingForm;
