const axios = require("axios");

module.exports.index = async (req, res) => {
	var list = [];
	var vietnam = [];
	var sorts = [
		{ value: "deaths", display: "Số ca tử vong" },
		{ value: "cases", display: "Tổng số ca nhiễm" },
		{ value: "todayCases", display: "Số ca nhiễm hôm nay" },
		{ value: "todayDeaths", display: "Số ca tử vong hôm nay" }
	];
	const all = await axios({
		url: "https://corona.lmao.ninja/all",
		method: "get"
	});
	const countries = await axios({
		url: "https://corona.lmao.ninja/countries?sort=deaths&order=desc",
		method: "get"
	});
	list = countries.data.slice();
	vietnam = list.find((item) => item.country == "Vietnam");
	list.sort((a, b) => a.country.localeCompare(b.country));
	res.render("index", {
		all: all.data,
		options: list,
		countries: countries.data,
		vietnam: vietnam,
		sorts: sorts
	});
};
module.exports.search = async (req, res) => {
	var list = [];
	var q = req.query.q;
	var sort = req.query.sort;
	var sorts = [
		{ value: "deaths", display: "Số ca tử vong" },
		{ value: "cases", display: "Tổng số ca nhiễm" },
		{ value: "todayCases", display: "Số ca nhiễm hôm nay" },
		{ value: "todayDeaths", display: "Số ca tử vong hôm nay" }
	];

	const all = await axios({
		url: "https://corona.lmao.ninja/all",
		method: "get"
	});

	const vietnam = await axios({
		url: "https://corona.lmao.ninja/countries/Vietnam",
		method: "get"
	});

	const options = await axios({
		url: "https://corona.lmao.ninja/countries?sort=deaths&order=desc",
		method: "get"
	});
	options.data.sort((a, b) => a.country.localeCompare(b.country));

	var url = "https://corona.lmao.ninja/countries/" + q;
	const countries = await axios({
		url: url,
		method: "get"
	});
	if (Array.isArray(countries.data) == false) {
		list.push(countries.data);
	} else {
		list = countries.data.slice();
	}
	if (list.length > 1) {
		switch (sort) {
			case "cases":
				list.sort((a, b) => b.cases - a.cases);
				break;
			case "todayCases":
				list.sort((a, b) => b.todayCases - a.todayCases);
				break;
			case "deaths":
				list.sort((a, b) => b.deaths - a.deaths);
				break;
			case "todayDeaths":
				list.sort((a, b) => b.todayDeaths - a.todayDeaths);
				break;
			default:
				break;
		}
	}

	res.render("index", {
		all: all.data,
		countries: list,
		options: options.data,
		keySearch: q,
		sorts: sorts,
		keySort: sort,
		vietnam: vietnam.data
	});
};
