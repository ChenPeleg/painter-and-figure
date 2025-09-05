import {BaseElement} from '../elements/base-element.ts';
import {_ServicesProvider} from '../../services/_ServicesProvider.ts';
import {HashRouterService} from '../../services/HashRouter.service.ts';


export class RouterRedirect extends BaseElement {
    protected readonly servicesProvider = _ServicesProvider;

    get observedAttributes() {
        return ['to'];
    }

    connectedCallback(): void {
        super.connectedCallback();
        const to = this.getAttribute('to');
        if (to) {
            const router = this.servicesProvider.getService(HashRouterService);
            router.navigate(to);
        }

    }

    update() {
    }

    renderTemplate() {

    }


}

customElements.define('router-redirect', RouterRedirect);
