import axios from "axios";

const BASE_URL = "https://shielded-depths-43687-bb049deacd16.herokuapp.com";

// Function to make a GET request
export const getSpendingList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/spendings`);
    return response.data;
  } catch (error) {
    throw error; // Propagate the error for handling in the component
  }
};

// Function to make a POST request to create a spending
export const createSpending = async (newSpending) => {
  try {
    const response = await axios.post(`${BASE_URL}/spendings/`, newSpending);
    return response.data;
  } catch (error) {
    throw error;
  }
};
