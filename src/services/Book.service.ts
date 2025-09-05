import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';
import {bookContent} from '../content/bookContent.ts';

export class BookService extends AbstractBaseService {
   private bookContent = bookContent

    constructor(provider: ServicesResolver) {
        super(provider);

    }
    getPageContent(page: number): string {
        const pageData = this.bookContent.find(p => p.pageNumber === page);
        if (pageData) {
            return pageData.text.join('\n\n');
        }
        throw `No content for page ${page}`;
    }



}
