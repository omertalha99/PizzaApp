import React, { useState } from "react";
import HomePage from "./HomePage";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [orderSummary, setOrderSummary] = useState(null);

  // Function to navigate to the form page
  const goToForm = () => setCurrentPage("form");

  // Function to navigate to the summary page and pass order data
  const goToSummary = (data) => {
    setOrderSummary(data);
    setCurrentPage("summary");
  };

  // Function to return to the home page
  const goToHome = () => setCurrentPage("home");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {currentPage === "home" && <HomePage goToForm={goToForm} />}
      {currentPage === "form" && <OrderForm goToSummary={goToSummary} />}
      {currentPage === "summary" && (
        <OrderSummary orderData={orderSummary} goToHome={goToHome} />
      )}
    </div>
  );
}

export default App;