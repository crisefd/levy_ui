const baseUrl = process.env.VUE_APP_LEVY_API_URI;

import { request } from "./api-request";

export const levyService = {
  signUp(userData, apiVersion = "v1") {
    const url = `${baseUrl}/${apiVersion}/users/signup`;
    return request("POST", url, null, {user: userData});
  },

  signIn(email, password, apiVersion = "v1") {
    const url = `${baseUrl}/${apiVersion}/users/signin`;
    return request("POST", url, null, { email, password });
  },

  signOut() {
    console.log("Signout not implemented yet");
  }
};
