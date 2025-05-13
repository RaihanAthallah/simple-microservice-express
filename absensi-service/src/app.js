const express = require("express");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../docs/swagger");
const morgan = require("morgan");
const path = require("path");

// Dependency Injection
const db = require("./config/db");
const AbsensiRepository = require("./repositories/absensi.repository");
const AbsensiService = require("./services/absensi.service");
const AbsensiController = require("./controllers/absensi.controller");
const AbsensiRoute = require("./routes/absensi.route");

const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(
  cors({
    origin: "*", // This allows all origins
  })
);

// Inject dependencies
const absensiRepository = AbsensiRepository(db);
const absensiService = AbsensiService(absensiRepository);
const absensiController = AbsensiController(absensiService);
const absensiRoute = AbsensiRoute(absensiController);

// Register route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/absensi-service/api/v1/absensi", absensiRoute);
// Serve folder "uploads" secara publik
app.use("/absensi-service", express.static(path.join(__dirname, "../uploads/absensi")));

module.exports = app;
