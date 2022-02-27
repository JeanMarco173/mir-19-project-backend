const development = require("./development.env");
const production = require("./production.env");

const nodEnv = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET;
const notificationsAPI = process.env.NOTIFICATIONS_URI;
const notificationsId = process.env.NOTIFICATIONS_ID;
const notificationsToken = process.env.NOTIFICATIONS_TOKEN;

module.exports = {
  development,
  production,
  nodEnv,
  port,
  secret,
  notificationsAPI,
  notificationsId,
  notificationsToken,
};
