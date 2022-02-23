const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  brand: { type: String, required: true },
  plate: { type: String, required: true },
  type: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "Driver" },
});

module.exports = CarSchema;
