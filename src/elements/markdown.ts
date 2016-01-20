
import Showdown = require('showdown');
import {HttpClient} from "aurelia-fetch-client";
import {customElement, bindable, inject} from 'aurelia-framework';

@inject(HttpClient, Showdown)
@customElement('markdown')
export class MarkDown {

    httpClient: HttpClient;
    converter: Showdown.Converter;

    innerHtml: string;
    @bindable content;
   
    constructor(httpClient, Showdown) {
        httpClient.configure(config => {config.withDefaults({headers: { 'Accept': 'text/plain' }});});
        
        this.httpClient = httpClient;
        this.converter = new Showdown.Converter();
    }

    attached() {
        var self = this;
        this.httpClient.fetch(this.content).then(function (response) {
            return response.text();
        }).then(function (body) {
            self.innerHtml = self.converter.makeHtml(body);
        });
    }
}