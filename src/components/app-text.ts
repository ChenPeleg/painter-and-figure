import {BaseElement} from '../_core/elements/base-element.ts';
import {BookService} from '../services/Book.service.ts';


class AppText extends BaseElement {
    static bigTextShadow = `
        text-shadow: 2px 2px 4px rgba(0, 0
, 0, 0.3);
    `;

    static get observedAttributes() {
        return ['page-number'];
    }

    renderTemplate() {

        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class=" flex flex-row justify-center w-full   ">
                <div class="max-w-screen max-h-screen p-5 text-3xl h-screen  lg:text-3xl leading-11 overflow-y-scroll ">
                    <p style="${AppText.bigTextShadow}" class="flex flex-col gap-6 min-h-fit  ">
                        ${this.getText()}
                        <span id="bottom-padding" class="h-32 w-10 "></span>
                    </p>
                    </p>
                </div>
        `;
    }

    protected update() {

        const p = this.$<HTMLImageElement>('p');
        if (!p) {
            return;
        }
        const text = this.getText();
        if (text.length < 100) {
            p.innerText = text;

        } else {
            this.renderTemplate()
        }

    }

    private getText() {
        const pageNumber = this.getAttribute('page-number') || '1';

        const bookService = this.servicesProvider.getService(BookService)
        return bookService.getPageContent(+pageNumber)
    }

}

customElements.define('app-text', AppText);
