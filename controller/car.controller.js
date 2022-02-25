const asyncHandler = require("../middleware/asyncHandler.middleware.js");
const { validationResult } = require("express-validator");

const { register } = require("../services/car.service.js");

const signUpCar = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
  }
  const { model, brand, plate, type } = req.body;
  const { driverId } = req.params;
  const newCar = await register(
    {
      model,
      brand,
      plate,
      type,
      owner: driverId,
    },
    driverId
  );
  res.status(201).json({
    message: "El vehículo fue registrado con éxito.",
    status: "OK",
    data: {},
  });
});

module.exports = { signUpCar };
