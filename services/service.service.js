const Service = require("../models/service.schema.js");
const ErrorModel = require("../models/error.schema.js");

const register = async (service) => {
  try {
    const newService = new Service(service);
    await newService.save();
    return newService;
  } catch (error) {
    throw new ErrorModel(error, 503);
  }
};

const setDriver = async (serviceId, driver, price) => {
  try {
    const currentService = await Service.findById(serviceId);
    currentService.driver = driver;
    currentService.price = price;
    currentService.status = "En camino";
    const serviceUpdated = await currentService.save();
    return serviceUpdated;
  } catch (error) {
    throw new ErrorModel(error, 503);
  }
};

const setStatus = async (serviceId, status) => {
  try {
    const currentService = await Service.findById(serviceId);
    currentService.status = status;
    const serviceUpdated = await currentService.save();
    return serviceUpdated;
  } catch (error) {
    throw new ErrorModel(error, 503);
  }
};

const findById = async (serviceId) => {
  try {
    const service = await Service.findById(serviceId)
      .select({
        isScheduled: 0,
        __v: 0,
      })
      .populate({
        path: "driver",
        model: "Driver",
        select: {
          _id: 1,
          name: 1,
          surName: 1,
          type: 1,
        },
        populate: [
          {
            path: "car",
            model: "Car",
            select: {
              model: 1,
              brand: 1,
              plate: 1,
              type: 1,
            },
          },
        ],
      });
    return service;
  } catch (error) {
    throw new ErrorModel(error, 503);
  }
};

module.exports = { register, setDriver, setStatus, findById };
