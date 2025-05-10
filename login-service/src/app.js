const express = require("express");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../docs/swagger");

// Dependency Injection
const db = require("./config/db");
const AuthRepository = require("./repositories/auth.repository");
const AuthService = require("./services/auth.service");
const AuthController = require("./controllers/auth.controller");
const AuthRoute = require("./routes/auth.route");

const app = express();
app.use(bodyParser.json());

// Inject dependencies
const authRepository = AuthRepository(db);
const authService = AuthService(authRepository);
const authController = AuthController(authService);
const authRoute = AuthRoute(authController);

// Register route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth", authRoute);

module.exports = app;
