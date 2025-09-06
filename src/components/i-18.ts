import {BaseElement} from '../_core/elements/base-element.ts';
import {TranslationService} from '../services/Translation.service.ts';
import type {Subscription} from '../models/Subscription.ts';


class I18 extends BaseElement {
    subscription: Subscription | undefined = undefined;
    private t: TranslationService

    constructor() {
        super();
        this.t = this.servicesProvider.getService(TranslationService)
    }

    get observedAttributes() {
        return ['t'];
    }

    connectedCallback() {
        super.connectedCallback();
        this.subscription = this.t.subscribe((_state) => {
            this.update();
        })
        this.update()
    }

    disconnectedCallback() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }


    renderTemplate() {
        this.shadowRoot!.innerHTML = `<span id="translated-text">
<!--             <slot></slot>-->
            </span>`;
    }

      update() {
        const key = this.getAttribute('t');
        if (!key) {
            return;
        }
        const translationService = this.servicesProvider.getService(TranslationService);
        const translatedText = translationService.translate(key);
        const span = this.$<HTMLSpanElement>('#translated-text');
        if (span) {
            span.textContent = translatedText;
        }

    }
}

customElements.define('i-18', I18);
