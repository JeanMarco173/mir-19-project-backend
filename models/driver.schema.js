const mongoose = require("mongoose");
const pointSchema = require("./point.schema.js");

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  name: { type: String, required: true, maxLength: 70 },
  surName: { type: String, required: true, maxLength: 70 },
  email: { type: String, required: true, maxLength: 100 },
  rating: { type: Number, required: true, default: 5 },
  avatarUrl: { type: String },
  car: { type: Schema.Types.ObjectId, ref: "Car" },
  isActive: { type: Boolean, required: true, default: true },
  currentPosition: { type: pointSchema, index: "2dsphere" },
});

module.exports = mongoose.model("Driver", DriverSchema);
