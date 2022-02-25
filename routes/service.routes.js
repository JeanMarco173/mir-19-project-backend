const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateJWT = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});

const {
  registerValidations,
  setDriverValidations,
} = require("../validations/service.validations.js");

const {
  signUpService,
  setUpDriver,
  setWaiting,
  setInProcess,
  setFinish,
  findServiceById,
} = require("../controller/service.controller.js");

/**
 * GET
 */
router.get("/:serviceId", validateJWT, findServiceById);

/**
 * POST
 */
router.post("/", validateJWT, registerValidations, signUpService);

/**
 * PATCH
 */
router.patch(
  "/:serviceId/driver",
  validateJWT,
  setDriverValidations,
  setUpDriver
);
router.patch("/:serviceId/waiting", validateJWT, setWaiting);
router.patch("/:serviceId/process", validateJWT, setInProcess);
router.patch("/:serviceId/finish", validateJWT, setFinish);

module.exports = router;
