import {BaseElement} from '../_core/elements/base-element.ts';


class AppImage extends BaseElement {
    static get observedAttributes() {
        return ['page-number'];
    }


    private getImageUrl(imageNumber: number) {
        return `sketch/image${imageNumber}.png`;
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div class=" flex flex-row justify-center w-full  ">
               <img class="max-w-screen max-h-screen" src="/sketch/image1.png" alt="image1"/>
            </div>
        `;
    }

    protected update() {
        const imageNumber = this.getAttribute('page-number') || '1';
        const img = this.$<HTMLImageElement>('img');
        if (img) {
            img.src = this.getImageUrl(+imageNumber);
            img.alt = `image${imageNumber}`;
        }
    }

}

customElements.define('app-image', AppImage);
