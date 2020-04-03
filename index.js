require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");

const covidRoute = require("./routes/covid.route");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", covidRoute);

app.listen(port, () => {
	console.log("Example app listening on port " + port);
});
