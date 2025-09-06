import {BaseElement} from '../_core/elements/base-element.ts';
import {TranslationService, Txt} from '../services/Translation.service.ts';


class AppBanner extends BaseElement {
    private t: TranslationService

    constructor() {
        super()
        this.t = this.servicesProvider.getService(TranslationService)
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <a href="#/page/1"  >
                <h1 class="p-1 w-full   px-3   text-purple-950 font-bold text-2xl text-shadow-2xs   select-none">
                   <i-18 t="${Txt.headerTitle}"> ${this.t.headerTitle}</i-18>
                </h1>
            </a>
        `;
    }


}

customElements.define('app-banner', AppBanner);
