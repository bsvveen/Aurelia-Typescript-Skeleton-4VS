import "bootstrap";

import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";

import {RouterConfig} from "routerConfig";

@inject(Router, RouterConfig)
export class App {

    router:  Router;
    appRouterConfig: RouterConfig;
   
    constructor(router: Router, routerConfig: RouterConfig) {
        this.router = router;
        this.appRouterConfig = routerConfig;
    }

    activate() {
        this.appRouterConfig.configure();
    }
}