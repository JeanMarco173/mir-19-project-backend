const mongoose = require("mongoose");
const pointSchema = require("./point.schema.js");

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  name: { type: String, required: true },
  location: { type: pointSchema, required: true },
  coordinates: { type: Object, required: true },
});

module.exports = AddressSchema;
