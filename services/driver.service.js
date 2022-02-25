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

/**
 * Servicios
 */

const findDriversNearToAddress = async (points) => {
  try {
    const drivers = Driver.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: points,
          },
          maxDistance: 2000,
          spherical: true,
          distanceMultiplier: 1 / 1000,
          distanceField: "distance",
          query: { isActive: true },
          key: "currentPosition",
        },
      },
      { $sort: { distanceField: 1 } },
      {
        $project: {
          distance: 1,
          _id: 1,
        },
      },
      {
        $lookup: {
          from: "cars",
          localField: "_id",
          foreignField: "owner",
          as: "carDetail",
        },
      },
    ]);
    if (drivers) return drivers;
    else return [];
  } catch (error) {
    return [];
  }
};

const acceptService = async (driverId) => {
  try {
    const currentDriver = await Driver.findById(driverId);
    currentDriver.isActive = false;
    const driverUpdated = await currentDriver.save();
    return driverUpdated;
  } catch (error) {
    throw new ErrorModel(error, 503);
  }
};

const setActive = async (driverId) => {
  try {
    const currentDriver = await Driver.findById(driverId);
    currentDriver.isActive = true;
    const driverUpdated = await currentDriver.save();
    return driverUpdated;
  } catch (error) {
    throw new ErrorModel(error, 503);
  }
};

module.exports = {
  register,
  findById,
  updatePosition,
  findDriversNearToAddress,
  acceptService,
  setActive,
};
