import {BaseElement} from '../_core/elements/base-element.ts';


class AppButton extends BaseElement {

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div role="button" class="p-1 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 active:bg-blue-700 cursor-pointer select-none">
             <slot></slot>
            </div>
        `;
    }



}

customElements.define('app-button', AppButton);
