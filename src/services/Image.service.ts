import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';

import image1 from '../../public/sketch/image1.jpeg';
import image2 from '../../public/sketch/image2.jpeg';
import image3 from '../../public/sketch/image3.jpeg';
import image4 from '../../public/sketch/image4.jpeg';
import image5 from '../../public/sketch/image5.jpeg';
import image6 from '../../public/sketch/image6.jpeg';
import image7 from '../../public/sketch/image7.jpeg';
import image8 from '../../public/sketch/image8.jpeg';
import image9 from '../../public/sketch/image9.jpeg';
import image10 from '../../public/sketch/image10.jpeg';
import image11 from '../../public/sketch/image11.jpeg';
import image12 from '../../public/sketch/image12.jpeg';
import image13 from '../../public/sketch/image13.jpeg';
import image14 from '../../public/sketch/image14.jpeg';
import {appConfig} from '../configuration/appConfig.ts';
import {EnvironmentType} from '../models/EnvironmentType.ts';

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
    private buildImageUrl(imageNumber: number): string {
        const prefix = appConfig.environment === EnvironmentType.Production ? '' : '/painter-and-figure';
        return  `${prefix}/sketch/image${imageNumber}.jpeg`;
    }

    getImageUrl(imageNumber: number): string {
        return this.buildImageUrl(imageNumber);
    }

    constructor(provider: ServicesResolver) {
        super(provider);

    }


}
