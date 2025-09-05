import type {RouteObject} from './_core/router/router.ts';


export const routes: RouteObject[] = [{
    path: '/page/:page',
    index: true,
    element: () => `<app-page></app-page>`
}, {
    path: '*',
    element: () => `<router-redirect to="/page/1"></router-redirect>`
}


]
