import React, { useState } from "react";
import ConfirmationScreen from "./ConfirmationScreen";

const OrderSummary = ({ orderData, goToHome }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return <ConfirmationScreen />;
  }

  return (
    <div className="order-summary">
      <h2>Sipariş Özeti</h2>
      <p><strong>İsim:</strong> {orderData.name}</p>
      <p><strong>Boyut:</strong> {orderData.size}</p>
      <p><strong>Ek Malzemeler:</strong> {orderData.toppings.join(", ")}</p>
      <p><strong>Not:</strong> {orderData.note}</p>
      <button onClick={handleConfirm}>Siparişi Onayla</button>
      <button onClick={goToHome}>Ana Sayfa</button>
    </div>
  );
};

export default OrderSummary;