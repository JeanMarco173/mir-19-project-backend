const { body, check } = require("express-validator");

const registerValidations = [
  body("name").isLength({ min: 3 }),
  body("surName").isLength({ min: 6 }),
  body("email").isEmail().normalizeEmail(),
];

const accessTokenValidations = [body("email").isEmail().normalizeEmail()];

const registerAddressValidations = [
  body("name").isLength({ min: 3 }),
  body("coordinates").isObject(),
  check("coordinates.*.lat").notEmpty(),
  check("coordinates.*.lng").notEmpty(),
];

module.exports = {
  registerValidations,
  accessTokenValidations,
  registerAddressValidations,
};
