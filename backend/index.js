const express = require("express")
const mongoConnect = require("./database")
const app =express();
const cors = require('cors');
const user = require("./routes/user")
const show = require("./routes/displayData")
const order = require("./routes/orderData")

// Use CORS middleware to enable cross-origin requests
app.use(cors());

// Connect to MongoDB database
mongoConnect();

// Define a route for the root URL
app.get("/", (req, res) => {
    res.send("its done"); // Send a simple response when the root URL is accessed
});

// Parse incoming request bodies as JSON
app.use(express.json());

// Use the user-related routes under the '/api' prefix
app.use('/api', user);

// Use the data display routes under the '/api' prefix
app.use('/api', show);
app.use('/api', order);

// Start the server and listen on port 5000
app.listen(5000, () => {
    console.log("app running so smooth"); // Log a message when the server starts successfully
});