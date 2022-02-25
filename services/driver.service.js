const Driver = require("../models/driver.schema");
const ErrorModel = require("../models/error.schema.js");

const register = async (driver) => {
  try {
    const newDriver = new Driver(driver);
    await newDriver.save();
    return newDriver;
  } catch (error) {
    throw new ErrorModel(error, 503);
  }
};

const findById = async (driverId) => {
  try {
    const driver = await Driver.findById(driverId)
      .select({
        __v: 0,
        rating: 0,
        isActive: 0,
      })
      .populate({
        path: "car",
        model: "Car",
        select: {
          model: 1,
          brand: 1,
          plate: 1,
          type: 1,
        },
      });
    if (driver) return driver;
    else throw new ErrorModel("El usuario no está registrado", 403);
  } catch (error) {
    throw new ErrorModel(error, 503);
  }
};

const updatePosition = async (driverId, position) => {
  try {
    const currentDriver = await Driver.findById(driverId);
    currentDriver.currentPosition = position;
    const driverUpdated = await currentDriver.save();
    return driverUpdated;
  } catch (error) {
    throw new ErrorModel(error, 503);
  }
};

module.exports = { register, findById, updatePosition };
