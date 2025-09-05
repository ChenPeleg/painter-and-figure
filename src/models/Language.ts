import {makeBrandedType} from './makeBrandedType.ts';

export const AppLanguage = makeBrandedType({
    Hebrew: 'he',
    English: 'en',
}, 'language');

export type AppLanguage = (typeof AppLanguage)[keyof typeof AppLanguage];
