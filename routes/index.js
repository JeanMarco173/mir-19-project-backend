const express = require("express");
const app = express();

const customersRoutes = require("./customers.routes.js");
const driverRoutes = require("./drivers.routes.js");
const serviceRoutes = require("./service.routes.js");

app.use("/customers", customersRoutes);
app.use("/drivers", driverRoutes);
app.use("/services", serviceRoutes);

module.exports = app;
