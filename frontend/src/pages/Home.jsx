import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { ThreeCircles } from "react-loader-spinner";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [foodCategory, setFoodCategory] = useState([]);
  const [FoodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState([]);

  const loadData = async () => {
    // Fetch data from the server
    let response = await fetch(
      "https://kuch-khalo.onrender.com/api/foodItems",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Parse the response as JSON
    response = await response.json();

    // Set state with fetched data
    setFoodItem(response[0]);
    setFoodCategory(response[1]);
    setLoading(false); // Set loading to false once data is fetched
  };

  useEffect(() => {
    // Load data when the component mounts
    loadData();
  }, []);

  return (
    <div>
      {/* Loader */}
      {loading && (
        <div
          style={{
            backgroundColor: "#7A5F5F",
            height: "100vh",
            width: "100vw",
            zIndex: "100000000",
            position: "absolute",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#E75653"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}

      <div id="home-container">
        {/* Carousel Component */}
        <div>
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade "
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {/* Carousel Caption */}
              <div
                className="carousel-caption d-none d-md-block"
                style={{
                  zIndex: "10",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                {/* Tagline for the carousel */}
                <h1
                  style={{
                    color: "white",
                    textShadow: "0px 0px 10px white",
                    marginTop: "50px",
                  }}
                >
                  Deliciousness Delivered to Your Doorstep
                </h1>
              </div>
              <div
                className="carousel-caption d-none d-md-block"
                style={{ zIndex: "10" }}
              >
                {/* Search input field */}
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {/* <button
                    className="btn btn-outline-success text-white bg-success"
                    type="submit"
                  >
                    Search
                  </button> */}
                </div>
              </div>

              {/* Carousel images */}
              <div className="carousel-item active">
                <img
                  src="https://source.unsplash.com/random/300×300/?food"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(30%)" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/300×300/?pizza"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(30%)" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/300×300/?burger"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(30%)" }}
                />
              </div>
            </div>
            {/* Carousel navigation buttons */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Home Component */}

        <div className="container">
          {foodCategory.length > 0
            ? foodCategory.map((data) => {
                return (
                  <div className="row mb-3">
                    <div key={data._id} className="fs-1 mt-3 mb-2">
                      {/* Display category name */}
                      {data.CategoryName}
                    </div>
                    <hr />
                    {FoodItem.length > 0 ? (
                      // Filter and map food items based on category and search query
                      FoodItem.filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search)
                      ).map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="cols-12 col-md-6 col-lg-3"
                          >
                            {/* Display individual food cards */}
                            <Cards
                              foodItem={filterItems}
                              foodOptions={filterItems.options[0]}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div>NO data found</div>
                    )}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
