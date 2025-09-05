import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';
import {AppLanguage}  from '../models/Language.ts';
import {StoreService} from './Store.service.ts';



export class TranslationService extends AbstractBaseService {
    private _appLanguages : AppLanguage = AppLanguage.English


    private get en () {
        const store = this.servicesResolver.getService(StoreService)
        return store.store.getState().language === AppLanguage.English
    }

    constructor(provider: ServicesResolver) {
        super(provider);

    }
    get appLanguages(): AppLanguage {
        return this._appLanguages;
    }
    set appLanguages(value: AppLanguage) {
        this._appLanguages = value;
    }
    get nextPage () {
        return this.en ? 'Next Page' : 'עמוד הבא'
    }
    get previousPage () {
        return this.en ? 'Previous Page' : 'עמוד קודם'
    }
    get page () {
        return this.en ? 'Page' : 'עמוד'
    }


}
