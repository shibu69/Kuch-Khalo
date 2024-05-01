const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Importing the User model
const { body, validationResult } = require("express-validator"); // Importing validation middleware
const jwt = require("jsonwebtoken"); // Importing JWT for token generation
const bcrypt = require("bcryptjs"); // Importing bcrypt for password hashing
const JwtSecret = "ifyoulovetosolveproblemyoucansolvethecodetoo"; // Secret key for JWT token

// Route for user signup
router.post(
  "/signup",
  [
    // Validation middleware for signup request
    body("email", "Incorrect Email").isEmail(), // Email validation
    body("phoneNumber", "No alphabets").isNumeric(), // Phone number validation
    body("phoneNumber", "Minimum 10 digit Number").isLength({ min: 10 }), // Phone number length validation
    body("password", "Minimum length is 8 words").isLength({ min: 8 }), // Password length validation
  ],

  async (req, res) => {
    const errors = validationResult(req); // Checking for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Returning validation errors if any
    }

    const salt = await bcrypt.genSalt(13); // Generating salt for password hashing
    let setPass = await bcrypt.hash(req.body.password, salt); // Hashing the password

    try {
      // Creating a new user in the database
      await User.create({
        name: req.body.name,
        password: setPass,
        location: req.body.location,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      });

      // Generate authToken
      const data = {
        user: {
          id: user.id, // Extracting user ID
        },
      };
      const authToken = jwt.sign(data, JwtSecret); // Generating JWT token
      res.json({ success: true, authToken: authToken }); // Returning success and authToken
    } catch (error) {
      console.log(error);
      res.json({ success: false }); // Returning failure
    }
  }
);

// Route for user login
router.post(
  "/login",

  [
    // Validation middleware for login request
    body("email", "Incorrect Email").isEmail(), // Email validation
    body("password", "Minimum length is 8 words").isLength({ min: 8 }), // Password length validation
  ],

  async (req, res) => {
    const errors = validationResult(req); // Checking for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Returning validation errors if any
    }

    var email = req.body.email; // Extracting email from request
    var password = req.body.password; // Extracting password from request
    try {
      let userData = await User.findOne({ email }); // Finding user by email in the database
      if (!userData) {
        return res.status(400).json({ errors: "Enter Valid Credentials" }); // Returning error if user not found
      }

      const pwdCompare = await bcrypt.compare(password, userData.password); // Comparing hashed password
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Enter Valid Credentials" }); // Returning error if password is incorrect
      }

      const data = {
        user: {
          id: userData.id, // Extracting user ID
        },
      };

      const authToken = jwt.sign(data, JwtSecret); // Generating JWT token

      return res.json({ success: true, authToken: authToken }); // Returning success and authToken
    } catch (error) {
      console.log(error);
      res.json({ success: false }); // Returning failure
    }
  }
);

module.exports = router; // Exporting the router
