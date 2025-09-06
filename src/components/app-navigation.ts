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

    attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue && this.shadowRoot) {
            this.update();
        }
    }

    calculatePages() {
        const nextPage = this.currentPage + 1;
        const prevPage = this.currentPage > this.firstPage ? this.currentPage - 1 : this.firstPage;

        return {
            nextPage,
            prevPage,
            isFirstPage: this.currentPage <= this.firstPage,
            isLastPage: this.currentPage >= this.lastPage
        }
    }

    renderTemplate() {
        const pages = this.calculatePages();
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <nav class="mb-4 flex flex-row gap-4 h-14 fixed justify-between top-0 shadow-2xl bg-slate-200 w-screen items-center z-20 ">
                <div class=" flex flex-row h-full lg:w-32 justify-center items-center">
                    <div>
                        <language-button></language-button>
                    </div>
                </div>
                <div class="flex items-center flex-row gap-4  w-full max-w-lg justify-center ">
                    <a id="previous-page" 
                       href="${pages.isFirstPage ? '#' : `#/page/${pages.prevPage}`}"
                       class="${pages.isFirstPage ? 'pointer-events-none opacity-50' : ''}">
                        <app-button ${pages.isFirstPage ? 'disabled' : ''}>${this.t.previousPage}</app-button>
                    </a>
                    <a id="next-page" 
                       href="${pages.isLastPage ? '#' : `#/page/${pages.nextPage}`}"
                       class="${pages.isLastPage ? 'pointer-events-none opacity-50' : ''}">
                        <app-button ${pages.isLastPage ? 'disabled' : ''}>${this.t.nextPage}</app-button>
                    </a>
                    <span id="count-text">${this.currentPage}/${this.lastPage}</span>
                </div>
                <div></div>
            </nav>
        `;
    }

    update() {
        if (!this.shadowRoot || !this.$<HTMLSpanElement>('#count-text') ) {
            return;
        }

        const pages = this.calculatePages();

        this.$<HTMLSpanElement>('#count-text').innerText = `${this.currentPage}/${this.lastPage}`;

        const nextLink = this.$<HTMLAnchorElement>('#next-page');
        const prevLink = this.$<HTMLAnchorElement>('#previous-page');

        // Update next button
        if (pages.isLastPage) {
            nextLink.href = '#';
            nextLink.className = 'pointer-events-none opacity-50';
            nextLink.querySelector('app-button')?.setAttribute('disabled', '');
        } else {
            nextLink.href = `#/page/${pages.nextPage}`;
            nextLink.className = '';
            nextLink.querySelector('app-button')?.removeAttribute('disabled');
        }

        // Update previous button
        if (pages.isFirstPage) {
            prevLink.href = '#';
            prevLink.className = 'pointer-events-none opacity-50';
            prevLink.querySelector('app-button')?.setAttribute('disabled', '');
        } else {
            prevLink.href = `#/page/${pages.prevPage}`;
            prevLink.className = '';
            prevLink.querySelector('app-button')?.removeAttribute('disabled');
        }
    }


}

customElements.define('app-navigation', AppNavigation);
