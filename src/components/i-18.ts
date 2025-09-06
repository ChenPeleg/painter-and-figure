import {BaseElement} from '../_core/elements/base-element.ts';
import {TranslationService} from '../services/Translation.service.ts';
import type {Subscription} from '../models/Subscription.ts';


class I18 extends BaseElement {
    subscription: Subscription | undefined = undefined;

    get observedAttributes() {
        return ['t'];
    }

    connectedCallback() {
        super.connectedCallback();
        const translationService = this.servicesProvider.getService(TranslationService);
        this.subscription = translationService.subscribe((_state) => {
            this.updateText();
        })

    }

    disconnectedCallback() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }


    renderTemplate() {
        this.shadowRoot!.innerHTML = `<span id="translated-text">
             <slot></slot>
            </span>`;
    }

    private updateText() {
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
