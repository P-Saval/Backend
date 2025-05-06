const mongoose = require("mongoose");
const User = require("../../api/models/User");
const users = require("../../data/users");

const launchSeed = async () => {
try {
    await mongoose.connect("mongodb+srv://Psaval88:gEmjeoqcoPgf0mXX@backend.ccqmsq8.mongodb.net/?retryWrites=true&w=majority&appName=Backend");
    await User.collection.drop();
    await User.insertMany(users);
    await mongoose.disconnect();
} catch (error) {
    console.log("Error");
}
}

launchSeed();no