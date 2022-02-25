const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  registerValidations,
  registerCar,
  setPositionValidations,
} = require("../validations/driver.validations.js");

const {
  signUpDriver,
  findDriverById,
  setPosition,
} = require("../controller/driver.controller.js");

const { signUpCar } = require("../controller/car.controller.js");

/**
 * GET
 */
router.get("/:driverId", findDriverById);

/**
 * POST
 */
router.post("/", registerValidations, signUpDriver);
router.post("/:driverId/car", registerCar, signUpCar);

/**
 * PATCH
 */
router.patch("/:driverId/position", setPositionValidations, setPosition);

module.exports = router;
