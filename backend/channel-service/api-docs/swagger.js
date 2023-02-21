const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Channel API",
    version: "1.0.0",
    description: "This is a REST API application made with Express.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "my server",
      url: "http://localhost:3000",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,

  apis: ["./api-docs/*.js"],
};
module.exports = swaggerJSDoc(options);
