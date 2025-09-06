import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';
import {AppLanguage} from '../models/Language.ts';
import {StoreService} from './Store.service.ts';
import {AppActionType} from '../store/app-action-type.ts';


export class TranslationService extends AbstractBaseService {


    constructor(provider: ServicesResolver) {
        super(provider);

    }

    get appLanguages(): AppLanguage {
        return this.servicesResolver.getService(StoreService).store.getState().language;
    }

    get nextPage() {
        return this.en ? 'Next' : 'עמוד הבא'
    }

    get previousPage() {
        return this.en ? 'Previous' : 'עמוד קודם'
    }

    get page() {
        return this.en ? 'Page' : 'עמוד'
    }

    get hebrew() {
        return 'עברית'
    }

    get english() {
        return 'English'
    }

    private get en() {
        const store = this.servicesResolver.getService(StoreService)
        return store.store.getState().language === AppLanguage.English
    }

    changeLanguageTo(lang: AppLanguage) {
        const store = this.servicesResolver.getService(StoreService)

        if (store.store.getState().language === lang) {
            return
        }
        store.store.dispatch({
            type: AppActionType.setLanguage,
            payload: lang
        })

    }
   get headerTitle() {
        return this.en ? 'Painter And Figure - By Afik Peleg' : 'הצייר והדמות - מאת אפיק פלג'
    }


}
