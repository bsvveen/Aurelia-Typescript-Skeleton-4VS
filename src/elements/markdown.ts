
import Showdown = require('showdown');
import {HttpClient} from "aurelia-fetch-client";
import {customElement, bindable, inject} from 'aurelia-framework';

@inject(HttpClient, Showdown)
@customElement('markdown')
export class MarkDown {

    httpClient: HttpClient;
    converter: Showdown.Converter;

    innerHtml: string;
    @bindable contenturl;
   
    constructor(httpClient, showdown) {
        this.httpClient = httpClient;
        this.converter = new showdown.Converter();
    }

    attached() {
        var self = this;

        self.httpClient.configure(config => {
            config.withDefaults({ headers: { 'Accept': 'text/plain' } });
        });

        var fetchresult = self.httpClient.fetch(self.contenturl);

        fetchresult
        .then(self.checkStatus)
        .then(body => {
            this.innerHtml = this.converter.makeHtml(body);
        }).catch(ex => {
            alert(new Error(ex));
        });
    }

    checkStatus(response) {
        switch (true) {
            case (response.status >= 200 && response.status < 300):
                return response.text();
            case (response.status === 404):
                return "### The requested resource readme.md was not found. \n  Make sure you have added the .md mimeMap to your web.config. \n\r" +
                " ``` <system.webServer><staticContent><mimeMap fileExtension=\".md\" mimeType=\"text/plain\" \/></staticContent></system.webServer> ```";
            default:
                return "## An error has occured: " + response.statusText;
        }
    }
}