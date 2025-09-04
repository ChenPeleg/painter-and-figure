import {BaseElement} from '../_core/elements/base-element.ts';


class AppImage extends BaseElement {

    renderTemplate() {
        this.shadowRoot!.innerHTML = `
            <div class="h-screen w-screen overflow-hidden ">
               <img class="" src="/src/assets/sketch/image1.png" alt="image1"/>
            </div>
        `;
    }
}

customElements.define('app-image', AppImage);
