const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateJWT = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});

/**
 * GET
 */
//router.get("/:customerId", validateJWT, findCustomer);

/**
 * POST
 */

module.exports = router;
