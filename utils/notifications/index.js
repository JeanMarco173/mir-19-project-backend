const { default: axios } = require("axios");
const {
  notificationsAPI,
  notificationsId,
  notificationsToken,
} = require("../../config/index.js");

const sendNotificationsToCustomer = async (title, message, data, type) => {
  const body = {
    subID: "put your unique app user ID here as a string",
    appId: notificationsId,
    appToken: notificationsToken,
    title,
    message,
    pushData: { service: data, type },
  };
  await axios.post(notificationsAPI, body);
};

module.exports = { sendNotificationsToCustomer };
