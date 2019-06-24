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
  const headers = new Headers({
    ...authHeader(),
    ...{"content-type": "application/json"}
  });
  const parameters = {
    headers: headers,
    method: method,
    mode: fetchMode,
    body: body,
    cache: "default"
  };
  const request = new Request(url, parameters);
  console.log("request: ", request);
  return Observable.create(observer => {
    fetch(request)
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
  });
}
