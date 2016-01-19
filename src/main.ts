
import {Aurelia} from "aurelia-framework"

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin("httpConfig")
        .plugin("aurelia-dialog");

    aurelia.start().then(() => {
        aurelia.setRoot("app");
    });
}
