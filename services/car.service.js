const Car = require("../models/car.schema.js");
const Driver = require("../models/driver.schema.js");
const ErrorModel = require("../models/error.schema.js");
const mongoose = require("mongoose");

const register = async (car, driverId) => {
  try {
    const owner = await Driver.findById(driverId);
    if (owner) {
      const newCar = await new Car(car);
      const session = await mongoose.startSession();
      await session.withTransaction(async () => {
        await newCar.save({ session });
        owner.car = newCar._id;
        await owner.save({ session });
      });
      await session.endSession();
      return newCar;
    } else {
      throw new ErrorModel("Conductor no registrado", 403);
    }
  } catch (error) {
    console.log("error", error);
    throw new ErrorModel(error, 503);
  }
};

module.exports = { register };
