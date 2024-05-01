const mongoose = require("mongoose");

// MongoDB connection URL
const mongoURL = "mongodb+srv://kuchKhalo:kuchKhalo158@kuchkhalo.kj8s7tn.mongodb.net/Kuch_Khalo?retryWrites=true&w=majority&appName=KuchKhalo";

// Async function to connect to MongoDB and fetch data
const mongoConnect = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURL);
        console.log("connected to MongoDB");

        // Access collections in the MongoDB database
        const foodItemCollection = mongoose.connection.db.collection("food_item");
        const foodCategoryCollection = mongoose.connection.db.collection("food_category");

        // Fetch data from both collections
        const foodItems = await foodItemCollection.find({}).toArray();
        const foodCategories = await foodCategoryCollection.find({}).toArray();

        // Set global variables with fetched data
        global.food_item = foodItems;
        global.foodCategory = foodCategories;
    } catch (error) {
        // Handle errors if connection or data fetching fails
        console.error("Failed to connect to MongoDB", error);
        throw error; // Rethrow the error to handle it in the caller function
    }
};

module.exports = mongoConnect;
