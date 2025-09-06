import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';
import {bookContent} from '../content/bookContent.ts';
import {StoreService} from './Store.service.ts';
import {AppLanguage} from '../models/Language.ts';
import {appConfig} from '../configuration/appConfig.ts';

export class BookService extends AbstractBaseService {
   private bookContent = bookContent

    constructor(provider: ServicesResolver) {
        super(provider);

    }
    getFirstAndLastPage(): { first: number, last: number } {
        const pages = this.bookContent.map(p => p.pageNumber || 0).filter(p => p !== undefined).sort((a, b) => a - b);
        return {
            first: pages[0],
            last: pages[pages.length - 1]
        }

    }
    static prefixImageSrcPath = (src: string) => {
        const srcFolderIfNeeded = appConfig.isDevelopment ? '/' : '/';
        return `${srcFolderIfNeeded}${src}`;
    };
    getPageContent(page: number): string {
       const lang = this.servicesResolver.getService(StoreService).store.getState().language;

        const pageData = this.bookContent.find(p => p.pageNumber === page);
        if (pageData) {
            return (lang === AppLanguage.English ?  pageData.englishText : pageData.hebrewText).join('\n\n');
        }
        throw `No content for page ${page}`;
    }



}
