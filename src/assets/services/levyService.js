import { Observable } from "rxjs";

const baseUrl = "localhost:4000";
export default {

    buildRequest = ([method, url, qParams, payload]) => {
        const body = method === "GET" ? URLSearchParams(qParams) : JSON.stringify(payload);
        const parameters = {
            headers: { 'Content-Type': 'application/json' },
            method: method,
            mode: "cors",
            body: body,
            cache: "default"
        };
        return Observable.create((observer) => {
            fetch(url, parameters)
                .then(response => {
                    observer.next(response.json());
                    observer.complete();
                })
                .catch(error => {
                    observer.error(error);
                })
        });
    },

    signUp = (email, password) => {
        const url = `${baseUrl}/users/signup`;
        return buildRequest([ 'POST', url,
                               null,
                              { email: email,
                                password: password} ]);
    }
}