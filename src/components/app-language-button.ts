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

        const hebrewButton = this.$<HTMLSpanElement>('#set-hebrew');
        const englishButton = this.$<HTMLSpanElement>('#set-english');

        hebrewButton?.addEventListener('click', () => {
            this.t.changeLanguageTo(AppLanguage.Hebrew)
        })
        englishButton?.addEventListener('click', () => {
            this.t.changeLanguageTo(AppLanguage.English)
        })

        const isEn = this.t.appLanguages === AppLanguage.English

        hebrewButton?.classList.toggle('underline', !isEn)
        englishButton?.classList.toggle('underline', isEn)

        this.t.subscribe((_tate) => {
            const isEn = this.t.appLanguages === AppLanguage.English
            hebrewButton?.classList.toggle('underline', !isEn)
            englishButton?.classList.toggle('underline', isEn)
        })

    }



    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="w-max flex flex-row gap-1  ms-2 ">
                <button id="set-hebrew"  
                      class=" text-blue-700 cursor-pointer">
                    <span class="hidden lg:flex">${this.t.hebrew}</span>
                    <span class="flex lg:hidden">${this.t.hebrew.slice(0,2)}</span>
                </button>/
                <button id="set-english"  
                      class=" text-blue-700 cursor-pointer flex flex-row" >
                     <span class="hidden lg:flex">${this.t.english}</span>
                     <span class="flex lg:hidden">${this.t.english.slice(0,2)}</span>
                </button>
            </div>
        `;
    }


}

customElements.define('language-button', AppLanguageButton);
