const baseUrl = process.env.VUE_APP_LEVY_API_URI;

import { request } from "./api-request";

export const levyService = {
  signUp(userData, apiVersion = "v1") {
    const url = `${baseUrl}/${apiVersion}/users/signup`;
    const params = {
      method: "POST",
      url: url,
      qParams: null,
      payload: {user: userData}
    };
    return request(params);
  },

  signIn(email, password, apiVersion = "v1") {
    const url = `${baseUrl}/${apiVersion}/users/signin`;
    const params = {
      method: "POST",
      url: url,
      qParams: null,
      payload: { email, password }
    };
    return request(params);
  },

  listUsers(apiVersion = "v1") {
    const url = `${baseUrl}/${apiVersion}/users`;
    const params = {
      method: "GET",
      url: url,
      qParams: null,
      payload: null
    };
    return request(params);
  }
};
