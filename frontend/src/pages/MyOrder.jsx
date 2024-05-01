import React, { useEffect, useState } from "react";

export default function MyOrder() {
  const [orderData, setOrderData] = useState("");
  const fetchOrder = async () => {
    await fetch("https://kuch-khalo.onrender.com/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setOrderData(response);
    });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {Object.keys(orderData).length > 0 ? (
          Array(orderData).map((data) => {

            return data.orderData
              ? data.orderData.order_data
                  .slice(0)
                  .reverse()
                  .map((item) => {
                    let totalPrice = 0; // Initialize total price for each order

                    
                    return item.map((arrayData, index) => {
                      
                      if (arrayData.Order_date) {
                        return (
                          <div key={arrayData.Order_date} className="m-auto mt-5">
                            <h2 className="text-success">
                              Date : {arrayData.Order_date}
                            </h2>
                            <hr />
                            {totalPrice !== 0 && (
                              <div>Total Price: {totalPrice}</div>
                            )}
                          </div>
                        );
                      } else {
                        totalPrice += arrayData.price; // Accumulate price for each item
                        return (
                          <div key={index} className="container">
                            <div className="row">
                              <div className="col">
                                <div className="card">
                                  <div className="card-body">
                                    <div className="row">
                                      <div className="col">
                                        <span>{index}</span>
                                      </div>
                                      <div className="col">
                                        <span>{arrayData.name}</span>
                                      </div>
                                      <div className="col">
                                        <span>{arrayData.qty}</span>
                                      </div>
                                      <div className="col">
                                        <span>"{arrayData.size}"</span>
                                      </div>
                                      <div className="col">
                                        <span>{arrayData.price} /-</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    });
                  })
              : <h1 style={{display:"flex",justifyContent:"center", alignItems:"center",height:"70vh"}}>You haven't ordered anything yet !!</h1>;
          })
        ) : (
          " "
        )}
      </div>
    </div>
  );
}
