import {BaseElement} from './_core/elements/base-element.ts';
import {HashRouterService} from './services/HashRouter.service.ts';
import type {Subscription} from './models/Subscription.ts';
import {BookService} from './services/Book.service.ts';
import {StoreService} from './services/Store.service.ts';
import {AppLanguage} from './models/Language.ts';
import {TranslationService} from './services/Translation.service.ts';


class AppPage extends BaseElement {
    private routerSubscription: Subscription | null = null;
    private storeSubscription: (() => void) | null = null;
    private state = {
        currentPage: 0,
        firstPage: 1,
        lastPage: 14,
        language: AppLanguage.Hebrew,
    }
    private t: TranslationService

    constructor() {
        super();
        const bookService = this.servicesProvider.getService(BookService)
        const {
            first,
            last

        } = bookService.getFirstAndLastPage()
        this.t = this.servicesProvider.getService(TranslationService)
        this.state.lastPage = last
        this.state.currentPage = first
        this.state.currentPage = this.servicesProvider.getService(HashRouterService).getState().params.page
        this.state.language = this.servicesProvider.getService(StoreService).store.getState().language || this.state.language
    }

    connectedCallback() {
        super.connectedCallback();
        const router = this.servicesProvider.getService(HashRouterService);
        this.routerSubscription = router.subscribe((routerState => {
            if (routerState.params.page !== this.state.currentPage) {
                this.state.currentPage = routerState.params.page;
                this.update();
            }
        }))
        const storeService = this.servicesProvider.getService(StoreService);
        this.storeSubscription = storeService.store.subscribe((newState => {

            if (newState.language !== this.state.language) {
                this.renderTemplate()
                this.state.language = newState.language
            }
        }))


    }

    calculatePages() {
        return {
            nextPage: +this.state.currentPage + 1,
            prevPage: +this.state.currentPage > 0 ? +this.state.currentPage - 1 : 0
        }
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full  w-full ">
                <main-page-layout>
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
                            ${this.t.page} <span id="count-text">${this.state.currentPage}</span>
                        </div>
                        <div></div>
                    </nav>

                    <main class="relative z-0">
                        <div class=" absolute lg:top-0 flex flex-col items-center w-full    ">
                            <div id="nav-bar-space" class="h-14 w-screen"></div>
                            <div class="  flex flex-row  max-w-xl "> 
                                <app-text page-number="${this.state.currentPage}"></app-text>
                            </div>
                        </div>
                        <div id="mobile-top-margins-for-image" class="w-full h-[40vh] lg:hidden "></div>
                        <app-image page-number="${this.state.currentPage}"></app-image>
                    </main>

                </main-page-layout>
            </div>

        `;
    }

    update() {
        this.$<HTMLSpanElement>('#count-text').innerText = this.state.currentPage?.toString() || '0';
        this.$<HTMLAnchorElement>('#next-page').href = `#/page/${this.calculatePages().nextPage}`;
        this.$<HTMLAnchorElement>('#previous-page').href = `#/page/${this.calculatePages().prevPage}`;

        this.$<HTMLElement>('app-image').setAttribute('page-number', this.state.currentPage?.toString() || '1');
        this.$<HTMLElement>('app-text').setAttribute('page-number', this.state.currentPage?.toString() || '1');

    }

    disconnectedCallback() {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
        if (this.storeSubscription) {
            this.storeSubscription();
        }
    }
}

customElements.define('app-page', AppPage);



