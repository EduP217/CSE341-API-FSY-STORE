const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: "CSE341-T2 | Global FSY Store",
		description: "",
	},
	host: "api-fsy-store.onrender.com",
	basePath: "/api/v1/",
	schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
