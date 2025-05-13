const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../docs/swagger");

// Dependency Injection
const db = require("./config/db");
const KaryawanRepository = require("./repositories/karyawan.repository");
const KaryawanService = require("./services/karyawan.service");
const KaryawanController = require("./controllers/karyawan.controller");
const KaryawanRoute = require("./routes/karyawan.route");

const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(
  cors({
    origin: "*", // This allows all origins
  })
);

// Inject dependencies
const karyawanRepository = KaryawanRepository(db);
const karyawanService = KaryawanService(karyawanRepository);
const karyawanController = KaryawanController(karyawanService);
const karyawanRoute = KaryawanRoute(karyawanController);

// Register route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/karyawan-service/api/v1/karyawan", karyawanRoute);

module.exports = app;
