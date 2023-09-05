import { getSpendingList } from "../../services/apiService";
import { useState, useEffect } from "react";
import "./spendingList.scss"

const SpendingList = () => {
  // Render a list of spendings
  const [spendings, setSpendings] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  console.log(spendings);

  return (
    <ul>
      {spendings.map((spending) => (
        <Spending spending={spending}></Spending>
      ))}
    </ul>
  );
};

export default SpendingList;
