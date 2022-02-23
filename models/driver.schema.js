const mongoose = require("mongoose");
const pointSchema = require("./point.schema.js");

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  name: { type: String, required: true, maxLength: 70 },
  surName: { type: String, required: true, maxLength: 70 },
  email: { type: String, required: true, maxLength: 100 },
  rating: { type: Number, required: true, default: 5 },
  avatar_url: { type: String },
  car: { type: Schema.Types.ObjectId, ref: "Car" },
  isActive: { type: Boolean, required: true, default: false },
  currentPosition: { type: pointSchema, required: false },
});

module.exports = mongoose.model("Driver", DriverSchema);
