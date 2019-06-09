import { Observable } from "rxjs";
import { authHeader } from "./auth-header";

const fetchMode = process.env.VUE_APP_FETCH_MODE;

export function request(method, url, qParams, payload) {
  const body =
    method === "GET" ? URLSearchParams(qParams) : JSON.stringify(payload);
  const parameters = {
    headers: { ...authHeader(), ...{ "Content-Type": "application/json" } },
    method: method,
    mode: fetchMode,
    body: body,
    cache: "default"
  };
  return Observable.create(observer => {
    fetch(url, parameters)
      .then(response => {
        observer.next(response.json());
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
  });
}
