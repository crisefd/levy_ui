import { Observable } from "rxjs";

const fetchMode = process.env.VUE_APP_FETCH_MODE;

export default function request(method, url, qParams, payload) {
  const body =
    method === "GET" ? URLSearchParams(qParams) : JSON.stringify(payload);
  const parameters = {
    headers: { "Content-Type": "application/json" },
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
