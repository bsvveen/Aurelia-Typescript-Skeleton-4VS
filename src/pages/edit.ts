
import "fetch"; // import "fetch" is required for IE
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

@inject(HttpClient)
export class Insert {
    
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    city: string;
    telephone: string;
    email: string;
    birthDate: string;
    statusCode: any;
    textShowAll = "Cancel";
    isUpdated: boolean;

    httpClient: HttpClient;

    constructor(httpClient) {
        httpClient.configure(config => {
            config.withBaseUrl("http://tutaurelia.azurewebsites.net/api/");
        });

        this.httpClient = httpClient;
    }

    activate(params) {
        return this.httpClient.fetch("contacts/" + params.id).then(response => response.json()).then(data => {
            this.id = data.id;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.address = data.address;
            this.zipCode = data.zipCode;
            this.city = data.city;
            this.telephone = data.telephone;
            this.email = data.email;
            this.birthDate = data.birthDate;
        });
    }

    editContact() {
        const contact = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Address: this.address,
            Zipcode: this.zipCode,
            City: this.city,
            Telephone: this.telephone,
            Email: this.email,
            BirthDate: this.birthDate
        };

        this.httpClient.fetch("contacts/" + this.id, {
            method: "put",
            body: JSON.stringify(contact)
        }).then(response => {
            this.isUpdated = true;
            this.statusCode = response.status;
            this.textShowAll = "Show All";
        });

    }
}