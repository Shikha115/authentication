const express = require("express");
const dbConnection = require("./dbConnection");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors')

//connection to mongo
dbConnection(process.env.MONGO_URL);

//middleware
app.use(express.json());
app.use(cors())

//routes
app.use("/", require("./routes/user"));

//listening on
app.listen(port, () =>
  console.log(`Connected to server at http://localhost:${port}`)
);
