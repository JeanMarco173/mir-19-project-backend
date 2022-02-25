const { body } = require("express-validator");

const registerValidations = [
  body("customer").notEmpty(),
  body("origin").isObject(),
  body("destiny").isObject(),
  body("date").isDate(),
  body("hour").notEmpty(),
  body("distance").notEmpty(),
  body("detail").isLength({ min: 6 }),
];

const setDriverValidations = [
  body("driver").notEmpty(),
  body("price").notEmpty(),
];

module.exports = { registerValidations, setDriverValidations };
