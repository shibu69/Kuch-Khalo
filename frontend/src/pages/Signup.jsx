import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
        phoneNumber: "",
    });

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://kuch-khalo.onrender.com/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            // Check for errors in response
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse response JSON
            const json = await response.json();
            console.log(json);

            // Store authToken in localStorage
            localStorage.setItem("userEmail",credentials.email)
            localStorage.setItem("authToken", json.authToken);

            navigate("/");
        } catch (error) {
            console.error("Error:", error.message);
            alert("Enter valid Credentials");
        }
    };

    // Function to handle input change
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className=" h-90vh">
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">
                        Name
                    </label>
                    {/* Input field for name */}
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputName"
                        name="name"
                        value={credentials.name}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    {/* Input field for email */}
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPhone" className="form-label">
                        Phone Number
                    </label>
                    {/* Input field for phone number */}
                    <input
                        type="tel"
                        className="form-control"
                        id="exampleInputPhone"
                        aria-describedby="PhoneHelp"
                        name="phoneNumber"
                        value={credentials.phoneNumber}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    {/* Input field for password */}
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputlocation" className="form-label">
                        Location
                    </label>
                    {/* Input field for location */}
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputlocation"
                        name="location"
                        value={credentials.location}
                        onChange={onChange}
                    />
                </div>

                {/* Submit button */}
                <button type="submit" className="m-3 btn btn-primary">
                    Submit
                </button>

                {/* Link to login page */}
                <Link to="/login" className=" m-3 btn btn-success">
                    Already Have An Account?
                </Link>
            </form>
        </div>
    );
};

export default Signup;
