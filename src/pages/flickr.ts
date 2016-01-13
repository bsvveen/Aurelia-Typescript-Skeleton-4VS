
import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

@autoinject
export class Flickr{

  heading = "Flickr";
  images = [];
  url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=rainier&tagmode=any&format=json";
  httpClient: HttpClient;

  constructor(httpClient:HttpClient){
      this.httpClient = httpClient;
  }

  activate() {
      var self = this;
      return this.httpClient.fetch(this.url).then(function (response) {
          return response.json().then(function (response) {
              self.images = response.items;
          });
      });
    }

    canDeactivate(){
    return confirm("Are you sure you want to leave?");
    }
}
