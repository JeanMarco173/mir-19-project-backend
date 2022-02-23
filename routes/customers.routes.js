const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateJWT = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});

const {
  registerValidations,
  accessTokenValidations,
} = require("../validations/customer.validations.js");

const {
  signUpCustomer,
  provideAccessToken,
} = require("../controller/customer.controller.js");

/**
 * GET
 */

/**
 * POST
 */
router.post("/", registerValidations, signUpCustomer);
router.post("/token", accessTokenValidations, provideAccessToken);

module.exports = router;
