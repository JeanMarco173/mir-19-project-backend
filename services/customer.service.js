const Customer = require("../models/customer.schema.js");
const ErrorModel = require("../models/error.schema.js");

const register = async (customer) => {
  try {
    const newCustomer = new Customer(customer);
    await newCustomer.save();
    return newCustomer;
  } catch (error) {
    throw new ErrorModel(error, 503);
  }
};

const findByEmail = async (email) => {
  try {
    const customer = await Customer.findOne({ email }).select({
      __v: 0,
      rating: 0,
      addresses: 0,
    });
    if (customer) return customer;
    else throw new ErrorModel("El usuario no está registrado", 403);
  } catch (error) {
    throw new ErrorModel(error, 503);
  }
};

module.exports = { register, findByEmail };
