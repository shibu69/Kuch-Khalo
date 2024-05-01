import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("https://kuch-khalo.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
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
        localStorage.setItem("authToken",json.authToken)
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
    <form onSubmit={handleSubmit}>
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

      {/* Submit button */}
      <button type="submit" className="m-3 btn btn-primary">
        Submit
      </button>

      {/* Link to signup page */}
      <Link to="/signup" className=" m-3 btn btn-success">
        New User?
      </Link>
    </form>
  </div>
  )
}

export default Login
