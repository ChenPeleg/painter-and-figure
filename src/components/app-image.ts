import {BaseElement} from '../_core/elements/base-element.ts';


class AppImage extends BaseElement {
    static get observedAttributes() {
        return ['image-number'];
    }


    private getImageUrl(imageNumber: number) {
        return `/src/assets/sketch/image${imageNumber}.png`;
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div class="h-screen w-screen overflow-hidden ">
               <img class="" src="/src/assets/sketch/image1.png" alt="image1"/>
            </div>
        `;
    }

    protected update() {
       console.log(this.attributes.getNamedItem('image-number'));
    }

}

customElements.define('app-image', AppImage);
