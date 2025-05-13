const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Absensi Service API",
      version: "1.0.0",
      description: "Dokumentasi API Absensi Service",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:3003/absensi-service/api/v1",
      },
    ],
  },
  apis: [
    "./src/routes/*.js", // Path to your route files with Swagger annotations
    "./docs/*.yaml", // Path to your YAML or JSON files with schema definitions
  ],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
