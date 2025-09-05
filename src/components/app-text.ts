import {BaseElement} from '../_core/elements/base-element.ts';
import {BookService} from '../services/Book.service.ts';


class AppText extends BaseElement {
    static get observedAttributes() {
        return ['page-number'];
    }

    renderTemplate() {
        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class=" flex flex-row justify-center w-full  bg-red-400">
                <p class="max-w-screen max-h-screen p-4 text-lg md:text-2xl lg:text-3xl">
                    ${this.getText()}
                </p>
            </div>
        `;
    }

    protected update() {

        const p = this.$<HTMLImageElement>('p');
        if (p) {
            p.innerText = this.getText();
        }

    }

    private getText() {
        const pageNumber = this.getAttribute('page-number') || '1';
        console.log(pageNumber);
        const bookService = this.servicesProvider.getService(BookService)
        return bookService.getPageContent(+pageNumber)
    }

}

customElements.define('app-text', AppText);
