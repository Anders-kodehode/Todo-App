module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{js,html,json,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};