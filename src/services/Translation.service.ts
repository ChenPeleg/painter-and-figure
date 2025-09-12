import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';
import {AppLanguage} from '../models/Language.ts';
import {StoreService} from './Store.service.ts';
import {AppActionType} from '../store/app-action-type.ts';
import type {Subscription} from '../models/Subscription.ts';


export class Txt {
    static nextPage = 'nextPage'
    static previousPage = 'previousPage'
    static page = 'page'
    static hebrew = 'hebrew'
    static english = 'english'
    static headerTitle = 'headerTitle'
}

export class TranslationService extends AbstractBaseService {
    private subscribers: { cb: (newState: AppLanguage) => void, id: number }[];
    private subscriberId = 0;

    constructor(provider: ServicesResolver) {
        super(provider);
        this.subscribers = [];
       this. init()

    }
    public async init(): Promise<void> {
        setTimeout(()=>{

        this.updateDocumentLangAttribute(this.appLanguages);
        },1)
    }
    public translate (key: string ): string {
        const lang = this.appLanguages

        switch (key) {
            case Txt.nextPage:
                return lang === AppLanguage.English ? 'Next' : 'עמוד הבא'
            case Txt.previousPage:
                return lang === AppLanguage.English ? 'Previous' : 'עמוד קודם'
            case Txt.page:
                return lang === AppLanguage.English ? 'Page' : 'עמוד'
            case Txt.hebrew:
                return 'עברית'
            case Txt.english:
                return 'English'
            case Txt.headerTitle:
                return lang === AppLanguage.English ? 'Painter And Figure - By Afik Peleg' : 'הצייר והדמות - מאת אפיק פלג'
            default:
                return ''

        }
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

    get headerTitle() {
        return this.en ? 'Painter And Figure - By Afik Peleg' : 'הצייר והדמות - מאת אפיק פלג'
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
        this.subscribers.forEach(sub => sub.cb(lang));
        if (document) {
          this.updateDocumentLangAttribute(lang);
        }

    }
    updateDocumentLangAttribute(lang: AppLanguage) {
        document.documentElement.lang = lang === AppLanguage.English ? 'en' : 'he'
        document.body.dir = lang === AppLanguage.English ? 'ltr' : 'rtl'
    }


    subscribe(fn: (newState: AppLanguage) => void) : Subscription {
        this.subscribers.push({
            cb: fn,
            id: this.subscriberId
        });
        return  {
            unsubscribe: ()=> this.unsubscribe(this.subscriberId++)
        } ;
    }

    unsubscribe(id: number) {
        this.subscribers = this.subscribers.filter(sub => sub.id !== id);
    }


}
