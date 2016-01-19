
import {inject} from "aurelia-framework";
import {DialogController} from "aurelia-dialog";

@inject(DialogController)
export class DeleteDialog {
    contact: any;

    constructor(private controller: DialogController) {
        this.controller = controller;
    }

    activate(contact) {
        this.contact = contact;
    }
}