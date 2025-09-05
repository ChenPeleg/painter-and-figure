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
    rgba(255, 225, 0, 0.1),
    rgba(255, 225, 0, 0.7) 4%,
    rgba(255, 225, 0, 0.3)
  );
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}`
    static bigTextShadow = `
        text-shadow: 
            0 0px 1px ${AppText.color},
            0 2px 1px ${AppText.color},
            2px 0px 1px ${AppText.color},
            2px 2px 1px ${AppText.color}, 
            0 0px 4px ${AppText.color},
            0 2px 4px ${AppText.color},
            2px 0px 4px ${AppText.color},
            2px 2px 4px ${AppText.color}, 
               0 0px 6px ${AppText.color},
            0 2px 6px ${AppText.color},
            2px 0px 6px ${AppText.color},
            2px 2px 6px ${AppText.color}, 
                  0 0px 6px ${AppText.color},
            0 2px 6px ${AppText.color},
            2px 0px 6px ${AppText.color},
            2px 2px 6px ${AppText.color}, 
            1px 1px 3px rgba(255, 255, 255, 1);
    `;

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
                <div class="max-w-screen max-h-screen p-5 text-3xl h-screen  lg:text-3xl leading-11 overflow-y-scroll ">
                    <p   class="flex flex-col gap-6 min-h-fit   ">
                      <span class="mark" id="text"> ${this.getText()} </span> 
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
            spanText.innerText = text;

        } else {
            this.renderTemplate()
        }

    }

    private getText() {
        const pageNumber = this.getAttribute('page-number') || '1';
        const bookService = this.servicesProvider.getService(BookService)
        const raw =  bookService.getPageContent(+pageNumber)
        return raw.split('/n/n').map(t=>`<mark>${t}</mark>`).join('<br/><br/>')
    }

}

customElements.define('app-text', AppText);
