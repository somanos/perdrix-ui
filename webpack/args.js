const argparse = require("argparse");

const parser = new argparse.ArgumentParser({
	description: "Drumee Server Development Toools ",
	add_help: true,
});

parser.add_argument("--public-path", {
	type: String,
	required: false,
	help: "Public path",
});

parser.add_argument("--bundle-path", {
	type: String,
	required: false,
	help: "Bundle path",
});

const args = parser.parse_args();
module.exports = args;