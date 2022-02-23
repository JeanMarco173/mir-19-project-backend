const { body } = require("express-validator");

const registerValidations = [
  body("name").isLength({ min: 3 }),
  body("surName").isLength({ min: 6 }),
  body("email").isEmail().normalizeEmail(),
];

const accessTokenValidations = [body("email").isEmail().normalizeEmail()];

module.exports = { registerValidations, accessTokenValidations };
