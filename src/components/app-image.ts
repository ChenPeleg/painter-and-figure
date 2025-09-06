import {BaseElement} from '../_core/elements/base-element.ts';
import   {ImageService} from '../services/Image.service.ts';


class AppImage extends BaseElement {
    private imageService : ImageService
    static get observedAttributes() {
        return ['page-number'];
    }

constructor() {
    super();
    this.imageService = this.servicesProvider.getService(ImageService)
}
    private getImageUrl(imageNumber: number) {
        return this.imageService.getImageUrl(imageNumber)
    }

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div class=" flex flex-row justify-center w-full  ">
               <img class="max-w-screen max-h-screen" src="/src/assets/sketch/image1.png" alt="image1"/>
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
