
import {Aurelia} from "aurelia-framework"

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin("httpConfiguration");

    aurelia.start().then(() => {
        aurelia.setRoot("app");
    });
}
