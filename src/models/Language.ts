import {Enum} from './Enum.ts';


export class AppLanguage extends Enum {
    static Hebrew = new AppLanguage('Hebrew');
    static English = new AppLanguage('English');
}

