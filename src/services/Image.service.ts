import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';

import {appConfig} from '../configuration/appConfig.ts';
import {EnvironmentType} from '../models/EnvironmentType.ts';

export class ImageService extends AbstractBaseService {
    private buildImageUrl(imageNumber: number): string {
        const prefix = appConfig.environment === EnvironmentType.Production ? '/painter-and-figure' : '';
        return  `${prefix}/sketch/image${imageNumber}.jpeg`;
    }

    getImageUrl(imageNumber: number): string {
        return this.buildImageUrl(imageNumber);
    }

    constructor(provider: ServicesResolver) {
        super(provider);

    }


}
