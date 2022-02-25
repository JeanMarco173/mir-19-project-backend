const mongoose = require("mongoose");
const AddressSchema = require("./address.schema.js");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: { type: String, required: true, maxLength: 70 },
  surName: { type: String, required: true, maxLength: 70 },
  email: { type: String, required: true, maxLength: 100 },
  avatarUrl: { type: String },
  rating: { type: Number, required: true, default: 5 },
  addresses: [AddressSchema],
});

module.exports = mongoose.model("Customer", CustomerSchema);
