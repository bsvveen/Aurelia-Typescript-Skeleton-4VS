
import "fetch"; // import "fetch" is required for IE

import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";


@inject(HttpClient)
export class Users {
    http: HttpClient;
    heading = "Github Users";
    users = [];

    constructor(http) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl("https://api.github.com/");
        });

        this.http = http;
    }

    activate() {
        return this.http.fetch("users")
            .then(response => response.json())
            .then(users => this.users = <any>(users));
    }
}