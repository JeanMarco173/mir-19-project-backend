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
  registerAddressValidations,
} = require("../validations/customer.validations.js");

const {
  signUpCustomer,
  provideAccessToken,
  addAddress,
  listAddressByUser,
} = require("../controller/customer.controller.js");

/**
 * GET
 */
router.get(
  "/:customerId/address",
  validateJWT,
  registerAddressValidations,
  listAddressByUser
);

/**
 * POST
 */
router.post("/", registerValidations, signUpCustomer);
router.post("/token", accessTokenValidations, provideAccessToken);
router.post("/:customerId/address", validateJWT, addAddress);

module.exports = router;
