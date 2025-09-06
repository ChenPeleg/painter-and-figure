import {BaseElement} from '../_core/elements/base-element.ts';
import {AppStyles} from '../style/Styles.ts';


class AppButton extends BaseElement {

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div role="button" class="p-1 flex flex-row justify-center items-center ring-1 min-w-24  px-3   ${AppStyles.accentText} rounded-full ${AppStyles.accentRing}      cursor-pointer select-none">
             <slot></slot>
            </div>
        `;
    }



}

customElements.define('app-button', AppButton);
