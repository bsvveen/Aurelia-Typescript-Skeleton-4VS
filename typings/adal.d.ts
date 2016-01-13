
declare module "adal" {
    export class AuthenticationContext {
        inject(config: any);
        config: any;
        login(): any;
        logOut(): any;
        acquireToken(): any;
        getCachedUser(): any;
        handleWindowCallback(): any;
        isCallback(hash: string): any;
        acquireToken(clientid: string, delegate: any): any;
    }

    export function inject(config: any);
}
