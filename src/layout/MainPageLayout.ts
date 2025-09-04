import {BaseElement} from '../_core/elements/base-element.ts';

class MainPageLayout extends BaseElement {

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="h-screen w-screen overflow-hidden ">
                <slot>
            </div>
        `;
    }
}

customElements.define('main-page-layout', MainPageLayout);

