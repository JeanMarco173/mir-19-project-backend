const { body } = require("express-validator");

const registerValidations = [
  body("name").isLength({ min: 3 }),
  body("surName").isLength({ min: 6 }),
  body("email").isEmail().normalizeEmail(),
];

const registerCar = [
  body("model").isLength({ min: 3 }),
  body("brand").isLength({ min: 3 }),
  body("plate").isLength({ min: 3 }),
  body("type").isLength({ min: 3 }),
];

const setPositionValidations = [body("position").isArray()];

module.exports = {
  registerValidations,
  registerCar,
  setPositionValidations,
};
