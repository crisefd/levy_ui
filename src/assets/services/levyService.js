
const baseUrl = "localhost:4000";
const apiVersion = "v1";

import { request } from './apiRequester';

export default levyService = {

    signUp = (userData) => {
        const url = `${baseUrl}/${apiVersion}/users/signup`;
        return request('POST', url, null, userData);
    },

    signIn = (email, password) => {
        const url = `${baseUrl}/${apiVersion}/users/signin`;
        const data =  {email: email, password: password};
        return request('POST', url, null, data);
    }
}