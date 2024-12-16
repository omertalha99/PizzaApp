import React, { useState } from "react";
import "./OrderForm.css";
import axios from "axios";

const basePrice = 85.5;
const toppingPrice = 5;

const OrderForm = ({ goToSummary }) => {
  const [formData, setFormData] = useState({
    size: "",
    dough: "Hamur Kalınlığı",
    toppings: [],
    note: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        toppings: checked
          ? [...prev.toppings, value]
          : prev.toppings.filter((item) => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleQuantity = (change) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + change),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPrice =
      basePrice + formData.toppings.length * toppingPrice * formData.quantity;
    try {
      const response = await axios.post("https://reqres.in/api/pizza", {
        ...formData,
        totalPrice,
      });
      goToSummary(response.data);
    } catch (error) {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const totalToppingsPrice = formData.toppings.length * toppingPrice;
  const totalPrice = (basePrice + totalToppingsPrice) * formData.quantity;

  const toppingsList = [
    "Pepperoni",
    "Sosis",
    "Kanada Jambonu",
    "Tavuk Izgara",
    "Soğan",
    "Domates",
    "Mısır",
    "Sucuk",
    "Jalepeno",
    "Sarımsak",
    "Biber",
    "Sucuk",
    "Ananas",
    "Kabak",
  ];

  return (
    <>
    <header className="custom-header">
  <h1>Teknolojik Yemekler</h1>
  <nav className="header-nav">
    <a href="/anasayfa">Anasayfa</a>
    <a href="/siparis" className="sub-nav">- Sipariş Oluştur</a>
  </nav>
</header>


      {/* Order Form */}
      <form className="order-form" onSubmit={handleSubmit}>
        <h3>Position Absolute Acı Pizza</h3>
        <div className="price-section">
          <p className="price">85.50₺</p>
          <span className="review-details">
            <span className="review-points">4.9</span>
            <span className="review-count">(200 reviews)</span>
          </span>
        </div>
        <p className="description">
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
          diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
          ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
          lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
        </p>

        <fieldset>
          <legend>Boyut Seç *</legend>
          {["Küçük", "Orta", "Büyük"].map((size) => (
            <label key={size}>
              <input
                type="radio"
                name="size"
                value={size}
                onChange={handleChange}
                required
              />
              {size}
            </label>
          ))}
        </fieldset>

        <label>
          Hamur Seç *
          <select name="dough" onChange={handleChange} value={formData.dough}>
            <option value="Hamur Kalınlığı" disabled>
              Hamur Kalınlığı
            </option>
            <option value="İnce">İnce</option>
            <option value="Kalın">Kalın</option>
          </select>
        </label>

        <fieldset>
          <legend>Ek Malzemeler</legend>
          <p>En fazla 10 malzeme seçebilirsiniz. (5₺)</p>
          <div className="toppings-grid">
            {toppingsList.map((topping) => (
              <label key={topping} className="topping-item">
                <input
                  type="checkbox"
                  value={topping}
                  onChange={handleChange}
                  disabled={
                    formData.toppings.length >= 10 &&
                    !formData.toppings.includes(topping)
                  }
                />
                {topping}
              </label>
            ))}
          </div>
        </fieldset>

        <label>
          Sipariş Notu:
          <textarea
            name="note"
            placeholder="Siparişine eklemek istediğin not var mı?"
            onChange={handleChange}
          />
        </label>

        <div className="quantity-control">
          <button type="button" onClick={() => handleQuantity(-1)}>
            -
          </button>
          <span>{formData.quantity}</span>
          <button type="button" onClick={() => handleQuantity(1)}>
            +
          </button>
        </div>

        <div className="order-summary">
          <p>
            Seçimler: <span>{totalToppingsPrice.toFixed(2)}₺</span>
          </p>
          <p>
            Toplam: <span className="total">{totalPrice.toFixed(2)}₺</span>
          </p>
        </div>

        <button type="submit">Sipariş Ver</button>
      </form>
    </>
  );
};

export default OrderForm;