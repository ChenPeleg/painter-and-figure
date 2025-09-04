import {BaseElement} from './_core/elements/base-element.ts';
import {HashRouterService} from './services/HashRouter.service.ts';
import type {Subscription} from './models/Subscription.ts';


class AppPage extends BaseElement {
    private subscription: Subscription ;
    private state = {
        currentPage: 0
    }

    connectedCallback() {
        super.connectedCallback();
        this.subscription = this.servicesProvider.getService(HashRouterService).subscribe((routerState => {

            if (routerState.params.page !== this.state.currentPage  ) {
                this.state.currentPage = routerState.params.page;
                this.update();
            }


        }))

    }

    calculatePages() {
       return  {
           nextPage:   +this.state.currentPage + 1,
           prevPage:   +this.state.currentPage > 0 ? +this.state.currentPage - 1 : 0
        }

    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full  w-full ">
                <main-page-layout>
                    <nav class="mb-4 flex flex-row gap-4">
                        <a id="nextpage" href="#/page/${this.calculatePages().nextPage}"> Next page </a>
                        <a id="previouspage" href="#/page/${this.calculatePages().prevPage}"> Prev page </a>
                    </nav>
                 
                    Page: <span id="count-text">${this.state.currentPage}</span>
                    <app-image></app-image>

                </main-page-layout>
            </div>

        `;
    }

    update() {
        this.$<HTMLSpanElement>('#count-text').innerText = this.state.currentPage?.toString() || '0';
        this.$<HTMLAnchorElement>('#nextpage').href = `#/page/${this.calculatePages().nextPage}`;
        this.$<HTMLAnchorElement>('#previouspage').href = `#/page/${this.calculatePages().prevPage}`;


    }
    disconnectedCallback() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

customElements.define('app-page', AppPage);



