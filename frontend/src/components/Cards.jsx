import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Cards = ({ foodItem, foodOptions }) => {
  let dispatch = useDispatchCart();
  const priceRef = useRef();
  let options = foodOptions;
  const data = useCart();
  let priceOptions = Object.keys(options);
  let foodItems = foodItem;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State for managing alert visibility

  const handleCart = async () => {
    const existingFood = data.find((item) => item.id === foodItems._id);

    // Toggle the alert to show
    setShowAlert(true);

    if (existingFood) {
      // Item exists in the cart, update its quantity and price
      await dispatch({
        type: "UPDATE",
        id: foodItems._id,
        price: finalPrice,
        qty: qty,
      });
    } else {
      // Item doesn't exist in the cart, add it
      await dispatch({
        type: "ADD",
        id: foodItems._id,
        name: foodItems.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: foodItems.img,
      });
    }

     // Hide the alert after 2 or 3 seconds
  setTimeout(() => {
    setShowAlert(false);
  }, 2000); // Change to 3000 for 3 seconds
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      {/* Alert component */}
      {showAlert && (
        <div
          className="alert alert-warning bg-success alert-dismissible fade show"
          role="alert"
          style={{
            position: "fixed",
            top: "10px",
            height:"60px",
            right: "10px",
            zIndex: "9999",
            width: "300px",
            color: "white",
            border: "none",
          }}
        >
          <p className="fs-5">Added To Cart</p>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowAlert(false)} // Close the alert
          ></button>
        </div>
      )}

      {/* Card component */}
      <div
        className="card mt-3 bg-danger"
        style={{ width: "18rem", height: "500px", borderRadius: "30px" }}
      >
        <img
          className="card-img-top"
          src={foodItems.img}
          alt="Card cap"
          style={{
            height: "250px",
            objectFit: "cover",
            borderRadius: "30px",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItems.name}</h5>
          <p className="card-text">{foodItems.description}</p>
          <div style={{ position: "absolute", bottom: "10px" }}>
            <select
              className="m-1 h-100 w-40 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              className="m-3 h-100 w-40 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((price) => {
                return (
                  <option key={price} value={price}>
                    {price}
                  </option>
                );
              })}
            </select>
            <div className="d-inline ">₹ {finalPrice} /-</div>
            <hr />
            <div className="btn bg-success mx-2" onClick={handleCart}>
              Add to Cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
