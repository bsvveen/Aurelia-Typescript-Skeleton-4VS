
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Insert {

    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    telephone: string;
    email: string;
    birthDate: string;
    statusCode: any;
    isInserted = false;
    textShowAll = "Cancel";

    httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        httpClient.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl("http://tutaurelia.azurewebsites.net/api/");
        });
        this.httpClient = httpClient;
    }

    insertContact() {
        const me = this;

        me.statusCode = "";

        const parts = this.birthDate.split("/");
        const mydate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

        const contact = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Address: this.address,
            City: this.city,
            Telephone: this.telephone,
            Email: this.email,
            BirthDate: mydate
        };

        this.httpClient.fetch("contacts/", {
            method: "post",
            body: JSON.stringify(contact)
        }).then(response => {
            this.isInserted = true;
            this.statusCode = response.status;
            this.textShowAll = "Show All";
        });
    }

    get canSave() {
        if (this.statusCode === 201) return false;
        return (this.firstName !== "" && this.lastName !== "" && this.email !== "" && this.birthDate !== "");
    }
}