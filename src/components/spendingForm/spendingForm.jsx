import React, { useState, useEffect } from "react";
import { createSpending, getSpendingList } from "../../services/apiService";
import Spending from "../spending/spending";
import FilterComponent from "../filterComponent/filterComponent";
import SortingComponent from "../sortingComponent/sortingComponent";
import "./SpendingForm.scss";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

// Constants
const CURRENCIES = ["USD", "HUF"];
const DEFAULT_FORM_DATA = {
  description: "",
  amount: "",
  currency: "USD",
  spent_at: "",
};

const SpendingForm = () => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
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

    if (formData.currency === "HUF") {
      const amountPattern = /^\d+$/; // Regular expression for a valid integer
      if (!amountPattern.test(formData.amount)) {
        validationErrors.amount =
          "Amount must be a valid integer for HUF currency";
      }
    } else if (formData.currency === "USD") {
      const amountPattern = /^\d+(\.\d{2})?$/; // Regular expression for a valid decimal number with two decimal places
      if (!amountPattern.test(formData.amount)) {
        validationErrors.amount =
          "Amount must be a valid number with two decimal places for USD currency";
      }
    }

    // Check if there are no validation errors
    const isValid = Object.keys(validationErrors).length === 0;

    // Reset errors when data is valid
    if (isValid) {
      setErrors({});
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
    setFormData(DEFAULT_FORM_DATA);
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
      <div className="upper-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <TextField
              placeholder="Description"
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
              name="currency"
              onChange={handleInputChange}
            >
              {CURRENCIES.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </div>
        </form>
        <div className="order-filter">
          <SortingComponent sorting={sorting} setSorting={setSorting} />
          <div>
            <FilterComponent
              filter={filter}
              setFilter={setFilter}
              currencies={CURRENCIES}
            />
          </div>
        </div>
      </div>
      <div>
        {filteredSpendings.map((spending, id) => (
          <Spending spending={spending} key={id}></Spending>
        ))}
      </div>
    </>
  );
};

export default SpendingForm;
