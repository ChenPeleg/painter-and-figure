import {BaseElement} from './_core/elements/base-element.ts';
import {HashRouterService} from './services/HashRouter.service.ts';
import type {Subscription} from './models/Subscription.ts';
import {BookService} from './services/Book.service.ts';
import {StoreService} from './services/Store.service.ts';
import {AppLanguage} from './models/Language.ts';
import {CustomContent} from './models/customContent.ts';


class AppPage extends BaseElement {
    private routerSubscription: Subscription | null = null;
    private storeSubscription: (() => void) | null = null;
    private state = {
        currentPage: 0,
        firstPage: 1,
        lastPage: 14,
        language: AppLanguage.Hebrew,
    }

    constructor() {
        super();
        const bookService = this.servicesProvider.getService(BookService)
        const {
            first,
            last
        } = bookService.getFirstAndLastPage()
        this.state.lastPage = last
        this.state.firstPage = first
        this.state.currentPage = first
        this.state.currentPage = this.servicesProvider.getService(HashRouterService).getState().params.page
        this.state.language = this.servicesProvider.getService(StoreService).store.getState().language || this.state.language
        console.log(this.servicesProvider.getService(StoreService).store.getState().language)
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

        const routerState = this.servicesProvider.getService(HashRouterService).getState();
        this.state.currentPage = routerState.params.page;
        this.update();


    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full  w-full ">
                <main-page-layout>
                    <app-navigation
                            current-page="${this.state.currentPage}"
                            first-page="${this.state.firstPage}"
                            last-page="${this.state.lastPage}">
                    </app-navigation>

                    <main class="relative z-0 flex flex-col justify-between h-dvh overflow-hidden max-h-dvh">
                        <div class=" absolute lg:top-0 flex flex-col items-center w-full    ">
                            <div id="nav-bar-space" class="lg:h-14 h-24 w-screen"></div>
                            <div id="app-text-top-padding" class=" hidden lg:block"></div>
                            <div id="app-text-wrapper" class="flex flex-row  max-w-xl ">
                                <app-text page-number="${this.state.currentPage}"></app-text>
                            </div>
                        </div>
                        <div id="mobile-top-margins-for-image" class="w-full h-[40vh] lg:hidden "></div>
                        <div class="mb-4">
                            <app-image page-number="${this.state.currentPage}"></app-image>
                        </div>
                    </main>

                </main-page-layout>
            </div>

        `;
    }

    update() {

        const navElement = this.$<HTMLElement>('app-navigation');
        if (navElement) {
            navElement.setAttribute('current-page', this.state.currentPage?.toString());
            navElement.setAttribute('first-page', this.state.firstPage?.toString());
            navElement.setAttribute('last-page', this.state.lastPage?.toString());
        }

        this.$<HTMLElement>('app-image').setAttribute('page-number', this.state.currentPage?.toString() || '1');
        this.$<HTMLElement>('app-text').setAttribute('page-number', this.state.currentPage?.toString() || '1');
        this.customPageUpdates()
    }

    customPageUpdates() {
        const bookService = this.servicesProvider.getService(BookService)
        const customContent = new Set(bookService.getPageCustomType(this.state.currentPage))
        this.$<HTMLElement>('#app-text-top-padding').style.minHeight  = customContent.has(CustomContent.AboutTheAuthor) ? '50vh' : '0';
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
