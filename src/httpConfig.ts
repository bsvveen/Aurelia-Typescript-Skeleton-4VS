
import "fetch"; // import "fetch" is required for IE

import {Aurelia} from "aurelia-framework";
import {HttpClient} from 'aurelia-fetch-client';

export function configure(aurelia: Aurelia) {
    var httpClient = aurelia.container.get(HttpClient);

    httpClient.configure(config => {
        config       
            //.WithBaseUrl("xxx")  
            .withDefaults({
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'Fetch'
                    //'Authorization': `Bearer xxxxx` // Add the bearertoken here
                }
            })
            .withInterceptor({
                request(request) {
                    console.log(`Requesting ${request.method} ${request.url}`);
                    return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
                },
                response(response) {
                    console.log(`Received ${response.status} ${response.url}`);
                    return response;
                }
            });
    });
}