import {BaseElement} from '../_core/elements/base-element.ts';


class AppText extends BaseElement {
    static get observedAttributes() {
        return ['image-number'];
    }


    private getImageUrl(imageNumber: number) {
        return `/src/assets/sketch/image${imageNumber}.png`;
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div class=" flex flex-row justify-center w-full  ">
               
            </div>
        `;
    }

    protected update() {
        const imageNumber = this.getAttribute('image-number') || '1';
        const img = this.$<HTMLImageElement>('img');
        if (img) {
            img.src = this.getImageUrl(+imageNumber);
            img.alt = `image${imageNumber}`;
        }
    }

}

customElements.define('app-text', AppText);
