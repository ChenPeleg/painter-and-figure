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

            if (routerState.params.page !== this.state.currentPage  ) {
                this.state.currentPage = routerState.params.page;
                this.update();
            }


        }))

    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full  w-full ">
                <main-page-layout>

                </main-page-layout>
            </div>

        `;
    }

    update() {
        this.$<HTMLSpanElement>('#count-text').textContent = this.state.clicks.toString()
    }
}

customElements.define('app-page', AppPage);



