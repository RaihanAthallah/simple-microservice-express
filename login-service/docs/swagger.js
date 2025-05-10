const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Login Service API",
      version: "1.0.0",
      description: "Dokumentasi API Login Service",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // path ke file route kamu yang ada anotasi Swagger-nya
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
