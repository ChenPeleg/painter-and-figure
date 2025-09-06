import {BaseElement} from '../_core/elements/base-element.ts';


class AppButton extends BaseElement {

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div role="button" class="p-1 ring-1  px-3 bg-slate-100 text-blue-500 rounded-full  ring-blue-500    cursor-pointer select-none">
             <slot></slot>
            </div>
        `;
    }



}

customElements.define('app-button', AppButton);
