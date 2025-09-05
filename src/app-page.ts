import {BaseElement} from './_core/elements/base-element.ts';
import {HashRouterService} from './services/HashRouter.service.ts';
import type {Subscription} from './models/Subscription.ts';


class AppPage extends BaseElement {
    private subscription: Subscription | null = null;
    private state = {
        currentPage: 0
    }

    connectedCallback() {
        super.connectedCallback();
        this.subscription = this.servicesProvider.getService(HashRouterService).subscribe((routerState => {
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
                        <article class="lg:absolute lg:top-0">
                            <app-text page-number="${this.state.currentPage}"></app-text> 
                        </article>
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

        this.$<HTMLElement>('app-image').setAttribute('image-number', this.state.currentPage?.toString() || '0');
        this.$<HTMLElement>('app-text').setAttribute('image-number', this.state.currentPage?.toString() || '0');

    }

    disconnectedCallback() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

customElements.define('app-page', AppPage);



