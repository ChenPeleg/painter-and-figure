import {_ServicesProvider} from '../../src/services/_ServicesProvider';
import {PWAService} from '../../src/services/PWA.service';
import {TranslationService} from '../../src/services/Translation.service';
import {ConfigurationService} from '../../src/services/Configuration.service';
import {LocalStorageService} from '../../src/services/LocalStorage.service';
import {TimeAndDateService} from '../../src/services/TimeAndDate.service';
import {ThemeService} from '../../src/services/Theme.service';
import {StoreService} from '../../src/services/Store.service';
import {HashRouterService} from '../../src/services/HashRouter.service';
import {BookService} from '../../src/services/Book.service';
import {ImageService} from '../../src/services/Image.service';



export const mockServiceProvider =  () => {
    const provider = _ServicesProvider
    provider.$$DevOverrideService([PWAService,TranslationService,
        ConfigurationService,
        LocalStorageService,
        TimeAndDateService,
        ThemeService,
        StoreService,
        HashRouterService,
        BookService,
        ImageService
    ])
    return provider;
}


