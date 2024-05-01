const express = require("express");
const router = express.Router();
const mongoConnect = require("../database"); // Import mongoConnect function

router.post('/foodItems', async (req, res) => {
    try {
        await mongoConnect(); // Wait for data to be fetched from the database

        // Send the fetched data in the response
        res.send([global.food_item, global.foodCategory]);
    } catch (error) {
        res.send("server error");
    }
});

module.exports = router;