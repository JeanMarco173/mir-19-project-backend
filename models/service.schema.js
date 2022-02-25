const mongoose = require("mongoose");
const PointSchema = require("./point.schema.js");
const AddressSchema = require("./address.schema.js");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  driver: { type: Schema.Types.ObjectId, ref: "Driver" },
  origin: { type: AddressSchema, required: true },
  destiny: { type: AddressSchema, required: true },
  distance: { type: Number, required: true },
  date: { type: Date, required: true },
  hour: { type: String, required: true },
  price: { type: Number, required: false },
  isScheduled: { type: Boolean, required: true, default: false },
  detail: { type: String, required: true },
  status: { type: String, required: true, default: "Creado" },
  points: [{ type: PointSchema, required: false }],
});

module.exports = mongoose.model("Service", ServiceSchema);
