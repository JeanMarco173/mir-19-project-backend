const axios = require("axios");
const {
  notificationsAPI,
  notificationsId,
  notificationsToken,
} = require("../../config/index.js");

const sendNotificationsToCustomer = async (title, message, data, type) => {
  console.log("entro aqui");
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    subID: data.customer,
    appId: notificationsId,
    appToken: notificationsToken,
    title,
    message,
    pushData: { service: data, type },
  };
  const res = await axios({
    method: "post",
    url: notificationsAPI,
    headers,
    data: body,
  });
};

module.exports = { sendNotificationsToCustomer };
