var mongoose = require("mongoose");

var sortSchema = new mongoose.Schema({
	value: String,
	display: String
});

var Sort = mongoose.model("Sort", sortSchema, "sort");

module.exports = Sort;
