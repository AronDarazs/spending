import { AttachMoney } from "@mui/icons-material";
import "./spending.scss";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Button from "@mui/material/Button";

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
    <div className="spending-wrapper">
      <div className="inner-wrapper">
        <MonetizationOnOutlinedIcon className="square" />
        <div className="descriptions">
          <b>{spending.description}</b>
          <sub>{formatDate()}</sub>
        </div>
      </div>
      <div className="inner-wrapper">
        <div className="amount">
          <b>{formatAmount()}</b>
        </div>
        <Button>
          <BorderColorOutlinedIcon />
        </Button>
        <Button>
          <ClearOutlinedIcon />
        </Button>
      </div>
    </div>
  );
};

export default Spending;
