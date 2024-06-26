import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/ContextReducer";
import Modal from "../Modal";
import Cart from "../pages/Cart";

const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  const [respNavOpen, setRespNavOpen] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove authToken from localStorage
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Brand logo or name */}
        <Link className="navbar-brand fs-1 fst-italic me-4" to="/">
          KuchKhalo
        </Link>
        {/* Navbar toggle button for smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setRespNavOpen(!respNavOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {respNavOpen && (
          <div
            id="respNavbar"
            style={{
              background: "black",
              height: "300px",
              opacity: "0.",
              width: "100%",
              zIndex: "10000000",
              position: "absolute",
              top: "100%",
              left: "0",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                fontSize: "30px",
                flexDirection: "column",
              }}
            >
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 bold"
                  to="/"
                  onClick={() => setRespNavOpen(false)}
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5 bold"
                    to="/myorder"
                    onClick={() => setRespNavOpen(false)}
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
              {!localStorage.getItem("authToken") ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-5 bold"
                      to="/login"
                      onClick={() => setRespNavOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-5 bold"
                      to="/signup"
                      onClick={() => setRespNavOpen(false)}
                    >
                      SignUp
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-5 bold"
                      onClick={() => {
                        setCartView(true);
                        setRespNavOpen(false);
                      }}
                    >
                      My Cart{" "}
                      {data.length !== 0 ? (
                        <Badge pill bg="danger">
                          {data.length}
                        </Badge>
                      ) : null}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-5 bold"
                      onClick={()=>{handleLogout();
                        setRespNavOpen(false);
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Navbar items and links */}

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            {/* Home link */}
            <li className="nav-item">
              <Link
                className="nav-link active fs-5 bold"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>

            {/* Conditional rendering of My Orders link */}
            {localStorage.getItem("authToken") ? (
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 bold"
                  aria-current="page"
                  to="/myorder"
                >
                  My Orders
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>

          {/* Conditional rendering of login/logout and signup buttons */}
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              {/* Login link */}
              <Link
                className="btn bg-white text-danger mx-1 rounded-lg"
                to="/login"
              >
                Login
              </Link>
              {/* Signup link */}
              <Link className="btn bg-white text-danger mx-1" to="/signup">
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              {/* My Cart button */}
              <div
                className="btn bg-white text-success mx-2"
                onClick={() => {
                  setCartView(true);
                }}
              >
                My Cart{" "}
                {data.length !== 0 ? (
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                ) : null}
              </div>

              {cartView ? (
                <Modal
                  onClose={() => {
                    setCartView(false);
                  }}
                >
                  <Cart />
                </Modal>
              ) : null}
              {/* Logout button */}
              <div className="btn bg-danger mx-2" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
