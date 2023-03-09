"use strict";

module.exports = {
	root: true,
	extends: "phanective/node",

	env: {
		node: true,
		es6: true,
	},
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"node/no-unpublished-require": "off",
	},
	plugins: [".editorconfig"]
};
