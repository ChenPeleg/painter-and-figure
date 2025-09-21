import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';
import {LocalStorageService} from './LocalStorage.service.ts';
import {type AppStoreModel, DisplayType,} from '../store/app-store-model.ts';
import {StoreFactory, type StoreReducer} from '../_global/StoreFactory.ts';
import type {AppAction} from '../models/AppAction.ts';
import {appReducer} from '../store/app-reducer.ts';
import {AppLanguage} from '../models/Language.ts';



export class StoreService extends AbstractBaseService {
    private readonly _initialState: AppStoreModel;

    constructor(provider: ServicesResolver) {
        super(provider);
        this._initialState = this.createInitialStoreState();
    }

    private _store: StoreFactory<AppAction, AppStoreModel, typeof appReducer> | null = null;

    get store(): StoreFactory<AppAction, AppStoreModel, StoreReducer<AppStoreModel, AppAction>> {
        if (!this._store) {
            this._store = this.createStore();
        }
        return this._store;
    }

    get initialState(): AppStoreModel {
        return this._initialState;
    }

    private createStore() {
        const stateFromLocalStorage = this.storeFromLocalStorage()

        const globalStore: StoreFactory<AppAction, AppStoreModel, typeof appReducer> = new StoreFactory({
            reducer: appReducer,
            defaultState: stateFromLocalStorage || this.initialState
        })
        globalStore.subscribe((state: AppStoreModel) => {
            this.servicesResolver.getService(LocalStorageService).setObject(LocalStorageService.STORE_SETTINGS, state);
        })
        return this._store = globalStore;
    }

    private storeFromLocalStorage() {
        const stateFromLocalStorage = this.servicesResolver.getService(LocalStorageService).getObjectOrNull(LocalStorageService.STORE_SETTINGS) as AppStoreModel | null;
        if (!stateFromLocalStorage) {
            return null;
        }
        if (stateFromLocalStorage.language && stateFromLocalStorage.language._value === AppLanguage.English.value) {
          stateFromLocalStorage.language =  AppLanguage.English
        } else {
            stateFromLocalStorage.language =  AppLanguage.Hebrew
        }

        return  stateFromLocalStorage

    }


    private createInitialStoreState() {

        const initialState: AppStoreModel = {
            language : AppLanguage.English,
            count : 0,
            display : DisplayType.Grid
        }
        if (navigator && navigator.language) {
            const locale = new Intl.Locale(navigator.language);
            switch (locale.language) {
                case 'en':
                    initialState.language = AppLanguage.English;
                    break;
                case 'he':
                   initialState.language = AppLanguage.Hebrew;

            }
        }


        return initialState;
    }


}
