import {BaseElement} from '../_core/elements/base-element.ts';


class I18 extends BaseElement {
    get observedAttributes () {
        return ['t'];
    }


    renderTemplate() {
        this.shadowRoot!.innerHTML = `<span id="translated-text">
             <slot></slot>
            </span>`;
    }
}

customElements.define('i-18', I18);
