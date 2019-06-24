import { Observable } from "rxjs";
import { authHeader } from "./auth-header";

const fetchMode = process.env.VUE_APP_FETCH_MODE;

/**
 * Wrapper function around the fetch API. It passes the neccesary
 * paramenters to fetch but it returns it as an Observable
 */
export function request({method, url, qParams, payload}) {
  const body =
    method === "GET" && qParams ? new URLSearchParams(qParams) : JSON.stringify(payload);
  const headers = new Headers({
    ...authHeader(),
    ...{"content-type": "application/json"}
  });
  const parameters = {
    headers: headers,
    method: method,
    mode: fetchMode,
    cache: "default"
  };
  if (method !== "GET" && method !== "HEAD") {
    parameters['body'] = body;
  }
  console.log("parameters: ", parameters);
  const request = new Request(url, parameters);
  return Observable.create(observer => {
    fetch(request)
      .then(response => response.json())
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
  });
};