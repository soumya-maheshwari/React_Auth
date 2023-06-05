const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const app = express();
const URI = process.env.MONGODB_URL;
const userRoutes = require("./routes/userRoutes");
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
app.use(express.json());
app.use(cors());
// app.use("/api/users", require("./routes/userRoutes"));
app.use(userRoutes);
mongoose
  .connect(URI)
  .then(() => {
    console.log("CONECTED TO DB");
  })
  .catch((err) => {
    console.log(err);
  });
