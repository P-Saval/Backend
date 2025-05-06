
require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const usersRouter = require("./src/api/routes/users");

const { connectCloudinary } = require("./src/config/cloudinary");
const postRouter = require("./src/api/routes/posts");

PORT = 3000;
const app = express();
connectDB();
connectCloudinary();
//prueba//

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", usersRouter);
app.use("/api/v1/", postRouter);

app.use("/", (req, res, next) => {
    return res.status(404).json("Not found")
  });
   
  app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });