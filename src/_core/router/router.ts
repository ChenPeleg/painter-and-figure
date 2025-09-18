export type RouteObject = {
    path: string
    index?: boolean
    children?: RouteObject[]
    element: (params?: any) => string;
}
export type RouterState = {
    route: RouteObject | null; params: any
}

const mockWindow = {
    addEventListener : (_: string, __: () => void) => {

    },
    location: {
        hash: '',
        pathname: '/'
    },
    history: {
        pushState: (_: any, __: string, path: string) => {
            mockWindow.location.pathname = path;
        }
    }
}

export class Router {
    private routes: Map<string, RouteObject>;
    private currentPath: string;
    private readonly isHashRouter: boolean;
    private window = typeof window !== 'undefined' ? window : mockWindow;

    constructor({
                    routes,
                    isHashRouter = false
                }: {
        routes?: RouteObject[], isHashRouter?: boolean
    }) {
        this._state = {
            route: null,
            params: {}

        }
        this.routes = new Map();
        if (routes) {
            routes.forEach(route => this.registerRoute(route));
        }
        this.currentPath = '';
        this.isHashRouter = isHashRouter;
        if (!this.window) {
            return
        }

        if (this.isHashRouter) {
            this.window.addEventListener('hashchange', this.handleRouteChange.bind(this));
        } else {
            this.window.addEventListener('popstate', this.handleRouteChange.bind(this));
        }

    }

    private _state: RouterState

    public get state(): RouterState {
        return this._state;
    }

    public set changeCallback(callback: (state: RouterState) => RouterState) {
        this._routeChangeCallback = callback;
        setTimeout(() => {

            this.handleRouteChange()
        }, 1)
    }

    public registerRoute(route: RouteObject): Router {
        this.routes.set(route.path, route);
        return this;
    }

    public init(): void {
        this.handleRouteChange();
    }

    public navigate(path: string): void {
        if (this.isHashRouter) {
            if (this.window) {
                this.window.location.hash = path;
            }
            this.handleRouteChange();
        } else {
            if (this.window) {

                this.window.history.pushState(null, '', path);
            }
            this.handleRouteChange();
        }
    }

    private _routeChangeCallback(state: RouterState): RouterState {
        return state
    }

    private handleRouteChange(): void {
        this.currentPath = this.isHashRouter ? this.window.location.hash.slice(1) || '/' : window.location.pathname || '/';

        let match = this.findMatchingRoute(this.currentPath);


        if (match) {

            const {
                route,
                params
            } = match;
            this._state = {
                route,
                params
            };
        } else {
            console.error(`No route found for path: ${this.currentPath}`);
            this._state = {
                route: null,
                params: {}
            };
        }
        this._routeChangeCallback(this._state)

    }

    private findMatchingRoute(path: string): { route: RouteObject, params: any } | null {


        for (const [routePath, routeObj] of this.routes.entries()) {
            const params = this.matchRouteWithParams(routePath, path);
            if (params) {
                return {
                    route: routeObj,
                    params
                };
            }
        }
        if (this.routes.has(path)) {
            return {
                route: this.routes.get(path)!,
                params: {}
            };
        } else if (this.routes.has('*')) {
            return {
                route: this.routes.get('*')!,
                params: {}
            };
        }

        return null;
    }

    private matchRouteWithParams(routePath: string, path: string): any | null {
        if (routePath.includes('*')) {
            return null
        }
        const paramNames: string[] = [];
        const regexPattern = routePath
            .replace(/:\w+/g, (match) => {
                paramNames.push(match.slice(1));
                return '([^/]+)';
            })
            .replace(/\//g, '\\/');

        const regex = new RegExp(`^${regexPattern}$`);
        const matches = path.match(regex);

        if (!matches) {
            return null;
        }

        const params: { [key: string]: string } = {};
        paramNames.forEach((name, index) => {
            params[name] = matches[index + 1];
        });

        return params;
    }
}
