const express = require("express");
const app = express();

const customersRoutes = require("./customers.routes.js");
const driverRoutes = require("./drivers.routes.js");

app.use("/customers", customersRoutes);
app.use("/drivers", driverRoutes);

module.exports = app;
