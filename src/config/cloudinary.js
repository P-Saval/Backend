const cloudinary = require("cloudinary").v2;


const connectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log("Conectado a cloudinary");
    } catch (error) {
        console.log("Error conectando a cloudinary");
        
    }
}

module.exports = { connectCloudinary };