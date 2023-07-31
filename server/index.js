const express = require("express");
const sequelize = require("./db");
const models = require("./models/model");
const cors = require("cors");
const router = require("./routes/index");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

app.use("/api", router);
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(
      PORT,
      console.log(`Server is started succesfully on port ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};
start();
