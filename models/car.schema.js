const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  model: { type: String, required: true },
  brand: { type: String, required: true },
  plate: { type: String, required: true },
  type: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "Driver" },
});

module.exports = mongoose.model("Car", CarSchema);
