import {BaseElement} from '../elements/base-element.ts';
import {_ServicesProvider} from '../../services/_ServicesProvider.ts';


export class RouterRedirect extends BaseElement {
    get observedAttributes() {
        return ['to'];
    }
    protected readonly servicesProvider = _ServicesProvider;


    connectedCallback(): void {
        super.connectedCallback();
        const to = this.getAttribute('to');
        if (to) {

            window.location.hash = to;
        }

    }

    update() {
    }

    renderTemplate() {

    }


}

customElements.define('router-redirect', RouterRedirect);
