import "./spending.scss";

const Spending = ({ spending }) => {
  function formatAmount() {
    if (spending.currency === "USD") {
      return `$${spending.amount} `;
    } else if (spending.currency === "HUF") {
      return `${spending.amount} Ft`;
    } else {
      return `${spending.amount} of unknown currency`;
    }
  }

  function formatDate() {
    const options = {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      month: "long",
      day: "2-digit",
      year: "numeric",
    };

    const date = new Date(spending.spent_at);
    return date.toLocaleString("en-US", options);
  }

  return (
    <li className="wrapper">
      <div className="descriptions">
        <h1>{spending.description}</h1>
        <h4>{formatDate()}</h4>
      </div>
      <div className="amount">
        <h1>{formatAmount()}</h1>
      </div>
    </li>
  );
};

export default Spending;
