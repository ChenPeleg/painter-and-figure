import {BaseElement} from '../_core/elements/base-element.ts';


class I18 extends BaseElement {

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <span>
             <slot></slot>
            </span>
        `;
    }


}

customElements.define('i-18', I18);
