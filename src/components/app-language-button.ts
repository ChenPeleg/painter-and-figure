import {BaseElement} from '../_core/elements/base-element.ts';
import {TranslationService} from '../services/Translation.service.ts';
import {AppLanguage} from '../models/Language.ts';


class AppLanguageButton extends BaseElement {
    private t: TranslationService

    constructor() {
        super()
        this.t = this.servicesProvider.getService(TranslationService)
    }

    connectedCallback() {
        super.connectedCallback();
        this.renderTemplate()
        const hebrewButton = this.$<HTMLSpanElement>('#set-hebrew');
        hebrewButton?.addEventListener('click', () => {
            this.t.changeLanguageTo(AppLanguage.Hebrew)

        })
        const englishButton = this.$<HTMLSpanElement>('#set-english');
        englishButton?.addEventListener('click', () => {
            this.t.changeLanguageTo(AppLanguage.English)
        })

    }


    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="w-max">
                <span id="set-hebrew" role="button"
                      class=" text-blue-700 cursor-pointer ${this.t.appLanguages === AppLanguage.Hebrew ? 'underline' : ''}">${this.t.hebrew}</span>/
                <span id="set-english" role="button"
                      class=" text-blue-700 cursor-pointer ${this.t.appLanguages === AppLanguage.English ? 'underline' : ''}">${this.t.english}</span>
            </div>
        `;
    }


}

customElements.define('language-button', AppLanguageButton);
