const asyncHandler = require("../middleware/asyncHandler.middleware.js");
const { validationResult } = require("express-validator");
const {
  sendNotificationsToCustomer,
} = require("../utils/notifications/index.js");

const {
  register,
  setDriver,
  setStatus,
  findById,
} = require("../services/service.service.js");
const {
  findDriversNearToAddress,
  acceptService,
} = require("../services/driver.service.js");

/**
 * Constante para notificaciones
 */

const title = "HouseMove 🚚";
const notificationType = "service";

/**
 * Funciones internas
 */

const getDrivers = async (point, distance) => {
  const drivers = await findDriversNearToAddress(point);
  return drivers.map((driver) => {
    switch (driver.carDetail[0].type) {
      case "Van":
        driver.price = distance * 1.5;
        break;
      case "Pickup":
        driver.price = distance * 2;
        break;
      case "middleTruck":
        driver.price = distance * 2.5;
        break;
      case "bigTruck":
        driver.price = distance * 3;
        break;
    }
    return driver;
  });
};

const fomatAddress = async (address) => {
  if (!address.location) {
    const addressAux = {
      ...address,
      location: {
        type: "Point",
        coordinates: [address.coordinates.lat, address.coordinates.lng],
      },
    };
    return addressAux;
  }
  return address;
};

/**
 * Funciones para exportar
 */

const signUpService = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
  }
  const { customer, date, hour, detail, distance } = req.body;
  const origin = await fomatAddress(req.body.origin);
  const destiny = await fomatAddress(req.body.destiny);
  const newService = await register({
    customer,
    origin,
    destiny,
    distance,
    date,
    hour,
    detail,
  });
  const drivers = await getDrivers(origin.location.coordinates, distance);
  res.status(200).json({
    message: "El servicio fue registrado con éxito.",
    status: "OK",
    data: { service: newService, drivers },
  });
});

const findServiceById = asyncHandler(async (req, res, next) => {
  const { serviceId } = req.params;
  const service = await findById(serviceId);
  res.status(200).json({
    message: "El servicio se listó con éxito.",
    status: "OK",
    data: service,
  });
});

const setUpDriver = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
  }
  const { driver, price } = req.body;
  const { serviceId } = req.params;
  const driverUpdated = await acceptService(driver);
  const serviceUpdated = await setDriver(serviceId, driver, price);
  const service = await findById(serviceId);
  res.status(200).json({
    message: "El driver está en camino.",
    status: "OK",
    data: { service },
  });
});

const setWaiting = asyncHandler(async (req, res, next) => {
  const { serviceId } = req.params;
  const serviceUpdated = await setStatus(serviceId, "Esperando");
  const service = await findById(serviceId);
  await sendNotificationsToCustomer(
    title,
    "El driver ha llegado",
    service,
    notificationType
  );
  res.status(200).json({
    message: "El driver ha llegado.",
    status: "OK",
    data: { service },
  });
});

const setInProcess = asyncHandler(async (req, res, next) => {
  const { serviceId } = req.params;
  const serviceUpdated = await setStatus(serviceId, "En proceso");
  const service = await findById(serviceId);
  await sendNotificationsToCustomer(
    title,
    "Su viaje a comenzado",
    service,
    notificationType
  );
  res.status(200).json({
    message: "El viaje ha comenzado.",
    status: "OK",
    data: { service: serviceUpdated },
  });
});

const setFinish = asyncHandler(async (req, res, next) => {
  const { serviceId } = req.params;
  const serviceUpdated = await setStatus(serviceId, "Finalizado");
  const service = await findById(serviceId);
  await sendNotificationsToCustomer(
    title,
    "Su viaje ha finalizado",
    service,
    notificationType
  );
  res.status(200).json({
    message: "El viaje a terminado.",
    status: "OK",
    data: { service: serviceUpdated },
  });
});

module.exports = {
  signUpService,
  findServiceById,
  setUpDriver,
  setWaiting,
  setInProcess,
  setFinish,
};
