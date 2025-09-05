import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';
import {AppLanguage}  from '../models/Language.ts';



export class TranslationService extends AbstractBaseService {
    private _appLanguages : AppLanguage = AppLanguage.English

    constructor(provider: ServicesResolver) {
        super(provider);
    }
    get appLanguages(): AppLanguage {

        return this._appLanguages;
    }
    set appLanguages(value: AppLanguage) {
        this._appLanguages = value;
    }


}
