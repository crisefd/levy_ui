import { Observable } from "rxjs";
import { authHeader } from "./auth-header";

const fetchMode = process.env.VUE_APP_FETCH_MODE;

/**
 * Wrapper function around the fetch API. It passes the neccesary
 * paramenters to fetch but it returns it as an Observable
 */

export function request(method, url, qParams, payload) {
  const body =
    method === "GET" ? URLSearchParams(qParams) : JSON.stringify(payload);
  const parameters = {
    headers: { ...authHeader(), ...{ 'Content-Type': 'application/json' } },
    method: method,
    mode: fetchMode,
    body: body,
    cache: "default"
  };
  console.log("parameters: ", parameters);
  return Observable.create(observer => {
    fetch(url, parameters)
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
  });
}
