require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(process.env.MONGO_URL);

const covidRoute = require("./routes/covid.route");

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", covidRoute);

app.listen(port, () => {
	console.log("Example app listening on port " + port);
});
