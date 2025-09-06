import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';

import image1 from '../assets/sketch/image1.jpeg';
import image2 from '../assets/sketch/image2.jpeg';
import image3 from '../assets/sketch/image3.jpeg';
import image4 from '../assets/sketch/image4.jpeg';
import image5 from '../assets/sketch/image5.jpeg';
import image6 from '../assets/sketch/image6.jpeg';
import image7 from '../assets/sketch/image7.jpeg';
import image8 from '../assets/sketch/image8.jpeg';
import image9 from '../assets/sketch/image9.jpeg';
import image10 from '../assets/sketch/image10.jpeg';
import image11 from '../assets/sketch/image11.jpeg';
import image12 from '../assets/sketch/image12.jpeg';
import image13 from '../assets/sketch/image13.jpeg';
import image14 from '../assets/sketch/image14.jpeg';

export class ImageService extends AbstractBaseService {
    static allImages: Record<number, string> = {
        1: image1,
        2: image2,
        3: image3,
        4: image4,
        5: image5,
        6: image6,
        7: image7,
        8: image8,
        9: image9,
        10: image10,
        11: image11,
        12: image12,
        13: image13,
        14: image14
    };

    getImageUrl(imageNumber: number): string {
        return ImageService.allImages[imageNumber] || '';
    }

    constructor(provider: ServicesResolver) {
        super(provider);

    }


}
