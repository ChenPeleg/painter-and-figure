import {BaseElement} from '../_core/elements/base-element.ts';
import {TranslationService} from '../services/Translation.service.ts';

class AppNavigation extends BaseElement {

    private t: TranslationService

    constructor() {
        super();
        this.t = this.servicesProvider.getService(TranslationService)
    }

    static get observedAttributes() {
        return ['current-page', 'first-page', 'last-page'];
    }

    get currentPage(): number {
        return parseInt(this.getAttribute('current-page') || '1');
    }

    get firstPage(): number {
        return parseInt(this.getAttribute('first-page') || '1');
    }

    get lastPage(): number {
        return parseInt(this.getAttribute('last-page') || '14');
    }

    connectedCallback() {
        super.connectedCallback();

    }



    calculatePages() {
        return {
            nextPage: this.currentPage + 1,
            prevPage: this.currentPage > this.firstPage ? this.currentPage - 1 : this.firstPage
        }
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <nav class="mb-4 flex flex-row gap-4 h-14 fixed justify-between top-0 shadow-2xl bg-amber-100 w-screen items-center z-20 ">
                <div class=" flex flex-row h-full w-32 justify-center items-center">
                    <div>
                        <language-button></language-button>
                    </div>
                </div>
                <div class="flex items-center flex-row gap-4  w-full max-w-lg justify-center ">
                    <a id="previous-page" href="#/page/${this.calculatePages().prevPage}">
                        <app-button>${this.t.previousPage}</app-button>
                    </a>
                    <a id="next-page" href="#/page/${this.calculatePages().nextPage}">
                        <app-button>${this.t.nextPage}</app-button>
                    </a>
                    ${this.t.page}
                    <span id="count-text">${this.currentPage}</span>
                </div>
                <div></div>
            </nav>
        `;
    }

    update() {
        if (!this.shadowRoot || !this.$<HTMLSpanElement>('#count-text') ) {
            return;
        }



        this.$<HTMLSpanElement>('#count-text').innerText = this.currentPage.toString();
        this.$<HTMLAnchorElement>('#next-page').href = `#/page/${this.calculatePages().nextPage}`;
        this.$<HTMLAnchorElement>('#previous-page').href = `#/page/${this.calculatePages().prevPage}`;
    }


}

customElements.define('app-navigation', AppNavigation);
