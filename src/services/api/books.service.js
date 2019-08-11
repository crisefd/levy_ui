
const google_books_url =  process.env.VUE_GOOGLE_BOOKS_URL;

const google_books_key = process.env.VUE_GOOGLE_BOOKS_KEY;

import { request } from "./api-request";

export const booksService = {
    search(searchParams, apiVersion = "v1") {
        const { keyword, terms} = searchParams;
        const stringifiedTerms = Object.entries(terms).map(entry =>  `${entry[0]}:${entry[1]}`);
        const url =  `${google_books_url}/${apiVersion}/volumes`;
        const params = {
            method: "GET",
            url: url,
            qParams: `q=${keyword}+${stringifiedTerms}&key=${google_books_key}`,
            payload: null
        };
        return request(params);
    }
};