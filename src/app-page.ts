import {BaseElement} from './_core/elements/base-element.ts';
import {HashRouterService} from './services/HashRouter.service.ts';
import type {Subscription} from './models/Subscription.ts';
import {BookService} from './services/Book.service.ts';


class AppPage extends BaseElement {
    private subscription: Subscription | null = null;
    private state = {
        currentPage: 0,
        firstPage: 1,
        lastPage: 14
    }

    constructor() {
        super();
        const bookService = this.servicesProvider.getService(BookService)
        const {
            first,
            last

        } = bookService.getFirstAndLastPage()
        this.state.lastPage = last
        this.state.currentPage = first

        this.state.currentPage =   this.servicesProvider.getService(HashRouterService).getState().params.page
    }

    connectedCallback() {
        super.connectedCallback();
        const router = this.servicesProvider.getService(HashRouterService);
        this.subscription = router.subscribe((routerState => {
            if (routerState.params.page !== this.state.currentPage) {
                this.state.currentPage = routerState.params.page;
                this.update();
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
                    <nav class="mb-4 flex flex-row gap-4 h-14 fixed top-0 shadow-2xl bg-amber-100 w-screen items-center z-20">
                        <a id="previouspage" href="#/page/${this.calculatePages().prevPage}">
                            <app-button>Previous page</app-button>
                        </a>
                        <a id="nextpage" href="#/page/${this.calculatePages().nextPage}">
                            <app-button>Next page</app-button>
                        </a>
                        Page: <span id="count-text">${this.state.currentPage}</span>
                    </nav>

                    <main class="relative z-0">
                        <div class="lg:absolute lg:top-0 bg-amber-400 w-full  h-44">
                            <app-text page-number="${this.state.currentPage}"></app-text>
                        </div>
                        <app-image page-number="${this.state.currentPage}"></app-image>
                    </main>

                </main-page-layout>
            </div>

        `;
    }

    update() {
        this.$<HTMLSpanElement>('#count-text').innerText = this.state.currentPage?.toString() || '0';
        this.$<HTMLAnchorElement>('#nextpage').href = `#/page/${this.calculatePages().nextPage}`;
        this.$<HTMLAnchorElement>('#previouspage').href = `#/page/${this.calculatePages().prevPage}`;

        this.$<HTMLElement>('app-image').setAttribute('page-number', this.state.currentPage?.toString() || '0');
        this.$<HTMLElement>('app-text').setAttribute('pgae-number', this.state.currentPage?.toString() || '0');

    }

    disconnectedCallback() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

customElements.define('app-page', AppPage);



