
import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class RouterConfig {

    router: Router;

    constructor(router) {
        this.router = router;
    }

    configure() {
        const appRouterConfig = config => {
            config.title = "Aurelia Typescript 4VS";
            config.mapUnknownRoutes(instruction => {instruction.config.moduleId = "pages/welcome"; return instruction;});
            config.map([
                { route: ["", "welcome"], name: "welcome", moduleId: "pages/welcome", nav: true, title: "Welcome" },
                { route: "users", name: "users", moduleId: "pages/users", nav: true, title: "Github Users" },
                { route: "list", name: "list", moduleId: "pages/list", nav: true, title: "List" },
                { route: "contacts/:id/detail", name: "Edit", moduleId: "pages/edit" },
                { route: "insert", moduleId: "pages/insert", title: "Insert Contact" }
            ]);
        };
        this.router.configure(<any>appRouterConfig);
    }
}