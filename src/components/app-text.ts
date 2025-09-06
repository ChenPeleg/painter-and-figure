import {BaseElement} from '../_core/elements/base-element.ts';
import {BookService} from '../services/Book.service.ts';
import {globalStyleSheet} from '../_core/tailwind-style-sheet.ts';


class AppText extends BaseElement {
    static color = `rgba(255, 255, 255, 1)`
    static markClass =      `mark {
  margin: 0 -0.4em;
  padding: 0.1em 0.4em;
  border-radius: 0.8em 0.3em;
  background: transparent;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.6), 
    rgba(255, 255, 255, 0.9)
  );
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}`

    static get observedAttributes() {
        return ['page-number'];
    }
    connectedCallback() {
        super.connectedCallback();
        const markClassStyleSheet = new CSSStyleSheet();
        markClassStyleSheet.replaceSync(AppText.markClass);
        (this.shadowRoot as ShadowRoot).adoptedStyleSheets = [globalStyleSheet, markClassStyleSheet];
    }

    renderTemplate() {


        // language=HTML
        this.shadowRoot!.innerHTML = `
            <div class=" flex flex-row justify-center w-full   ">
                <div class="max-w-screen max-h-screen p-5 text-3xl h-screen  lg:text-3xl leading-11 overflow-y-auto ">
                    <p   class="flex flex-col gap-6 min-h-fit   ">
                      <span  id="text"> ${this.getText()} </span> 
                        <span id="bottom-padding" class="h-32 w-10 "></span>
                    </p>
                    </p>
                </div>
        `;
    }

    protected update() {
        const spanText = this.$<HTMLSpanElement>('#text');
        if (!spanText) {
            return;
        }
        const text = this.getText();
        if (text.length < 100) {
            spanText.innerHTML = text;

        } else {
            this.renderTemplate()
        }

    }

    private getText() {
        const pageNumber = this.getAttribute('page-number') || '1';
        const bookService = this.servicesProvider.getService(BookService)
        const raw =  bookService.getPageContent(+pageNumber)

        if (!raw.includes('\n\n')) {
            return `<mark>${raw}</mark>`
        }
        return raw.split('\n\n').map(t=>`<mark>${t}</mark>`).join('<br/><br/>')
    }

}

customElements.define('app-text', AppText);
