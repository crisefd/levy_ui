const baseUrl = process.env.VUE_APP_LEVY_API_URI;
// const baseUrl = "/";
const apiVersion = process.env.VUE_APP_LEVY_API_VERSION;

import request from "./apiRequester";

export default {
  signUp(userData) {
    const url = `${baseUrl}/${apiVersion}/users/signup`;
    return request("POST", url, null, userData);
  },

  signIn(email, password) {
    const url = `${baseUrl}/${apiVersion}/users/signin`;
    const data = { email: email, password: password };
    return request("POST", url, null, data);
  }
};
