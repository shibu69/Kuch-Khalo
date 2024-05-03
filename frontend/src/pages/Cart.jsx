import React, {useState}from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import trash from "../trash.svg";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [showAlert, setShowAlert] = useState(false); // State for managing alert visibility
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty</div>
      </div>
    );
  }
  setTimeout(() => {
    setShowAlert(false);
  }, 4000); // Change to 3000 for 3 seconds
  

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("https://kuch-khalo.onrender.com/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    if(response.status===200){
      dispatch({type:"DROP"})
    }
  };


  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
      {showAlert && (
        <div
          className="alert alert-warning bg-success alert-dismissible fade show"
          role="alert"
          style={{
            position: "fixed",
            top: "10px",
            height:"60px",
            right: "10px",
            zIndex: "1000000000",
            width: "300px",
            color: "white",
            border: "none",
          }}
        >
          <p className="fs-5">Order Placed Successfully</p>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowAlert(false)} // Close the alert
          ></button>
        </div>
      )}
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col">#</th>
            </tr>
          </thead>

          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img
                      src={trash}
                      style={{ height: "30px", width: "30px", color: "white" }}
                      alt="delete"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price : ₹ {totalPrice} /-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={()=>{handleCheckout();setShowAlert(true);}}>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
