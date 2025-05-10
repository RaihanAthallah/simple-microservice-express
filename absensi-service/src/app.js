const express = require("express");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../docs/swagger");

// Dependency Injection
const db = require("./config/db");
const KaryawanRepository = require("./repositories/karyawan.repository");
const KaryawanService = require("./services/karyawan.service");
const KaryawanController = require("./controllers/absensi.controller");
const KaryawanRoute = require("./routes/karyawan.route");

const app = express();
app.use(bodyParser.json());

// Inject dependencies
const karyawanRepository = KaryawanRepository(db);
const karyawanService = KaryawanService(karyawanRepository);
const karyawanController = KaryawanController(karyawanService);
const karyawanRoute = KaryawanRoute(karyawanController);

// Register route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/karyawan", karyawanRoute);

module.exports = app;
