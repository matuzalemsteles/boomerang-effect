module.exports = {
	verbose: true,
	collectCoverage: true,
	"coverageReporters": [
		"json",
		"lcov"
	],
	coverageDirectory: 'coverage',
	snapshotSerializers: [
		"metal-jest-serializer",
	],
};
