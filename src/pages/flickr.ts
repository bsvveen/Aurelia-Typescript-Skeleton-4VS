
import "fetch"; // import "fetch" is required for IE

import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

@inject(HttpClient)
export class Flickr{

  heading = "Flickr";
  images = [];

  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
      httpClient.configure(config => {
          config
              .useStandardConfiguration()
              .withBaseUrl("http://api.flickr.com/services/feeds/");
      });

      this.httpClient = httpClient;
  }

  activate() {
      var self = this;
      return self.httpClient.fetch('photos_public.gne?tags=rainier&tagmode=any&format=json')
          .then(response => response.json())
          .then(response => alert(response));
  }

}