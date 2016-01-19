
import "fetch"; // import "fetch" is required for IE

import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

@inject(HttpClient)
export class Users {
    
    heading = "Github Users";
    users = [];

    httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        httpClient.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl("https://api.github.com/");
        });

        this.httpClient = httpClient;
    }

    activate() {
        return this.httpClient.fetch("users")
            .then(response => response.json())
            .then(users => this.users = <any>(users));
    }
}