import { useState } from "react";
import SpendingForm from "./components/spendingForm/spendingForm";
import SpendingList from "./components/spendingList/spendingList";
// import SpendingList from "./components/spendingList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <SpendingForm></SpendingForm>;
    </div>
  );
}

export default App;
